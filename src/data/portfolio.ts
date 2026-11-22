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
  monolithAlt: "Obsidian and vermilion architectural monolith artwork",
  subCaption:
    "MD IFTEKHAR FERDOUS · CO-FOUNDER & CTO, AMAR EVENTS · BUILDER",
  scrollCueLabel: "SCROLL TO EXPLORE",
};

export const ABOUT_META = {
  indexLabel: "02 / ABOUT",
  visualImg: "/images/about-sculpture.jpg",
  visualAlt: "Minimalist dark sculpture study",
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
    key: "Amar Events",
    value: "Co-Founder, Marketing Manager & CTO",
  },
  {
    key: "CareQuest",
    value: "Director of IT & Media Creative",
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
  "I'm MD Iftekhar Ferdous — Co-Founder, Marketing Manager & CTO at Amar Events, Director of IT & Media Creative at CareQuest Foundation, IT Associate at DCICC, and Section Representative at Dhaka College Science Club.",
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
    desc: "Festival segments supported through partner documentation and club design direction.",
  },
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "2025",
    role: "STARTUP ARCHITECTURE",
    title: "CraveLee Concept & Product Scope",
    desc: "Architected a single-handed digital platform for discovering nearby restaurants, browsing live menus, and surfacing limited-time local offers — mapped out for future seat pre-booking and ordering.",
  },
  {
    year: "2026",
    role: "DCSC SR · DCICC IT ASSOCIATE",
    title: "Dhaka College Club Leadership",
    desc: "Joined Dhaka College (Science-B, Roll 189) after SSC. Serving as Section Representative (SR) for Dhaka College Science Club and IT Associate for Dhaka College Islamic Cultural Club.",
    reverse: true,
  },
  {
    year: "NOV '26",
    role: "AMAR EVENTS · CAREQUEST FOUNDATION",
    title: "Amar Events & CareQuest Leadership",
    desc: 'Leading technology and growth as Co-Founder, Marketing Manager & CTO at Amar Events, while serving as Director of IT & Media Creative at CareQuest Foundation and directing DCICC\'s "Noor-al-Mi\'mar" 3D web system.',
  },
  {
    year: "NOW",
    role: "HARDWARE & AI OLYMPIADS",
    title: "Desk Companion Robot & Competitive AI",
    desc: "Prototyping an open-breadboard, dual-bot ESP32-S3 desk companion with micro-servos and Bangla/English push-to-talk AI voice, while preparing for national AI and Innovation Olympiads.",
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
    cat: "DIRECTOR OF IT & MEDIA CREATIVE · BILINGUAL WEB",
    img: "/images/project-carequest.jpg",
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
    id: "cravelee",
    num: "03",
    title: "CraveLee",
    cat: "STARTUP CONCEPT · RESTAURANT DISCOVERY · PRODUCT UI",
    img: "/images/project-cravelee.jpg",
    desc: "A single-handed local dining discovery startup concept designed to let users explore nearby restaurants, browse structured menus, and spot limited-time dishes without friction.",
    highlights: [
      "Architected as a lean digital information-services platform for urban food discovery",
      "Menu-first browsing hierarchy spotlighting local offers and seasonal dishes",
      "Phased roadmap engineered for seat pre-booking, pre-ordering, and delivery",
    ],
    tags: ["Product Design", "Startup Scope", "Mobile-First", "Discovery"],
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
