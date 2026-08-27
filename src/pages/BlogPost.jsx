import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getPostBySlug } from '../utils/posts'
import { ensureLenis } from '../hooks/useLenis'
import { smoothTo } from '../utils/smoothTo'
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

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  const rootRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let ctx

    ensureLenis().then(() => {
      if (cancelled) return
      requestAnimationFrame(() => {
        if (cancelled) return
        // Always scroll to top when a post mounts (so opening a deep-link
        // doesn't leave you mid-page).
        if (typeof window !== 'undefined') window.scrollTo({ top: 0 })

        ctx = gsap.context(() => {
          gsap.from('.blog-post__head > *', {
            y: 30, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          })
          gsap.from('.blog-post__body > *', {
            scrollTrigger: { trigger: '.blog-post__body', start: 'top 85%' },
            y: 30, opacity: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out',
          })
        }, rootRef)
      })
    })

    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [slug])

  if (!post) {
    return (
      <main className="blog blog-post" ref={rootRef}>
        <div className="container">
          <div className="blog-post__missing">
            <h1>Post not found</h1>
            <p className="muted">That URL doesn't match any of our posts.</p>
            <Link to="/blog" className="btn btn--primary" data-cursor>
              Back to the journal <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="blog blog-post" ref={rootRef}>
      <article className="container">
        <header className="blog-post__head">
          <Link to="/blog" className="blog-post__back" data-cursor>
            <span className="arrow-back">←</span> Back to all posts
          </Link>
          <div className="blog-post__meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.readingTime && <span> · {post.readingTime}</span>}
          </div>
          <h1 className="blog-post__title">{post.title}</h1>
          <p className="blog-post__excerpt">{post.excerpt}</p>
          <div className="blog-post__author">
            <div className="blog-post__author-name">{post.author}</div>
            {post.authorRole && (
              <div className="blog-post__author-role muted">{post.authorRole}</div>
            )}
          </div>
        </header>

        <div className="blog-post__body prose">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>

        {/* Featured cover image — rendered at the bottom of the body so it
            doesn't compete with the title block, but only when `cover` is
            set in frontmatter. */}
        {post.cover && (
          <figure className="blog-post__cover">
            <img src={post.cover} alt={post.title} loading="lazy" />
            {post.coverCaption && (
              <figcaption className="muted">{post.coverCaption}</figcaption>
            )}
          </figure>
        )}

        <footer className="blog-post__foot">
          <Link
            to="/#contact"
            className="btn btn--primary"
            data-cursor
            onClick={(e) => {
              // If we're already on home, smooth-scroll. Otherwise, navigate.
              if (window.location.pathname === '/') {
                e.preventDefault()
                smoothTo('#contact')
              }
            }}
          >
            Work with us <span className="arrow">→</span>
          </Link>
          <Link to="/blog" className="btn btn--ghost" data-cursor>
            More posts
          </Link>
        </footer>
      </article>
    </main>
  )
}
