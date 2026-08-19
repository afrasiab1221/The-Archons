// Minimal inline SVG icons. Lightweight, no extra dependency.

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const icons = {
  web: (
    <svg viewBox="0 0 48 48" width="42" height="42" {...stroke}>
      <rect x="6" y="9" width="36" height="26" rx="2" />
      <path d="M6 14h36" />
      <circle cx="10" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="13" cy="11.5" r="0.8" fill="currentColor" />
      <path d="M18 39h12M22 35v4M26 35v4" />
      <path d="M16 22l4 4 8-8 4 4" />
    </svg>
  ),
  app: (
    <svg viewBox="0 0 48 48" width="42" height="42" {...stroke}>
      <rect x="14" y="6" width="20" height="36" rx="3" />
      <path d="M22 36h4" />
      <path d="M19 11h10" />
      <path d="M20 18h8M20 22h8M20 26h5" />
    </svg>
  ),
  perf: (
    <svg viewBox="0 0 48 48" width="42" height="42" {...stroke}>
      <path d="M6 38h36" />
      <path d="M10 32l8-12 6 8 8-16 6 10" />
      <circle cx="10" cy="32" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
      <circle cx="24" cy="28" r="1.5" fill="currentColor" />
      <circle cx="32" cy="12" r="1.5" fill="currentColor" />
      <circle cx="38" cy="22" r="1.5" fill="currentColor" />
    </svg>
  ),
  digital: (
    <svg viewBox="0 0 48 48" width="42" height="42" {...stroke}>
      <circle cx="24" cy="24" r="16" />
      <path d="M24 8v32M8 24h32M12 14c4 6 8 10 12 10s8-4 12-10M12 34c4-6 8-10 12-10s8 4 12 10" />
    </svg>
  ),
  meta: (
    <svg viewBox="0 0 48 48" width="42" height="42" {...stroke}>
      <path d="M24 12c-6 0-10 3-12 8s-2 10 2 12 8 0 10-4 2-10 0-12" />
      <path d="M24 12c6 0 10 3 12 8s2 10-2 12-8 0-10-4-2-10 0-12" />
      <circle cx="16" cy="34" r="3" />
      <circle cx="32" cy="34" r="3" />
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 48 48" width="42" height="42" {...stroke}>
      <circle cx="20" cy="20" r="10" />
      <path d="M28 28l10 10" />
      <path d="M16 20l3 3 5-6" />
    </svg>
  ),
  smm: (
    <svg viewBox="0 0 48 48" width="42" height="42" {...stroke}>
      <path d="M8 14c4-2 8-2 12 0M8 20c4-2 8-2 12 0M8 26c4-2 8-2 12 0" />
      <circle cx="32" cy="16" r="6" />
      <circle cx="38" cy="32" r="5" />
      <path d="M27 31l5-2 5 2v6l-5 2-5-2z" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 48 48" width="42" height="42" {...stroke}>
      <circle cx="10" cy="12" r="3" />
      <circle cx="38" cy="12" r="3" />
      <circle cx="10" cy="36" r="3" />
      <circle cx="38" cy="36" r="3" />
      <circle cx="24" cy="24" r="4" />
      <path d="M13 14l8 8M35 14l-8 8M13 34l8-8M35 34l-8-8" />
    </svg>
  ),
}

export default function ServiceIcon({ name }) {
  return icons[name] || icons.web
}
