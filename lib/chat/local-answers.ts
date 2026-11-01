import { faqs } from "@/data/faqs";
import { profile } from "@/data/profile";
import { caseStudyHref, featuredProjects, moreProjects, projects, type Project } from "@/data/projects";
import { services } from "@/data/services";
import { contactEmail, contactPhone, socials } from "@/data/socials";
import { clientWork, currentRole, internship } from "@/data/work";

// Built-in answers for the site chatbot, used when no AI key is configured or
// the AI call fails. Matches the visitor's question (English or Roman Urdu)
// against simple topics and replies in plain, conversational sentences: no
// dashes and no bullet lists, so it reads like a person, not a template.

const linkedin = socials.find((s) => s.name === "LinkedIn")?.href;
const github = socials.find((s) => s.name === "GitHub")?.href;

// Site copy uses dashes for style; in chat they read robotic, so swap them
// for plain punctuation.
function clean(text: string) {
  return text
    .replace(/(\d)\s*[–—]\s*(\d|[A-Z])/g, "$1 to $2")
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/,\s*,/g, ",")
    .trim();
}

// "a, b and c"
function joinNatural(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const lower = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

const contactSentence = `The easiest way is to email her at ${contactEmail}, or send a WhatsApp message to ${contactPhone.display} (messages only, no calls). You can also use the contact form at /#contact.`;

function describeProject(project: Project) {
  const kind = project.type === "Client work" ? "one of her client projects" : "one of her projects";
  const details = [
    `She built it with ${joinNatural(project.tech)}.`,
    project.rating ? `The client rated it ${project.rating} out of 5.` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const links = `You can try it live at ${project.liveUrl}${project.githubUrl ? `, and the code is on GitHub at ${project.githubUrl}` : ""}. The full case study, with the problem and how she solved it, is at ${caseStudyHref(project)}`;
  // Descriptions start with "A ..." / "The ...", so they read as "It's a ...".
  // Their dash introduces the features ("website — a cinematic hero, ..."),
  // which reads best in chat as "website with a cinematic hero, ...".
  const description = clean(project.description.replace(/\s*—(?!\s*from\b)\s*/g, " with "));
  return `${project.title} is ${kind}. It's ${lower(description)} ${details}\n\n${links}`;
}

// Friendly names for the services, as they'd be said in conversation.
const servicePhrases: Record<string, string> = {
  "Custom Websites": "custom websites",
  "SaaS Development": "SaaS app front ends",
  "AI Chatbots": "AI chatbots",
  "E-commerce Stores": "online stores",
  "Portfolio & Personal Brand": "portfolio and personal brand sites",
  "Landing Pages": "landing pages",
  "UI/UX Design": "UI/UX design",
  "Website Redesign": "website redesigns",
  "Performance & SEO": "speed and SEO improvements",
};

const faqAnswer = (pattern: RegExp, fallback: string) =>
  clean(faqs.find((f) => pattern.test(f.question))?.answer ?? fallback);

type Topic = { words: string[]; answer: () => string };

// Checked in order; the first topic with a matching word wins.
const topics: Topic[] = [
  {
    words: ["price", "pricing", "cost", "rate", "rates", "charge", "charges", "fee", "budget", "kitne", "kitna", "paise", "qeemat", "quote"],
    answer: () =>
      `It really depends on the project, mainly how many pages and features you need and your timeline. If you send Muneeza a short brief, she'll reply with a clear quote.\n\n${contactSentence}`,
  },
  {
    words: ["international", "abroad", "outside", "remote", "timezone", "time zone", "country", "countries", "uae", "dubai", "foreign"],
    answer: () =>
      faqAnswer(/international/i, "Yes, she works remotely with clients outside Pakistan, including the UAE.") +
      " Distance has never been a problem for her projects.",
  },
  {
    words: ["hire", "contact", "email", "whatsapp", "reach", "rabta", "number", "phone", "call", "linkedin", "message", "touch", "book", "start a project"],
    answer: () =>
      `${contactSentence}${linkedin ? ` She's on LinkedIn too: ${linkedin}` : ""}\n\nJust tell her what you need, your timeline and any websites you like, and she'll get back to you with the next steps.`,
  },
  {
    words: ["chatbot", "chat bot", "ai assistant", "ai chat", "bot"],
    answer: () =>
      "Yes, she does! She builds AI chat assistants for websites that answer your visitors' questions, guide them around and collect leads, day and night. They're designed to match your brand and answer from your own content. You're actually talking to one right now 🙂",
  },
  {
    words: ["github", "code", "repo", "repository", "source"],
    answer: () => {
      const open = projects.filter((p) => p.githubUrl).map((p) => p.title);
      return `You'll find her code on GitHub at ${github}. Projects like ${joinNatural(open)} are open source, so you can look at exactly how they're built.`;
    },
  },
  {
    words: ["service", "services", "offer", "provide", "do you do", "does she do", "what does she", "kya karti", "kya banati", "kaam karti", "help with"],
    answer: () => {
      const names = services.map((s) => servicePhrases[s.title] ?? s.title.toLowerCase());
      return `Muneeza can help with quite a lot: ${joinNatural(names)}.\n\nWhether you need a brand new site or want to improve the one you have, she'll build it around your brand so it looks great on every screen. What are you planning to build?`;
    },
  },
  {
    words: ["best", "featured", "top", "highlight", "rated", "rating", "client project", "client work", "clients"],
    answer: () => {
      const rated = featuredProjects.filter((p) => p.rating);
      const five = rated.filter((p) => p.rating === 5).map((p) => `the ${p.title}`);
      const four = rated.filter((p) => p.rating === 4).map((p) => `the ${p.title}`);
      const others = featuredProjects.filter((p) => !p.rating).map((p) => `the ${p.title}`);
      const sentences = [
        five.length ? `Her standout work right now is ${joinNatural(five)}, which the client rated 5 out of 5.` : null,
        four.length ? `${joinNatural(four).replace(/^the/, "The")} ${four.length > 1 ? "were both" : "was"} rated 4 out of 5.` : null,
        others.length ? `She's also proud of ${joinNatural(others)}, which you can explore live as well.` : null,
      ].filter(Boolean);
      return `${sentences.join(" ")}\n\nYou can see all of them with live demos at /work/demo-projects.`;
    },
  },
  {
    words: ["project", "projects", "portfolio", "work", "examples", "sample", "samples", "kaam", "dikhao", "built", "websites"],
    answer: () =>
      `Sure! Her main projects are ${joinNatural(featuredProjects.map((p) => `the ${p.title}`))}. She's also built smaller sites like ${joinNatural(moreProjects.map((p) => p.title))}.\n\nEvery project has a live demo at /work/demo-projects. Want to hear more about any of them?`,
  },
  {
    words: ["internship", "intern", "digital brains", "certificate", "certified"],
    answer: () =>
      `Yes, she interned with the ${internship.department} team at ${internship.company} for ${internship.duration}, from ${internship.start} to ${internship.end}. She was recognised for her dedication and professionalism, and she has a certificate for it (${internship.certificateNumber}).\n\nYou can read more at /work/internship.`,
  },
  {
    words: ["experience", "years", "tajurba", "background", "job", "currently", "company", "bh ventures"],
    answer: () =>
      `She has over two years of hands-on frontend experience. She completed a certified internship at ${internship.company}, and right now she works remotely as a ${currentRole.role} with ${currentRole.company} in the ${currentRole.location}, where she also built the ${lower(clientWork.project)} for their ${clientWork.role}, ${clientWork.client}.`,
  },
  {
    words: ["tech", "technology", "technologies", "stack", "skills", "skill", "react", "next", "nextjs", "tailwind", "typescript", "javascript", "language", "tools"],
    answer: () =>
      "She mostly works with React, Next.js and Tailwind CSS, along with HTML, CSS, JavaScript and Git. For smooth animations she uses Framer Motion, and for 3D experiences she's worked with Three.js too.",
  },
  {
    words: ["available", "availability", "freelance", "free for", "open to", "taking"],
    answer: () =>
      `Yes, she's ${lower(profile.availability)}. To check her schedule for your project, email her at ${contactEmail} or message her on WhatsApp at ${contactPhone.display}.`,
  },
  {
    words: ["existing", "redesign", "fix", "improve", "update my", "already have"],
    answer: () => faqAnswer(/already have/i, "Yes, she can improve an existing site."),
  },
  {
    words: ["revision", "revisions", "not happy", "unhappy", "satisfied", "changes"],
    answer: () => faqAnswer(/not happy/i, "Revisions within the agreed scope are included."),
  },
  // Broad words ("where", "who", "about") come last so specific topics win.
  {
    words: ["where", "location", "based", "city", "lahore", "pakistan", "kahan"],
    answer: () => "She's based in Lahore, Pakistan, and works remotely with clients all over the world.",
  },
  {
    words: ["who", "about", "introduce", "kaun", "muneeza", "tell me"],
    answer: () =>
      `${profile.name} is a frontend developer and UI/UX designer from Lahore, Pakistan. She builds fast, good looking websites that make a strong first impression, and right now she works remotely with ${currentRole.company} in the ${currentRole.location}.\n\nIs there something specific you'd like to know about her work?`,
  },
  {
    words: ["thank", "thanks", "shukriya", "shukria", "great", "awesome", "nice"],
    answer: () => "You're welcome! Let me know if there's anything else you'd like to know.",
  },
  {
    words: ["hi", "hello", "hey", "salam", "salaam", "assalam", "aoa", "hola"],
    answer: () => "Hi there! 👋 I can tell you about Muneeza's services, her projects, her experience or how to get in touch. What would you like to know?",
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

  return `Hmm, I'm not sure about that one. I can tell you about Muneeza's services, projects, experience or how to work with her, so feel free to ask about any of those.\n\nFor anything else, she'd be happy to help directly. ${contactSentence}`;
}
