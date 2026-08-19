import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Services from '../components/Services'
import About from '../components/About'
import Process from '../components/Process'
import Clients from '../components/Clients'
import Team from '../components/Team'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

/**
 * Landing page composition. Rendered at `/` by App.jsx via React Router.
 * Sections stay in the same order they did before routing was added.
 */
export default function Home() {
  return (
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
  )
}
