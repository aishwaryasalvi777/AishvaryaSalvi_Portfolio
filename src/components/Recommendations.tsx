import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { recommendations } from '../data/recommendations'

// Star icon
function Star({ filled, delay, inView }: { filled: boolean; delay: number; inView: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 flex-shrink-0"
      initial={{ opacity: 0, scale: 0, rotate: -45 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ delay, type: 'spring', stiffness: 320, damping: 14 }}
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? '#f1c40f' : 'rgba(241,196,15,0.15)'}
      />
    </motion.svg>
  )
}

// Floating sparkle particle
function SparkleParticle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.span
      className="absolute pointer-events-none select-none font-mono"
      style={{ left: x, top: y, fontSize: size, color: '#f1c40f', lineHeight: 1 }}
      animate={{
        opacity: [0, 1, 0.8, 0],
        y: [0, -18, -28],
        scale: [0.5, 1, 0.7],
        rotate: [0, 20, -10],
      }}
      transition={{
        delay,
        duration: 2.4,
        repeat: Infinity,
        repeatDelay: 3.5,
        ease: 'easeOut',
      }}
    >
      ✦
    </motion.span>
  )
}

const SPARKLES = [
  { x: -28, y: -12, size: 11, delay: 0.0 },
  { x:  22, y: -20, size:  8, delay: 0.6 },
  { x:  52, y:  -6, size:  9, delay: 1.2 },
  { x: -48, y:   2, size:  7, delay: 1.8 },
  { x:  38, y:  12, size:  6, delay: 0.9 },
  { x:  -8, y:  18, size:  8, delay: 2.1 },
]

function RecommendationCard({ rec, i, inView }: {
  rec: typeof recommendations[number]
  i: number
  inView: boolean
}) {
  const baseDelay = 0.2 + i * 0.1

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: baseDelay, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="p-7 rounded-sm flex flex-col gap-5 relative group"
      style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 20px 60px rgba(204,34,0,0.1), 0 0 0 1px rgba(204,34,0,0.2)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(204,34,0,0.25)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'
      }}
    >
      {/* Animated stars */}
      <div className="flex items-center gap-1">
        {[0, 1, 2, 3, 4].map(si => (
          <Star key={si} filled={true} inView={inView} delay={baseDelay + 0.15 + si * 0.09} />
        ))}
        <span className="ml-2 font-mono text-[9px] text-[#525252] uppercase tracking-widest">LinkedIn</span>
      </div>

      {/* Header: avatar + name + meta */}
      <div className="flex items-center gap-4">
        <motion.div
          className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-display font-black text-sm text-white"
          style={{ background: '#cc2200' }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: baseDelay + 0.1, type: 'spring', stiffness: 280, damping: 16 }}
        >
          {rec.initials}
        </motion.div>
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

      {/* Animated quote mark */}
      <motion.div
        className="font-serif text-5xl leading-none"
        style={{ color: 'rgba(204,34,0,0.3)' }}
        initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ delay: baseDelay + 0.2, type: 'spring', stiffness: 200, damping: 18 }}
      >
        "
      </motion.div>

      {/* Text */}
      <p className="text-[#a3a3a3] text-sm leading-relaxed flex-1 group-hover:text-[#c8c8c8] transition-colors duration-300">
        {rec.text}
      </p>

      {/* Bottom accent line on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-b-sm"
        style={{ background: '#cc2200', originX: 0 }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </motion.div>
  )
}

export default function Recommendations() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="recommendations" className="py-24 px-8 max-w-[1400px] mx-auto" ref={ref}>
      <div className="divider mb-16" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="section-label mb-4"
      >
        <span className="dot" />
        <span className="num">07</span>
        <span>—</span>
        <span>RECOMMENDATIONS</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="section-heading mb-4"
      >
        WHAT OTHERS <span className="accent-word">SAY.</span>
      </motion.h2>

      {/* Sparkle header badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.18 }}
        className="relative inline-flex items-center gap-2 mb-12"
      >
        {/* Floating sparkles around the badge */}
        {SPARKLES.map((s, i) => (
          <SparkleParticle key={i} {...s} />
        ))}
        <span className="font-mono text-[11px] text-[#525252] uppercase tracking-widest">
          ✦ {recommendations.length} LinkedIn Recommendations
        </span>
        {/* Animated stars row next to badge */}
        <div className="flex gap-0.5 ml-2">
          {[0,1,2,3,4].map(i => (
            <motion.svg
              key={i} viewBox="0 0 24 24" className="w-3 h-3"
              initial={{ opacity: 0, y: 4 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.07 }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="#f1c40f" />
            </motion.svg>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recommendations.map((rec, i) => (
          <RecommendationCard key={rec.id} rec={rec} i={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}
