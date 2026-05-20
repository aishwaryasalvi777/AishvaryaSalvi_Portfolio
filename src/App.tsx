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

      {/* Ambient glow blobs — fixed, behind everything */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Red — top center (hero area) */}
        <div style={{
          position: 'absolute', top: '-5%', left: '25%',
          width: 900, height: 700,
          background: 'radial-gradient(ellipse, rgba(204,34,0,0.055) 0%, transparent 70%)',
          filter: 'blur(80px)', transform: 'translateZ(0)',
        }} />
        {/* Blue — mid right (experience / projects) */}
        <div style={{
          position: 'absolute', top: '30%', right: '-8%',
          width: 700, height: 800,
          background: 'radial-gradient(ellipse, rgba(53,114,165,0.045) 0%, transparent 70%)',
          filter: 'blur(100px)', transform: 'translateZ(0)',
        }} />
        {/* Purple — mid left (skills) */}
        <div style={{
          position: 'absolute', top: '58%', left: '-8%',
          width: 700, height: 700,
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.04) 0%, transparent 70%)',
          filter: 'blur(100px)', transform: 'translateZ(0)',
        }} />
        {/* Teal — bottom right (recommendations / contact) */}
        <div style={{
          position: 'absolute', bottom: '-5%', right: '15%',
          width: 650, height: 550,
          background: 'radial-gradient(ellipse, rgba(0,201,177,0.035) 0%, transparent 70%)',
          filter: 'blur(90px)', transform: 'translateZ(0)',
        }} />
      </div>

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
        className="relative"
        style={{ zIndex: 1 }}
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
