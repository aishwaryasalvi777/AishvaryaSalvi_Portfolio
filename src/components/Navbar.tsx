import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/95 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
    >
      <div className="max-w-[1400px] mx-auto px-8 h-14 flex items-center justify-between">
        {/* Left — availability status */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cc2200] flex-shrink-0" />
          Available · May 2026 &nbsp;·&nbsp; Buffalo, NY
        </div>

        {/* Right — nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-display font-semibold text-sm text-[#a3a3a3] hover:text-white tracking-wide transition-colors duration-150 uppercase"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/aishwaryasalvi777"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-[#a3a3a3] hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </li>
        </ul>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-4">
          <span className="font-display font-black text-white text-lg tracking-tight">AS</span>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#a3a3a3]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg/98 backdrop-blur-md"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="px-8 py-4 flex flex-col gap-4">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-bold text-[#a3a3a3] hover:text-white uppercase tracking-wide text-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
