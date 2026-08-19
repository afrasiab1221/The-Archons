import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TESTIMONIALS } from '../data/content'
import { ensureLenis } from '../hooks/useLenis'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const rootRef = useRef(null)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    let cancelled = false
    let ctx
    ensureLenis().then(() => {
      if (cancelled) return
      requestAnimationFrame(() => {
        if (cancelled) return
        ctx = gsap.context(() => {
          gsap.from('.testi__title', {
            scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
            y: 60, opacity: 0, duration: 1, ease: 'power3.out',
          })
        }, rootRef)
      })
    })
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 6500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="testi section" ref={rootRef} id="testimonials">
      <div className="container">
        <div className="testi__head">
          <div className="eyebrow"><span>What clients say</span></div>
          <h2 className="testi__title">
            Trusted by ambitious teams <span className="gradient-text">to build what others won't.</span>
          </h2>
        </div>

        <div className="testi__viewport">
          {TESTIMONIALS.map((t, i) => (
            <figure
              className={`testi__card ${i === idx ? 'is-active' : ''}`}
              key={i}
              aria-hidden={i !== idx}
            >
              <span className="testi__quote-mark" aria-hidden>"</span>
              <blockquote className="testi__quote">{t.quote}</blockquote>
              <figcaption className="testi__cap">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="testi__dots" role="tablist">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testi__dot ${i === idx ? 'is-active' : ''}`}
              onClick={() => setIdx(i)}
              aria-label={`Show testimonial ${i + 1}`}
              data-cursor
            />
          ))}
        </div>
      </div>
    </section>
  )
}
