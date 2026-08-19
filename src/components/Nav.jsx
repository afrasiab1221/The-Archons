import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data/content'
import { smoothTo } from '../utils/smoothTo'
import './Nav.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('home')
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      // ScrollSpy (uses Lenis scroll when available, otherwise native).
      // Only run on home — anchor IDs don't exist on /blog routes.
      if (!isHome) return
      const ids = NAV_LINKS.filter((l) => l.kind !== 'route').map((l) => l.href.replace('#', ''))
      const scrollY = window.__lenis ? window.__lenis.scroll : window.scrollY
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + scrollY
        if (top - scrollY <= 120) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  /**
   * Anchor links (Home, Services, …) smooth-scroll within the home page.
   * If we're on /blog or a post, we route back to / first, then the
   * browser will need to scroll to the anchor — Lenis smoothTo handles that
   * for us on subsequent click. Direct `/#services` from outside also works.
   */
  const handleAnchorClick = (e, href) => {
    e.preventDefault()
    if (!isHome) {
      // Navigate home; the <a href="#services"> remains usable on next click.
      window.location.href = '/' + href
      return
    }
    smoothTo(href)
    setMobileOpen(false)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    if (isHome) smoothTo('#home')
    else window.location.href = '/#home'
  }

  const renderLink = (l, i, extraClass = '') => {
    if (l.kind === 'route') {
      return (
        <Link
          key={`${l.href}-${i}`}
          to={l.href}
          className={`nav__link ${extraClass} ${location.pathname.startsWith(l.href) ? 'is-active' : ''}`}
          data-cursor
          onClick={() => setMobileOpen(false)}
        >
          {l.label}
        </Link>
      )
    }
    return (
      <a
        key={l.href}
        href={l.href}
        onClick={(e) => handleAnchorClick(e, l.href)}
        className={`nav__link ${extraClass} ${active === l.href.replace('#', '') ? 'is-active' : ''}`}
        data-cursor
      >
        {l.label}
      </a>
    )
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav__inner">
        <a
          href="/#home"
          className="nav__logo"
          data-cursor="view"
          aria-label="The Archons — home"
          onClick={handleLogoClick}
        >
          <img src="/assets/logo.png" alt="The Archons" />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((l, i) => renderLink(l, i))}
        </nav>

        <a
          href="#contact"
          className="btn btn--primary nav__cta"
          data-cursor
          onClick={(e) => {
            e.preventDefault()
            if (isHome) smoothTo('#contact')
            else window.location.href = '/#contact'
          }}
        >
          Start a Project <span className="arrow">→</span>
        </a>

        <button
          className={`nav__toggle ${mobileOpen ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          data-cursor
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav__mobile ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <nav>
          {NAV_LINKS.map((l, i) => {
            if (l.kind === 'route') {
              return (
                <Link
                  key={`${l.href}-mobile`}
                  to={l.href}
                  style={{ '--i': i }}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              )
            }
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleAnchorClick(e, l.href)}
                style={{ '--i': i }}
              >
                {l.label}
              </a>
            )
          })}
          <a
            href="#contact"
            className="btn btn--primary nav__mobile-cta"
            onClick={(e) => {
              e.preventDefault()
              if (isHome) smoothTo('#contact')
              else window.location.href = '/#contact'
            }}
          >
            Start a Project <span className="arrow">→</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
