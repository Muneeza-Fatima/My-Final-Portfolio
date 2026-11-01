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
  // Only the open-source builds link their repo.
  githubUrl?: string;
  badge?: string;
  // Client rating out of 5, shown as stars.
  rating?: number;
  // Featured projects get the full-screen sticky stack; the rest sit in the
  // compact grid below it.
  featured?: boolean;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "BH Ventures Website",
    category: "Corporate Website",
    type: "Client work",
    description:
      "The corporate website for BH Ventures FZE LLC, a Dubai free-zone venture platform — a cinematic video hero, ventures and services, multi-language support and an AI assistant.",
    role: "Frontend & UI/UX Development",
    focus: "Corporate Branding • Motion • Multi-language",
    tech: ["Next.js", "React", "Tailwind CSS"],
    image: "/projects/bh-ventures-website.webp",
    liveUrl: "https://bh-ventures-demo-muneeza1.vercel.app",
    badge: "Client work",
    rating: 5,
    featured: true,
  },
  {
    number: "02",
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
    rating: 4,
    featured: true,
  },
  {
    number: "03",
    title: "BH Ventures Magazine",
    category: "Digital Magazine",
    type: "Client work",
    description:
      "A corporate magazine for BH Ventures FZE LLC — an editorial layout presenting the company's ventures and vision, designed for both screen and print.",
    role: "Frontend & UI/UX Development",
    focus: "Editorial Layout • Typography • Print-ready",
    tech: ["HTML5", "CSS3", "SVG"],
    image: "/projects/bh-ventures-magazine-cover.webp",
    liveUrl: "https://bh-ventures-magazine.vercel.app",
    badge: "Built for BH Ventures",
    rating: 4,
    featured: true,
  },
  {
    number: "04",
    title: "3D Apartment Tour",
    category: "3D Property Experience",
    type: "3D / WebGL",
    description:
      "A scroll-driven 3D walkthrough of a luxury apartment in Downtown Dubai — from the tower's entrance to its skyline balcony, with floor plan, amenities and location.",
    role: "Frontend & 3D Development",
    focus: "WebGL • Scroll Storytelling • Motion",
    tech: ["Next.js", "Three.js", "GSAP", "Lenis", "Tailwind CSS"],
    image: "/projects/apartment-tour.webp",
    liveUrl: "https://3-d-apartment-tour.vercel.app",
    badge: "Concept build",
    featured: true,
  },
  {
    number: "05",
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
    githubUrl: "https://github.com/Muneeza-Fatima/Velvet-and-Whisk",
  },
  {
    number: "06",
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
    githubUrl: "https://github.com/Muneeza-Fatima/Aura-Clinic",
  },
  {
    number: "07",
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
    githubUrl: "https://github.com/Muneeza-Fatima/Restraunt-order-system",
  },
  {
    number: "08",
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

export const featuredProjects = projects.filter((project) => project.featured);
export const moreProjects = projects.filter((project) => !project.featured);

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
