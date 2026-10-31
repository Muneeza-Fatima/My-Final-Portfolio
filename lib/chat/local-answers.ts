import { faqs } from "@/data/faqs";
import { profile } from "@/data/profile";
import { featuredProjects, moreProjects, projects, type Project } from "@/data/projects";
import { services } from "@/data/services";
import { contactEmail, contactPhone, socials } from "@/data/socials";
import { clientWork, currentRole, internship } from "@/data/work";

// Built-in answers for the site chatbot, used when no AI key is configured or
// the AI call fails. Matches the visitor's question (English or Roman Urdu)
// against simple topics and answers from the same data the pages show.

const linkedin = socials.find((s) => s.name === "LinkedIn")?.href;
const github = socials.find((s) => s.name === "GitHub")?.href;

const contactLines = [
  `- Email: ${contactEmail}`,
  `- WhatsApp (messages only): ${contactPhone.display} — ${contactPhone.whatsapp}`,
  linkedin ? `- LinkedIn: ${linkedin}` : null,
  "- Or use the contact form at the bottom of the home page (/#contact).",
]
  .filter(Boolean)
  .join("\n");

function describeProject(project: Project) {
  const lines = [
    `${project.title} — ${project.category}.`,
    project.description,
    `Tech: ${project.tech.join(", ")}.`,
    project.rating ? `Client rating: ${"★".repeat(project.rating)} (${project.rating}/5).` : null,
    `Live: ${project.liveUrl}`,
    project.githubUrl ? `Code: ${project.githubUrl}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}

type Topic = { words: string[]; answer: () => string };

// Checked in order; the first topic with a matching word wins.
const topics: Topic[] = [
  {
    words: ["price", "pricing", "cost", "rate", "rates", "charge", "charges", "fee", "budget", "kitne", "kitna", "paise", "qeemat", "quote"],
    answer: () =>
      `Pricing depends on the project — its pages, features and timeline. Send Muneeza a short brief and she'll reply with a quote:\n${contactLines}`,
  },
  {
    words: ["international", "abroad", "outside", "remote", "timezone", "time zone", "country", "countries", "uae", "dubai", "foreign"],
    answer: () => faqs.find((f) => /international/i.test(f.question))?.answer ?? "Yes, she works remotely with international clients.",
  },
  {
    words: ["hire", "contact", "email", "whatsapp", "reach", "rabta", "number", "phone", "call", "linkedin", "message", "touch", "book", "start a project"],
    answer: () => `You can reach Muneeza here:\n${contactLines}\nShare what you need, your timeline and any references you like — she'll reply with next steps.`,
  },
  {
    words: ["chatbot", "chat bot", "ai assistant", "ai chat", "bot"],
    answer: () => {
      const ai = services.find((s) => /chatbot/i.test(s.title));
      return ai
        ? `Yes — ${ai.title} is one of her services: ${ai.description} (${ai.points.join(", ")}).`
        : "Yes, she builds AI chat assistants for websites.";
    },
  },
  {
    words: ["github", "code", "repo", "repository", "source"],
    answer: () =>
      `Her code is on GitHub: ${github}\nOpen-source builds:\n${projects
        .filter((p) => p.githubUrl)
        .map((p) => `- ${p.title}: ${p.githubUrl}`)
        .join("\n")}`,
  },
  {
    words: ["service", "services", "offer", "provide", "do you do", "does she do", "what does she", "kya karti", "kya banati", "kaam karti", "help with"],
    answer: () =>
      `Muneeza offers:\n${services.map((s) => `- ${s.title} — ${s.description}`).join("\n")}\nWant help with one of these? Contact her at ${contactEmail}.`,
  },
  {
    words: ["best", "featured", "top", "highlight", "rated", "rating", "client project", "client work", "clients"],
    answer: () =>
      `Her featured work:\n${featuredProjects
        .map((p) => `- ${p.title} (${p.category})${p.rating ? ` — ${p.rating}/5 client rating` : ""}: ${p.liveUrl}`)
        .join("\n")}\nSee all of them at /work/demo-projects.`,
  },
  {
    words: ["project", "projects", "portfolio", "work", "examples", "sample", "samples", "kaam", "dikhao", "built", "websites"],
    answer: () =>
      `Featured projects:\n${featuredProjects.map((p) => `- ${p.title} — ${p.category}: ${p.liveUrl}`).join("\n")}\nMore builds:\n${moreProjects
        .map((p) => `- ${p.title} — ${p.category}: ${p.liveUrl}`)
        .join("\n")}\nDetails for every project: /work/demo-projects`,
  },
  {
    words: ["internship", "intern", "digital brains", "certificate", "certified"],
    answer: () =>
      `She completed her internship at ${internship.company} as a ${internship.role} (${internship.department} department), ${internship.start} – ${internship.end} — ${internship.duration} in total. ${internship.recognition} Certificate: ${internship.certificateNumber}. More at /work/internship.`,
  },
  {
    words: ["experience", "years", "tajurba", "background", "job", "currently", "company", "bh ventures", "uae"],
    answer: () =>
      `${faqs.find((f) => /experience/i.test(f.question))?.answer ?? ""}\nRight now she works remotely as ${currentRole.role} with ${currentRole.company} (${currentRole.location}) — including ${clientWork.project.toLowerCase()} for ${clientWork.client}, ${clientWork.role}.`.trim(),
  },
  {
    words: ["tech", "technology", "technologies", "stack", "skills", "skill", "react", "next", "nextjs", "tailwind", "typescript", "javascript", "language", "tools"],
    answer: () => faqs.find((f) => /technolog/i.test(f.question))?.answer ?? "React, Next.js and Tailwind CSS.",
  },
  {
    words: ["available", "availability", "freelance", "free for", "open to", "taking"],
    answer: () =>
      `Yes — she's ${profile.availability.toLowerCase()}. The quickest way to check her schedule is ${contactEmail} or WhatsApp ${contactPhone.display}.`,
  },
  {
    words: ["existing", "redesign", "fix", "improve", "update my", "already have"],
    answer: () => faqs.find((f) => /already have/i.test(f.question))?.answer ?? "Yes, she can improve an existing site.",
  },
  {
    words: ["revision", "revisions", "not happy", "unhappy", "satisfied", "changes"],
    answer: () => faqs.find((f) => /not happy/i.test(f.question))?.answer ?? "Revisions within the agreed scope are included.",
  },
  // Broad words ("where", "who", "about") come last so specific topics win.
  {
    words: ["where", "location", "based", "city", "lahore", "pakistan", "kahan"],
    answer: () => `Muneeza is based in Lahore, Pakistan, and works remotely with clients worldwide.`,
  },
  {
    words: ["who", "about", "introduce", "kaun", "muneeza", "tell me"],
    answer: () =>
      `${profile.name} is a frontend developer and UI/UX designer in Lahore, Pakistan. She creates responsive, accessible and visually engaging websites by combining thoughtful UI design with clean frontend development, and currently works remotely with ${currentRole.company} (${currentRole.location}).`,
  },
  {
    words: ["thank", "thanks", "shukriya", "shukria", "great", "awesome", "nice"],
    answer: () => "You're welcome! Anything else you'd like to know about Muneeza's work?",
  },
  {
    words: ["hi", "hello", "hey", "salam", "salaam", "assalam", "aoa", "hola"],
    answer: () =>
      "Hi! I can tell you about Muneeza's services, projects, experience, or how to contact her. What would you like to know?",
  },
];

const normalize = (text: string) =>
  ` ${text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim()} `;

// Whole-word match, also accepting a plural "s" ("chatbots", "websites").
const has = (text: string, word: string) =>
  text.includes(` ${word} `) || text.includes(` ${word}s `) || (word.includes(" ") && text.includes(word));

export function localAnswer(question: string) {
  const text = normalize(question);

  // A question that names a project gets that project's details; the project
  // whose title shares the most words wins ("BH Ventures magazine").
  let named: Project | null = null;
  let bestScore = 0;
  for (const project of projects) {
    const score = normalize(project.title)
      .trim()
      .split(" ")
      .filter((word) => word.length >= 3 && !["website", "portfolio", "system", "game", "the", "and"].includes(word))
      .filter((word) => has(text, word)).length;
    if (score > bestScore) {
      named = project;
      bestScore = score;
    }
  }
  if (named && !has(text, "projects")) return describeProject(named);

  for (const topic of topics) {
    if (topic.words.some((word) => has(text, word))) return topic.answer();
  }

  return `I can answer questions about Muneeza's services, projects, experience and how to work with her — try asking "What services does she offer?" For anything else, reach her directly:\n${contactLines}`;
}
