import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { education } from '../data/education'

export default function Education() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="education" className="py-24 px-8 max-w-[1400px] mx-auto" ref={ref}>
      <div className="divider mb-16" />

      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label mb-4">
        <span className="dot" /><span className="num">05</span><span>—</span><span>EDUCATION</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="section-heading mb-12"
      >
        WHERE THE <span className="accent-word">MATH</span> GOT BUILT.
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6">
        {education.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            className="p-8 rounded-sm"
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="font-mono text-xs mb-4" style={{ color: '#cc2200' }}>
              {item.id === 1 ? '2024 — 2025' : '2017 — 2021'} · {item.location}
            </div>
            <h3 className="font-display font-black text-white text-xl uppercase leading-tight mb-2">
              {item.degree.toUpperCase()}, {item.field.toUpperCase()}
            </h3>
            <p className="font-display font-semibold text-[#a3a3a3] text-sm mb-3 uppercase tracking-wide">
              {item.school}
            </p>
            {item.description && (
              <p className="text-[#525252] text-sm leading-relaxed">{item.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
