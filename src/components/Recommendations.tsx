import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { recommendations } from '../data/recommendations'
import { useTilt } from '../hooks/useTilt'

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

// Background floating quote marks
function BgQuote({ x, y, size, delay, duration }: {
  x: string; y: string; size: number; delay: number; duration: number
}) {
  return (
    <motion.span
      className="absolute pointer-events-none select-none font-serif leading-none"
      style={{ left: x, top: y, fontSize: size, color: '#cc2200', opacity: 0 }}
      animate={{
        opacity: [0, 0.055, 0.04, 0],
        y: [0, -40, -70],
        rotate: [0, 6, -4],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        repeatDelay: delay * 0.6 + 1.5,
        ease: 'easeInOut',
      }}
    >
      "
    </motion.span>
  )
}

const BG_QUOTES = [
  { x: '4%',  y: '60%', size: 110, delay: 0.0, duration: 9 },
  { x: '18%', y: '30%', size: 80,  delay: 2.4, duration: 11 },
  { x: '35%', y: '70%', size: 140, delay: 1.0, duration: 13 },
  { x: '52%', y: '20%', size: 90,  delay: 3.5, duration: 10 },
  { x: '67%', y: '55%', size: 120, delay: 0.8, duration: 12 },
  { x: '80%', y: '40%', size: 75,  delay: 4.2, duration: 8  },
  { x: '92%', y: '65%', size: 100, delay: 1.8, duration: 14 },
  { x: '28%', y: '85%', size: 60,  delay: 5.0, duration: 10 },
]

// Background sparkles scattered across the full section
function BgSparkle({ x, y, size, delay, duration }: {
  x: string; y: string; size: number; delay: number; duration: number
}) {
  return (
    <motion.span
      className="absolute pointer-events-none select-none font-mono leading-none"
      style={{ left: x, top: y, fontSize: size, color: '#f1c40f', opacity: 0 }}
      animate={{
        opacity: [0, 0.5, 0.3, 0],
        y: [0, -12, -20],
        scale: [0.6, 1.1, 0.8],
        rotate: [0, 15, -10],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        repeatDelay: delay * 0.5 + 2,
        ease: 'easeOut',
      }}
    >
      ✦
    </motion.span>
  )
}

const BG_SPARKLES = [
  { x:  '2%', y: '10%', size:  8, delay: 0.0, duration: 3.0 },
  { x:  '8%', y: '45%', size: 11, delay: 1.4, duration: 2.8 },
  { x:  '5%', y: '80%', size:  7, delay: 3.1, duration: 3.5 },
  { x: '13%', y: '22%', size:  9, delay: 0.7, duration: 2.5 },
  { x: '16%', y: '65%', size: 13, delay: 2.0, duration: 3.2 },
  { x: '22%', y: '88%', size:  6, delay: 4.5, duration: 2.7 },
  { x: '25%', y: '35%', size: 10, delay: 1.1, duration: 3.8 },
  { x: '30%', y: '12%', size:  8, delay: 5.2, duration: 2.6 },
  { x: '38%', y: '58%', size: 12, delay: 0.4, duration: 3.1 },
  { x: '42%', y: '82%', size:  7, delay: 2.8, duration: 2.9 },
  { x: '47%', y: '28%', size:  9, delay: 1.7, duration: 3.4 },
  { x: '53%', y: '72%', size: 11, delay: 3.9, duration: 2.4 },
  { x: '58%', y: '15%', size:  8, delay: 0.9, duration: 3.6 },
  { x: '63%', y: '48%', size: 13, delay: 2.3, duration: 2.8 },
  { x: '68%', y: '90%', size:  6, delay: 4.1, duration: 3.3 },
  { x: '72%', y: '32%', size: 10, delay: 1.5, duration: 2.7 },
  { x: '77%', y: '68%', size:  9, delay: 3.6, duration: 3.0 },
  { x: '82%', y: '20%', size:  7, delay: 0.2, duration: 3.7 },
  { x: '87%', y: '55%', size: 12, delay: 2.6, duration: 2.5 },
  { x: '91%', y: '78%', size:  8, delay: 4.8, duration: 3.1 },
  { x: '95%', y: '38%', size: 10, delay: 1.3, duration: 2.9 },
  { x: '98%', y: '92%', size:  7, delay: 3.4, duration: 3.5 },
  { x: '20%', y: '50%', size:  6, delay: 5.5, duration: 2.6 },
  { x: '45%', y: '95%', size:  9, delay: 0.6, duration: 3.2 },
  { x: '75%', y:  '5%', size: 11, delay: 2.1, duration: 2.8 },
]

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
  const tilt = useTilt(5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: baseDelay, ease: [0.25, 1, 0.5, 1] }}
      className="p-7 rounded-sm flex flex-col gap-5 relative group"
      style={{
        background: '#111',
        border: '1px solid rgba(255,255,255,0.06)',
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: tilt.transformPerspective,
      }}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 20px 60px rgba(204,34,0,0.1), 0 0 0 1px rgba(204,34,0,0.2)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(204,34,0,0.25)'
      }}
      onMouseLeave={e => {
        tilt.onMouseLeave()
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
    <section id="recommendations" className="py-24 px-8 max-w-[1400px] mx-auto relative overflow-hidden" ref={ref}>
      {/* Background floating quote marks */}
      {BG_QUOTES.map((q, i) => <BgQuote key={i} {...q} />)}
      {/* Background sparkles */}
      {BG_SPARKLES.map((s, i) => <BgSparkle key={i} {...s} />)}
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
