// Single source of truth for the Work area: categories, internship,
// client work, certificates and testimonials.
// Entries marked TODO are waiting for real details.

export type Certificate = {
  id: string;
  // Only set when the number is printed on the certificate itself.
  number?: string;
  title: string;
  kind: string;
  issuer: string;
  issuerUrl: string;
  recipient: string;
  date: string;
  image: string;
  pdf: string;
  summary: string;
  chapter: "internship" | "client-work";
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  source: string;
  certificateId?: string;
};

export type WorkCategory = {
  id: "internship" | "demo-projects" | "client-work";
  number: string;
  title: string;
  label: string;
  description: string;
  href: string;
  image: string;
  proof: string;
};

export const certificates: Certificate[] = [
  {
    id: "digital-brains-internship",
    number: "DB-INT-2026-001",
    title: "Certificate of Internship Completion",
    kind: "Internship",
    issuer: "Digital Brains",
    issuerUrl: "https://digitalbrains.tech",
    recipient: "Muneeza Fatima",
    date: "4 August 2026",
    image: "/certificates/digital-brains-internship.png",
    pdf: "/certificates/digital-brains-internship.pdf",
    summary:
      "Eight-week internship in the Web Development department, 8 June – 31 July 2026.",
    chapter: "internship",
  },
  {
    id: "bh-ventures-appreciation",
    title: "Certificate of Appreciation",
    kind: "Client Work",
    issuer: "BH Ventures FZE LLC",
    issuerUrl: "https://bhventures.ae",
    recipient: "Muneeza Fatima",
    date: "12 September 2026",
    image: "/certificates/bh-ventures-appreciation.jpg",
    pdf: "/certificates/bh-ventures-appreciation.pdf",
    summary:
      "Awarded by the CEO & Founder for the design and development of his professional personal portfolio.",
    chapter: "client-work",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "badar-ul-haq",
    name: "Badar Ul Haq",
    role: "CEO & Founder",
    company: "BH Ventures FZE LLC",
    location: "UAE",
    // TODO: replace with Badar Ul Haq's own words when available.
    quote:
      "Your hard work, attention to detail, initiative, and consistent effort have made a meaningful contribution to the quality and success of this project. Your commitment to delivering an excellent final result is sincerely appreciated.",
    source: "From the Certificate of Appreciation",
    certificateId: "bh-ventures-appreciation",
  },
];

export const internship = {
  company: "Digital Brains",
  companyUrl: "https://digitalbrains.tech",
  department: "Web Development",
  role: "Web Development Intern",
  location: "DHA Phase 2, Sector R, Lahore",
  start: "8 June 2026",
  end: "31 July 2026",
  period: "Jun — Jul 2026",
  duration: "8 weeks",
  certificateId: "digital-brains-internship",
  certificateNumber: "DB-INT-2026-001",
  summary:
    "Eight weeks inside a real web development team — shipping interfaces against real deadlines, reviews and product expectations.",
  recognition:
    "Recognised for exceptional dedication, professionalism, and a strong commitment to learning, contributing meaningfully to the team and its projects.",
  // TODO: replace with the actual stack used during the internship.
  stack: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Git",
  ],
  // TODO: replace with real week-by-week milestones.
  milestones: [
    {
      phase: "Weeks 01 — 02",
      title: "Onboarding & foundations",
      text: "Team workflow, codebase conventions, version control and design-to-code standards.",
    },
    {
      phase: "Weeks 03 — 04",
      title: "Building UI components",
      text: "Responsive, reusable interface components implemented from design references.",
    },
    {
      phase: "Weeks 05 — 06",
      title: "Real project contribution",
      text: "Feature work on team projects, reviewed and refined with senior developers.",
    },
    {
      phase: "Weeks 07 — 08",
      title: "Polish & delivery",
      text: "Performance, accessibility and final delivery — closing the internship with completed work.",
    },
  ],
  outcomes: [
    { value: 8, suffix: "", label: "Weeks in a real team" },
    { value: 1, suffix: "", label: "Web Development department" },
    { value: 100, suffix: "%", label: "Program completed" },
  ],
};

export const clientWork = {
  client: "Badar Ul Haq",
  role: "CEO & Founder",
  company: "BH Ventures FZE LLC",
  industry: "Business & Ventures",
  location: "UAE",
  website: "https://bhventures.ae",
  project: "Professional personal portfolio",
  summary:
    "A premium personal portfolio for an executive founder — built to communicate credibility, vision and presence to partners and investors.",
  scope: [
    "UI design",
    "Frontend development",
    "Responsive build",
    "Launch & delivery",
  ],
  certificateId: "bh-ventures-appreciation",
};

export const workCategories: WorkCategory[] = [
  {
    id: "internship",
    number: "01",
    title: "Internship",
    label: "Foundation",
    description:
      "Eight weeks in the Web Development department at Digital Brains — real team, real deadlines, real product standards.",
    href: "/work/internship",
    image: "/projects/Internship.jpeg",
    proof: "Certified · DB-INT-2026-001",
  },
  {
    id: "demo-projects",
    number: "02",
    title: "Demo Projects",
    label: "Exploration",
    description:
      "Independent builds exploring interfaces, interaction and front-end craft — each one live and open source.",
    href: "/work/demo-projects",
    image: "/projects/demo-projects.jpeg",
    proof: "Live · Open source",
  },
  {
    id: "client-work",
    number: "03",
    title: "Client Work",
    label: "Impact",
    description:
      "A premium portfolio for the CEO & Founder of BH Ventures, UAE — delivered and formally recognised by the client.",
    href: "/work/client-work",
    image: "/projects/client-work.jpeg",
    proof: "Appreciated · BH Ventures",
  },
];

export const getCertificate = (id: string) =>
  certificates.find((certificate) => certificate.id === id);

// Where Muneeza currently works — shown in the About section.
export const currentRole = {
  company: "BH Ventures FZE LLC",
  location: "UAE",
  mode: "Remote",
  role: "Frontend & UI/UX Developer",
  website: "https://bhventures.ae",
  focus: [
    "UI/UX design",
    "React & Next.js builds",
    "Responsive, fast interfaces",
  ],
};
