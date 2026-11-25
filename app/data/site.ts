/**
 * Every piece of copy on the site lives here.
 *
 * Facts below come from Ishaan's resume (Nov 2026). Anything not confirmed by
 * the resume is flagged `placeholder: true` (or written as `[Add …]`) so it is
 * easy to find and replace — search this file for "placeholder".
 */

export interface SocialLink {
  label: string
  /** `null` = not provided yet. Rendered as a muted, non-clickable placeholder. */
  href: string | null
  handle: string
}

export const profile = {
  name: 'Ishaan Pandey',
  firstName: 'Ishaan',
  role: 'Electrical Engineering Student · Developer · Entrepreneur',
  college: 'Kamla Nehru Institute of Technology (KNIT), Sultanpur',
  collegeShort: 'KNIT Sultanpur',
  year: 'Second year',
  degree: 'B.Tech, Electrical Engineering',
  degreeYears: '2024–28',
  cgpa: '8 / 10',
  location: 'Sultanpur, India',
  coordinates: '26.26° N, 82.07° E',
  timeZone: 'Asia/Kolkata',
  email: 'ishaanmaybe@gmail.com',
  status: {
    label: 'Currently',
    value: 'Mobile App Dev Intern at AdGurilla',
  },
  description:
    'Ishaan Pandey is an electrical engineering student at KNIT Sultanpur, a full-stack developer and the builder behind CuraLynx. Selected work, experience and writing.',
}

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/ishaancreates', handle: '@ishaancreates' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ishaan-pandey-3b0517216/',
    handle: 'Ishaan Pandey',
  },
  // placeholder: Instagram URL was not provided.
  { label: 'Instagram', href: null, handle: '[Add handle]' },
  { label: 'Email', href: 'mailto:ishaanmaybe@gmail.com', handle: 'ishaanmaybe@gmail.com' },
]

export const about = {
  lead: 'I study electrical engineering at KNIT Sultanpur and spend most of my time building software. That means hackathon prototypes, production apps and the tools my campus actually uses.',
  paragraphs: [
    {
      title: 'Engineering roots',
      body: 'Electrical engineering taught me to think in systems: inputs, constraints, feedback. I bring the same habit to software, starting from the problem and working outward to the interface.',
    },
    {
      title: 'Building products',
      body: 'I work across the stack with TypeScript, React, Next.js and Node.js, from landing pages and visual identity to auth, APIs and databases. Lately that includes a hybrid React Native app at AdGurilla.',
    },
    {
      title: 'Entrepreneurship',
      body: 'CuraLynx began as a real-time AI assistant that turns doctor–patient conversations into structured notes and prescriptions. It took 2nd prize at HackWithUP, and I am now building it into a startup.',
    },
    {
      title: 'Community',
      body: 'As Joint Secretary of the Programming & Tech Skills Club (PTSC), I help run the club and built OpenEval, the platform behind Project INIT, our open assessment for first-year students.',
    },
  ],
  /** Real figures from the resume. */
  facts: [
    { value: '4', label: 'Hackathon podiums', note: 'Incl. 1st at RIFT’26' },
    { value: '2000+', label: 'Participants at RIFT', note: 'PharmaGuard took 1st' },
    { value: '3000+', label: 'Visitors served', note: 'Effulgence ’26 fest site' },
    { value: '140+', label: 'Students assessed', note: 'On OpenEval' },
  ],
}

export interface SkillGroup {
  label: string
  items: { name: string; placeholder?: boolean }[]
}

/** From the resume's Skills section. `placeholder` = suggested but not confirmed. */
export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: [
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Python' },
      { name: 'C++' },
      { name: 'SQL' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'React Native' },
      { name: 'Tailwind' },
      { name: 'GSAP' },
      { name: 'React Three Fiber' },
      { name: 'shadcn/ui' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'FastAPI' },
      { name: 'REST APIs' },
      { name: 'WebSockets' },
      { name: 'JWT / OAuth' },
      { name: 'Supabase' },
      { name: 'PostgreSQL' },
      { name: 'Redis' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [{ name: 'AWS' }, { name: 'Docker' }, { name: 'CI/CD' }, { name: 'Vercel' }],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Postman' },
      { name: 'Figma' },
      // placeholder: suggested in the brief, not listed on the resume.
      { name: 'VS Code', placeholder: true },
    ],
  },
]

export interface ExperienceEntry {
  period: string
  role: string
  org: string
  kind: 'Internship' | 'Startup' | 'Leadership' | 'Fest'
  stack?: string[]
  points: string[]
  current?: boolean
  placeholder?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    period: 'Sep 2026 — Now',
    role: 'Mobile App Developer Intern',
    org: 'AdGurilla',
    kind: 'Internship',
    current: true,
    stack: ['React Native', 'Expo SDK 57', 'WebView'],
    points: [
      'Building AdGurilla’s mobile app in React Native (Expo), combining native screens with WebView-embedded web pages in a hybrid architecture.',
      'Developed the listing and listing-detail screens, login and brand-side sign-up flows, and integrated existing web app pages via WebView.',
    ],
  },
  {
    period: '[Add dates]',
    role: 'Founder',
    org: 'CuraLynx',
    kind: 'Startup',
    placeholder: true,
    stack: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Gemini API'],
    points: [
      'Real-time AI assistant that converts doctor–patient conversations into structured medical notes and prescriptions. 2nd Prize, HackWithUP.',
      '[Add: what CuraLynx is working on as a company, such as stage, team and pilots.]',
    ],
  },
  {
    period: '[Add dates]',
    role: 'Joint Secretary',
    org: 'Programming & Tech Skills Club (PTSC)',
    kind: 'Leadership',
    placeholder: true,
    points: [
      'Built OpenEval, the platform for Project INIT, PTSC’s open assessment taken by 140+ first-year students.',
      '[Add: events organised, sessions led, responsibilities.]',
    ],
  },
  {
    period: 'Apr 2026',
    role: 'Full Stack Intern',
    org: 'AI Margdarshak',
    kind: 'Internship',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Supabase'],
    points: [
      'Led full-stack development of the official platform, building the landing page, core UI and visual identity from scratch.',
      'Implemented authentication and backend APIs with PostgreSQL on Supabase for secure data management.',
    ],
  },
  {
    period: 'Mar 2026',
    role: 'Full Stack Developer',
    org: 'Effulgence ’26',
    kind: 'Fest',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'GSAP'],
    points: [
      'Led the frontend team and built the fest website’s event, registration and schedule modules for 3000+ visitors.',
    ],
  },
]

export interface Project {
  slug: string
  index: string
  title: string
  tagline: string
  description: string
  stack: string[]
  award?: string
  live: string | null
  repo: string | null
  image?: { base: string; alt: string }
  /** Tone for the generated cover when there is no screenshot. */
  visual?: 'grid' | 'wave'
  placeholder?: boolean
}

export const projects: Project[] = [
  {
    slug: 'pharmaguard',
    index: '01',
    title: 'PharmaGuard',
    tagline: 'AI pharmacogenomics',
    description:
      'Analyzes VCF files to give CPIC-aligned medication safety recommendations, with AI-generated explanations a clinician can follow.',
    stack: ['Next.js', 'Flask', 'Python', 'MongoDB', 'Groq · Llama 3.3'],
    award: '1st Prize · RIFT’26',
    live: 'https://pharmaguard-eta.vercel.app',
    repo: 'https://github.com/ishaancreates/Pharmaguard',
    image: { base: '/images/projects/pharmaguard', alt: 'PharmaGuard landing page' },
  },
  {
    slug: 'curalynx',
    index: '02',
    title: 'CuraLynx',
    tagline: 'Clinical notes, in real time',
    description:
      'A real-time AI assistant that listens to doctor–patient conversations and turns them into structured medical notes and prescriptions.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'WebSockets', 'Gemini API'],
    award: '2nd Prize · HackWithUP',
    live: 'https://cura-lynx.vercel.app/',
    repo: 'https://github.com/ishaancreates/CuraLynx-deployed',
    image: { base: '/images/projects/curalynx', alt: 'CuraLynx landing page' },
  },
  {
    slug: 'openeval',
    index: '03',
    title: 'OpenEval',
    tagline: 'Assessment platform for PTSC',
    description:
      'The evaluation platform for Project INIT: a timed, 120-minute, 45-question exam across AI/ML, CP & Aptitude and Development tracks, taken by 140+ first-year students.',
    // placeholder: stack not listed on the resume.
    stack: ['[Add stack]'],
    live: 'https://openeval.ptsc.app',
    repo: null,
    visual: 'grid',
  },
  {
    slug: 'next-project',
    index: '04',
    title: '[Your next project]',
    tagline: 'Placeholder',
    description:
      'Reserved slot. Add a project here: a title, a two-line description, the stack, and links to the live demo and repository.',
    stack: ['[Stack]'],
    live: null,
    repo: null,
    visual: 'wave',
    placeholder: true,
  },
]

export const podiums = [
  { place: '1st', project: 'PharmaGuard', event: 'RIFT’26, PWIOI', prize: '₹1,00,000' },
  {
    place: '2nd',
    project: 'CuraLynx',
    event: 'HackWithUP · Blackbox AI × Chandigarh University',
    prize: '₹30,000',
  },
  { place: '2nd', project: 'Disaster Management App', event: 'GDG HackerCup, KNIT Sultanpur', prize: '₹30,000' },
  { place: '3rd', project: 'BioLore', event: 'NASA Space Apps Challenge, KIET Ghaziabad', prize: '₹15,000' },
]
