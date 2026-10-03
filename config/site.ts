// Public URL of the site. Set NEXT_PUBLIC_SITE_URL to your custom domain;
// on Vercel it falls back to the project's production URL automatically.
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Muneeza Fatima",

  title: "Muneeza Fatima | Frontend Developer & UI/UX Designer",

  description:
    "Muneeza Fatima is a frontend developer and UI/UX designer in Lahore, Pakistan, building premium websites, SaaS front ends and AI chatbot experiences with React and Next.js for international clients.",

  url: resolveSiteUrl(),

  locale: "en_US",

  location: "Lahore, Pakistan",

  keywords: [
    "Muneeza Fatima",
    "Frontend Developer",
    "UI/UX Designer",
    "React Developer",
    "Next.js Developer",
    "Freelance Web Developer Pakistan",
    "Website Development",
    "SaaS Frontend Development",
    "AI Chatbot Integration",
    "Portfolio Website Design",
    "Tailwind CSS",
    "Framer Motion",
  ],

  author: {
    name: "Muneeza Fatima",
    jobTitle: "Frontend & UI/UX Developer",
  },
};
