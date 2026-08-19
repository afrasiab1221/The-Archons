import { useEffect } from 'react'
import { ensureLenis } from './useLenis'

/**
 * Guarantees Lenis and ScrollTrigger are wired up before running any
 * animation setup. Use this in components that create ScrollTriggers.
 *
 *   useGsapReady(() => {
 *     // any scroll-trigger setup here
 *     return () => { /* cleanup */ }
 *   }, [deps])
 */
export default function useGsapReady(setup, deps = []) {
  useEffect(() => {
    let cancelled = false
    let cleanup
    ensureLenis().then(() => {
      if (cancelled) return
      // Wait one frame so proxy is fully applied
      requestAnimationFrame(() => {
        if (cancelled) return
        cleanup = setup()
      })
    })
    return () => {
      cancelled = true
      if (typeof cleanup === 'function') cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
