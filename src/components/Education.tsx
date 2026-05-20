import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const panels = [
  {
    abbrev: 'UB',
    ghost: 'BUFFALO',
    degree: 'Master of Science',
    field: 'Data Science',
    school: 'University at Buffalo',
    period: '2024 – 2025',
    location: 'Buffalo, NY',
    description: 'Focused on machine learning, statistical modeling, and AI systems engineering.',
    courses: ['Machine Learning', 'Deep Learning', 'NLP', 'Statistical Modeling', 'Big Data Systems', 'AI Engineering'],
    bg: 'linear-gradient(160deg, #000a1f 0%, #001333 60%, #000814 100%)',
    accent: '#4a90d9',
    accentRgb: '74,144,217',
  },
  {
    abbrev: 'PUNE',
    ghost: 'PUNE',
    degree: 'Bachelor of Engineering',
    field: 'Computer Science',
    school: 'University of Pune',
    period: '2017 – 2021',
    location: 'Pune, India',
    description: 'Core coursework in algorithms, data structures, databases, and software engineering.',
    courses: ['Algorithms & DS', 'DBMS', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'OOP'],
    bg: 'linear-gradient(160deg, #140900 0%, #2a1400 60%, #100700 100%)',
    accent: '#d4a020',
    accentRgb: '212,160,32',
  },
]

function Panel({ panel, index }: { panel: typeof panels[number]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
      className="relative overflow-hidden rounded-sm"
      style={{ background: panel.bg, border: `1px solid rgba(${panel.accentRgb},0.12)`, minHeight: 340 }}
      whileHover={{ borderColor: `rgba(${panel.accentRgb},0.3)` }}
    >
      {/* Ghost university name watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-display font-black text-center leading-none"
          style={{
            fontSize: 'clamp(6rem, 18vw, 14rem)',
            color: panel.accent,
            opacity: 0.04,
            letterSpacing: '-0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          {panel.ghost}
        </span>
      </div>

      {/* Subtle gradient overlay — darkens edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)' }}
      />

      {/* Accent glow — top left corner */}
      <div
        className="absolute -top-10 -left-10 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${panel.accentRgb},0.12), transparent 70%)` }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full"
        style={{ background: panel.accent, originY: 0 }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15 + 0.3, ease: 'easeOut' }}
      />

      {/* Main content */}
      <div className="relative z-10 p-10 flex flex-col h-full" style={{ minHeight: 340 }}>
        {/* Top row */}
        <div className="flex items-start justify-between mb-auto">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold px-2 py-1 rounded-sm"
              style={{ background: `rgba(${panel.accentRgb},0.12)`, color: panel.accent, border: `1px solid rgba(${panel.accentRgb},0.25)` }}
            >
              {index === 0 ? 'MS · GRADUATE' : 'BE · UNDERGRADUATE'}
            </span>
          </div>
          <span className="font-mono text-xs" style={{ color: panel.accent, opacity: 0.6 }}>
            {panel.period}
          </span>
        </div>

        {/* Center — degree info */}
        <div className="py-8">
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: panel.accent }}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.2 }}
          >
            {panel.location}
          </motion.p>

          <motion.h3
            className="font-display font-black text-white leading-tight mb-1"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.25 }}
          >
            {panel.degree.toUpperCase()}
          </motion.h3>

          <motion.h4
            className="font-display font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', color: panel.accent }}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.32 }}
          >
            {panel.field.toUpperCase()}
          </motion.h4>

          <motion.p
            className="font-mono text-sm uppercase tracking-widest mb-4"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.38 }}
          >
            {panel.school}
          </motion.p>

          <motion.p
            className="text-sm leading-relaxed max-w-xl"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.44 }}
          >
            {panel.description}
          </motion.p>
        </div>

        {/* Bottom — course tags strip */}
        <div>
          <div
            className="w-full h-px mb-4"
            style={{ background: `linear-gradient(to right, rgba(${panel.accentRgb},0.4), transparent)` }}
          />
          <div className="flex flex-wrap gap-2">
            {panel.courses.map((course, ci) => (
              <motion.span
                key={course}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.5 + ci * 0.05 }}
                className="font-mono text-[11px] px-3 py-1 rounded-sm cursor-default transition-all duration-150"
                style={{
                  border: `1px solid rgba(${panel.accentRgb},0.22)`,
                  background: `rgba(${panel.accentRgb},0.07)`,
                  color: 'rgba(255,255,255,0.5)',
                }}
                whileHover={{ color: '#fff', borderColor: panel.accent, backgroundColor: `rgba(${panel.accentRgb},0.15)` }}
              >
                {course}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Education() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="education" className="py-24 px-8 max-w-[1400px] mx-auto" ref={ref}>
      <div className="divider mb-16" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="section-label mb-4"
      >
        <span className="dot" />
        <span className="num">05</span>
        <span>—</span>
        <span>EDUCATION</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="section-heading mb-12"
      >
        WHERE THE <span className="accent-word">MATH</span> GOT BUILT.
      </motion.h2>

      <div className="flex flex-col gap-5">
        {panels.map((panel, i) => (
          <Panel key={panel.abbrev} panel={panel} index={i} />
        ))}
      </div>
    </section>
  )
}
