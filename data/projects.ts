export type Project = {
  number: string;
  title: string;
  category: string;
  // Short label used by the Crafted Work filter.
  type: string;
  description: string;
  role: string;
  focus: string;
  tech: string[];
  image: string;
  liveUrl: string;
  // Only the game and the portfolio versions link their repo.
  githubUrl?: string;
  badge?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Badar ul Haq Portfolio",
    category: "Client Portfolio",
    type: "Client work",
    description:
      "A personal brand website for founder and CEO Badar ul Haq — a cinematic hero, ventures, journey and contact, designed to build trust at first glance.",
    role: "Frontend & UI/UX Development",
    focus: "Personal Branding • Motion • Responsive Design",
    tech: ["Next.js", "React", "Tailwind CSS"],
    image: "/projects/badarulhaq-portfolio.webp",
    liveUrl: "https://badarulhaq-portfolio.vercel.app",
    badge: "Client work",
    featured: true,
  },
  {
    number: "02",
    title: "BH Ventures Magazine",
    category: "Digital Magazine",
    type: "Client work",
    description:
      "A corporate magazine for BH Ventures FZE LLC — an editorial layout presenting the company's ventures and vision, designed for both screen and print.",
    role: "Frontend & UI/UX Development",
    focus: "Editorial Layout • Typography • Print-ready",
    tech: ["HTML5", "CSS3", "SVG"],
    image: "/projects/bh-ventures-magazine-cover.jpg",
    liveUrl: "https://bh-ventures-magazine.vercel.app",
    badge: "Built for BH Ventures",
    featured: true,
  },
  {
    number: "03",
    title: "Velvet & Whisk",
    category: "E-commerce Experience",
    type: "Website",
    description:
      "A refined cafe and bakery e-commerce experience featuring elegant layouts, product presentation, responsive interactions, shopping cart functionality and a smooth user journey.",
    role: "Frontend Development",
    focus: "Responsive Design • UX • Performance",
    tech: ["HTML5", "CSS3", "JavaScript (ES6)"],
    image: "/projects/velvet-whisk-hero.webp",
    liveUrl: "https://muneeza-fatima.github.io/Velvet-and-Whisk/",
  },
  {
    number: "04",
    title: "Aura Clinic",
    category: "Healthcare Website",
    type: "Website",
    description:
      "A modern healthcare interface designed for a dermatology clinic, featuring service sections, doctor information, API integration and a clean user-focused experience.",
    role: "Frontend Development",
    focus: "UI Architecture • Accessibility • Responsive Design",
    tech: ["HTML5", "CSS3", "JavaScript (ES6)"],
    image: "/projects/aura-clinic-hero.webp",
    liveUrl: "https://muneeza-fatima.github.io/Aura-Clinic/",
  },
  {
    number: "05",
    title: "Restaurant Order System",
    category: "Food Ordering Platform",
    type: "Website",
    description:
      "A responsive restaurant ordering system with dynamic food categories, interactive shopping cart functionality and a streamlined ordering experience.",
    role: "Frontend Development",
    focus: "Interactive UI • User Flow • Performance",
    tech: ["HTML5", "CSS3", "JavaScript (ES6)"],
    image: "/projects/restaurant-order-system-hero.webp",
    liveUrl: "https://muneeza-fatima.github.io/Restraunt-order-system/",
  },
  {
    number: "06",
    title: "Tic-Tac-Toe Game",
    category: "Browser Game",
    type: "Game",
    description:
      "A two-player Tic-Tac-Toe game in the browser — turn handling, win and draw detection, and a one-click reset.",
    role: "Frontend Development",
    focus: "Game Logic • DOM Interaction",
    tech: ["HTML5", "CSS3", "JavaScript (ES6)"],
    image: "/projects/tic-tac-toe.webp",
    liveUrl: "https://muneeza-fatima.github.io/Tic-Tac-Toe-Game-Project/",
    githubUrl: "https://github.com/Muneeza-Fatima/Tic-Tac-Toe-Game-Project",
  },
];

export type PortfolioVersion = {
  version: string;
  title: string;
  summary: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
};

// How my own portfolio evolved, oldest first.
export const portfolioVersions: PortfolioVersion[] = [
  {
    version: "v1",
    title: "My first portfolio",
    summary: "Where it began — HTML and CSS basics.",
    image: "/projects/portfolio-1.webp",
    liveUrl: "https://muneeza-fatima.github.io/My-portfolio-project/",
    githubUrl: "https://github.com/Muneeza-Fatima/My-portfolio-project",
  },
  {
    version: "v2",
    title: "Portfolio website",
    summary: "Cleaner sections and a real navigation.",
    image: "/projects/portfolio-2.webp",
    liveUrl: "https://muneeza-fatima.github.io/My-Portfolio-Website/",
    githubUrl: "https://github.com/Muneeza-Fatima/My-Portfolio-Website",
  },
  {
    version: "v3",
    title: "Advance portfolio",
    summary: "Motion, stats and a stronger personal brand.",
    image: "/projects/portfolio-3.webp",
    liveUrl: "https://muneeza-fatima.github.io/Advance-Portfolio/",
    githubUrl: "https://github.com/Muneeza-Fatima/Advance-Portfolio",
  },
];
