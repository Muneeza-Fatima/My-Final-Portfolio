export type CaseStudy = {
  problem: string;
  solution: string;
  highlights: string[];
  result: string;
};

export type Project = {
  number: string;
  title: string;
  // URL segment of the case study page: /work/projects/{slug}
  slug: string;
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
  // Problem and solution story shown on the case study page.
  caseStudy: CaseStudy;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "BH Ventures Website",
    slug: "bh-ventures-website",
    caseStudy: {
      problem:
        "BH Ventures FZE LLC works across very different fields, from international trading to AI, Web3 and digital marketing. The client wanted a proper business website with a unique design, nothing that looked like a template, and it had to be user friendly for everyone who visits. It needed to explain all of their work clearly to partners and traders in many countries, and make a Dubai free-zone company feel established and trustworthy at first glance.",
      solution:
        "I designed the site from scratch so it has its own look, built around a cinematic video hero of Dubai and a simple story: who the company is, where it operates and what it can do. To keep it user friendly, I grouped the services into six clear capability areas so visitors aren't overwhelmed, kept the navigation short and made every page work smoothly on phones. A global reach section shows the markets they work in, and a language switcher, quick WhatsApp and Telegram contact and a built in AI assistant make it easy for international visitors to get in touch.",
      highlights: [
        "Unique, custom design made from scratch, not a template",
        "Cinematic video hero that sets a premium first impression",
        "User friendly layout: six clear capability areas and short navigation",
        "Language switcher, WhatsApp and Telegram contact, and an AI assistant",
      ],
      result:
        "The client rated the website 5 out of 5. BH Ventures now has one clear, modern home online that it can share with partners and traders across its markets.",
    },
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
    slug: "badar-ul-haq-portfolio",
    caseStudy: {
      problem:
        "Badar ul Haq, founder and CEO of BH Ventures, has experience across cyber security, AI, real estate and business development, but there was no single place online that told that story. Partners and investors meeting him for the first time needed to understand who he is and what he builds within a few seconds.",
      solution:
        "I designed a personal brand website with a cinematic hero and a clear flow: his way of thinking, his areas of expertise, his career experience, the ventures he leads and a simple way to start a conversation. Short sections and strong typography keep a lot of experience easy to read, and the layout works smoothly on every screen.",
      highlights: [
        "Story led layout, from his philosophy to his ventures",
        "Expertise and experience as clear, easy to scan sections",
        "Premium visual identity that matches his ventures",
        "One clear call to action: start a conversation",
      ],
      result:
        "The client rated it 4 out of 5 and gave me a Certificate of Appreciation for the design and development of his professional portfolio.",
    },
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
    title: "Velvet & Whisk",
    slug: "velvet-and-whisk",
    caseStudy: {
      problem:
        "A small bakery and café needs more than a photo of its menu. Customers want to browse cakes, cupcakes and pastries, see what each one looks like, build their order and send it without having to call the shop.",
      solution:
        "I built an online store with a warm, refined café look and a menu of 50 items that customers can filter by category. The heart of it is the shopping cart, which I call the Order Tray. Tapping \"Add to Order Tray\" slides the cart open, and adding the same item again raises its quantity instead of creating a duplicate line. Each line shows the price times the quantity with a Remove button, while the item count and the total price update instantly. At checkout, the customer enters their name and phone number, and the order is emailed straight to the bakery through EmailJS with its own 6 digit order ID. Empty carts can't be checked out, and the cart clears itself once the order is sent.",
      highlights: [
        "Slide out Order Tray cart that opens as you add items",
        "Smart quantities: adding an item again raises its count",
        "Live item count and running total, with one click Remove",
        "Checkout that emails the order to the bakery with a 6 digit order ID",
      ],
      result:
        "A complete ordering flow, from browsing to a real order in the bakery's inbox, built without any framework. It strengthened my core HTML, CSS and JavaScript skills, especially managing cart state.",
    },
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
    featured: true,
  },
  {
    number: "04",
    title: "BH Ventures Magazine",
    slug: "bh-ventures-magazine",
    caseStudy: {
      problem:
        "BH Ventures wanted to present the company, its ten business disciplines and the markets it works in as a polished corporate magazine. It had to feel premium on screen and also print well, so it could be handed to partners.",
      solution:
        "I designed it as an editorial magazine, Edition 01, with a cover, a contents page and chapters on who they are, where they operate, their ten disciplines, the people behind the vision and their plans for growth. I built it with HTML, CSS and SVG so every page stays sharp on any screen and prints cleanly.",
      highlights: [
        "Magazine style editorial layout with a contents page",
        "Ten business disciplines presented as consistent spreads",
        "SVG graphics that stay crisp on screen and in print",
        "Designed for both reading online and printing",
      ],
      result:
        "The client rated it 4 out of 5, and BH Ventures now has a professional company magazine to share with partners.",
    },
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
    number: "05",
    title: "3D Apartment Tour",
    slug: "3d-apartment-tour",
    caseStudy: {
      problem:
        "Buying a luxury apartment usually starts with a few flat photos and a floor plan PDF. It's hard for a buyer to feel the space, understand the layout or picture the view before visiting in person.",
      solution:
        "I built a scroll driven 3D walkthrough of Apartment 1204 at The Residence in Downtown Dubai. As you scroll, you move through seven spaces in the order you would walk them: the arrival, the lobby, the corridor on Floor 12 and every room up to the skyline balcony. The floor plan, finishes, amenities and location follow, with an enquiry form at the end.",
      highlights: [
        "Three.js scene that moves as you scroll",
        "GSAP and Lenis for smooth, cinematic motion",
        "Seven spaces shown in their real walking order",
        "Floor plan, finishes, amenities and enquiry in one flow",
      ],
      result:
        "A concept project that shows how a developer could let buyers explore a property from home, and how 3D can run smoothly inside a normal website.",
    },
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
    number: "06",
    title: "Aura Clinic",
    slug: "aura-clinic",
    caseStudy: {
      problem:
        "Clinic websites often feel either cold or confusing, with treatments buried in long pages. A premium dermatology clinic needs to look trustworthy and luxurious while making it easy to understand the treatments and book a consultation.",
      solution:
        "I designed a dark, luxury interface for Aura. Treatments are grouped into clear programs such as acne care, laser solutions and skin resurfacing, and each one explains what it involves and how much recovery time it needs. Doctor information, clinical results and a consultation booking section guide visitors from first interest to an appointment, with data loaded through an API integration.",
      highlights: [
        "Treatments grouped into clear programs",
        "Recovery time details for each program",
        "Doctor information and clinical results",
        "Consultation booking section with API integration",
      ],
      result:
        "A polished healthcare interface that balances luxury branding with clear, easy to find information.",
    },
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
    slug: "restaurant-order-system",
    caseStudy: {
      problem:
        "Ordering food online should be quick, but many small restaurant sites make customers scroll through long menus or call to place an order.",
      solution:
        "I built FoodHub, an ordering system where dishes like burgers, pizza, pasta and shawarma are shown as clear cards in food categories. Customers add items to the cart and see the total update instantly, and they can reach the restaurant through the contact section.",
      highlights: [
        "Menu shown as clear food cards",
        "Dynamic food categories",
        "Cart with a live running total",
        "Simple, responsive ordering flow",
      ],
      result:
        "A working ordering flow built with plain JavaScript, focused on keeping the path from choosing food to ordering it as short as possible.",
    },
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
    slug: "tic-tac-toe",
    caseStudy: {
      problem:
        "A classic game looks simple, but it's a real test of logic: handling turns correctly, checking every winning line and spotting a draw without any bugs.",
      solution:
        "I built a two player Tic-Tac-Toe game that runs in the browser. It keeps track of whose turn it is, checks all eight winning lines after every move, detects a draw when the board is full and resets with one click.",
      highlights: [
        "Turn handling for two players",
        "Win detection across all eight lines",
        "Draw detection when the board is full",
        "One click reset",
      ],
      result:
        "One of my first JavaScript projects and the base for the interactive work in my later builds. The full code is open on GitHub.",
    },
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

export const caseStudyHref = (project: Pick<Project, "slug">) => `/work/projects/${project.slug}`;
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

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
