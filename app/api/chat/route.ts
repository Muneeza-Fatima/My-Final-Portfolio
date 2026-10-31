import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

import { systemPrompt } from "@/lib/chat/knowledge";
import { localAnswer } from "@/lib/chat/local-answers";

// Public endpoint, so every request is bounded: short questions, a short
// recent history, capped output, and a per-IP rate limit.
const MAX_MESSAGE_CHARS = 1000;
const MAX_HISTORY = 12;
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Best-effort, per server instance (resets on cold start). Enough to stop a
// single visitor hammering the endpoint; use a shared store for stricter limits.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

// Accepts only well-formed text turns that start and end with the visitor.
function parseMessages(body: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages = raw.slice(-MAX_HISTORY);
  const parsed: Anthropic.Beta.BetaMessageParam[] = [];
  for (const [index, item] of messages.entries()) {
    const role = (item as { role?: unknown })?.role;
    const content = (item as { content?: unknown })?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, role === "user" ? MAX_MESSAGE_CHARS : 4000);
    if (!text) return null;
    if (index > 0 && parsed[index - 1].role === role) return null;
    parsed.push({ role, content: text });
  }
  if (parsed[0].role !== "user") parsed.shift();
  if (!parsed.length || parsed[parsed.length - 1].role !== "user") return null;
  return parsed;
}

const textHeaders = (source: "ai" | "local") => ({
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "X-Answer-Source": source,
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "You've sent a lot of questions — please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let messages: Anthropic.Beta.BetaMessageParam[] | null = null;
  try {
    messages = parseMessages(await request.json());
  } catch {
    messages = null;
  }
  if (!messages) {
    return NextResponse.json({ message: "Please send a question." }, { status: 400 });
  }

  // Without an AI key, answer from the site's own data.
  const question = messages[messages.length - 1].content as string;
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(localAnswer(question), { headers: textHeaders("local") });
  }

  const client = new Anthropic();
  const stream = client.beta.messages.stream(
    {
      model: "claude-opus-5-5",
      // Thinking always runs on this model and counts toward max_tokens;
      // low effort keeps chat replies quick, the cap bounds cost per answer.
      max_tokens: 2048,
      output_config: { effort: "low" },
      // If a safety classifier declines, retry on Anthropic's recommended model
      // instead of returning an empty refusal.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      // The system prompt is identical on every request, so cache it.
      system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
      messages,
    },
    { signal: request.signal },
  );

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sent = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            sent = true;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" && !sent) {
          controller.enqueue(
            encoder.encode("Sorry, I can't help with that. Ask me about Muneeza's work, services or how to contact her."),
          );
        }
      } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
          console.error("Chat API rate limited by Anthropic:", error.message);
        } else if (error instanceof Anthropic.APIError) {
          console.error(`Chat API error ${error.status}:`, error.message);
        } else if (!request.signal.aborted) {
          console.error("Chat API stream failed:", error);
        }
        // Nothing streamed yet: fall back to the built-in answer instead of an error.
        if (!request.signal.aborted) {
          controller.enqueue(
            encoder.encode(sent ? "\n\n(The answer was cut off — please try again.)" : localAnswer(question)),
          );
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, { headers: textHeaders("ai") });
}
