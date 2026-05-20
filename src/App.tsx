import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import NetflixIntro from './components/NetflixIntro'
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
  const [introComplete, setIntroComplete] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div className="min-h-screen bg-bg">
      <NetflixIntro onComplete={() => setIntroComplete(true)} />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] origin-left"
        style={{
          scaleX,
          height: 3,
          background: 'linear-gradient(90deg, #cc2200, #ff4422)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <Navbar />
        <main>
          <Hero introComplete={introComplete} />
          <About />
          <Experience />
          <Projects />
          <StarredProjects />
          <Education />
          <Skills />
          <Recommendations />
          <Contact />
        </main>
      </motion.div>
    </div>
  )
}
