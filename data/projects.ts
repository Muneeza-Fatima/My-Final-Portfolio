export type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  role: string;
  focus: string;
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Velvet & Whisk",
    category: "E-commerce Experience",
    description:
      "A refined cafe and bakery e-commerce experience featuring elegant layouts, product presentation, responsive interactions, shopping cart functionality and a smooth user journey.",
    role: "Frontend Development",
    focus: "Responsive Design • UX • Performance",
    tech: ["HTML5", "CSS3", "JavaScript (ES6)"],
    image: "/projects/velvet-whisk.webp",
    liveUrl: "https://muneeza-fatima.github.io/Velvet-and-Whisk/",
    githubUrl: "https://github.com/Muneeza-Fatima/Velvet-and-Whisk",
  },

  {
    number: "02",
    title: "Aura Clinic",
    category: "Healthcare Website",
    description:
      "A modern healthcare interface designed for a dermatology clinic, featuring service sections, doctor information, API integration and a clean user-focused experience.",
    role: "Frontend Development",
    focus: "UI Architecture • Accessibility • Responsive Design",
    tech: ["HTML5", "CSS3", "JavaScript (ES6)"],
    image: "/projects/aura-clinic.webp",
    liveUrl: "https://muneeza-fatima.github.io/Aura-Clinic/",
    githubUrl: "https://github.com/Muneeza-Fatima/Aura-Clinic",
  },

  {
    number: "03",
    title: "Restaurant Order System",
    category: "Food Ordering Platform",
    description:
      "A responsive restaurant ordering system with dynamic food categories, interactive shopping cart functionality and a streamlined ordering experience.",
    role: "Frontend Development",
    focus: "Interactive UI • User Flow • Performance",
    tech: ["HTML5", "CSS3", "JavaScript (ES6)"],
    image: "/projects/restaurant-order-system.webp",
    liveUrl: "https://muneeza-fatima.github.io/Restraunt-order-system/",
    githubUrl: "https://github.com/Muneeza-Fatima/Restraunt-order-system",
  },
];
