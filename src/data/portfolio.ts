export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  cat: string;
  img: string;
  desc: string;
  highlights: string[];
  tags: string[];
}

export interface DisciplineItem {
  index: number;
  num: string;
  tag: string;
  title: string;
  desc: string;
  text: string;
  stack: string[];
}

export interface LabTabItem {
  stepNum: string;
  tabLabel: string;
  title: string;
  text: string;
}

export interface ChapterItem {
  id: string;
  num: string;
  label: string;
  selector: string;
}

export interface MenuLinkItem {
  num: string;
  labelLead: string;
  labelAccent: string;
  target: string;
}

export interface SpecRowItem {
  key: string;
  value: string;
  isClock?: boolean;
}

export interface StatItem {
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
  initialText: string;
  desc: string;
  offsetTop?: boolean;
}

export interface TimelineItem {
  id: string;
  year: string;
  role: string;
  title: string;
  desc: string;
  reverse?: boolean;
}

export type OledMood = "curious" | "poke" | "listen" | "happy";

export const CONTACT_EMAIL = "itx.iftekhars@gmail.com";

export const HERO_META = {
  greeting: "HI THERE — DHAKA, BANGLADESH",
  pitch:
    "I build interactive web experiences, AI workflows, and hardware prototypes that refuse to feel ordinary.",
  monolithImg: "/images/hero-monolith.jpg",
  monolithAlt:
    "Editorial studio portrait of MD Iftekhar Ferdous in obsidian and vermilion lighting",
  subCaption:
    "MD IFTEKHAR FERDOUS · CO-FOUNDER & CTO, AMAREVENTS · BUILDER",
  scrollCueLabel: "SCROLL TO EXPLORE",
};

export const ABOUT_META = {
  indexLabel: "02 / ABOUT",
  visualImg: "/images/about-sculpture.jpg",
  visualAlt:
    "Editorial studio portrait of MD Iftekhar Ferdous wearing glasses in obsidian and vermilion lighting",
  captionLeft: "DHAKA COLLEGE · HSC '28",
  captionRight: "ROLL 189 · SCI-B",
};

export const CHAPTERS: ChapterItem[] = [
  { id: "sec-hero", num: "01", label: "01 HOME", selector: "#sec-hero" },
  { id: "sec-about", num: "02", label: "02 ABOUT", selector: "#sec-about" },
  {
    id: "sec-manifesto",
    num: "03",
    label: "03 ETHOS",
    selector: "#sec-manifesto",
  },
  {
    id: "sec-journey",
    num: "04",
    label: "04 JOURNEY",
    selector: "#sec-journey",
  },
  { id: "sec-craft", num: "05", label: "05 CRAFT", selector: "#sec-craft" },
  { id: "sec-work", num: "06", label: "06 WORK", selector: "#sec-work" },
  { id: "sec-lab", num: "07", label: "07 LAB", selector: "#sec-lab" },
  {
    id: "sec-contact",
    num: "08",
    label: "08 CONTACT",
    selector: "#sec-contact",
  },
];

export const MENU_LINKS: MenuLinkItem[] = [
  { num: "01", labelLead: "Home", labelAccent: "Stage", target: "#sec-hero" },
  {
    num: "02",
    labelLead: "About",
    labelAccent: "Profile",
    target: "#sec-about",
  },
  {
    num: "03",
    labelLead: "The",
    labelAccent: "Journey",
    target: "#sec-journey",
  },
  {
    num: "04",
    labelLead: "Selected",
    labelAccent: "Work",
    target: "#sec-work",
  },
  {
    num: "05",
    labelLead: "Hardware",
    labelAccent: "Lab",
    target: "#sec-lab",
  },
  {
    num: "06",
    labelLead: "Get in",
    labelAccent: "Touch",
    target: "#sec-contact",
  },
];

export const SPEC_ROWS: SpecRowItem[] = [
  {
    key: "Disciplines",
    value: "Interactive Web, AI Automation & Embedded Hardware",
  },
  {
    key: "Academic Base",
    value: "Dhaka College · Class XI Science-B",
  },
  {
    key: "AmarEvents",
    value: "Co-Founder & CTO",
  },
  {
    key: "CareQuest",
    value: "IT & Media Creative (Present)",
  },
  {
    key: "Dhaka College",
    value: "Section Rep (DCSC) · IT Associate (DCICC)",
  },
  {
    key: "Timezone",
    value: "DHK --:--:--",
    isClock: true,
  },
  {
    key: "Availability",
    value: "Open for Select Builds & Olympiads",
  },
];

export const MANIFESTO_WORDS: { text: string; accent?: boolean }[] = [
  { text: "I" },
  { text: "BUILD" },
  { text: "PRODUCTS" },
  { text: "THAT" },
  { text: "TURN" },
  { text: "HEADS" },
  { text: "—" },
  { text: "IN", accent: true },
  { text: "CODE", accent: true },
  { text: "AND", accent: true },
  { text: "HARDWARE" },
];

export const BECAUSE_PARAGRAPHS = [
  "I'm MD Iftekhar Ferdous — Co-Founder & CTO at AmarEvents, IT & Media Creative at CareQuest Foundation, IT Associate at DCICC, and Section Representative at Dhaka College Science Club.",
  "Whether crafting a bilingual humanitarian site, directing a 3D WebGL club experience, or wiring an ESP32-S3 desk robot on an open breadboard, I care about one standard: every interaction should feel intentional and alive.",
];

export const STATS: StatItem[] = [
  {
    label: "HSC BATCH · DHAKA COLLEGE",
    target: 2028,
    prefix: "'",
    initialText: "2028",
    desc: "Science Section B, Roll 189 — balancing physics, math, ICT, and live software shipping.",
  },
  {
    label: "SHIPPED BUILDS & LABS",
    target: 5,
    suffix: "+",
    initialText: "5+",
    desc: "Web apps, 3D scroll worlds, startup architectures, and microcontroller prototypes.",
    offsetTop: true,
  },
  {
    label: "THE RENAISSANCE 2026",
    target: 54,
    initialText: "54",
    desc: "Festival segments supported as IT Director (completed Oct 2026) through partner documentation and club design direction.",
  },
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: "draxy-gaming-2023",
    year: "2023",
    role: "YOUTUBE CREATOR · 11K SUBS",
    title: "Draxy Gaming",
    desc: "Built and grew the Draxy Gaming YouTube channel to 11k subs through consistent gaming content production, video editing, and audience storytelling.",
  },
  {
    id: "amarevents-2026",
    year: "JAN / MAR '26",
    role: "CO-FOUNDER (JAN 2026) · CTO (MARCH 2026)",
    title: "AmarEvents",
    desc: "Co-founded AmarEvents in January 2026 and stepped into the CTO role in March 2026, leading product architecture, event-tech systems, and technical execution.",
    reverse: true,
  },
  {
    id: "cravely-2026",
    year: "MAY 26, '26",
    role: "MAY 26, 2026 · FOUNDER",
    title: "Cravely",
    desc: "Founded Cravely on May 26, 2026 and architected a single-handed local restaurant discovery platform for live menus, limited-time offers, and phased seat pre-booking.",
  },
  {
    id: "admitted-dc-2026",
    year: "SEPT 24, '26",
    role: "SEPT 24, 2026 · HSC '28",
    title: "Admitted to DC (Dhaka College)",
    desc: "Admitted to Dhaka College (DC) on September 24, 2026 in Science Section B (Roll 189), beginning HSC '28 alongside active software and hardware shipping.",
    reverse: true,
  },
  {
    id: "dcsc-sr-2026",
    year: "OCT 10, '26",
    role: "OCT 10, 2026 · DCSC SR",
    title: "DCSC — Section Representative",
    desc: "Appointed Section Representative (SR) for the Dhaka College Science Club (DCSC) on October 10, 2026, coordinating section-level science initiatives and student outreach.",
  },
  {
    id: "dcicc-2026",
    year: "OCT 13, '26",
    role: "OCT 13, 2026 · IT ASSOCIATE (PRESENT)",
    title: "DCICC — IT Associate (Present)",
    desc: 'Joined Dhaka College Islamic Cultural Club (DCICC) as IT Associate (present) on October 13, 2026, directing the "Noor-al-Mi\'mar" 3D WebGL web experience and design system.',
    reverse: true,
  },
  {
    id: "renaissance-2026",
    year: "OCT 23, '26",
    role: "OCT 23, 2026 · IT DIRECTOR (END)",
    title: "Renaissance — IT Director (End)",
    desc: "Completed term as IT Director (end) for The Renaissance 2026 on October 23, 2026, delivering partner-facing digital systems and technical direction across 54 festival segments.",
  },
  {
    id: "carequest-2026",
    year: "NOV 18, '26",
    role: "NOV 18, 2026 · IT & MEDIA CREATIVE (PRESENT)",
    title: "CareQuest Foundation",
    desc: "Serving as IT & Media Creative (present) at CareQuest Foundation since November 18, 2026, engineering the bilingual English/Bangla humanitarian web platform and Project One Meal One Smile flows.",
    reverse: true,
  },
];

export const DISCIPLINES: DisciplineItem[] = [
  {
    index: 0,
    num: "01",
    tag: "01 / MOTION & UI",
    title: "Interactive Web Systems",
    desc: "Editorial typography, clamped inertial smooth scrolling, and responsive interfaces engineered with zero generic template clutter.",
    text: "Focused on intentional visual hierarchy, silky 60fps damped scrolling, and human-psychology-grounded micro-interactions across desktop and mobile.",
    stack: ["HTML / CSS / JS", "INERTIAL SCROLL", "SVG CHOREOGRAPHY"],
  },
  {
    index: 1,
    num: "02",
    tag: "02 / WEBGL & SPATIAL",
    title: "3D & Scroll Choreography",
    desc: "Three.js WebGL scenes, perspective carousels, and scroll-scrubbed storytelling that tie visual physics directly to user intent.",
    text: "Building WebGL scenes, curved perspective carousels, and scroll-linked spatial transitions where motion communicates structure rather than noise.",
    stack: ["THREE.JS WEBGL", "3D PERSPECTIVE", "SCROLL SCRUBBING"],
  },
  {
    index: 2,
    num: "03",
    tag: "03 / CLOUD & AI",
    title: "AI Workflows & Backends",
    desc: "Automated pipelines, Supabase backends, n8n orchestration, and AI-assisted full-stack shipping from concept to deployment.",
    text: "Connecting modern web frontends to cloud backends, automated n8n workflows, Supabase databases, and AI-assisted development pipelines.",
    stack: ["SUPABASE", "N8N WORKFLOWS", "AI ENGINEERING"],
  },
  {
    index: 3,
    num: "04",
    tag: "04 / PHYSICAL COMPUTING",
    title: "Embedded Hardware",
    desc: "ESP32-S3 architectures combining I2C OLED displays, digital I2S audio chains, Hall-effect proximity sensors, and micro-servo motion.",
    text: "Prototyping expressive consumer hardware from breadboard to schematic: ESP32-S3 microcontrollers, I2S voice pipelines, OLED faces, and servo kinematics.",
    stack: ["ESP32-S3", "I2C OLED", "INMP441 / MAX98357A"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "carequest",
    num: "01",
    title: "CareQuest Foundation",
    cat: "IT & MEDIA CREATIVE · BILINGUAL WEB",
    img: "/images/project-carequest.png",
    desc: "A compassionate bilingual (English & Bangla) web experience for CareQuest Foundation and Project One Meal One Smile, engineered with Lenis smooth scroll and zero-clutter donation flows.",
    highlights: [
      "Bilingual English/Bangla language switch with warm editorial typography",
      'Interactive "Name Your Donation" bar, 4-pillar mission tabs, and QR/Facebook donation flow',
      "Hero split parallax, tilted paperclip FAQ notes, and mobile snap-scroll impact carousel",
    ],
    tags: ["Bilingual UI", "Smooth Scroll", "Donation UX", "Humanitarian"],
  },
  {
    id: "dcicc",
    num: "02",
    title: 'DCICC "Noor-al-Mi\'mar"',
    cat: "IT ASSOCIATE · THREE.JS WEBGL · 3D SCROLL",
    img: "/images/project-dcicc.jpg",
    desc: "A single-page, 3D scroll-driven architectural web experience and custom design system for the Dhaka College Islamic Cultural Club (DCICC), paired with partner materials for The Renaissance 2026.",
    highlights: [
      'Custom "Noor-al-Mi\'mar" visual language merging Islamic geometry with modern minimalism',
      "Three.js WebGL spatial staging governed by clamped inertial scroll physics",
      "Accompanied by the 54-segment partner-facing Master Event Profile for The Renaissance 2026",
    ],
    tags: ["Three.js WebGL", "Design System", "Clamped Physics", "Editorial"],
  },
  {
    id: "cravely",
    num: "03",
    title: "Cravely",
    cat: "FOUNDER · RESTAURANT DISCOVERY · INSTALLABLE PWA",
    img: "/images/cravely.png",
    desc: "A single-handed local dining discovery web app founded to show every kitchen, dish, and price in Thakurgaon — installable right from the browser so users spend less time wondering and more time eating.",
    highlights: [
      "Shows every local kitchen, structured menu, dish, and live price across Thakurgaon",
      "Works instantly in the browser and installs cleanly as a lightweight mobile-first app",
      "Phased roadmap engineered for seat pre-booking, pre-ordering, and local offers",
    ],
    tags: ["Product Design", "Installable PWA", "Mobile-First", "Food Discovery"],
  },
  {
    id: "deskbot",
    num: "04",
    title: "Desk Companion Bot",
    cat: "ESP32-S3 · MICRO-SERVOS · OLED · VOICE AI",
    img: "/images/project-deskbot.jpg",
    desc: "An affordable, movement-capable dual-bot hardware prototype built on an exposed ESP32-S3 breadboard blueprint, bringing Wi-Fi remote desk pokes and Bangla/English push-to-talk AI voice to the desk.",
    highlights: [
      "ESP32-S3-WROOM-1 N16R8 core with single-color I2C OLED display and micro-servo actuation",
      "INMP441 I2S digital MEMS mic + MAX98357A 3W Class-D amp + 4-ohm mini speaker chain",
      "A3144 Hall-effect proximity pairing and TTP223 capacitive touch for tactile remote nudges",
    ],
    tags: ["ESP32-S3", "I2S Audio", "Micro-Servos", "Wi-Fi Companion"],
  },
  {
    id: "guppen",
    num: "05",
    title: "The Guppen Universe",
    cat: "MOBILE PWA · STAR-ATLAS · INTERACTIVE EXPERIENCE",
    img: "/images/project-guppen.jpg",
    desc: "An intimate, app-like mobile web experience styled as a celestial star-atlas with engraved astrolabe brass geometry, 3D scroll-driven constellation galleries, and tactile micro-interactions.",
    highlights: [
      "1.5-second biometric-style lock screen reveal with haptic feedback into deep space",
      "3D scroll-driven Constellation Gallery with tap-to-flip archival cards and shooting stars",
      "Scratch-off keepsake vouchers, shake-to-shuffle interaction, and PWA installability",
    ],
    tags: ["Mobile PWA", "3D Gallery", "Haptics", "Micro-Interactions"],
  },
  {
    id: "amarevents",
    num: "06",
    title: "AmarEvents",
    cat: "CO-FOUNDER & CTO · AI EVENT DISCOVERY · PLATFORM",
    img: "/images/project-amarevents.png",
    desc: "An AI-powered event discovery platform built as Co-Founder & CTO, featuring Amar AI Assistant to help users find events in reach across 26 categories including festivals, workshops, cultural programs, and competitions.",
    highlights: [
      "Amar AI Assistant natural-language event search spanning 26 curated topic categories",
      "Unified dark-mode platform integrating Events, Calendar, Plans, Docs, and interactive Games",
      "Co-founded in January 2026 and architected end-to-end as CTO from March 2026",
    ],
    tags: ["Amar AI", "Event Platform", "Full-Stack", "CTO Architecture"],
  },
];

export const LAB_TABS: LabTabItem[] = [
  {
    stepNum: "01",
    tabLabel: "01 CORE",
    title: "Dual Type-C ESP32-S3 Architecture",
    text: "Powered by the ESP32-S3-WROOM-1 N16R8 module on an exposed breadboard blueprint, driving a crisp single-color I2C OLED display and micro-servo actuators for physical head tilt and reactions.",
  },
  {
    stepNum: "02",
    tabLabel: "02 AUDIO & SENSORS",
    title: "Digital I2S Voice & Proximity Sensing",
    text: "Combines an INMP441 I2S digital MEMS microphone, MAX98357A 3W Class-D amplifier, and 4-ohm mini speaker for push-to-talk Bangla & English AI voice, paired with a TTP223 capacitive touch pad.",
  },
  {
    stepNum: "03",
    tabLabel: "03 DESK POKES",
    title: "Hall-Effect Pairing & Wi-Fi Desk Pokes",
    text: "An A3144 Hall-effect sensor with magnet enables NameDrop-style proximity pairing between two units, letting friends send real-time animated expressions and servo nudges across Wi-Fi.",
  },
];

export const OLED_MOODS: { mood: OledMood; label: string }[] = [
  { mood: "curious", label: "Curious" },
  { mood: "poke", label: "Desk Poke" },
  { mood: "listen", label: "Voice AI" },
  { mood: "happy", label: "Happy" },
];

export const CLOSING_TEXT = "LET'S BUILD SOMETHING";
