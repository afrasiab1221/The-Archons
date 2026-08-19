import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Loader.css'

export default function Loader({ onDone }) {
  const rootRef = useRef(null)
  const barRef = useRef(null)
  const numRef = useRef(null)

  useEffect(() => {
    const num = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => onDone?.(),
        })
      },
    })

    tl.from('.loader__mark', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' })
      .from('.loader__label', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to(barRef.current, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, '-=0.6')
      .to(num, {
        v: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (numRef.current) numRef.current.textContent = `${Math.round(num.v)}%`
        },
      }, '<')
      .to('.loader__mark, .loader__label, .loader__bar, .loader__num', {
        y: -20, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.in',
      }, '+=0.2')
  }, [onDone])

  return (
    <div className="loader" ref={rootRef}>
      <div className="loader__mark">THE ARCHONS</div>
      <div className="loader__label">Loading the experience</div>
      <div className="loader__bar">
        <div className="loader__bar-fill" ref={barRef} />
      </div>
      <div className="loader__num" ref={numRef}>0%</div>
    </div>
  )
}
