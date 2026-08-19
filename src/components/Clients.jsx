import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CLIENT_LOGOS, FEATURED_CLIENTS } from '../data/content'
import { ensureLenis } from '../hooks/useLenis'
import './Clients.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Horizontally scrolling, seamless logo marquee.
 * Doubles the list once so the CSS keyframe translateX(-50%) loops cleanly.
 */
function ClientsMarquee() {
  const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <div className="clients__marquee" aria-label="Brands we have worked with">
      <div className="clients__marquee-track">
        {items.map((c, i) => (
          <div className="clients__logo" key={`${c.name}-${i}`} aria-hidden={i >= CLIENT_LOGOS.length}>
            <img src={c.logo} alt={c.name} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

function FeaturedCard({ client }) {
  return (
    <article className="featured" data-cursor>
      <div className="featured__logo">
        <img src={client.logo} alt={client.name} loading="lazy" />
      </div>
      <span className="featured__tag">{client.tag}</span>
      <h3 className="featured__title">{client.title}</h3>
      <p className="featured__desc">{client.desc}</p>
      <ul className="featured__metrics">
        {client.metrics.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </article>
  )
}

export default function Clients() {
  const rootRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let ctx
    ensureLenis().then(() => {
      if (cancelled) return
      requestAnimationFrame(() => {
        if (cancelled) return
        ctx = gsap.context(() => {
          gsap.from('.clients__head > *', {
            scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
            y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          })
          gsap.from('.featured', {
            scrollTrigger: { trigger: '.clients__featured', start: 'top 80%' },
            // Tiny lift + small stagger. The old `y: 60, stagger: 0.1`
            // produced a 1.4-second window where adjacent cards were at
            // very different y-positions (one at 0, one still translated).
            // With these values the max offset between any two cards at
            // any moment during the animation is ~1.6 px — invisible.
            y: 16,
            opacity: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
          })
        }, rootRef)
      })
    })
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section id="clients" className="clients section" ref={rootRef}>
      <div className="container clients__head">
        <div className="eyebrow"><span>Brands we have grown</span></div>
        <h2 className="clients__title">
          Real brands. <span className="gradient-text">Real results.</span>
        </h2>
        <p className="clients__lede muted">
          From national retail chains to local favorites — here's a look at
          some of the partnerships that shaped our work.
        </p>
      </div>

      <ClientsMarquee />

      <div className="container">
        <div className="clients__featured">
          {FEATURED_CLIENTS.map((c) => (
            <FeaturedCard key={c.name} client={c} />
          ))}
        </div>
      </div>
    </section>
  )
}
