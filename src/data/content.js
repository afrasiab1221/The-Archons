// Centralized content + placeholders. Real content swaps in here.

export const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#clients' },
  { label: 'About',    href: '#about' },
  { label: 'Blog',     href: '/blog', kind: 'route' },
  { label: 'Contact',  href: '#contact' },
]

export const SERVICES = [
  {
    id: 'digital',
    n: '01',
    title: 'Digital Marketing',
    tagline: 'Strategic campaigns that build visibility, engagement and long-term growth.',
    icon: 'digital',
    whatsappMessage:
      "Hi The Archons! I'm interested in your Digital Marketing services for my brand.",
  },
  {
    id: 'app',
    n: '02',
    title: 'App Development',
    tagline: 'Powerful digital products built around real business needs.',
    icon: 'app',
    whatsappMessage:
      "Hi The Archons! I'm interested in building an app and would love to know more about your App Development services.",
  },
  {
    id: 'perf',
    n: '03',
    title: 'Performance Marketing',
    tagline: 'Data-driven campaigns focused on traffic, leads and measurable growth.',
    icon: 'perf',
    whatsappMessage:
      "Hi The Archons! I'd like to learn more about your Performance Marketing services and how you can drive measurable growth.",
  },
  {
    id: 'web',
    n: '04',
    title: 'Web Development',
    tagline: 'Modern, responsive, high-performance websites designed to convert.',
    icon: 'web',
    whatsappMessage:
      "Hi The Archons! I'd like to discuss a Web Development project with you.",
  },
  {
    id: 'meta',
    n: '05',
    title: 'Meta Ads',
    tagline: 'Targeted Facebook & Instagram advertising that reaches the right audience.',
    icon: 'meta',
    whatsappMessage:
      "Hi The Archons! I'd like to run Meta (Facebook & Instagram) Ads for my business.",
  },
  {
    id: 'seo',
    n: '06',
    title: 'SEO',
    tagline: 'Search strategies that improve visibility, organic traffic and sustainable growth.',
    icon: 'seo',
    whatsappMessage:
      "Hi The Archons! I'd like to improve my SEO and grow organic traffic.",
  },
  {
    id: 'smm',
    n: '07',
    title: 'Social Media Marketing',
    tagline: 'Creative and strategic social campaigns that build attention and brand presence.',
    icon: 'smm',
    whatsappMessage:
      "Hi The Archons! I'm interested in Social Media Marketing for my brand.",
  },
  {
    id: 'ai',
    n: '08',
    title: 'AI Automation',
    tagline: 'Smart automation that reduces repetitive work and improves business efficiency.',
    icon: 'ai',
    whatsappMessage:
      "Hi The Archons! I'd like to explore AI Automation to streamline my business.",
  },
]

export const PROCESS = [
  { n: '01', title: 'Discover',  desc: 'Understand the business, audience and goals.' },
  { n: '02', title: 'Strategize', desc: 'Build the right digital strategy and roadmap.' },
  { n: '03', title: 'Create',    desc: 'Design and develop the experience.' },
  { n: '04', title: 'Launch',    desc: 'Put the solution into action.' },
  { n: '05', title: 'Scale',     desc: 'Optimize, measure and grow.' },
]

// Roster order matches the listing in the brief (Aug 2026 update).
// Members without `image` get the placeholder ring + "?" glyph until
// their photo is provided.
//
// The `?v=2` cache-buster on CEO and Director is a deliberate workaround
// for the long-lived `Cache-Control: immutable` header we set in `_headers`.
// When you swap a photo at the same URL, bump the version (e.g. ?v=3)
// so browsers treat the new image as a fresh URL and refetch.
export const TEAM = [
  {
    name: 'Mr Aniq Kamran',
    role: 'Chief Executive Officer',
    image: '/assets/team/ceo.jpg?v=2',
  },
  {
    name: 'Mr Afra Siab Khan',
    role: 'Director of Innovation and Technology',
    image: '/assets/team/director.jpg?v=2',
  },
  {
    name: 'Hur Ali',
    role: 'Lead Videographer',
    image: '/assets/team/lead-videographer.jpg',
  },
  {
    name: 'Junaid Sheikh',
    role: 'Photography and Creative Head',
    image: '/assets/team/photography-creative-head.jpg?v=3',
  },
  {
    name: 'Gufran Khan',
    role: 'Sales Head',
    image: null,
  },
  {
    name: 'Junaid Sheikh',
    role: 'SEO Specialist',
    image: '/assets/team/photography-creative-head.jpg?v=3',
  },
  {
    name: 'Murtaza Adil',
    role: 'Motion Graphic Designer',
    image: null,
  },
  {
    name: 'Ahmed',
    role: 'Analytics and Strategy',
    image: null,
  },
]

// Numeric stats with a `suffix` so we can render "30+", "23M+", etc.
// `value` is the number the counter animates up to.
export const STATS = [
  { value: 2021, suffix: '',   label: 'Founded' },
  { value: 18,   suffix: '',   label: 'Professionals' },
  { value: 30,   suffix: '+',  label: 'Clients' },
  { value: 100,  suffix: '+',  label: 'Projects' },
  { value: 23,   suffix: 'M+', label: 'Views Generated' },
]

// Logos that scroll in the marquee.
export const CLIENT_LOGOS = [
  { name: 'Alfatah',                 logo: '/assets/clients/alfatah.jpg' },
  { name: 'Milo',                    logo: '/assets/clients/milo.jpg' },
  { name: 'ECS Better Half Cafe',    logo: '/assets/clients/better-half.jpg' },
  { name: 'Beaconhouse',             logo: '/assets/clients/beaconhouse.png' },
  { name: 'Cambridge Grads Academy', logo: '/assets/clients/cga.jpg' },
  { name: 'Game Max',                logo: '/assets/clients/game-max.jpg' },
]

// Featured case-study cards. Order matches the marquee.
// `tag`   = headline service performed
// `title` = the result headline (one line)
// `desc`  = the engaging one-line description
// `metrics` = 3 small proof-point pills
export const FEATURED_CLIENTS = [
  {
    name: 'Alfatah',
    logo: '/assets/clients/alfatah.jpg',
    tag: 'Performance Marketing',
    title: 'Multiplied online sales across 40+ stores nationwide.',
    desc: 'Re-engineered Meta Ads funnels with conversion-led targeting that turned seasonal shoppers into repeat customers.',
    metrics: ['3× ROAS', '40+ stores', 'Repeat-buyer growth'],
  },
  {
    name: 'Milo',
    logo: '/assets/clients/milo.jpg',
    tag: 'Reels & Storytelling',
    title: 'Turned a beverage icon into a content engine.',
    desc: 'Produced reels and seasonal campaigns that became some of the brand\'s highest-engaging content online.',
    metrics: ['Mass organic reach', 'Multi-platform rollout', 'Family-first tone'],
  },
  {
    name: 'ECS Better Half Cafe',
    logo: '/assets/clients/better-half.jpg',
    tag: 'Performance Marketing',
    title: 'Turned local searches into walk-ins.',
    desc: 'Geo-targeted Meta Ads campaigns that made ECS the first stop for anyone searching "best cafe near me".',
    metrics: ['Geo-targeted ads', 'Walk-in lift', 'Local SEO boost'],
  },
  {
    name: 'Beaconhouse',
    logo: '/assets/clients/beaconhouse.png',
    tag: 'Digital Marketing & Content',
    title: 'Built year-round parent engagement across Pakistan.',
    desc: 'Designed content-led campaigns that gave Beaconhouse a steady pipeline of admissions inquiries instead of seasonal spikes.',
    metrics: ['Steady admissions pipeline', 'Pan-Pakistan reach', 'Trust-led tone'],
  },
  {
    name: 'Cambridge Grads Academy',
    logo: '/assets/clients/cga.jpg',
    tag: 'Website Development & SEO',
    title: 'A website that ranks, converts, and enrolls students.',
    desc: 'Designed and built a high-converting site from scratch, then optimized it for organic traffic and qualified student leads.',
    metrics: ['Built from scratch', 'Top SERP ranking', 'Qualified leads'],
  },
  {
    name: 'Game Max',
    logo: '/assets/clients/game-max.jpg',
    tag: 'Performance Marketing',
    title: 'Pulled measurable footfall into gaming arenas.',
    desc: 'Targeted Meta Ads campaigns that drove first-time and repeat visitors to Game Max venues across multiple cities.',
    metrics: ['Multi-city launch', 'Repeat visitors', 'Footfall-focused ads'],
  },
]

export const TESTIMONIALS = [
  { quote: '[Client testimonial will be provided here.]', name: '[Client Name]', role: '[Role / Company]' },
  { quote: '[Client testimonial will be provided here.]', name: '[Client Name]', role: '[Role / Company]' },
  { quote: '[Client testimonial will be provided here.]', name: '[Client Name]', role: '[Role / Company]' },
  { quote: '[Client testimonial will be provided here.]', name: '[Client Name]', role: '[Role / Company]' },
  { quote: '[Client testimonial will be provided here.]', name: '[Client Name]', role: '[Role / Company]' },
]

export const CONTACT = {
  email:    'thearchons1official@gmail.com',
  phone:    '+92 315 4981079',
  whatsapp: '+92 315 4981079',
  address:  'DHA Phase 7, Lahore, Pakistan',
  social: {
    instagram: 'https://www.instagram.com/thearchonsofficial/',
    linkedin:  '[linkedin url]',
    facebook:  '[facebook url]',
    x:         '[x url]',
  },
}

// WhatsApp click-to-chat number (digits only, with country code, no `+` or spaces).
export const WHATSAPP_NUMBER = '923154981079'

export const SERVICE_OPTIONS = [
  'Web Development',
  'App Development',
  'Performance Marketing',
  'Digital Marketing',
  'Meta Ads',
  'SEO',
  'Social Media Marketing',
  'AI Automation',
  'Other',
]
