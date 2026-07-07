export interface Skill {
  name: string;
  category: string;
  level: number; // percentage
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  logo: string;
  role: string;
  type: string;
  location: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  projectsDelivered: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  highlights: string[];
  awards?: string[];
  courses?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  
  // Details Page Info
  overview: string;
  problemStatement: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string;
  results: string;
}

export interface Certification {
  id: string;
  title: string;
  org: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  skillsEarned: string[];
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  summary: string;
  content: string; // Markdown / Text
  publishedDate: string;
  readTime: string;
  image: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: 'Award' | 'Hackathon' | 'Contribution' | 'Community' | 'Speaking';
  org: string;
  date: string;
  description: string;
  link?: string;
}

export const personalInfo = {
  name: "Suvo Dev",
  title: "Software Engineer",
  role: "Full Stack Web Developer",
  shortIntro: "Passionate Full Stack Engineer specializing in Next.js, React, Node.js, and cloud architectures. I build premium, high-performance web applications that combine exceptional engineering with human-centered, Apple-inspired minimal UI/UX design.",
  email: "suvodev.hz@gmail.com",
  phone: "+880 1700-000000",
  location: "Dhaka, Bangladesh (Available for Remote Worldwide)",
  availability: "Available for Hire / Contracts",
  linkedin: "https://linkedin.com/in/suvodev",
  github: "https://github.com/suvodev",
  portfolio: "https://suvodev.com",
  yearsOfExp: 6,
  projectsCompleted: 48,
  happyClients: 30,
  certificationsCount: 8,
};

export const skills: Skill[] = [
  // Frontend
  { name: "Next.js 15 & React 19", category: "Frontend", level: 98, icon: "Cpu" },
  { name: "TypeScript", category: "Frontend", level: 95, icon: "Code2" },
  { name: "Tailwind CSS v4", category: "Frontend", level: 96, icon: "Palette" },
  { name: "Framer Motion", category: "Frontend", level: 90, icon: "Zap" },
  { name: "Redux Toolkit / Zustand", category: "Frontend", level: 88, icon: "Database" },
  { name: "HTML5 / CSS3 / ES6+", category: "Frontend", level: 98, icon: "Layout" },

  // Backend
  { name: "Node.js & Express", category: "Backend", level: 92, icon: "Server" },
  { name: "NestJS", category: "Backend", level: 85, icon: "Shield" },
  { name: "GraphQL & REST APIs", category: "Backend", level: 90, icon: "Network" },

  // Database & Cloud
  { name: "PostgreSQL & MySQL", category: "Database", level: 88, icon: "TableProperties" },
  { name: "MongoDB & Redis", category: "Database", level: 86, icon: "DatabaseBackup" },
  { name: "AWS & Google Cloud", category: "Cloud", level: 82, icon: "Cloud" },
  { name: "Docker & CI/CD", category: "DevOps", level: 80, icon: "Terminal" },

  // CMS
  { name: "WordPress Development", category: "CMS", level: 92, icon: "Layers" },
  { name: "Shopify Development & Liquid", category: "CMS", level: 90, icon: "ShoppingBag" },

  // Design & Soft Skills
  { name: "Figma & UI/UX Design", category: "Design", level: 88, icon: "Figma" },
  { name: "Technical Leadership", category: "Soft Skills", level: 85, icon: "UserCheck" },
  { name: "Agile / Scrum", category: "Soft Skills", level: 90, icon: "Clock" },
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "PixelCraft Solutions",
    logo: "💻",
    role: "Senior Full Stack Developer",
    type: "Full-Time (Remote)",
    location: "Singapore / Remote",
    duration: "2024 - Present",
    responsibilities: [
      "Architected and engineered enterprise-grade Next.js SaaS platforms with scalable microservices backends.",
      "Led a team of 4 frontend engineers to standardize React patterns, boosting page rendering scores by 42%.",
      "Integrated secure authentication systems using Auth0 and implemented multi-tenant role-based access control.",
      "Built real-time collaboration canvas utilities using WebSockets and multi-user sync architectures."
    ],
    achievements: [
      "Reduced AWS monthly infrastructure costs by 28% through serverless optimization and advanced Edge caching strategies.",
      "Delivered a major dashboard revamp that directly improved client onboarding completion rate by 35%."
    ],
    technologies: ["Next.js 15", "TypeScript", "Tailwind v4", "NestJS", "PostgreSQL", "Docker", "AWS"],
    projectsDelivered: ["ApexSaaS Dashboard", "Enterprise Canvas Hub"]
  },
  {
    id: "exp-2",
    company: "TechApex Labs",
    logo: "🚀",
    role: "Full Stack Web Developer",
    type: "Full-Time",
    location: "Dhaka, Bangladesh",
    duration: "2022 - 2024",
    responsibilities: [
      "Developed high-performance web applications, robust e-commerce solutions, and customized Shopify Headless builds.",
      "Designed clean, RESTful APIs using Node.js/Express and integrated complex third-party webhooks (Stripe, Twilio).",
      "Optimized WordPress enterprise websites with advanced caching, custom plugin development, and security protocols."
    ],
    achievements: [
      "Awarded 'Best Innovator Award 2025' (issued early Jan 2025) for designing an automated visual CMS synchronization tool.",
      "Increased checkout conversion rates by 22% for three premium Shopify stores by building highly custom Liquid carts."
    ],
    technologies: ["React", "Shopify Hydrogen", "Node.js", "Express", "WordPress CMS", "MongoDB", "Tailwind CSS"],
    projectsDelivered: ["NovaCart E-Commerce", "WordPress Headless Engine"]
  },
  {
    id: "exp-3",
    company: "WebVibe Studio",
    logo: "🎨",
    role: "Frontend Engineer",
    type: "Contract",
    location: "Remote",
    duration: "2021 - 2022",
    responsibilities: [
      "Crafted visually stunning, interactive marketing landing pages and responsive user interfaces with Framer Motion.",
      "Collaborated closely with visual designers to implement Pixel-Perfect Apple-inspired minimal animations and transitions.",
      "Ensured full compliance with WCAG 2.2 accessibility guidelines, optimizing screen reader navigation and keyboard controls."
    ],
    achievements: [
      "Maintained a 100% Client Satisfaction score across 12 high-profile interactive project deliveries.",
      "Integrated seamless localized language translation matrices, expanding marketing outreach into 4 global territories."
    ],
    technologies: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Figma", "i18next"],
    projectsDelivered: ["Aurora Landing Page", "Interactive Brand Board"]
  },
  {
    id: "exp-4",
    company: "Freelance / Self-employed",
    logo: "🌟",
    role: "WordPress & Shopify Specialist",
    type: "Freelance",
    location: "Worldwide / Remote",
    duration: "2020 - 2021",
    responsibilities: [
      "Successfully launched custom WordPress blogs, agency websites, and Shopify merchant stores for 20+ global clients.",
      "Developed bespoke Elementor addons, custom Gutenberg blocks, and engineered tailor-made WooCommerce pipelines.",
      "Consulted local businesses on digital transformations, SEO best practices, and performance audit rectifications."
    ],
    achievements: [
      "Established a top-rated freelancing portfolio on major marketplaces with 98% five-star reviews.",
      "Helped a local food delivery startup scale to 15,000 monthly orders using a streamlined custom e-commerce setup."
    ],
    technologies: ["WordPress", "PHP", "Shopify / Liquid", "JavaScript", "CSS3", "WooCommerce", "SEO Auditing"],
    projectsDelivered: ["Veloce Blog", "Local Grocer Shop"]
  }
];

export const educationList: Education[] = [
  {
    id: "edu-1",
    institution: "United International University",
    degree: "B.Sc. in Computer Science and Engineering",
    duration: "2017 - 2021",
    location: "Dhaka, Bangladesh",
    highlights: [
      "Graduated with Summa Cum Laude honors (CGPA 3.92/4.00).",
      "Specialized in Software Engineering, Algorithms, and Advanced Web Engineering.",
      "Thesis: 'AI-Driven Automated Performance Optimizations in Hybrid Web Architectures'."
    ],
    awards: ["Academic Excellence Scholarship (Full 4-Year Tuition Waiver)", "Dean's Honor List (All Semesters)"],
    courses: ["Advanced Algorithms", "Database Management Systems", "Artificial Intelligence", "Object-Oriented Design"]
  },
  {
    id: "edu-2",
    institution: "Google, AWS, Meta & Next.js",
    degree: "Professional Courses, Bootcamps & Specializations",
    duration: "2021 - 2025",
    location: "Online Professional Learning",
    highlights: [
      "Meta Front-End Developer Professional Certificate (React, UI design, Jest, UX fundamentals).",
      "Next.js Certified Developer by Vercel.",
      "AWS Certified Developer Associate validation course.",
      "Deep Learning Specialization by DeepLearning.AI on Coursera."
    ]
  }
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "ApexSaaS Dashboard",
    description: "An enterprise-grade, high-performance SaaS Analytics Dashboard featuring complex real-time charts, multi-tenant databases, and customizable widget grids.",
    category: "Dashboard",
    image: "https://picsum.photos/seed/dashboard/800/450",
    tags: ["Next.js 15", "TypeScript", "Recharts", "PostgreSQL", "Tailwind v4"],
    githubUrl: "https://github.com/suvodev/apex-saas-dashboard",
    liveUrl: "https://apex-saas-dashboard.vercel.app",
    featured: true,
    overview: "ApexSaaS Dashboard is an executive-level performance tracking center built for modern SaaS corporations. It allows management teams to ingest raw metrics from several third-party pipelines, visualize trends on an interactive layout, customize widgets dynamically, and export executive financial summaries.",
    problemStatement: "The client suffered from highly fragmented reporting spreadsheets, sluggish page load times on large datasets (exceeding 8 seconds), and a lack of cross-device compatibility.",
    solution: "We engineered a robust Next.js application that leverages React 19's Server Components to fetch and pre-aggregate massive analytical payloads. By introducing high-end virtualized viewport grids, canvas charts, and strict debounced search inputs, the interface operates flawlessly under heavy load.",
    features: [
      "Stunning Recharts visualization suite (Area, Bar, Pie, Radar charts) with custom tooltips.",
      "Fully interactive layout with drag-and-drop widget arrangement and custom sizing.",
      "Fast data querying with Drizzle ORM and Postgres database grouping optimizations.",
      "Complete export suite: PDF reports, raw CSV sheets, and secure shareable links."
    ],
    architecture: "Next.js App Router (hybrid SSR/SSG), Drizzle ORM, AWS Aurora Serverless PostgreSQL, Redis caching layer, and Framer Motion layout animations.",
    challenges: "Handling real-time render loops of over 50,000 data nodes on canvas without CPU thrashing on low-end mobile devices.",
    results: "Page rendering speeds crashed from 8.2s down to an instantaneous 150ms. Client retention metrics grew by 35% in the first quarter."
  },
  {
    id: "proj-2",
    title: "NovaCart E-Commerce",
    description: "A premium headless e-commerce store built on Shopify API, featuring immediate cart synchronization, instant search, and ultra-high-speed Apple-inspired checkouts.",
    category: "E-commerce",
    image: "https://picsum.photos/seed/ecommerce/800/450",
    tags: ["Shopify Headless", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
    githubUrl: "https://github.com/suvodev/novacart-headless",
    liveUrl: "https://novacart-store.com",
    featured: true,
    overview: "NovaCart is an ultra-modern headless storefront that decouples the traditional Shopify backend from the frontend. It consumes Shopify's GraphQL Storefront API to orchestrate catalog management, cart logic, and checkout generation with unmatched Speed Index scores.",
    problemStatement: "A premium lifestyle brand's existing monolithic Shopify theme had poor Core Web Vitals (LCP of 5.4s), leading to a high shopping cart abandonment rate of 74%.",
    solution: "By migrating to a custom Next.js headless framework, we achieved instant page-to-page transitions via smart route prefetching, replaced blocking scripts with deferred hydration, and designed custom glassmorphic product detail visualizers.",
    features: [
      "100% headless architectural layout with lightning-fast route prefetching.",
      "Persistent cart state synced flawlessly with Shopify via custom serverless middleware.",
      "Algolia-powered dynamic catalog search with instant filtering and typo-tolerance.",
      "Custom product variant visualizers with responsive animation cards."
    ],
    architecture: "Next.js 15, GraphQL Storefront API, Tailwind CSS, Algolia Search SDK, Vercel Edge Middleware.",
    challenges: "Achieving flawless, instantaneous cart-to-checkout synchronization without relying on blocking client-side page refreshes.",
    results: "Decreased Largest Contentful Paint (LCP) from 5.4s to 0.8s. Reduced checkout abandonment by 29%, leading to a direct $180K monthly revenue increase."
  },
  {
    id: "proj-3",
    title: "MindEase AI Assistant",
    description: "An AI-powered cognitive companion app utilizing server-side Gemini API, helping users summarize long corporate sessions and categorize task milestones.",
    category: "Web Applications",
    image: "https://picsum.photos/seed/assistant/800/450",
    tags: ["Next.js", "Gemini API", "Tailwind CSS", "Zustand", "TypeScript"],
    githubUrl: "https://github.com/suvodev/mindease-ai",
    liveUrl: "https://mindease-ai.app",
    featured: true,
    overview: "MindEase AI is a custom artificial intelligence tool engineered to organize and outline raw brainstorming records. Utilizing the @google/genai SDK, the application parses conversational audio recordings or text transcripts, structures them into actionable tasks, and generates visually engaging summary slides.",
    problemStatement: "Professionals spend over 4 hours weekly transcribing, organizing, and delegating action items from disorganized team meetings.",
    solution: "Designed a clean, intuitive single-page interface centered around a robust server-side processing engine. The server leverages gemini-3.5-flash to extract action items, classify priorities, and produce well-structured markdown blueprints instantly.",
    features: [
      "Server-side prompt engineering with structured JSON schema outputs.",
      "Interactive audio visualizer to track live recording inputs directly in-app.",
      "Beautiful Markdown compiler featuring copyable code sections and visual lists.",
      "Instant integration shortcuts to sync tasks directly with Jira and Trello."
    ],
    architecture: "Next.js Route Handlers, @google/genai SDK, Tailwind CSS, Zustand client state, React Markdown.",
    challenges: "Structuring unstructured text securely to guarantee that the generative model output fits a strict database-friendly JSON array schema.",
    results: "Users reported an average savings of 3.2 hours per week on documentation. The platform successfully processed 40,000+ files with a 99.7% API success rate."
  },
  {
    id: "proj-4",
    title: "SolanaPay Gateway",
    description: "An open-source cryptocurrency payment gateway that allows merchant stores to accept high-speed, zero-fee decentralized Solana payments directly.",
    category: "Open Source",
    image: "https://picsum.photos/seed/solana/800/450",
    tags: ["React", "Solana Web3", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/suvodev/solanapay-gateway",
    liveUrl: "https://solanapay-gateway.dev",
    featured: false,
    overview: "SolanaPay Gateway is a developer-friendly library designed to integrate decentralized crypto payments into standard web platforms. It offers instant QR code builders, transaction confirmations on-chain, and automatic price conversion indices.",
    problemStatement: "Traditional payment processors take up to 3.5% transaction fees and withhold capital for up to 14 days, draining small startups.",
    solution: "By utilizing the Solana Web3 blockchain SDK, we designed a zero-fee direct-to-wallet checkout pathway that settles instantly on the mainnet, rendering third-party transaction fees obsolete.",
    features: [
      "Dynamic on-screen QR code generator for instant wallet scans.",
      "Real-time WebSocket listener that monitors the block explorer for transaction confirmation.",
      "Beautiful conversion charts tracking real-time crypto-to-fiat exchange rates."
    ],
    architecture: "React, @solana/web3.js, Tailwind CSS, CoinGecko API, WebSocket streams.",
    challenges: "Guaranteeing high-frequency block polling without memory leaks or locking up the user's browser during checkout.",
    results: "Facilitated over $400k in decentralized mainnet volume across 8 pioneer merchant platforms, with an average settlement speed of 400 milliseconds."
  },
  {
    id: "proj-5",
    title: "Veloce Blog System",
    description: "A highly customized custom-coded WordPress blog optimized for maximum search engine performance, featuring dynamic reading times, newsletter popups, and instant search.",
    category: "WordPress",
    image: "https://picsum.photos/seed/wordpress/800/450",
    tags: ["WordPress", "PHP", "Tailwind CSS", "JavaScript", "Webpack"],
    githubUrl: "https://github.com/suvodev/veloce-blog-theme",
    liveUrl: "https://veloce-blog.com",
    featured: false,
    overview: "Veloce is an optimized custom-designed block theme tailored for developer-focused blogs. Unlike standard, resource-heavy templates, Veloce loads zero bloat scripts, resulting in exceptionally responsive core metrics.",
    problemStatement: "The user's previous blog template had sluggish layout shifts, a low Google PageSpeed rating of 45 on mobile, and poor accessibility.",
    solution: "Rebuilt the entire layout using a hybrid Tailwind CSS and pure PHP approach. Introduced modern features like dark mode preferences, optimized responsive typography scales, and a self-contained local search index.",
    features: [
      "Instant, lightweight localized search that operates client-side.",
      "Elegant dark/light mode toggle that respects the operating system's prefers-color-scheme.",
      "Beautiful, responsive reading progress bar indicating active scroll heights."
    ],
    architecture: "WordPress Core, Custom PHP Theme, Tailwind CSS PostCSS compilation, local database indexes.",
    challenges: "Adapting WordPress's default Gutenberg content layout block styles to merge seamlessly with customized Tailwind utilities.",
    results: "Achieved a perfect 100/100 Mobile PageSpeed score. Organic search ranking traffic grew by 60% within 90 days."
  },
  {
    id: "proj-6",
    title: "Aurora Landing Page",
    description: "An Apple-inspired, premium product showcase page built with advanced Framer Motion transitions, responsive typographic scales, and high-contrast glassmorphism.",
    category: "Landing Pages",
    image: "https://picsum.photos/seed/aurora/800/450",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/suvodev/aurora-premium-page",
    liveUrl: "https://aurora-landing.dev",
    featured: false,
    overview: "Aurora is a single-screen premium landing page design constructed to showcase high-end virtual software products. It explores multi-layered canvas gradients, micro-interactions, responsive typography, and smooth, staggered layout introductions.",
    problemStatement: "Most modern software landing pages feel robotic, use standard flat UI templates, and fail to evoke emotional connections with premium consumers.",
    solution: "Designed a multi-layered parallax grid featuring high-contrast typography, interactive floating elements that track cursor focus, and subtle elegant page transitions.",
    features: [
      "Staggered entrance layouts with fine-tuned Framer Motion spring values.",
      "Apple-inspired glassmorphism panels that blur overlapping canvas items dynamically.",
      "Fully responsive typographic scaling designed desktop-down and mobile-up."
    ],
    architecture: "Next.js 15, Framer Motion, Tailwind CSS, TypeScript.",
    challenges: "Ensuring 60FPS physics transitions across high-DPI displays without inducing visual stuttering or lagging.",
    results: "The visual design received 3 global UI/UX showcase nominations and converted 15% of cold traffic into waitlist signups."
  }
];

export const certificationsList: Certification[] = [
  {
    id: "cert-1",
    title: "Google Cloud Certified Professional Cloud Developer",
    org: "Google Cloud",
    date: "Jan 2025",
    credentialId: "GCP-PCD-998811",
    verifyUrl: "https://google.credential.net/verify/998811",
    skillsEarned: ["Google Kubernetes Engine", "Cloud Run", "Firestore", "IAM Security", "GCP Operations"]
  },
  {
    id: "cert-2",
    title: "AWS Certified Developer – Associate",
    org: "Amazon Web Services (AWS)",
    date: "Nov 2024",
    credentialId: "AWS-CDA-443322",
    verifyUrl: "https://aws.amazon.com/verification/443322",
    skillsEarned: ["AWS Lambda", "DynamoDB", "API Gateway", "S3 Storage", "IAM Policies"]
  },
  {
    id: "cert-3",
    title: "Next.js Certified Developer",
    org: "Vercel",
    date: "Jun 2024",
    credentialId: "VRC-NJS-554411",
    verifyUrl: "https://vercel.com/certificates/verify/554411",
    skillsEarned: ["Server Components", "API Routes", "Next.js Caching", "Edge Middleware", "Static Generation"]
  },
  {
    id: "cert-4",
    title: "Meta Front-End Developer Professional Certificate",
    org: "Meta (via Coursera)",
    date: "Feb 2023",
    credentialId: "META-FED-887766",
    verifyUrl: "https://coursera.org/verify/professional-cert/META-FED-887766",
    skillsEarned: ["React.js", "TypeScript", "Advanced CSS Grid", "Jest Testing", "UX Design Foundations"]
  }
];

export const achievementsList: Achievement[] = [
  {
    id: "ach-1",
    title: "Best Innovator Award",
    category: "Award",
    org: "TechApex Labs",
    date: "Jan 2025",
    description: "Awarded annually to the engineer who demonstrates exceptional creative problem-solving. Selected out of 80+ developers for designing an automated headless sync tool."
  },
  {
    id: "ach-2",
    title: "First Runner-Up, National Smart-City Hackathon",
    category: "Hackathon",
    org: "ICT Division & BASIS",
    date: "Oct 2023",
    description: "Co-built 'SmartPulse' - an IoT and React Native dashboard that aggregates real-time air quality metrics to redirect municipal street cleaners."
  },
  {
    id: "ach-3",
    title: "Active Open-Source Contributor",
    category: "Contribution",
    org: "Next.js & Tailwind CSS",
    date: "2022 - Present",
    description: "Contributed several documentation corrections, bug fixes, and minor CSS layout patches to Next.js App Router and Tailwind CSS GitHub repositories."
  },
  {
    id: "ach-4",
    title: "Featured Speaker: Modern Front-End Workflows",
    category: "Speaking",
    org: "JS Bangladesh Meetup",
    date: "Aug 2024",
    description: "Delivered a 45-minute technical keynote about Next.js Server Components, server actions, and transition caching to an audience of over 250 local developers."
  }
];

export const blogsList: Blog[] = [
  {
    id: "blog-1",
    title: "Mastering Next.js 15: Best Practices for Server Components and App Router",
    slug: "mastering-nextjs-15-server-components",
    category: "Next.js",
    tags: ["Next.js", "React 19", "Web Development", "Programming"],
    summary: "Discover advanced techniques for optimizing Next.js 15 Server Components, mastering the fetch cache mechanism, and building lightning-fast loading screens.",
    content: `
Next.js 15 and React 19 introduce a groundbreaking paradigm shift for modern web developers. By default, all files in your App Router are **Server Components**. This means that they compile entirely on the server side, eliminating large JavaScript bundle transfers to the client browser.

In this deep-dive article, we will explore the major optimizations:

### 1. The Power of Hybrid Architecture
By pushing non-interactive layouts to Server Components, you improve Largest Contentful Paint (LCP) times tremendously. Only apply the \`'use client'\` directive to interactive components at the very leaf nodes of your tree.

### 2. Fine-Tuning the Next Cache
Next.js caching is exceptionally powerful but can be tricky. Understand the differences between Force-Cache, Revalidation Time, and dynamic routing to guarantee content freshness:
- \`fetch('https://...', { next: { revalidate: 3600 } })\` triggers incremental static regeneration.
- \`force-dynamic\` forces a fresh render on every request, perfect for active dashboard metrics.

### 3. Progressive Hydration with React Suspense
Use React \`<Suspense>\` blocks to stream components dynamically as they finish loading. Never block your entire page load because a slow database query is pending! Provide sleek skeleton states instead.
    `,
    publishedDate: "May 24, 2026",
    readTime: "6 min read",
    image: "https://picsum.photos/seed/blog-nextjs/800/450"
  },
  {
    id: "blog-2",
    title: "Transitioning to Tailwind CSS v4: Key Changes, Features, and Performance Upgrades",
    slug: "transitioning-to-tailwind-css-v4",
    category: "CSS",
    tags: ["CSS", "Tailwind CSS", "Web Development", "Productivity"],
    summary: "Learn what makes Tailwind CSS v4 the fastest utility-first framework yet, how to migrate config settings, and why CSS variables are replacing legacy javascript rules.",
    content: `
Tailwind CSS v4 introduces a complete rewrite of the compiler. By leveraging Rust underneath the hood, the compile times are up to 10x faster, making active development smooth and enjoyable.

### Key Features of Tailwind v4:
1. **Rust-Powered Engine**: Extremely fast builds. HMR is virtually instantaneous.
2. **First-Class CSS variables**: You no longer need a massive \`tailwind.config.js\` file filled with arbitrary colors. Everything is declared inside your CSS using CSS variables!
3. **Enhanced Directives**: Simply import Tailwind with \`@import \"tailwindcss\";\` and let the build engine optimize imports automatically.

### Moving Forward:
Integrating v4 with PostCSS is incredibly simple via the new \`@tailwindcss/postcss\` plugin. Try transitioning today to shave precious milliseconds off your production build pipe!
    `,
    publishedDate: "Apr 12, 2026",
    readTime: "4 min read",
    image: "https://picsum.photos/seed/blog-tailwind/800/450"
  },
  {
    id: "blog-3",
    title: "How to Build a Highly ATS-Friendly Digital Resume: A Software Engineer's Guide",
    slug: "build-ats-friendly-digital-resume",
    category: "Career",
    tags: ["Career", "Productivity", "TypeScript"],
    summary: "An in-depth manual on designing digital resumes that pass Applicant Tracking Systems (ATS) while maintaining a gorgeous interactive aesthetic for human reviewers.",
    content: `
Many modern software engineering candidates build stunning, canvas-heavy visual portfolios but fail to realize that Automated Tracking Systems (ATS) completely misinterpret these designs, leading to immediate rejection.

### The Solution: Dual-Mode Digital CVs
A professional digital resume must serve both masters:
1. **The Machine (ATS)**: Must parse raw, clean HTML text structured with semantic headings (\`h1\`, \`h2\`, \`p\`, \`ul\`, \`li\`). Avoid embedding critical achievements inside complex canvas layouts, images, or non-selectable grid grids.
2. **The Human (Recruiter)**: Demands a gorgeous, modern, interactive, and responsive theme with glassmorphic accents, subtle entrances, and a dark/light mode toggle.

### Design Principles:
- Maintain clear font weights and high contrast ratios conforming to WCAG standards.
- Always implement a dedicated **Print Mode** stylesheet. When the user hits \`Ctrl+P\` or clicking 'Print', the page should instantly transform into a clean, black-and-white, single-page or two-page classic layout.
    `,
    publishedDate: "Mar 08, 2026",
    readTime: "8 min read",
    image: "https://picsum.photos/seed/blog-ats/800/450"
  }
];
