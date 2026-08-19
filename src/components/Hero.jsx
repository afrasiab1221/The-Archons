import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { smoothTo } from '../utils/smoothTo'
import { ensureLenis } from '../hooks/useLenis'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const HERO_HEADLINE = ['WE BUILD', 'DIGITAL EXPERIENCES', 'THAT GROW BRANDS.']
const SUBHEADLINE = 'Strategy. Technology. Marketing. Built for measurable growth.'

export default function Hero() {
  const rootRef = useRef(null)
  const videoRef = useRef(null)
  const videoWrapRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    const video = videoRef.current
    const wrap = videoWrapRef.current
    if (!video || !wrap) return

    let tl, parallaxST

    ensureLenis().then(() => {
      if (cancelled) return
      requestAnimationFrame(() => {
        if (cancelled) return
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const isMobile = window.matchMedia('(max-width: 900px), (pointer: coarse)').matches

        // Autoplay the video on loop. Video plays silently in background.
        if (video.paused) {
          video.loop = true
          video.muted = true
          video.playsInline = true
          video.play().catch(() => {})
        }

        // Reveal text on mount
        tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.hero__line', {
          y: '110%',
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
        })
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.9 }, '-=0.6')
        .from(ctaRef.current.children, { y: 30, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.5')
        .from(scrollHintRef.current, { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')

        if (!prefersReduced && !isMobile) {
          // Gentle parallax + scale on the video as you scroll past
          parallaxST = ScrollTrigger.create({
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            onUpdate: (self) => {
              const p = self.progress
              gsap.set(wrap, {
                y: p * 80,
                scale: 1 + p * 0.08,
              })
              gsap.set(titleRef.current, {
                opacity: 1 - p * 1.2,
                y: -p * 50,
              })
            },
          })
        }
      })
    })

    return () => {
      cancelled = true
      if (parallaxST) parallaxST.kill()
      if (tl) tl.kill()
    }
  }, [])

  return (
    <section id="home" className="hero" ref={rootRef}>
      <div className="hero__ambient" aria-hidden>
        <span className="glow hero__glow-1" />
        <span className="glow hero__glow-2" />
      </div>

      <div className="hero__video-wrap" ref={videoWrapRef}>
        <div className="hero__video-frame">
          <video
            ref={videoRef}
            className="hero__video"
            src="/assets/hero-video.mp4"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden
          />
          <div className="hero__video-overlay" aria-hidden />
          <div className="hero__video-borders" aria-hidden />
        </div>
      </div>

      <div className="hero__content container">
        <div className="eyebrow hero__eyebrow">
          <span>The Archons — Digital Marketing & Technology</span>
        </div>

        <h1 className="hero__title display" ref={titleRef}>
          {HERO_HEADLINE.map((line, i) => (
            <span className="hero__line-wrap" key={i}>
              <span className={`hero__line ${i === 1 ? 'gradient-text' : ''}`}>{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero__subtitle" ref={subtitleRef}>{SUBHEADLINE}</p>

        <div className="hero__ctas" ref={ctaRef}>
          <a
            href="#contact"
            className="btn btn--primary"
            data-cursor
            onClick={(e) => { e.preventDefault(); smoothTo('#contact') }}
          >
            Start a Project <span className="arrow">→</span>
          </a>
          <a
            href="#services"
            className="btn btn--ghost"
            data-cursor
            onClick={(e) => { e.preventDefault(); smoothTo('#services') }}
          >
            Explore Services
          </a>
        </div>
      </div>

      <div className="hero__scroll-hint" ref={scrollHintRef} aria-hidden>
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  )
}
