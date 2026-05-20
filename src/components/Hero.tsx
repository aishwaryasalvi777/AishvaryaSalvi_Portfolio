import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SLIDES = ['/profile.jpg', '/hero2.jpg', '/hero3.jpg', '/hero4.jpg']
const SLIDE_DURATION = 4000

const letterVariant = {
  hidden: { y: '115%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 0.65, delay: 0.5 + i * 0.04, ease: [0.16, 1, 0.3, 1] },
  }),
}

function SplitText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={className} style={{ ...style, display: 'inline-flex', gap: '0.01em' }}>
      {text.split('').map((char, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={letterVariant}
            custom={i}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Hero({ introComplete }: { introComplete: boolean }) {
  const [loaded, setLoaded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (!introComplete) return
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [introComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(i => (i + 1) % SLIDES.length)
    }, SLIDE_DURATION)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background — slideshow with crossfade + Ken Burns per slide */}
      <div className="absolute inset-0">
        {SLIDES.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            animate={{ opacity: i === activeSlide ? 1 : 0, scale: i === activeSlide ? 1.06 : 1 }}
            transition={{ opacity: { duration: 1.2, ease: 'easeInOut' }, scale: { duration: SLIDE_DURATION / 1000, ease: 'linear' } }}
            style={{ zIndex: i === activeSlide ? 1 : 0 }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover object-center"
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          </motion.div>
        ))}

        {/* Scan line — sweeps down once on load */}
        {loaded && (
          <motion.div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(204,34,0,0.6), transparent)', zIndex: 4 }}
            initial={{ top: '-1%' }}
            animate={{ top: '105%' }}
            transition={{ duration: 1.8, delay: 0.2, ease: 'linear' }}
          />
        )}

        {/* Base dark layer — tames bright outdoor photos */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.52)', zIndex: 2 }} />
        {/* Directional gradients */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(10,10,10,0.98) 30%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,0.25) 100%)',
          zIndex: 3,
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.6) 35%, transparent 65%)',
          zIndex: 3,
        }} />
      </div>

      {/* AISHFLIX side label */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: loaded ? 0.35 : 0, x: loaded ? 0 : 10 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="font-display font-black text-white text-sm tracking-[0.4em] uppercase">
          ← AISHFLIX
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-8 pb-24 pt-32 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* AISHFLIX branding */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -15 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3 mb-5"
        >
          <span
            className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase px-2 py-1"
            style={{ background: '#cc2200', color: '#fff' }}
          >
            AISHFLIX
          </span>
          <span className="font-mono text-[11px] text-[#a3a3a3] tracking-widest uppercase">
            ORIGINAL · 1 SEASON · 6 EPISODES
          </span>
        </motion.div>

        {/* Name — character reveal */}
        <motion.div
          initial="hidden"
          animate={loaded ? 'visible' : 'hidden'}
          className="mb-4"
          style={{ lineHeight: 0.88 }}
        >
          <div style={{ fontSize: 'clamp(4.5rem, 14vw, 11rem)', fontFamily: 'var(--font-display)', fontWeight: 900, textShadow: '0 4px 40px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)' }}>
            <div style={{ overflow: 'hidden' }}>
              <SplitText text="AISHVARYA" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <SplitText
                text="SALVI"
                style={{ color: '#fff' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-5"
        >
          <span className="match-badge flex items-center gap-1.5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            96% Match
          </span>
          <span className="font-mono text-xs text-[#a3a3a3]">2025</span>
          <span className="font-mono text-[10px] border border-[#a3a3a3] px-1.5 py-0.5 text-[#a3a3a3]">HD</span>
          <span className="font-mono text-[10px] border border-[#a3a3a3] px-1.5 py-0.5 text-[#a3a3a3]">AI · DATA</span>
          <span className="font-mono text-xs text-[#a3a3a3]">4+ Seasons</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="text-[#a3a3a3] text-sm leading-relaxed mb-8 max-w-lg"
        >
          An AI/Data Engineer with 4+ years architecting agentic LLM
          systems, RAG pipelines, and production ETL on Azure and AWS.
          Streaming explainable, auditable AI to non-technical stakeholders
          — and making it land.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-primary-nf">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            DOWNLOAD RESUME
          </a>
          <a href="#about" className="btn-secondary-nf">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            MORE INFO
          </a>
          <a href="#projects" className="btn-secondary-nf">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            MY LIST
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
