import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillGroups, SkillGroup } from '../data/skills'
import { useTilt } from '../hooks/useTilt'
import {
  SiPython, SiR, SiPandas, SiNumpy, SiScikitlearn,
  SiLangchain, SiOpenai, SiAnthropic, SiPydantic, SiHuggingface,
  SiSnowflake, SiPostgresql, SiMysql, SiApacheairflow, SiFastapi,
  SiDocker, SiJenkins, SiGithub,
  SiStreamlit,
} from 'react-icons/si'
import { FaMicrosoft, FaAws } from 'react-icons/fa6'

type IconComp = React.ComponentType<{ size?: number }>

const SKILL_ICONS: Record<string, IconComp> = {
  // Programming
  Python:             SiPython,
  R:                  SiR,
  Pandas:             SiPandas,
  NumPy:              SiNumpy,
  'Scikit-learn':     SiScikitlearn,
  // GenAI
  LangChain:          SiLangchain,
  'OpenAI API':       SiOpenai,
  'Claude API':       SiAnthropic,
  Pydantic:           SiPydantic,
  'sentence-transformers': SiHuggingface,
  pgvector:           SiPostgresql,
  // Data Engineering
  Snowflake:          SiSnowflake,
  PostgreSQL:         SiPostgresql,
  MySQL:              SiMysql,
  'Apache Airflow':   SiApacheairflow,
  FastAPI:            SiFastapi,
  // Cloud
  'Azure Data Factory':  FaMicrosoft,
  'Azure Blob Storage':  FaMicrosoft,
  'Azure Key Vault':     FaMicrosoft,
  'AWS S3':              FaAws,
  'AWS EC2':             FaAws,
  'AWS RDS':             FaAws,
  Redshift:              FaAws,
  Docker:                SiDocker,
  'Docker Compose':      SiDocker,
  Jenkins:               SiJenkins,
  'Git/GitHub':          SiGithub,
  // BI
  'Power BI':            FaMicrosoft,
  Streamlit:             SiStreamlit,
}

const GROUP_META = [
  { color: '#3572A5', rgb: '53,114,165',   num: '01' },
  { color: '#a855f7', rgb: '168,85,247',   num: '02' },
  { color: '#06b6d4', rgb: '6,182,212',    num: '03' },
  { color: '#f97316', rgb: '249,115,22',   num: '04' },
  { color: '#4ade80', rgb: '74,222,128',   num: '05' },
]

function BentoCard({
  group, meta, delay = 0,
}: {
  group: SkillGroup
  meta: typeof GROUP_META[number]
  delay?: number
}) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const { color, rgb, num } = meta
  const tilt = useTilt(5)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 1, 0.5, 1] }}
      className="relative overflow-hidden rounded-sm p-6"
      style={{
        background: `linear-gradient(135deg, #111111 0%, rgba(${rgb},0.07) 100%)`,
        border: `1px solid rgba(255,255,255,0.06)`,
        borderTopColor: color,
        borderTopWidth: 3,
        minHeight: 260,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: tilt.transformPerspective,
      }}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 20px 60px rgba(${rgb},0.14), 0 0 0 1px rgba(${rgb},0.15)`
      }}
      onMouseLeave={e => {
        tilt.onMouseLeave()
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      {/* Ghost watermark number */}
      <div
        className="absolute bottom-0 right-4 font-display font-black leading-none select-none pointer-events-none"
        style={{ fontSize: 120, color, opacity: 0.055, lineHeight: 0.85 }}
      >
        {num}
      </div>

      {/* Top row: number + count badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color }}>
          {num}
        </span>
        <span
          className="font-mono text-[9px] px-2 py-0.5 rounded-sm tracking-widest"
          style={{
            background: `rgba(${rgb},0.12)`,
            color,
            border: `1px solid rgba(${rgb},0.25)`,
          }}
        >
          {group.skills.length} SKILLS
        </span>
      </div>

      {/* Category name */}
      <h3
        className="font-display font-black text-white uppercase leading-tight mb-5 tracking-tight"
        style={{ fontSize: '1.1rem' }}
      >
        {group.category}
      </h3>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {group.skills.map((skill, si) => {
          const Icon = SKILL_ICONS[skill]
          return (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: delay + 0.15 + si * 0.028, ease: 'backOut' }}
              className="px-3 py-1 text-[11px] font-mono cursor-default rounded-sm flex items-center gap-1.5"
              style={{
                border: `1px solid rgba(${rgb},0.22)`,
                background: `rgba(${rgb},0.07)`,
                color: '#a3a3a3',
                transition: 'background 0.15s, border-color 0.15s, color 0.15s',
              }}
              whileHover={{
                backgroundColor: `rgba(${rgb},0.18)`,
                borderColor: color,
                color: '#ffffff',
              }}
            >
              {Icon && <Icon size={12} />}
              {skill}
            </motion.span>
          )
        })}
      </div>

      {/* Bottom fill bar — relative to 12 max skills */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ background: color, originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: Math.min(group.skills.length / 12, 1) } : {}}
        transition={{ duration: 0.9, delay: delay + 0.3, ease: 'easeOut' }}
      />
    </motion.div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" className="py-24 px-8 max-w-[1400px] mx-auto" ref={ref}>
      <div className="divider mb-16" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="section-label mb-4"
      >
        <span className="dot" />
        <span className="num">06</span>
        <span>—</span>
        <span>TOOLKIT</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="section-heading mb-12"
      >
        THE STACK I <span className="accent-word">REACH FOR.</span>
      </motion.h2>

      {/* Bento grid — 3 equal columns */}
      <div className="grid grid-cols-3 gap-4">
        {/* Programming */}
        <div>
          <BentoCard group={skillGroups[0]} meta={GROUP_META[0]} delay={0.0} />
        </div>

        {/* GenAI */}
        <div>
          <BentoCard group={skillGroups[1]} meta={GROUP_META[1]} delay={0.08} />
        </div>

        {/* Cloud */}
        <div>
          <BentoCard group={skillGroups[3]} meta={GROUP_META[3]} delay={0.14} />
        </div>

        {/* Data Engineering */}
        <div>
          <BentoCard group={skillGroups[2]} meta={GROUP_META[2]} delay={0.20} />
        </div>

        {/* Analytics & BI */}
        <div>
          <BentoCard group={skillGroups[4]} meta={GROUP_META[4]} delay={0.26} />
        </div>
      </div>
    </section>
  )
}
