import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS } from '../data/content'
import { ensureLenis } from '../hooks/useLenis'
import './Stats.css'

gsap.registerPlugin(ScrollTrigger)


/* ============================================================
   FORMAT STAT
   ============================================================ */

function formatStat(n, suffix) {
  const rounded = Math.round(n)

  if (suffix === 'M+') {
    return `${rounded}M+`
  }

  return `${rounded}${suffix}`
}


/* ============================================================
   COUNTER ANIMATION
   ============================================================ */

function animateCounter(
  el,
  target,
  suffix,
  duration = 2000
) {
  /*
   * If this counter is already running,
   * stop the previous animation first.
   */
  if (el._rafId) {
    cancelAnimationFrame(el._rafId)
    el._rafId = null
  }

  const start = performance.now()

  /*
   * Always restart from zero.
   */
  el.textContent = formatStat(0, suffix)


  const tick = (now) => {
    const elapsed = now - start

    const progress = Math.min(
      1,
      elapsed / duration
    )

    /*
     * easeOutCubic
     */
    const eased =
      1 - Math.pow(1 - progress, 3)

    const currentValue =
      eased * target

    el.textContent = formatStat(
      currentValue,
      suffix
    )


    if (progress < 1) {
      el._rafId =
        requestAnimationFrame(tick)
    } else {
      /*
       * Make sure final value is exact.
       */
      el.textContent =
        formatStat(target, suffix)

      el._rafId = null
    }
  }


  el._rafId =
    requestAnimationFrame(tick)
}


/* ============================================================
   RESET COUNTERS
   ============================================================ */

function resetCounters(counterEls) {
  counterEls.forEach((el, index) => {
    /*
     * Stop any existing animation.
     */
    if (el._rafId) {
      cancelAnimationFrame(el._rafId)
      el._rafId = null
    }

    /*
     * Reset to zero.
     */
    const stat = STATS[index]

    if (stat) {
      el.textContent =
        formatStat(0, stat.suffix)
    }
  })
}


/* ============================================================
   START ALL COUNTERS
   ============================================================ */

function startCounters(counterEls) {
  STATS.forEach((stat, index) => {
    const el = counterEls[index]

    if (!el) return

    animateCounter(
      el,
      stat.value,
      stat.suffix,
      2000
    )
  })
}


/* ============================================================
   STATS COMPONENT
   ============================================================ */

export default function Stats() {
  const rootRef = useRef(null)


  useEffect(() => {
    let cancelled = false
    let ctx = null


    ensureLenis().then(() => {
      if (cancelled) return


      requestAnimationFrame(() => {
        if (cancelled) return


        const section = rootRef.current

        if (!section) return


        /*
         * ======================================================
         * GET COUNTER ELEMENTS
         * ======================================================
         */

        const counterEls = Array.from(
          section.querySelectorAll(
            '.stat__value'
          )
        )


        if (
          counterEls.length !==
          STATS.length
        ) {
          console.warn(
            'Stats: number of counter elements does not match STATS data.'
          )

          return
        }


        /*
         * ======================================================
         * GSAP
         * ======================================================
         */

        ctx = gsap.context(() => {

          /*
           * ----------------------------------------------------
           * HEADER REVEAL
           * ----------------------------------------------------
           */

          gsap.from(
            '.stats__head > *',
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions:
                  'play none none reverse',
              },

              y: 40,

              opacity: 0,

              duration: 0.8,

              stagger: 0.08,

              ease: 'power3.out',
            }
          )


          /*
           * ----------------------------------------------------
           * CARD REVEAL
           * ----------------------------------------------------
           */

          gsap.from(
            '.stat',
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions:
                  'play none none reverse',
              },

              opacity: 0,

              duration: 0.7,

              stagger: 0.1,

              ease: 'power3.out',
            }
          )


          /*
           * ====================================================
           * COUNTER SCROLL TRIGGER
           * ====================================================
           *
           * IMPORTANT:
           *
           * onEnter     = scrolling DOWN into section
           *
           * onEnterBack = scrolling UP back into section
           *
           * Therefore the counters run EVERY TIME
           * the section comes back into view.
           */

          ScrollTrigger.create({
            trigger: section,

            start: 'top 80%',

            end: 'bottom 20%',

            onEnter: () => {
              resetCounters(counterEls)

              requestAnimationFrame(() => {
                startCounters(counterEls)
              })
            },

            onEnterBack: () => {
              resetCounters(counterEls)

              requestAnimationFrame(() => {
                startCounters(counterEls)
              })
            },

            /*
             * When leaving the viewport,
             * reset the numbers to zero.
             *
             * This makes the next entrance feel
             * like a completely fresh counter animation.
             */
            onLeave: () => {
              resetCounters(counterEls)
            },

            onLeaveBack: () => {
              resetCounters(counterEls)
            },
          })

        }, section)


        /*
         * ======================================================
         * REFRESH SCROLLTRIGGER
         * ======================================================
         *
         * Useful with Lenis because the page dimensions
         * may not be fully settled immediately.
         */

        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      })
    })


    /*
     * ==========================================================
     * CLEANUP
     * ==========================================================
     */

    return () => {
      cancelled = true


      /*
       * Remove GSAP / ScrollTriggers.
       */
      if (ctx) {
        ctx.revert()
      }


      /*
       * Stop counters.
       */
      const counterEls =
        rootRef.current?.querySelectorAll(
          '.stat__value'
        ) || []


      counterEls.forEach((el) => {
        if (el._rafId) {
          cancelAnimationFrame(
            el._rafId
          )

          el._rafId = null
        }
      })
    }

  }, [])


  /*
   * ============================================================
   * JSX
   * ============================================================
   */

  return (
    <section
      id="stats"
      className="stats section"
      ref={rootRef}
    >

      <div className="container">

        {/* HEADER */}

        <div className="stats__head">

          <div className="eyebrow">
            <span>
              By the numbers
            </span>
          </div>


          <h2 className="stats__title">

            Results you can{' '}

            <span className="gradient-text">
              measure.
            </span>

          </h2>

        </div>


        {/* STAT CARDS */}

        <div className="stats__grid">

          {STATS.map((stat, index) => (

            <div
              className="stat"
              key={index}
            >

              <span className="stat__value">
                {formatStat(
                  0,
                  stat.suffix
                )}
              </span>


              <span className="stat__label">
                {stat.label}
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}