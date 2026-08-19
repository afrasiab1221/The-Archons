import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (!loaded) return
    requestAnimationFrame(() => ScrollTrigger.refresh())
    setTimeout(() => ScrollTrigger.refresh(), 400)
  }, [loaded])

  /**
   * When the route changes (e.g. user clicks "Blog", or visits a post
   * directly), kill all existing ScrollTriggers and reset Lenis so the
   * new page starts clean — no stale pinned sections from the previous
   * route bleeding into this one.
   */
  useEffect(() => {
    return () => {
      // Clean up all ScrollTriggers when App unmounts or route changes
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [location.pathname])

  /**
   * Scroll to the top on every route change so deep-links to /blog/post
   * don't open mid-page.
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Cursor />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}
