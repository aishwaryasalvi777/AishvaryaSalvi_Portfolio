import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import StarredProjects from './components/StarredProjects'
import Education from './components/Education'
import Skills from './components/Skills'
import Recommendations from './components/Recommendations'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <StarredProjects />
        <Education />
        <Skills />
        <Recommendations />
        <Contact />
      </main>
    </div>
  )
}
