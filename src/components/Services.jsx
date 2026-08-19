import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '../data/content'
import { ensureLenis } from '../hooks/useLenis'
import { openWhatsApp } from '../utils/whatsapp'
import ServiceIcon from './ServiceIcon'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const pinRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let ctx

    ensureLenis().then(() => {
      if (cancelled) return
      requestAnimationFrame(() => {
        if (cancelled) return
        const track = trackRef.current
        const pin = pinRef.current
        if (!track || !pin) return

        ctx = gsap.context(() => {
          const mm = gsap.matchMedia()

          mm.add('(min-width: 901px)', () => {
            const getDistance = () => track.scrollWidth - window.innerWidth + 64
            const progressBar = pin.querySelector('.services__progress-bar')

            const tween = gsap.to(track, {
              x: () => -getDistance(),
              ease: 'none',
              scrollTrigger: {
                trigger: pin,
                start: 'top top',
                end: () => `+=${getDistance()}`,
                pin: true,
                scrub: 0.5,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                  if (progressBar) progressBar.style.width = `${self.progress * 100}%`
                },
              },
            })

            const cards = gsap.utils.toArray('.svc-card')
            cards.forEach((card) => {
              gsap.from(
                card.querySelectorAll('.svc-card__head, .svc-card__tag, .svc-card__title, .svc-card__tagline, .svc-card__foot'),
                {
                  y: 60,
                  opacity: 0,
                  stagger: 0.06,
                  duration: 0.9,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: tween,
                    start: 'left right',
                    end: 'left center',
                    scrub: 0.5,
                  },
                },
              )
            })
          })

          mm.add('(max-width: 900px)', () => {
            const cards = gsap.utils.toArray('.svc-card')
            cards.forEach((card) => {
              gsap.from(card, {
                y: 80,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 80%' },
              })
            })
          })
        }, pinRef)
      })
    })

    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section id="services" className="services">
      <div className="container services__intro">
        <div className="eyebrow"><span>What we do</span></div>
        <h2 className="services__title">
          Eight practices. <span className="gradient-text">One growth system.</span>
        </h2>
        <p className="services__lede muted">
          From websites and apps to paid media and AI automation, we build the systems that
          move a business from visibility to measurable growth.
        </p>
      </div>

      <div className="services__pin" ref={pinRef}>
        <div className="services__track" ref={trackRef}>
          {SERVICES.map((s) => (
            <article
              className="svc-card"
              key={s.id}
              data-cursor="explore"
              role="button"
              tabIndex={0}
              aria-label={`Chat on WhatsApp about ${s.title}`}
              onClick={() => openWhatsApp(s.whatsappMessage)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openWhatsApp(s.whatsappMessage)
                }
              }}
            >
              <div className="svc-card__head">
                <span className="svc-card__line">{s.n}</span>
                <div className="svc-card__icon">
                  <ServiceIcon name={s.icon} />
                </div>
              </div>
              <span className="svc-card__tag">SERVICE</span>
              <h3 className="svc-card__title">{s.title}</h3>
              <p className="svc-card__tagline">{s.tagline}</p>
              <div className="svc-card__foot">
                <span className="svc-card__explore">Chat on WhatsApp <span className="arrow">→</span></span>
              </div>
            </article>
          ))}
        </div>

        <div className="services__progress" aria-hidden>
          <span className="services__progress-bar" />
        </div>
      </div>
    </section>
  )
}
