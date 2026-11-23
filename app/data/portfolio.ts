// ---------------------------------------------------------------
// All the text on the site lives here.
// Edit this file to update your portfolio; the components read from it.
// ---------------------------------------------------------------

export const profile = {
  name: 'Jasmine Mae Cuenco',
  firstName: 'Jasmine',
  initials: 'JMC',
  role: 'Full-Stack Developer',
  title: 'BS Information Technology Student',
  email: 'it.cuencojasminemae@gmail.com',
  location: 'City of San Fernando, Pampanga',
  country: 'Philippines',
  timezone: 'Asia/Manila',
  photo: '/images/jasmine.png',
  resume: '/Jasmine-Mae-Cuenco-Resume.pdf',
  cv: '/Jasmine-Mae-Cuenco-CV.pdf',
  status: 'Open to IT internships',
  summary:
    'Fourth-year BS Information Technology student who builds full-stack web and mobile apps with Nuxt, Strapi, PostgreSQL and Flutter, using AI coding tools to build and debug faster. Years of helping run the family business taught me time management, customer service and how to keep track of the details.',
  // Add your links here and they show up in the hero, contact section and footer.
  // Example: { label: 'GitHub', handle: 'your-username', icon: 'i-simple-icons-github', to: 'https://github.com/your-username' }
  socials: [
    { label: 'LinkedIn', handle: 'jasmine-mae-cuenco', icon: 'i-simple-icons-linkedin', to: 'https://www.linkedin.com/in/jasmine-mae-cuenco-5981b5410' },
    { label: 'GitHub', handle: 'it-cuencojasminemae', icon: 'i-simple-icons-github', to: 'https://github.com/it-cuencojasminemae' },
    { label: 'GitHub', handle: 'cuencojasmine', icon: 'i-simple-icons-github', to: 'https://github.com/cuencojasmine' }
  ] as { label: string, handle: string, icon: string, to: string }[]
}

export const stats = [
  { value: '3/3', label: 'CCNA courses completed' },
  { value: '1', label: 'Regional hackathon' },
  { value: '8+', label: 'Years in the family business' },
  { value: '3', label: 'Languages spoken' }
]

export const languages = ['English', 'Filipino', 'Kapampangan']

export const softSkills = [
  'Problem solving',
  'Time management',
  'Adaptability',
  'Customer service',
  'Attention to detail',
  'Juggling multiple projects'
]

export type ProjectLink = { label: string, icon: string, to: string }

// A real screenshot replaces the illustration. Files go in public/projects/.
// `dark` is optional: it's shown instead of `light` when the site is in dark mode.
export type ProjectScreenshot = { light: string, dark?: string, alt: string, url?: string }

export type Project = {
  slug: string
  name: string
  tagline: string
  context: string
  role: string
  summary: string
  // Case study story: problem → what I built → result
  problem: string
  highlights: string[]
  outcome: string
  tech: string[]
  visual: 'stalls' | 'routes'
  screenshot?: ProjectScreenshot
  // Add repo / live demo links here and they appear as buttons on the card and in the case study.
  // Example: { label: 'View code', icon: 'i-simple-icons-github', to: 'https://github.com/...' }
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    slug: 'imapsu',
    name: 'IMAPSU',
    tagline: 'Stall Management System with Interactive Map',
    context: 'Thesis Project',
    role: 'Full-Stack Developer',
    summary:
      'A web system for the Pampanga State University Office of Auxiliary Services that manages campus stalls, tenants and records through an interactive map.',
    problem:
      'The Office of Auxiliary Services needed one place to see every campus stall, who rents it, and the records that go with it.',
    outcome: 'Finished thesis project for the BSIT program, now live on the web.',
    links: [
      { label: 'Live site', icon: 'i-lucide-globe', to: 'https://imapsu.vercel.app/' }
    ],
    screenshot: {
      light: '/projects/imapsu-home-light.png',
      dark: '/projects/imapsu-home-dark.png',
      alt: 'IMAPSU home page: "Find, rent and manage campus stalls in one place" beside a 3D illustrated campus map with location pins',
      url: 'imapsu.vercel.app'
    },
    highlights: [
      'Built a web system for managing campus stalls, tenants and records through an interactive map.',
      'Designed role-based access control (RBAC) so each type of user only sees what they need.',
      'Integrated Tesseract.js for OCR-based document reading.'
    ],
    tech: ['Nuxt 4', 'Nuxt UI', 'Strapi', 'PostgreSQL', 'Tesseract.js'],
    visual: 'stalls'
  },
  {
    slug: 'pamana',
    name: 'PAMANA',
    tagline: 'Intelligent Rural Transportation Access System',
    context: 'Can You HackIT? Clark 2026 · IBPAP Regional Student Hackathon',
    role: 'Full-Stack / Backend Developer',
    summary:
      'A journey-planning platform that improves public transport access in the Mexico to San Fernando area of Pampanga.',
    problem:
      'Commuters in the Mexico–San Fernando area of Pampanga have limited access to clear information about routes, stops and trips.',
    outcome: 'Built at Can You HackIT? Clark 2026 with team “SNCBSIT – Code Warriors”.',
    links: [],
    screenshot: {
      light: '/projects/pamana-trip-planner.jpg',
      alt: 'PAMANA Trip Planner: a trip from St. Nicolas College to Victory Liner Bus Terminal, with the recommended jeepney route drawn in green on a map of San Fernando and Mexico, Pampanga'
    },
    highlights: [
      'Built a journey-planning platform to improve public transport access in the Mexico–San Fernando area of Pampanga.',
      'Developed a Strapi 5 backend with PostgreSQL and REST APIs for routes, stops, vehicles and trips.',
      'Implemented data-driven journey planning with interactive maps, place search and walking directions.',
      'Integrated the OpenAI API to explain routes and transport information to passengers in plain language.'
    ],
    tech: ['Strapi 5', 'PostgreSQL', 'Node.js', 'Nuxt', 'Vue.js', 'MapLibre GL JS', 'Geoapify', 'OpenAI API'],
    visual: 'routes'
  }
]

// Skills grouped by how well you know them, so recruiters can scan quickly.
// Move items between tiers if your comfort level is different.
export const skillTiers = [
  {
    title: 'Core stack',
    description: 'What my projects are built with.',
    icon: 'i-lucide-layers',
    groups: [
      { label: 'Frontend', items: ['Nuxt 4', 'Nuxt UI', 'Vue.js', 'TypeScript', 'JavaScript'] },
      { label: 'Backend & data', items: ['Strapi 5', 'Node.js', 'REST APIs', 'PostgreSQL'] }
    ]
  },
  {
    title: 'Comfortable with',
    description: 'Used in projects and coursework.',
    icon: 'i-lucide-wrench',
    groups: [
      { label: 'Libraries & services', items: ['MapLibre GL JS', 'Geoapify', 'Tesseract.js', 'OpenAI API', 'Neon'] },
      { label: 'Web & mobile', items: ['HTML', 'CSS', 'SQL', 'Flutter', 'Dart'] },
      { label: 'Workflow', items: ['Git', 'GitHub', 'VS Code', 'Claude', 'ChatGPT'] },
      { label: 'System design', items: ['Role-based access control', 'Interactive map interfaces', 'Journey planning'] }
    ]
  },
  {
    title: 'Also familiar',
    description: 'Networking coursework and everyday tools.',
    icon: 'i-lucide-compass',
    groups: [
      { label: 'Networking', items: ['Cisco Packet Tracer', 'Routing & switching', 'Wireless', 'Network security', 'IoT fundamentals'] },
      { label: 'AI', items: ['Locally run AI models'] },
      { label: 'Creative', items: ['CapCut', 'Alight Motion'] },
      { label: 'Office', items: ['Word', 'Excel', 'PowerPoint'] }
    ]
  }
]

// Logos for the scrolling tech strip
export const techLogos = [
  { label: 'Nuxt', icon: 'i-simple-icons-nuxt' },
  { label: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
  { label: 'TypeScript', icon: 'i-simple-icons-typescript' },
  { label: 'JavaScript', icon: 'i-simple-icons-javascript' },
  { label: 'Node.js', icon: 'i-simple-icons-nodedotjs' },
  { label: 'Strapi', icon: 'i-simple-icons-strapi' },
  { label: 'PostgreSQL', icon: 'i-simple-icons-postgresql' },
  { label: 'Neon', icon: 'i-simple-icons-neon' },
  { label: 'Flutter', icon: 'i-simple-icons-flutter' },
  { label: 'Dart', icon: 'i-simple-icons-dart' },
  { label: 'MapLibre', icon: 'i-simple-icons-maplibre' },
  { label: 'Git', icon: 'i-simple-icons-git' },
  { label: 'GitHub', icon: 'i-simple-icons-github' },
  { label: 'Claude', icon: 'i-simple-icons-claude' },
  { label: 'Cisco', icon: 'i-simple-icons-cisco' }
]

export const experience = [
  {
    date: '2018 – Present',
    title: 'Store Assistant Manager',
    place: 'Family Business',
    icon: 'i-lucide-store',
    points: [
      'Manage inventory, track stock levels and coordinate restocking with suppliers to avoid shortages.',
      'Handle daily customer transactions and cash accurately during busy hours.',
      'Provide friendly, reliable service to regular customers in the community.',
      'Help with day-to-day store operations and organization alongside family members.'
    ]
  }
]

export const education = [
  {
    date: '2023 – 2027 (Expected)',
    title: 'BS Information Technology',
    place: 'St. Nicolas College of Business and Technology',
    icon: 'i-lucide-graduation-cap'
  },
  {
    date: '2021 – 2023',
    title: 'Senior High School, HUMSS',
    place: 'St. Nicolas College of Business and Technology',
    icon: 'i-lucide-book-open'
  }
]

export type Certification = {
  title: string
  issuer: string
  date: string
  kind: 'Certificate' | 'Participant' | 'Hackathon'
  // Files live in public/certificates/. The PNG is a preview of page 1 of the PDF.
  image: string
  pdf: string
  certId?: string
  // Optional: a Credly / NetAcad verification link shows a "Verify" button
  verify?: string
}

export const certifications: Certification[] = [
  {
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy · SNCBT',
    date: '26 Jun 2026',
    kind: 'Certificate',
    image: '/certificates/ccna-introduction-to-networks.png',
    pdf: '/certificates/ccna-introduction-to-networks.pdf',
    certId: '75b84058-d8b1-4657-b0f1-5611f66ffa0a'
  },
  {
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Networking Academy · SNCBT',
    date: '26 Jun 2026',
    kind: 'Certificate',
    image: '/certificates/ccna-switching-routing-wireless.png',
    pdf: '/certificates/ccna-switching-routing-wireless.pdf',
    certId: '52552255-ee50-493b-ac53-da837cde902d'
  },
  {
    title: 'CCNA: Enterprise Networking, Security, and Automation',
    issuer: 'Cisco Networking Academy · SNCBT',
    date: '06 Jun 2026',
    kind: 'Certificate',
    image: '/certificates/ccna-enterprise-networking.png',
    pdf: '/certificates/ccna-enterprise-networking.pdf',
    certId: '708dc369-9ce7-47bb-86cb-8249163293d1'
  },
  {
    title: 'Introduction to IoT and Digital Transformation',
    issuer: 'Cisco Networking Academy · SNCBT',
    date: '02 Mar 2026',
    kind: 'Certificate',
    image: '/certificates/intro-to-iot.png',
    pdf: '/certificates/intro-to-iot.pdf'
  },
  {
    title: 'Cisco NetAcad Riders 2026',
    issuer: 'Cisco Networking Academy · APJC',
    date: '26 Mar – 3 Apr 2026',
    kind: 'Participant',
    image: '/certificates/netacad-riders-2026.png',
    pdf: '/certificates/netacad-riders-2026.pdf'
  },
  {
    title: 'Can You HackIT? The IBPAP Challenge (Clark)',
    issuer: 'IBPAP · Team “SNCBSIT – Code Warriors”',
    date: '9 Oct 2026',
    kind: 'Hackathon',
    image: '/certificates/hackit-clark-2026.png',
    pdf: '/certificates/hackit-clark-2026.pdf'
  }
]

export const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Skills', id: 'skills' },
  { label: 'Journey', id: 'journey' },
  { label: 'Contact', id: 'contact' }
]
