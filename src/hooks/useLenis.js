import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisRef = null
let initPromise = null
let tickFn = null
let teardown = null

/**
 * Initialize Lenis exactly once. Safe to call from anywhere — guarantees
 * that ScrollTrigger.create() calls after this returns will see the
 * scrollerProxy and the ticking raf already wired up.
 */
export function ensureLenis() {
  if (lenisRef) return initPromise
  if (initPromise) return initPromise

  initPromise = (async () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return null

    const isCoarse = window.matchMedia('(pointer: coarse)').matches

    const lenis = new Lenis({
      duration: isCoarse ? 0 : 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isCoarse,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      lerp: isCoarse ? 0.12 : 0.1,
    })

    lenisRef = lenis
    window.__lenis = lenis

    // 1. Single shared RAF loop. Lenis shares gsap.ticker.
    tickFn = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickFn)
    gsap.ticker.lagSmoothing(0)

    // 2. ScrollTrigger listens to Lenis.
    lenis.on('scroll', ScrollTrigger.update)

    // 3. scrollerProxy so pin/scrub use the smoothed scroll.
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
          return value
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
      pinType: 'transform',
    })

    // 4. Refresh on resize / load.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    window.addEventListener('resize', refresh)
    const ro = new ResizeObserver(refresh)
    ro.observe(document.body)

    // 5. Pause when tab hidden.
    const onVisibility = () => {
      if (document.hidden) gsap.ticker.remove(tickFn)
      else gsap.ticker.add(tickFn)
    }
    document.addEventListener('visibilitychange', onVisibility)

    setTimeout(() => ScrollTrigger.refresh(), 400)

    teardown = () => {
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', refresh)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      if (tickFn) gsap.ticker.remove(tickFn)
      lenis.destroy()
    }

    return lenis
  })()

  return initPromise
}

/**
 * Hook form: ensures Lenis is initialized on mount, and refreshes
 * ScrollTrigger once everything is settled.
 */
export default function useLenis() {
  useEffect(() => {
    let cancelled = false
    ensureLenis().then(() => {
      if (cancelled) return
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        setTimeout(() => ScrollTrigger.refresh(), 250)
      })
    })

    return () => { cancelled = true }
  }, [])
}
