import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TEAM } from '../data/content'
import { ensureLenis } from '../hooks/useLenis'
import './Team.css'

gsap.registerPlugin(ScrollTrigger)

export default function Team() {
  const rootRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let ctx
    ensureLenis().then(() => {
      if (cancelled) return
      requestAnimationFrame(() => {
        if (cancelled) return
        ctx = gsap.context(() => {
          gsap.from('.team__title', {
            scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
            y: 60, opacity: 0, duration: 1, ease: 'power3.out',
          })
          gsap.from('.team-card', {
            scrollTrigger: { trigger: '.team__grid', start: 'top 80%' },
            y: 60, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out',
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
    <section className="team section" ref={rootRef} id="team">
      <div className="container">
        <div className="team__head">
          <div className="eyebrow"><span>The team</span></div>
          <h2 className="team__title">
            A small, focused team <span className="gradient-text">that thinks like owners.</span>
          </h2>
        </div>

        <div className="team__grid">
          {TEAM.map((m, i) => (
            <article
              className={`team-card${m.empty ? ' team-card--empty' : ''}`}
              key={i}
              data-cursor
            >
              <div className="team-card__avatar" aria-hidden>
                {m.image ? (
                  <img className="team-card__img" src={m.image} alt="" loading="lazy" />
                ) : (
                  <>
                    <div className="team-card__avatar-ring" />
                    <div className="team-card__avatar-core">
                      <span className="team-card__avatar-glyph">?</span>
                    </div>
                  </>
                )}
                {m.empty && <span className="team-card__badge">Coming soon</span>}
              </div>
              <div className="team-card__meta">
                <span className="team-card__name">{m.name}</span>
                <span className="team-card__role">{m.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
