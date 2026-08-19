import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { PROCESS } from '../data/content'
import { ensureLenis } from '../hooks/useLenis'
import './Process.css'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default function Process() {
  const rootRef = useRef(null)
  const pathRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let ctx
    ensureLenis().then(() => {
      if (cancelled) return
      requestAnimationFrame(() => {
        if (cancelled) return
        const path = pathRef.current
        if (!path) return

        ctx = gsap.context(() => {
          const length = path.getTotalLength()
          path.style.strokeDasharray = length
          path.style.strokeDashoffset = length

          gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 80%',
              end: '+=1000',
              scrub: true,
            },
          })

          gsap.to(dotRef.current, {
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
            },
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 80%',
              end: '+=1000',
              scrub: true,
            },
          })

          const steps = gsap.utils.toArray('.process__step')
          steps.forEach((step) => {
            gsap.from(step, {
              y: 60,
              opacity: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: step, start: 'top 80%' },
            })
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
    <section className="process section" ref={rootRef} id="process">
      <div className="container">
        <div className="process__head">
          <div className="eyebrow"><span>How we work</span></div>
          <h2 className="process__title">
            From idea to scale — <span className="gradient-text">a system, not a guess.</span>
          </h2>
          <p className="process__lede muted">
            A clear, repeatable process that takes a business from first conversation
            to measurable, compounding growth.
          </p>
        </div>

        <div className="process__board">
          <svg className="process__svg" viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="processGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#006080" />
                <stop offset="50%" stopColor="#58B0A0" />
                <stop offset="100%" stopColor="#7FD4C4" />
              </linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="4" /></filter>
            </defs>
            <path
              ref={pathRef}
              d="M 80 250 C 240 80, 380 80, 540 250 S 840 420, 1120 250"
              stroke="url(#processGrad)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
            />
          </svg>
          <div className="process__dot" ref={dotRef}>
            <span /><span className="process__dot-core" />
          </div>

          {PROCESS.map((p, i) => (
            <article className="process__step" key={p.n} data-i={i}>
              <span className="process__step-n gradient-text">{p.n}</span>
              <h3 className="process__step-title">{p.title}</h3>
              <p className="process__step-desc">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
