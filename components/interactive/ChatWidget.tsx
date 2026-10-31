"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import dynamic from "next/dynamic";
import { Fragment, useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

// Plain chat icon: shown instantly, until the 3D robot is ready (or instead of
// it on low-end devices and data saver).
function RobotPlaceholder() {
  return (
    <span className="flex h-full w-full items-center justify-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6d5bd0] sm:h-14 sm:w-14">
        <MessageCircle size={22} />
      </span>
    </span>
  );
}

// The 3D robot (three.js) is a separate chunk, fetched only once the browser is idle.
const ChatRobot = dynamic(() => import("./ChatRobot"), { ssr: false, loading: RobotPlaceholder });

// Skip the 3D robot where it would cost more than it adds.
function canShowRobot() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return false;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) return false;
  return true;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hi! I'm Muneeza's assistant. Ask me about her projects, services, experience or how to work with her.";

const SUGGESTIONS = [
  "What services does Muneeza offer?",
  "Show me her best projects",
  "How can I hire her?",
];

const MAX_CHARS = 1000;

// Waits `ms`, rejecting with an AbortError if the chat is closed meanwhile.
function pause(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) return reject(new DOMException("Aborted", "AbortError"));
    const timer = window.setTimeout(resolve, Math.max(0, ms));
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}
const GREETED_KEY = "mf-chat-greeted";

// Turns plain URLs and site paths (/work…, /#contact) in an answer into links.
function Linkified({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+|mailto:[^\s)]+|(?<![\w.])\/(?:work[\w/-]*|#contact))/g);
  return (
    <>
      {parts.map((part, index) =>
        /^(https?:|mailto:|\/)/.test(part) ? (
          <a
            key={index}
            href={part.replace(/[.,]$/, "")}
            {...(part.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className="break-all text-[#c9bcff] underline decoration-[#c9bcff]/40 underline-offset-2 hover:decoration-[#c9bcff]"
          >
            {part.replace(/[.,]$/, "")}
          </a>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

// Floating "Ask about Muneeza" assistant. Answers stream in from /api/chat.
export default function ChatWidget() {
  const reduceMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  // Greeting bubble shows once per visit; the pulse ring stops after the first open.
  const [greeting, setGreeting] = useState(false);
  const [opened, setOpened] = useState(false);
  const [robotReady, setRobotReady] = useState(false);

  // Load the 3D robot after the page has settled, so it never competes with
  // the hero image or page scripts.
  useEffect(() => {
    if (!canShowRobot()) return;
    const ready = () => setRobotReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(ready, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(ready, 1500);
    return () => window.clearTimeout(id);
  }, []);

  const toggleChat = (next: boolean) => {
    setOpen(next);
    if (next) {
      setOpened(true);
      setGreeting(false);
    }
  };

  useEffect(() => {
    try {
      if (sessionStorage.getItem(GREETED_KEY) === "1") return;
    } catch {
      // storage unavailable — greet anyway
    }
    // Wait until the intro preloader has finished.
    const show = window.setTimeout(() => {
      setGreeting(true);
      try {
        sessionStorage.setItem(GREETED_KEY, "1");
      } catch {
        // storage unavailable — the greeting may show again next page load
      }
    }, 4500);
    const hide = window.setTimeout(() => setGreeting(false), 4500 + 7000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  // Keep the newest message in view while an answer streams in.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const question = text.trim().slice(0, MAX_CHARS);
    if (!question || busy) return;

    const history: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const startedAt = performance.now();
    const setAnswer = (content: string) =>
      setMessages((current) => [...current.slice(0, -1), { role: "assistant", content }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        setAnswer(data?.message ?? "Sorry, something went wrong. Please try again.");
        return;
      }

      // Built-in answers arrive all at once: "think" for a moment, then type
      // the answer out so it reads like the robot is writing it.
      if (response.headers.get("X-Answer-Source") === "local") {
        const answer = (await response.text()).trim();
        const thinkFor = Math.min(1800, 800 + answer.length * 2);
        await pause(thinkFor - (performance.now() - startedAt), controller.signal);
        if (reduceMotion) {
          setAnswer(answer);
          return;
        }
        for (let shown = 0; shown < answer.length; ) {
          shown = Math.min(answer.length, shown + 3);
          setAnswer(answer.slice(0, shown));
          await pause(16, controller.signal);
        }
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setAnswer(answer);
      }
      answer += decoder.decode();
      setAnswer(answer.trim() || "Sorry, I couldn't answer that. Please try asking another way.");
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        setAnswer("Sorry, I couldn't connect. Please check your connection and try again.");
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  const last = messages[messages.length - 1];
  const thinking = busy && last?.role === "assistant" && !last.content;

  return (
    <div className="fixed bottom-4 right-4 z-[99990] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Chat with Muneeza's assistant"
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[min(560px,calc(100svh-120px))] w-[calc(100vw-32px)] origin-bottom-right flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#121119] text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] sm:w-[380px]"
          >
            {/* Header */}
            <header className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6d5bd0] font-display text-sm font-bold">
                M
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#121119] bg-emerald-400" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Ask about Muneeza</p>
                <p className="text-[11px] text-white/50">AI assistant · answers instantly</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </header>

            {/* Messages */}
            <div
              ref={listRef}
              data-lenis-prevent
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
            >
              <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white/[0.06] px-3.5 py-2.5 text-[13.5px] leading-6 text-white/85">
                {GREETING}
              </div>

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => send(suggestion)}
                      className="rounded-full border border-[#b69cff]/30 px-3 py-1.5 text-left text-xs text-[#d8ccff] transition-colors hover:border-[#b69cff]/60 hover:bg-[#6d5bd0]/15"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((message, index) =>
                message.role === "user" ? (
                  <div
                    key={index}
                    className="ml-auto max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-tr-md bg-[#6d5bd0] px-3.5 py-2.5 text-[13.5px] leading-6"
                  >
                    {message.content}
                  </div>
                ) : message.content ? (
                  <div
                    key={index}
                    className="max-w-[88%] whitespace-pre-wrap break-words rounded-2xl rounded-tl-md bg-white/[0.06] px-3.5 py-2.5 text-[13.5px] leading-6 text-white/85"
                  >
                    <Linkified text={message.content} />
                  </div>
                ) : null,
              )}

              {thinking && (
                <div
                  role="status"
                  className="flex w-fit items-center gap-2.5 rounded-2xl rounded-tl-md bg-white/[0.06] px-3.5 py-2.5 text-[13px] text-white/60"
                >
                  <span aria-hidden className="flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b69cff]"
                        style={{ animationDelay: `${dot * 120}ms` }}
                      />
                    ))}
                  </span>
                  Thinking…
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2 border-t border-white/[0.08] p-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, MAX_CHARS))}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Type your question…"
                aria-label="Your question"
                className="max-h-28 min-h-[40px] flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-[13.5px] leading-5 text-white placeholder:text-white/35 focus:border-[#b69cff]/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6d5bd0] text-white transition-all hover:bg-[#7a67e0] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowUp size={17} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* One-time greeting above the robot; it hides itself after a few seconds. */}
        <AnimatePresence>
          {greeting && !open && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-full right-1 mb-1 flex w-max origin-bottom-right items-center gap-1 rounded-2xl rounded-br-md border border-white/10 bg-[#121119]/95 py-1.5 pl-3.5 pr-1.5 text-[13px] text-white shadow-[0_16px_40px_-16px_rgba(0,0,0,0.85)] backdrop-blur-sm"
            >
              <button type="button" onClick={() => toggleChat(true)} className="font-medium">
                Hi 👋 Questions? <span className="text-[#c9bcff]">Ask me!</span>
              </button>
              <button
                type="button"
                onClick={() => setGreeting(false)}
                aria-label="Dismiss"
                className="flex h-6 w-6 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => toggleChat(!open)}
          aria-label={open ? "Close chat" : "Ask about Muneeza"}
          aria-expanded={open}
          data-cursor={open ? undefined : "Chat"}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full text-white transition-transform duration-300 hover:-translate-y-1 sm:h-[84px] sm:w-[84px]"
        >
          {/* Soft violet glow behind the robot */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-2 rounded-full bg-[#6d5bd0]/35 blur-xl transition-opacity duration-300 group-hover:bg-[#6d5bd0]/55"
          />
          {/* Pulsing ring until the visitor opens the chat once */}
          {!opened && !reduceMotion && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-1.5 animate-[ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border-2 border-[#b69cff]/60"
            />
          )}
          <span className="relative h-full w-full">
            {robotReady ? (
              <ChatRobot busy={busy} open={open} waving={greeting && !open} reduceMotion={reduceMotion} />
            ) : (
              <RobotPlaceholder />
            )}
          </span>
          {open && (
            <span
              aria-hidden
              className="absolute right-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[#121119] text-white/80 sm:top-1"
            >
              <X size={12} />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
