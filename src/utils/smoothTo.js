// Helper to scroll to a section smoothly using Lenis when available.
export function smoothTo(hash, offset = 80) {
  const id = (hash || '').replace('#', '')
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - offset

  if (window.__lenis) {
    window.__lenis.scrollTo(top, { duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) })
  } else {
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
