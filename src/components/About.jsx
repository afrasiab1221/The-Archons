import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureLenis } from '../hooks/useLenis'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const rootRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let ctx
    ensureLenis().then(() => {
      if (cancelled) return
      requestAnimationFrame(() => {
        if (cancelled) return
        ctx = gsap.context(() => {
          gsap.from('.about__line', {
            scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'power3.out',
          })

          gsap.from('.about__stat', {
            scrollTrigger: { trigger: '.about__stats', start: 'top 80%' },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
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
    <section id="about" className="about section" ref={rootRef}>
      <div className="container about__grid">
        <div className="about__heading">
          <div className="eyebrow"><span>About the agency</span></div>
          <h2 className="about__title">
            A digital marketing & technology agency <span className="gradient-text">built for measurable growth.</span>
          </h2>
        </div>

        <div className="about__body">
          <p className="about__line">
            The Archons is a digital marketing and technology agency focused on helping businesses
            grow through powerful digital experiences, performance-driven marketing, and modern
            technology.
          </p>
          <p className="about__line soft">
            From websites and applications to paid advertising and digital strategy, we combine
            creativity, technology and measurable performance to turn ideas into meaningful
            business results.
          </p>
        </div>
      </div>

      <div className="container about__stats">
        <div className="about__stat">
          <span className="about__stat-num gradient-text">Strategy</span>
          <span className="about__stat-label">Positioned with intent</span>
        </div>
        <div className="about__stat">
          <span className="about__stat-num gradient-text">Technology</span>
          <span className="about__stat-label">Built on modern stacks</span>
        </div>
        <div className="about__stat">
          <span className="about__stat-num gradient-text">Performance</span>
          <span className="about__stat-label">Measured at every step</span>
        </div>
        <div className="about__stat">
          <span className="about__stat-num gradient-text">Design</span>
          <span className="about__stat-label">Considered, cinematic</span>
        </div>
      </div>
    </section>
  )
}
