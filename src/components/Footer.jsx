import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../data/content'
import { CONTACT, WHATSAPP_NUMBER } from '../data/content'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  /**
   * Render sitemap entries. Anchor links render as <a>, route links
   * (kind: 'route', e.g. /blog) render with React Router's <Link> so
   * navigation stays in-page.
   */
  const renderSitemapLink = (l) => {
    if (l.kind === 'route') {
      return <Link key={l.href} to={l.href} data-cursor>{l.label}</Link>
    }
    return <a key={l.href} href={l.href} data-cursor>{l.label}</a>
  }

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" data-cursor="view">
            <img src="/assets/logo.png" alt="The Archons" />
          </Link>
          <p className="footer__tag">Strategy. Technology. Growth.</p>
        </div>

        <div className="footer__col">
          <span className="footer__label">Sitemap</span>
          <nav>
            {NAV_LINKS.map(renderSitemapLink)}
          </nav>
        </div>

        <div className="footer__col">
          <span className="footer__label">Social</span>
          <nav>
            <a href={CONTACT.social.instagram} data-cursor>Instagram</a>
            <a href={CONTACT.social.linkedin}  data-cursor>LinkedIn</a>
            <a href={CONTACT.social.facebook}  data-cursor>Facebook</a>
            <a href={CONTACT.social.x}         data-cursor>X</a>
          </nav>
        </div>

        <div className="footer__col">
          <span className="footer__label">Reach us</span>
          <nav>
            <a href={`mailto:${CONTACT.email}`} data-cursor>{CONTACT.email}</a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
            >
              {CONTACT.whatsapp}
            </a>
          </nav>
        </div>
      </div>

      <div className="footer__big" aria-hidden>
        THE ARCHONS
      </div>

      <div className="container footer__bottom">
        <span>© {year} The Archons. All rights reserved.</span>
        <span className="footer__meta">Performance Marketing. Perfected.</span>
      </div>
    </footer>
  )
}
