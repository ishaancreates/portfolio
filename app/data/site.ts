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
  location: 'Gorakhpur, India',
  coordinates: '26.7598° N, 83.3818° E',
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
  {
    label: "GitHub",
    href: "https://github.com/ishaancreates",
    handle: "@ishaancreates",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ishaan-pandey-3b0517216/",
    handle: "Ishaan Pandey",
  },

  {
    label: "Instagram",
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1&pp=ygUJcmljayByb2xsoAcB",
    handle: "pareshan.ishaan",
  },
  {
    label: "Email",
    href: "mailto:ishaanmaybe@gmail.com",
    handle: "ishaanmaybe@gmail.com",
  },
];

export const about = {
  lead: 'I study electrical engineering at KNIT Sultanpur, which means I understand circuits and still somehow end up writing software. Hackathon prototypes, production apps and tools my campus actually uses (voluntarily!).',
  /** Real figures from the resume. */
  facts: [
    { value: '4', label: 'Hackathon podiums (humble brag)' },
    { value: '2000+', label: 'Fellow hackers, politely outpaced' },
    { value: '3000+', label: 'Fest visitors, zero crashes (we don’t talk about the one)' },
    { value: '140+', label: 'Freshers I put through exams (sorry)' },
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
    items: [{ name: 'TypeScript' }, { name: 'JavaScript' }, { name: 'Python' }, { name: 'C++' }, { name: 'SQL' }],
  },
  {
    label: 'Frontend',
    items: [{ name: 'React' }, { name: 'Next.js' }, { name: 'React Native' }, { name: 'Tailwind' }, { name: 'GSAP' }],
  },
  {
    label: 'Backend',
    items: [{ name: 'Node.js' }, { name: 'Express' }, { name: 'FastAPI' }, { name: 'PostgreSQL' }, { name: 'Supabase' }],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'AWS' },
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
    points: ['Building the React Native (Expo) app: native screens plus WebView pages. Yes, it’s a website in a trench coat. Sometimes.'],
  },
  {
    period: '[Add dates]',
    role: 'Founder',
    org: 'CuraLynx',
    kind: 'Startup',
    placeholder: true,
    points: ['Real-time AI assistant for clinical notes, so doctors can stop typing and start doctoring. 2nd Prize, HackWithUP.'],
  },
  {
    period: '[Add dates]',
    role: 'Joint Secretary',
    org: 'PTSC',
    kind: 'Leadership',
    placeholder: true,
    points: ['Programming & Tech Skills Club, KNIT Sultanpur. Professional herder of enthusiastic coders.'],
  },
  {
    period: 'Apr 2026',
    role: 'Full Stack Intern',
    org: 'AI Margdarshak',
    kind: 'Internship',
    points: ['Built the platform’s landing page, UI, auth and backend APIs. Basically everything except the coffee machine.'],
  },
  {
    period: 'Mar 2026',
    role: 'Full Stack Developer',
    org: 'Effulgence ’26',
    kind: 'Fest',
    points: ['Led the frontend team for a fest site serving 3000+ visitors, none of whom noticed the frantic last-night commits.'],
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
  image?: { base: string; alt: string; position?: string }
  /** Tone for the generated cover when there is no screenshot. */
  visual?: 'grid' | 'wave'
  placeholder?: boolean
}

export const projects: Project[] = [
  {
    slug: 'pharmaguard',
    index: '01',
    title: 'PharmaGuard',
    tagline: 'Your DNA has opinions about your meds',
    description: 'CPIC-aligned medication safety recommendations from VCF files. Because “side effects may include…” should be a prediction, not a surprise.',
    stack: ['Next.js', 'Flask', 'MongoDB'],
    award: '1st Prize · RIFT’26',
    live: 'https://pharmaguard-eta.vercel.app',
    repo: 'https://github.com/ishaancreates/Pharmaguard',
    image: { base: '/images/projects/pharmaguard', alt: 'PharmaGuard landing page' },
  },
  {
    slug: 'curalynx',
    index: '02',
    title: 'CuraLynx',
    tagline: 'Doctor talks, notes write themselves',
    description: 'Turns doctor–patient conversations into structured notes and prescriptions. Finally, handwriting nobody has to decipher.',
    stack: ['React', 'Node.js', 'Gemini API'],
    award: '2nd Prize · HackWithUP',
    live: 'https://cura-lynx.vercel.app/',
    repo: 'https://github.com/ishaancreates/CuraLynx-deployed',
    image: { base: '/images/projects/curalynx', alt: 'CuraLynx landing page' },
  },
  {
    slug: 'openeval',
    index: '03',
    title: 'OpenEval',
    tagline: 'Where freshers meet the timer',
    description: 'Timed exam platform for Project INIT, taken by 140+ first-year students. Not one of them blamed the Wi-Fi. (Okay, a few did.)',
    // placeholder: stack not listed on the resume.
    stack: ['[Add stack]'],
    live: 'https://openeval.ptsc.app',
    repo: null,
    visual: 'grid',
  },
  {
    slug: 'ptsc',
    index: '04',
    title: 'PTSC',
    tagline: 'Coders, assemble (website edition)',
    description: 'Home of the Programming & Tech Skills Club. Yes, we built our own site. No, we didn’t use a template. Mostly.',
    // placeholder: stack and repo not provided.
    stack: ['[Add stack]'],
    live: 'https://ptsc.in',
    repo: null,
    image: { base: '/images/projects/ptsc', alt: 'PTSC website home page', position: 'center top' },
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
