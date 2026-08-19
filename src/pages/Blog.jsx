import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getAllPosts } from '../utils/posts'
import { ensureLenis } from '../hooks/useLenis'
import '../styles/blog.css'

gsap.registerPlugin(ScrollTrigger)

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Blog() {
  const rootRef = useRef(null)
  const posts = getAllPosts()

  useEffect(() => {
    let cancelled = false
    let ctx

    ensureLenis().then(() => {
      if (cancelled) return
      requestAnimationFrame(() => {
        if (cancelled) return
        ctx = gsap.context(() => {
          gsap.from('.blog__head > *', {
            scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
            y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          })
          gsap.from('.blog-post-card', {
            scrollTrigger: { trigger: '.blog__grid', start: 'top 80%' },
            y: 50, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
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
    <main className="blog" ref={rootRef}>
      <div className="container blog__head">
        <div className="eyebrow"><span>The Archons Journal</span></div>
        <h1 className="blog__title">
          Notes from the <span className="gradient-text">growth floor.</span>
        </h1>
        <p className="blog__lede muted">
          Practical playbooks, post-mortems, and field notes from the campaigns
          we run across performance marketing, content, and SEO.
        </p>
      </div>

      <div className="container">
        <div className="blog__grid">
          {posts.length === 0 ? (
            <p className="blog__empty">No posts yet — check back soon.</p>
          ) : (
            posts.map((p) => (
              <article className="blog-post-card" key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="blog-post-card__link">
                  <div className="blog-post-card__meta">
                    <time className="blog-post-card__date" dateTime={p.date}>
                      {formatDate(p.date)}
                    </time>
                    {p.readingTime && (
                      <span className="blog-post-card__time">· {p.readingTime}</span>
                    )}
                  </div>
                  <h2 className="blog-post-card__title">{p.title}</h2>
                  <p className="blog-post-card__excerpt">{p.excerpt}</p>
                  <div className="blog-post-card__foot">
                    <span className="blog-post-card__author">{p.author}</span>
                    <span className="blog-post-card__readmore">
                      Read article <span className="arrow">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
