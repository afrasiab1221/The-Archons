import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Services from '../components/Services'
import About from '../components/About'
import Process from '../components/Process'
import Clients from '../components/Clients'
import Team from '../components/Team'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Cursor from '../components/Cursor'

/**
 * Landing page composition. Rendered at `/` by App.jsx via React Router.
 * Sections stay in the same order they did before routing was added.
 *
 * The Cursor follows the mouse on every page; we mount it here so it
 * doesn't render on the /blog routes (lighter page, no custom cursor).
 */
export default function Home() {
  return (
    <>
      <Cursor />
      <main>
        <Hero />
        <Stats />
        <Services />
        <About />
        <Process />
        <Clients />
        <Team />
        <Testimonials />
        <Contact />
      </main>
    </>
  )
}
