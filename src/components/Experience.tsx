import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { experience } from '../data/experience'
import {
  SiLangchain, SiFastapi, SiOpenai, SiDocker, SiStreamlit,
  SiSnowflake, SiPython, SiJenkins, SiJira, SiPostman,
  SiSelenium, SiPostgresql,
} from 'react-icons/si'
import { FaMicrosoft } from 'react-icons/fa6'

type IconComponent = React.ComponentType<{ size?: number; style?: React.CSSProperties }>

const TECH_ICONS: Record<string, IconComponent> = {
  LangChain:  SiLangchain,
  FastAPI:    SiFastapi,
  OpenAI:     SiOpenai,
  Docker:     SiDocker,
  Streamlit:  SiStreamlit,
  Snowflake:  SiSnowflake,
  Python:     SiPython,
  Jenkins:    SiJenkins,
  JIRA:       SiJira,
  Postman:    SiPostman,
  Selenium:   SiSelenium,
  pgvector:   SiPostgresql,
  Azure:      FaMicrosoft,
  'Power BI': FaMicrosoft,
}

function useCountUp(target: number, inView: boolean, duration = 1400, delay = 0) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf: number
    const t = setTimeout(() => {
      let start: number | null = null
      const step = (ts: number) => {
        if (!start) start = ts
        const p = Math.min((ts - start) / duration, 1)
        setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target))
        if (p < 1) raf = requestAnimationFrame(step)
        else setCount(target)
      }
      raf = requestAnimationFrame(step)
    }, delay)
    return () => { clearTimeout(t); cancelAnimationFrame(raf) }
  }, [inView, target, duration, delay])
  return count
}

const posters = [
  // Research Foundation for SUNY — navy blue brand
  ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(150deg, #001f4d 0%, #003087 50%, #001830 100%)' }}>
      {/* Background grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 220" preserveAspectRatio="none">
        {[0,1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*57} y1="0" x2={i*57} y2="220" stroke="#ffffff" strokeWidth="0.5"/>)}
        {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={i*55} x2="400" y2={i*55} stroke="#ffffff" strokeWidth="0.5"/>)}
      </svg>
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #4a90d9, transparent 70%)' }} />
      {/* Logo text */}
      <div className="relative z-10 text-center px-6">
        <div className="font-display font-black text-white leading-none mb-2" style={{ fontSize: '3.8rem', letterSpacing: '-0.02em', textShadow: '0 0 40px rgba(74,144,217,0.5)' }}>
          SUNY
        </div>
        <div className="font-mono text-[11px] text-[#7ab3e8] uppercase tracking-[0.3em] mb-1">Research Foundation</div>
        <div className="w-12 h-[1px] mx-auto" style={{ background: '#4a90d9' }} />
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#4a90d9] opacity-50 uppercase tracking-widest">Buffalo, NY</div>
    </div>
  ),

  // New Era Cap — black & red brand
  ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(150deg, #0a0a0a 0%, #1a0000 50%, #0a0a0a 100%)' }}>
      {/* Diagonal stripes */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 400 220" preserveAspectRatio="none">
        {[-4,-3,-2,-1,0,1,2,3,4,5,6,7,8].map(i => (
          <line key={i} x1={i*50-100} y1="0" x2={i*50+120} y2="220" stroke="#cc2200" strokeWidth="18"/>
        ))}
      </svg>
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-32 opacity-20"
        style={{ background: 'radial-gradient(ellipse, #cc2200, transparent 65%)' }} />
      {/* Logo text */}
      <div className="relative z-10 text-center px-6">
        <div className="font-display font-black leading-none mb-1" style={{ fontSize: '3rem', letterSpacing: '-0.03em', color: '#cc2200', textShadow: '0 0 30px rgba(204,34,0,0.4)' }}>
          NEW ERA
        </div>
        <div className="font-display font-black text-white leading-none mb-3" style={{ fontSize: '1.1rem', letterSpacing: '0.3em' }}>
          CAP CO.
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-8" style={{ background: '#cc2200' }} />
          <div className="font-mono text-[9px] text-[#cc2200] uppercase tracking-[0.2em]">EST. 1920</div>
          <div className="h-[1px] w-8" style={{ background: '#cc2200' }} />
        </div>
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#cc2200] opacity-40 uppercase tracking-widest">Buffalo, NY</div>
    </div>
  ),

  // Mediaocean — teal/cyan brand (Senior DA)
  ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(150deg, #001a1a 0%, #003333 50%, #001010 100%)' }}>
      {/* Flowing wave lines */}
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 400 220" preserveAspectRatio="none">
        <path d="M0,80 Q100,40 200,80 T400,80" fill="none" stroke="#00c9b1" strokeWidth="1"/>
        <path d="M0,100 Q100,60 200,100 T400,100" fill="none" stroke="#00c9b1" strokeWidth="1"/>
        <path d="M0,120 Q100,80 200,120 T400,120" fill="none" stroke="#00c9b1" strokeWidth="1"/>
        <path d="M0,140 Q100,100 200,140 T400,140" fill="none" stroke="#00c9b1" strokeWidth="0.5"/>
      </svg>
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #00c9b1, transparent 70%)' }} />
      {/* Logo text */}
      <div className="relative z-10 text-center px-6">
        <div className="font-display font-black leading-none mb-2" style={{ fontSize: '2.6rem', letterSpacing: '-0.02em', color: '#00c9b1', textShadow: '0 0 30px rgba(0,201,177,0.4)' }}>
          MEDIAOCEAN
        </div>
        <div className="font-mono text-[10px] text-[#00c9b1] uppercase tracking-[0.25em] opacity-70">Senior Data Analyst</div>
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#00c9b1] opacity-40 uppercase tracking-widest">Remote</div>
    </div>
  ),

  // Mediaocean — violet/indigo brand (Data Analyst — visually distinct)
  ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(150deg, #0d0015 0%, #1a0030 50%, #0a000f 100%)' }}>
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 400 220">
        {Array.from({ length: 10 }, (_, row) =>
          Array.from({ length: 18 }, (_, col) => (
            <circle key={`${row}-${col}`} cx={col * 24 + 8} cy={row * 24 + 4} r="1.2" fill="#a855f7"/>
          ))
        )}
      </svg>
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full opacity-12"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }} />
      {/* Logo text */}
      <div className="relative z-10 text-center px-6">
        <div className="font-display font-black leading-none mb-2" style={{ fontSize: '2.6rem', letterSpacing: '-0.02em', color: '#c084fc', textShadow: '0 0 30px rgba(168,85,247,0.45)' }}>
          MEDIAOCEAN
        </div>
        <div className="font-mono text-[10px] text-[#c084fc] uppercase tracking-[0.25em] opacity-70">Data Analyst</div>
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#c084fc] opacity-40 uppercase tracking-widest">Remote</div>
    </div>
  ),
]

// Per-card accent colours matching each company poster
const CARD_ACCENT = [
  { color: '#4a90d9', rgb: '74,144,217'  },  // SUNY — blue
  { color: '#e85d20', rgb: '232,93,32'   },  // New Era Cap — orange-red
  { color: '#00c9b1', rgb: '0,201,177'   },  // Mediaocean Senior — teal
  { color: '#a855f7', rgb: '168,85,247'  },  // Mediaocean Data — purple
]

// Highlight bare numbers / percentages in a description string
function HighlightedText({ text, color }: { text: string; color: string }) {
  const parts = text.split(/(\b\d[\d,]*[+%×x]?\b)/g)
  return (
    <>
      {parts.map((p, i) =>
        /^\d[\d,]*[+%×x]?$/.test(p)
          ? <span key={i} style={{ color, fontWeight: 700 }}>{p}</span>
          : <span key={i}>{p}</span>
      )}
    </>
  )
}

type PosterComponent = ({ className }: { className?: string }) => JSX.Element

function ExperienceCard({
  item, i, Poster,
}: {
  item: typeof experience[number]
  i: number
  Poster: PosterComponent
}) {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true })
  const matchTarget = 95 - i
  const matchCount = useCountUp(matchTarget, inView, 1300, 400)
  const isCurrent = i === 0
  const fromX = i % 2 === 0 ? -70 : 70
  const accent = CARD_ACCENT[i] ?? CARD_ACCENT[0]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromX, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
      whileHover="hovered"
      className="netflix-card group flex flex-col relative overflow-hidden cursor-pointer"
      style={{ isolation: 'isolate' }}
    >
      {/* Poster */}
      <div className="relative flex-shrink-0" style={{ aspectRatio: '16/9', minHeight: 220 }}>
        <Poster className="absolute inset-0" />

        {/* Scan line sweeps down on entry */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(204,34,0,0.9) 50%, transparent 100%)' }}
          initial={{ top: '0%', opacity: 0 }}
          animate={inView ? { top: ['0%', '100%'], opacity: [0, 1, 1, 0] } : {}}
          transition={{ duration: 1.1, delay: 0.2, ease: 'linear' }}
        />

        {/* Episode label */}
        <motion.div
          className="absolute top-4 left-4 font-mono text-xs text-[#a3a3a3] uppercase tracking-widest"
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          EPISODE {String(i + 1).padStart(2, '0')} · {item.period.slice(-4)}
        </motion.div>

        {/* NOW STREAMING badge for current role */}
        {isCurrent && (
          <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-mono text-[9px] uppercase tracking-widest"
            style={{ background: 'rgba(204,34,0,0.85)', color: '#fff' }}
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            NOW STREAMING
          </motion.div>
        )}

        {/* Match % counter */}
        <motion.div
          className="absolute top-4 right-4 match-badge flex items-center gap-1.5 text-sm"
          initial={{ opacity: 0, x: 12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {matchCount}% Match
        </motion.div>

        {/* Red progress bar at bottom — animates on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px]"
          style={{ background: '#cc2200', originX: 0 }}
          variants={{ hovered: { scaleX: 1 } }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        />
      </div>

      {/* Card body */}
      <div
        className="p-6 flex flex-col flex-1 relative"
        style={{
          borderLeft: `3px solid ${accent.color}`,
          background: `linear-gradient(135deg, rgba(${accent.rgb},0.04) 0%, transparent 60%)`,
        }}
      >
        {/* Ghost episode number */}
        <div
          className="absolute bottom-3 right-4 font-display font-black select-none pointer-events-none leading-none"
          style={{ fontSize: 72, color: accent.color, opacity: 0.06 }}
        >
          {String(i + 1).padStart(2, '0')}
        </div>

        <h3
          className="font-display font-black text-white text-xl leading-tight mb-1.5 transition-colors duration-200"
          style={{ textShadow: `0 0 30px rgba(${accent.rgb},0)` }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = accent.color }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
        >
          {item.role.toUpperCase()}
        </h3>

        <p className="font-mono text-sm uppercase tracking-wide mb-3" style={{ color: accent.color }}>
          {item.company}
        </p>

        <p className="text-[#a3a3a3] text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
          <HighlightedText text={item.highlights[0]} color={accent.color} />
        </p>

        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 4).map((tag, ti) => {
            const Icon = TECH_ICONS[tag]
            return (
              <motion.span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded-sm cursor-default flex items-center gap-1.5"
                style={{
                  border: `1px solid rgba(${accent.rgb},0.3)`,
                  background: `rgba(${accent.rgb},0.08)`,
                  color: accent.color,
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + ti * 0.06, ease: 'backOut' }}
                whileHover={{ background: `rgba(${accent.rgb},0.2)`, color: '#fff' }}
              >
                {Icon && <Icon size={11} />}
                {tag}
              </motion.span>
            )
          })}
        </div>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6 z-10"
        style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.98) 50%, rgba(10,10,10,0.78) 75%, rgba(10,10,10,0.25) 100%)' }}
        variants={{ hovered: { opacity: 1, y: 0 } }}
        initial={{ opacity: 0, y: '100%' }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      >
        <p className="font-mono text-xs text-[#cc2200] uppercase tracking-widest mb-2">
          EPISODE {String(i + 1).padStart(2, '0')} · {item.period}
        </p>
        <h3 className="font-display font-black text-white text-lg mb-1">{item.role.toUpperCase()}</h3>
        <p className="font-mono text-xs uppercase tracking-wide mb-4" style={{ color: '#cc2200' }}>{item.company}</p>
        <div className="space-y-2.5 mb-5">
          {item.highlights.slice(0, 4).map((h, hi) => (
            <motion.p
              key={hi}
              className="text-[#a3a3a3] text-xs leading-relaxed flex gap-2"
              variants={{ hovered: { opacity: 1, y: 0 } }}
              initial={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.08 + hi * 0.07 }}
            >
              <span className="text-[#cc2200] flex-shrink-0 mt-0.5">›</span>
              {h.length > 110 ? h.slice(0, 110) + '…' : h}
            </motion.p>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map(tag => {
            const Icon = TECH_ICONS[tag]
            return (
              <span key={tag} className="tag-pill text-[10px] px-2.5 py-0.5 flex items-center gap-1">
                {Icon && <Icon size={10} />}
                {tag}
              </span>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="experience" className="py-24 px-8 max-w-[1400px] mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="section-label mb-2"
      >
        <span className="dot" />
        <span style={{ color: '#cc2200', fontWeight: 700 }}>FEATURED</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-2"
      >
        <h2 className="section-heading">EXPERIENCE — SEASON 1</h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="font-mono text-xs text-[#525252] uppercase tracking-widest mb-10"
      >
        6 EPISODES · 4 YEARS · RELEASED 2021–2026
      </motion.p>

      <div className="divider mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experience.map((item, i) => {
          const Poster = posters[i] ?? posters[0]
          return <ExperienceCard key={item.id} item={item} i={i} Poster={Poster} />
        })}
      </div>
    </section>
  )
}
