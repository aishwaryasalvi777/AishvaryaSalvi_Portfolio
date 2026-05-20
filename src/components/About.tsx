import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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
              { href: '/resume.pdf', label: '↓ DOWNLOAD RESUME', target: '_blank' },
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
            {/* Bottom overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}
            >
              <span className="font-mono text-xs text-[#a3a3a3] uppercase tracking-widest">Buffalo, NY</span>
              <span className="font-mono text-xs text-[#a3a3a3]">+1 716·465·7631</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
