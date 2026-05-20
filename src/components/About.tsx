import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

function useCountUp(target: number, inView: boolean, duration = 1600, delay = 0) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf: number
    const timeout = setTimeout(() => {
      let start: number | null = null
      const step = (ts: number) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) raf = requestAnimationFrame(step)
        else setCount(target)
      }
      raf = requestAnimationFrame(step)
    }, delay)
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf) }
  }, [inView, target, duration, delay])
  return count
}

const stats = [
  { value: 4,   suffix: '+', label: 'Years of Experience', color: '#cc2200' },
  { value: 15,  suffix: '+', label: 'Projects Built',      color: '#3572A5' },
  { value: 450, suffix: '+', label: 'Defects Tracked',     color: '#a855f7' },
  { value: 87,  suffix: '%', label: 'ML Model Accuracy',   color: '#4ade80' },
]

function StatCounter({ stat, inView, index }: { stat: typeof stats[number]; inView: boolean; index: number }) {
  const count = useCountUp(stat.value, inView, 1600, index * 120)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.45 + index * 0.08 }}
      className="flex flex-col gap-1 pl-4"
      style={{ borderLeft: `2px solid rgba(${stat.color === '#cc2200' ? '204,34,0' : stat.color === '#3572A5' ? '53,114,165' : stat.color === '#a855f7' ? '168,85,247' : '74,222,128'},0.5)` }}
    >
      <div className="font-display font-black leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: stat.color }}>
        {count}{stat.suffix}
      </div>
      <div className="font-mono text-[11px] uppercase tracking-widest text-[#525252]">
        {stat.label}
      </div>
    </motion.div>
  )
}

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="about" className="py-24 px-8 max-w-[1400px] mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="section-label mb-6"
      >
        <span className="dot" />
        <span className="num">01</span>
        <span>—</span>
        <span>ABOUT</span>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr,360px] gap-16 items-start">
        {/* Left */}
        <div>
          {/* Manifesto headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-white leading-[0.92] tracking-tight mb-10"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            I BUILD <span className="accent-word">AI SYSTEMS</span> THAT ARE
            AUDITABLE, EXPLAINABLE, AND ACTUALLY TRUSTED IN PRODUCTION.
          </motion.h2>

          {/* Two-col bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid sm:grid-cols-2 gap-8 mb-10 text-sm leading-relaxed text-[#a3a3a3]"
          >
            <p>
              I'm an AI/Data Engineer with <strong className="text-white">4+ years of experience</strong> shipping
              agentic LLM systems, RAG pipelines, and production ETL/ELT on Azure and AWS.
              Currently at the Research Foundation for SUNY, I architect supply-chain risk
              agents that procurement teams actually use.
            </p>
            <p>
              I care about the bridge between LLM capability and stakeholder trust —
              calibrated risk scores, plain-language SHAP explanations, audit-grade
              reasoning traces. Currently exploring multi-agent verification,
              demand-forecasting models, and the quiet art of making 1,000+ raw tables behave.
            </p>
          </motion.div>

          {/* Animated stat counters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 py-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            {stats.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} inView={inView} index={i} />
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { href: 'https://github.com/aishwaryasalvi777', label: 'GITHUB ↗' },
              { href: 'https://www.linkedin.com/in/aishvaryasalvi', label: 'LINKEDIN ↗' },
              { href: '/Aishvarya_Salvi_AIDE_Generic.pdf', label: '↓ DOWNLOAD RESUME', target: '_blank' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.target ?? '_blank'}
                rel="noreferrer"
                className="font-display font-bold text-xs tracking-widest uppercase px-5 py-3 transition-all duration-200 hover:bg-white hover:text-black"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <img
              src="/about.jpg"
              alt="Aishvarya Salvi"
              className="w-full h-full object-cover object-top"
              onError={e => {
                e.currentTarget.style.display = 'none'
                const fb = e.currentTarget.nextElementSibling as HTMLElement
                if (fb) fb.style.display = 'flex'
              }}
            />
            <div
              className="w-full h-full items-center justify-center hidden"
              style={{ background: '#111' }}
            >
              <span className="font-display font-black text-8xl text-white/10 select-none">AS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
