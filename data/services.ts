// Services offered — shown in the Services section and given to the site chatbot.
export type Service = {
  title: string;
  short: string;
  description: string;
  points: string[];
  tech: string[];
};

export const services: Service[] = [
  {
    title: "Custom Websites",
    short: "Websites",
    description:
      "Any kind of website you have in mind — business sites, company profiles, booking or catalogue sites — designed and built around your brief.",
    points: ["Designed around your brand", "Responsive on every screen", "Fast, clean code"],
    tech: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    title: "SaaS Development",
    short: "SaaS",
    description:
      "Front ends for SaaS products and web apps — the screens your users live in every day, connected to your backend.",
    points: ["Dashboards & data views", "Auth & onboarding flows", "Connected to your APIs"],
    tech: ["Next.js", "React", "TypeScript"],
  },
  {
    title: "AI Chatbots",
    short: "AI Chatbots",
    description:
      "AI-powered chat assistants on your website that answer visitors' questions, guide them and capture leads — around the clock.",
    points: ["Chat UI in your brand", "Answers from your content", "Lead capture built in"],
    tech: ["AI APIs", "React", "Chat UI"],
  },
  {
    title: "E-commerce Stores",
    short: "E-commerce",
    description: "Online stores that make browsing easy and buying feel effortless.",
    points: ["Product & category pages", "Cart and checkout flow", "Mobile-first shopping"],
    tech: ["React", "Next.js"],
  },
  {
    title: "Portfolio & Personal Brand",
    short: "Portfolio",
    description: "Websites that make founders, creators and professionals look credible at first glance.",
    points: ["Story-led layout", "Premium visual identity", "Clear call to action"],
    tech: ["Next.js", "Framer Motion"],
  },
  {
    title: "Landing Pages",
    short: "Landing",
    description: "Focused, fast pages for launches, campaigns and products — built to convert.",
    points: ["One clear message", "Conversion-focused layout", "Quick turnaround"],
    tech: ["Next.js", "Tailwind CSS"],
  },
  {
    title: "UI/UX Design",
    short: "UI/UX",
    description: "Interfaces people understand instantly and enjoy using.",
    points: ["Layout & visual hierarchy", "Design to code, pixel-close", "Consistent UI system"],
    tech: ["Interface design", "Prototyping"],
  },
  {
    title: "Website Redesign",
    short: "Redesign",
    description: "Turn an outdated site into one that feels current — and keep it that way.",
    points: ["Modern refresh", "Mobile issues fixed", "Ongoing support"],
    tech: ["HTML/CSS/JS", "React", "Next.js"],
  },
  {
    title: "Performance & SEO",
    short: "SEO",
    description: "Faster pages, better accessibility and a structure search engines understand.",
    points: ["Speed optimisation", "Accessibility fixes", "SEO-ready markup"],
    tech: ["Core Web Vitals", "Semantic HTML"],
  },
];
