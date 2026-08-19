import { useEffect, useRef } from 'react'
import './Cursor.css'

const isCoarse = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (isCoarse()) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let rafId

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    }

    const interactiveSelector = '[data-cursor]'
    const onOver = (e) => {
      const t = e.target.closest(interactiveSelector)
      if (!t) return
      const mode = t.dataset.cursor
      ring.classList.add('is-active')
      if (mode === 'view')    label.textContent = 'VIEW'
      else if (mode === 'explore') label.textContent = 'EXPLORE'
      else if (mode === 'play')    label.textContent = 'PLAY'
      else if (mode === 'drag')    label.textContent = 'DRAG'
      else {
        label.textContent = ''
        ring.classList.add('is-button')
      }
    }
    const onOut = (e) => {
      const t = e.target.closest(interactiveSelector)
      if (!t) return
      ring.classList.remove('is-active', 'is-button')
      label.textContent = ''
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })

    // RAF loop for the ring follow
    const tick = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      label.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  if (isCoarse()) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={labelRef} className="cursor-label" aria-hidden />
    </>
  )
}
