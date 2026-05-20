import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { recommendations } from '../data/recommendations'

export default function Recommendations() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="recommendations" className="py-24 px-8 max-w-[1400px] mx-auto" ref={ref}>
      <div className="divider mb-16" />

      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label mb-4">
        <span className="dot" /><span className="num">07</span><span>—</span><span>RECOMMENDATIONS</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="section-heading mb-4"
      >
        WHAT OTHERS <span className="accent-word">SAY.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.18 }}
        className="font-mono text-[11px] text-[#525252] uppercase tracking-widest mb-12"
      >
        ✦ {recommendations.length} LinkedIn Recommendations
      </motion.p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recommendations.map((rec, i) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className="p-7 rounded-sm flex flex-col gap-5"
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Header: avatar + name + meta */}
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-display font-black text-sm text-white"
                style={{ background: '#cc2200' }}
              >
                {rec.initials}
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-white text-sm truncate">
                  {rec.firstName} {rec.lastName}
                </p>
                <p className="font-mono text-[10px] text-[#525252] uppercase tracking-wider truncate">
                  {rec.title} · {rec.company}
                </p>
              </div>
              <span className="ml-auto font-mono text-[10px] text-[#525252] flex-shrink-0">{rec.date}</span>
            </div>

            {/* Quote mark */}
            <div className="font-serif text-4xl leading-none" style={{ color: 'rgba(204,34,0,0.25)' }}>"</div>

            {/* Text */}
            <p className="text-[#a3a3a3] text-sm leading-relaxed flex-1">{rec.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
