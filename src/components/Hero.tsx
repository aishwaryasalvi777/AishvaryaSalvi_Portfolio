import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t) }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background — headshot with dark overlay */}
      <div className="absolute inset-0">
        <img
          src="/profile.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
        {/* Netflix-style gradient overlays */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(10,10,10,0.95) 40%, rgba(10,10,10,0.5) 70%, rgba(10,10,10,0.2) 100%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.4) 40%, transparent 70%)',
        }} />
      </div>

      {/* AISHFLIX side label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 0.4 : 0 }}
        transition={{ delay: 1.5 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="font-display font-black text-white text-sm tracking-[0.4em] uppercase">
          ← AISHFLIX
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pb-24 pt-32 w-full">
        {/* AISHFLIX branding */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
          transition={{ delay: 0.3 }}
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

        {/* Name */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="font-display font-black text-white leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(4.5rem, 14vw, 11rem)' }}
            initial={{ y: '100%' }}
            animate={{ y: loaded ? '0%' : '100%' }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            AISHVARYA<br />SALVI
          </motion.h1>
        </div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap items-center gap-3 mb-5"
        >
          <span className="match-badge flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
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
          transition={{ delay: 1.1 }}
          className="text-[#a3a3a3] text-sm leading-relaxed mb-8 max-w-lg"
        >
          An AI/Data Engineer with 4+ years architecting agentic LLM
          systems, RAG pipelines, and production ETL on Azure and AWS.
          Streaming explainable, auditable AI to non-technical stakeholders
          — and making it land.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
          transition={{ delay: 1.3 }}
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
      </div>
    </section>
  )
}
