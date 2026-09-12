export const PORTFOLIO_DATA = {
  greeting: "Hello, I'm",
  name: "Bryan Tapel",
  title: "Creative Fullstack Developer & Designer",
  bibleVerse: {
    reference: "John 3:16",
    text: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
  },
  bio: "Creative Fullstack Developer & Designer who transforms ideas into polished, user-centered digital products—combining intuitive design, engaging interfaces, and scalable technology from concept to launch.",
  availability: "Available for select freelance & full-time roles",
  stats: [
    { label: "Years Experience", value: "6+" },
    { label: "Projects Shipped", value: "40+" },
    { label: "Client Satisfaction", value: "100%" },
  ],
  skills: [
    "Javascript",
    "React / Vite",
    "HTML & CSS",
    "Tailwind CSS",
    "Figma & Design Systems",
    "Concepts",
    "ChatGPT, Gemini, Google AI Studio & AI Tools",
    "VSCode & Antigravity IDE",
    "Railway",
    "Render , Vercel, GitHub",
    "PostgreSQL & MySQL",
    "Python & Django",
    "PHP & Laravel",
    "UI/UX Architecture",
    "Node.js",
  ],
  featuredProjects: [
    {
      id: "p1",
      title: "Rivan Shop",
      category: "Fullstack Application",
      year: "2026",
      description:
        "A modern, responsive web shop template designed to showcase products and make browsing easy. Its clean layout and customizable design provide a flexible starting point for your online store.",
      tags: [
        "Railway",
        "Django",
        "React Vite",
        "Javascript",
        "Tailwind CSS",
        "ChatGPT",
      ],
    },
    {
      id: "p2",
      title: "Personal Dashboard",
      category: "Dashboard",
      year: "2026",
      description:
        "A modern, responsive personal dashboard template designed to help users manage and visualize their personal data and tasks. Its clean layout and customizable design provide a flexible starting point for your personal productivity needs.",
      tags: [
        "Pinterest",
        "Prompt AI ChatGPT",
        "Google AI Studio Gemini",
        "Vite",
        "Tailwind CSS",
      ],
    },
    {
      id: "p3",
      title: "Acer Predator Laptop",
      category: "Web Design",
      year: "2026",
      description:
        "AI design system with scrollable animation and interactive components for a seamless user experience.",
      tags: ["ChatGPT", "Pinterest", "Google FLow AI", "EZGIF"],
    },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/dayan11776" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/bryan-tapel-876271198/",
    },
  ],
};

// Image assets generated for the portfolio
import bryanHeroPortrait from "../assets/images/Me.png";
import bryanAboutPortrait from "../assets/images/AboutSectionImage.jpg";
import MyShop from "../assets/images/MyShop.png";
import PersonalDashboard from "../assets/images/PersonalDashboard.png";
import Acer from "../assets/images/Acer.png";
import { col } from "motion/react-client";

export const HERO_IMAGES = {
  portrait: bryanHeroPortrait,
  aboutPortrait: bryanAboutPortrait,
  MyShop: MyShop,
  PersonalDashboard: PersonalDashboard,
  Acer: Acer,
};

export const ABOUT_DATA = {
  badge: "ABOUT ME",
  headline: "Building complete web experiences from frontend to backend.",
  bioParagraph1:
    "I build complete web experiences that connect thoughtful design with reliable, scalable technology. From responsive interfaces to secure backend systems, I turn ideas into products that are fast, intuitive, and ready to grow.",
  bioParagraph2:
    "I also use AI tools to speed up ideation, create smarter features, and improve development workflows. Combined with clean code and practical problem-solving, this helps me deliver polished digital products from concept to deployment.",
  highlights: [
    {
      id: "exp",
      title: "3+ Years",
      subtitle: "Experience",
      description:
        "Full-Stack Web Developer experienced in building responsive, scalable web applications from frontend interfaces to backend APIs and databases.",
      icon: "Clock",
      accent: "purple",
    },
    // {
    //   id: "projects",
    //   title: "40+ Projects",
    //   subtitle: "Delivered",
    //   description:
    //     "Shipped web apps, interactive platforms, and modular component systems.",
    //   icon: "Briefcase",
    //   accent: "blue",
    // },
    {
      id: "specialties",
      title: "Core Stack",
      subtitle: "Specialties",
      description:
        "frontend to backend Architecture, UI/UX Systems, AI Tool, Django, Databases.",
      icon: "Layers",
      accent: "indigo",
    },
  ],
};

export const SKILLS_SERVICES_DATA = {
  badge: "WHAT I DO",
  heading: "Skills & Services",
  subtitle:
    "Blending modern technical architecture with human-centered product craft to ship high-performing software.",
  coreSkills: [
    {
      id: "uiux",
      name: "UI/UX Design",
      percentage: 85,
      level: "Mastery",
      tools: ["Figma", "Concepts"],
      accentColor: "from-blue-500 to-indigo-500",
    },
    {
      id: "webdev",
      name: "Web Development",
      percentage: 90,
      level: "Advanced",
      tools: ["React / Vite", "Tailwind CSS", "Node.js", "HTML & CSS"],
      accentColor: "from-indigo-500 to-purple-500",
    },
    {
      id: "backend",
      name: "Back-End Development",
      percentage: 85,
      level: "Mastery",
      tools: [
        "Node.js / Express",
        "PostgreSQL / SQL",
        "REST & APIs",
        "Django, Laravel",
      ],
      accentColor: "from-purple-500 to-pink-500",
    },
    {
      id: "problem_solving",
      name: "Problem Solving & Architecture",
      percentage: 85,
      level: "Mastery",
      tools: ["ChatGPT", "Accessibility"],
      accentColor: "from-blue-400 to-purple-500",
    },
    {
      id: "Prompt AI",
      name: "AI Tools",
      percentage: 80,
      level: "Mastery",
      tools: ["ChatGPT", "Gemini", "Google AI Studio & AI Tools"],
      accentColor: "from-indigo-400 to-pink-500",
    },
  ],
  services: [
    {
      id: "web_design",
      title: "Web Design",
      icon: "Layout",
      description:
        "Crafting bespoke, responsive, and visually magnetic website layouts tailored for conversion, storytelling, and high brand prestige.",
      deliverables: [
        "Responsive Layouts",
        "Interactive Prototypes",
        "Wireframing",
      ],
    },
    {
      id: "frontend_dev",
      title: "Front-End Development",
      icon: "Code2",
      description:
        "Develop responsive web interfaces using React, Vite, and Tailwind CSS, with reusable components, interactive features, and consistent layouts across desktop and mobile devices.",
      deliverables: [
        "React / Javascript Development",
        "Tailwind & CSS Architecture",
        "API Integration",
        "HTML & CSS",
      ],
    },
    {
      id: "ui_ux_design",
      title: "UI/UX Design",
      icon: "Compass",
      description:
        "Designing intuitive user journeys, high-density dashboard workflows, and scalable design token systems focused on user delight.",
      deliverables: [
        "User Journey Mapping",
        "Design Systems",
        "Usability Testing",
      ],
    },
    {
      id: "backend_dev",
      title: "Back-End Development",
      icon: "Server",
      description:
        "Architecting reliable server-side services, scalable REST/GraphQL APIs, secure authentication, and database schemas with optimal performance.",
      deliverables: ["REST & APIs", "Database Schemas", "Cloud Deployment"],
    },
  ],
};

export const FEATURED_PROJECTS_SECTION_DATA = {
  badge: "SELECTED WORK",
  heading: "Featured Personal Projects",
  subtitle:
    "A curated selection of engineering experiments, interactive spatial platforms, and modular product ecosystems.",
  categories: ["All", "Web Design", "E-commerce", "Dashboard"] as const,
  projects: [
    {
      id: "rivan-shop",
      title: "Rivan Shop",
      subtitle:
        "Bring your products to life with a modern, easy-to-use online store template.",
      category: "E-commerce" as const,
      year: "2026",
      description:
        "A modern, responsive web shop template designed to showcase products and make browsing easy. Its clean layout and customizable design provide a flexible starting point for your online store.",
      image: MyShop,
      tags: [
        "Railway",
        "Django",
        "React Vite",
        "Javascript",
        "Tailwind CSS",
        "ChatGPT",
      ],
      featured: true,
      link: "https://fs9-coral.vercel.app/",
      github: "https://github.com/dayan11776/fs9_training",
      colSpan: 2, // This project spans 2 columns in the grid
    },
    {
      id: "personal-dashboard",
      title: "Personal Dashboard",
      subtitle:
        "A centralized hub for managing and visualizing your personal data and tasks.",
      category: "Dashboard" as const,
      year: "2026",
      description:
        "A modern, responsive personal dashboard template designed to help users manage and visualize their personal data and tasks. Its clean layout and customizable design provide a flexible starting point for your personal productivity needs.",
      image: PersonalDashboard,
      tags: [
        "Pinterest",
        "Prompt AI ChatGPT",
        "Google AI Studio Gemini",
        "Vite",
        "Tailwind CSS",
      ],
      featured: true,
      link: "https://productivity-dashboard-liard.vercel.app/",
      github: "https://github.com/dayan11776/Productivity-Dashboard",
      colSpan: 1, // This project spans 2 columns in the grid
    },
    {
      id: "Acer Predator Laptop",
      title: "Scrollable Animation Design System",
      subtitle: "An Scrollable Animation Design System for AI tools.",
      category: "Web Design" as const,
      year: "2026",
      description:
        "AI design system with scrollable animation and interactive components for a seamless user experience.",
      image: Acer,
      tags: ["ChatGPT", "Pinterest", "Google FLow AI", "EZGIF"],
      featured: false,
      link: "https://scrollable-animation-laptop.vercel.app/",
      github: "https://github.com/dayan11776/Scrollable-animation-Laptop",
      colSpan: 1, // This project spans 1 column in the grid
    },
  ],
};

export const CONTACT_SECTION_DATA = {
  badge: "GET IN TOUCH",
  heading: "Let’s Create Something Great Together.",
  subtitle:
    "Have a project in mind, a potential collaboration, or simply want to connect? Send a message and let's bring your vision to life.",
  email: "bryantapel619@gmail.com",
  phone: "09380825335",
  location: "Bacoor Cavite, Philippines",
  socials: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/bryan-tapel-876271198/",
      handle: "https://www.linkedin.com/in/bryan-tapel-876271198/",
      icon: "Linkedin",
    },
    {
      name: "GitHub",
      url: "https://github.com/dayan11776",
      handle: "https://github.com/dayan11776",
      icon: "Github",
    },
  ],
};
