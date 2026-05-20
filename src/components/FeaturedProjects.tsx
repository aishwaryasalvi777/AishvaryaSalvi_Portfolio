import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const featured = [
  {
    number: '01',
    title: 'Supply Chain Disruption Detector',
    subtitle: 'Agentic RAG · LangChain · FastAPI · Pinecone',
    description:
      'Production agentic RAG system that monitors global news in real time, scores supplier risk using multi-signal analysis (VADER + LLM-as-judge + recency decay into a 0–10 score), and recommends alternative suppliers — replacing manual reactive workflows.',
    highlights: [
      'LangChain ReAct agent with 6 domain-specific tools',
      '1,536-dim embeddings via OpenAI + tiered Pinecone/pgvector store',
      'Async FastAPI + SSE streaming Streamlit dashboard',
      'Content-hash caching eliminating redundant LLM calls',
    ],
    tags: ['LangChain', 'RAG', 'FastAPI', 'Pinecone', 'pgvector', 'OpenAI', 'Docker'],
    gradient: 'from-[#00d4ff]/20 via-[#7b2fff]/10 to-transparent',
    accentColor: '#00d4ff',
    href: 'https://github.com/aishwaryasalvi777',
    mockupLines: [
      '> agent.run("TSMC supply disruption?")',
      '  ◆ Fetching news... 23 articles',
      '  ◆ Embedding + retrieval... done',
      '  ◆ Risk score: 8.4 / 10 [CRITICAL]',
      '  ◆ Alt suppliers: Samsung, SK Hynix',
      '> response ready in 2.3s',
    ],
  },
  {
    number: '02',
    title: 'Multi-Agent Document Verification',
    subtitle: 'LangGraph · RAG · FastAPI · LLM-as-judge',
    description:
      'Five-agent LangGraph + RAG pipeline (Extractor → Validator → Cross-Reference → Compliance → Decision) that automates ID, contract, and certificate verification with auditor-grade reasoning traces — achieving high precision on 500+ labeled documents.',
    highlights: [
      '5-agent LangGraph pipeline with full reasoning traces',
      'LLM-as-judge evaluation on 500+ labeled documents',
      'Auditor-grade compliance and cross-reference agents',
      'Replaces manual document review workflows end-to-end',
    ],
    tags: ['LangGraph', 'RAG', 'FastAPI', 'LLM-as-judge', 'Pydantic'],
    gradient: 'from-[#7b2fff]/20 via-[#00d4ff]/10 to-transparent',
    accentColor: '#7b2fff',
    href: 'https://github.com/aishwaryasalvi777',
    mockupLines: [
      '> pipeline.run(doc="contract_v3.pdf")',
      '  [1/5] Extractor... entities found',
      '  [2/5] Validator... fields OK',
      '  [3/5] Cross-Ref... no conflicts',
      '  [4/5] Compliance... passed',
      '  [5/5] Decision: ✓ VERIFIED',
    ],
  },
]

function FeaturedCard({ proj, flip }: { proj: typeof featured[0]; flip: boolean }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-8 items-center ${flip ? 'md:[&>*:first-child]:order-2' : ''}`}>
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: flip ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className="font-mono text-xs font-bold px-2.5 py-1 rounded"
            style={{
              background: `${proj.accentColor}15`,
              border: `1px solid ${proj.accentColor}30`,
              color: `${proj.accentColor}`,
            }}
          >
            FEATURED
          </span>
          <span className="font-mono text-xs text-slate-600">{proj.number}</span>
        </div>

        <h3
          className="font-display font-black text-2xl md:text-3xl text-slate-100 mb-2 leading-tight"
        >
          {proj.title}
        </h3>
        <p
          className="font-mono text-xs mb-5"
          style={{ color: proj.accentColor, opacity: 0.8 }}
        >
          {proj.subtitle}
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{proj.description}</p>

        <ul className="space-y-2 mb-7">
          {proj.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex gap-2.5 text-slate-400 text-sm"
            >
              <span style={{ color: proj.accentColor, opacity: 0.6 }} className="flex-shrink-0 mt-0.5">▸</span>
              {h}
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-7">
          {proj.tags.map(t => (
            <span
              key={t}
              className="px-3 py-1 text-xs font-mono rounded-md"
              style={{
                background: `${proj.accentColor}0d`,
                border: `1px solid ${proj.accentColor}25`,
                color: `${proj.accentColor}cc`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={proj.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-display font-semibold text-sm transition-all duration-200 hover:gap-3"
          style={{ color: proj.accentColor }}
        >
          View on GitHub
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>

      {/* Mockup terminal */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: flip ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ y }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(8,8,20,0.9)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: `0 0 60px ${proj.accentColor}15, 0 25px 60px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Terminal top bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="font-mono text-xs text-slate-600 ml-2">agent_output.log</span>
          </div>
          {/* Terminal content */}
          <div className="p-5 space-y-2">
            {proj.mockupLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="font-mono text-xs leading-relaxed"
                style={{
                  color: line.startsWith('>')
                    ? proj.accentColor
                    : line.includes('CRITICAL') || line.includes('VERIFIED')
                    ? '#10b981'
                    : 'rgba(148,163,184,0.7)',
                }}
              >
                {line}
              </motion.p>
            ))}
            {/* Cursor blink */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.1 }}
              className="inline-block w-2 h-3.5 ml-0.5"
              style={{ background: proj.accentColor, opacity: 0.7 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function FeaturedProjects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="featured" className="py-28 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[#7b2fff]/20" />

      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-end gap-6"
          >
            <span className="font-display font-black text-[120px] leading-none text-white/3 select-none -mb-4">
              03
            </span>
            <div>
              <p className="font-mono text-xs text-[#7b2fff]/60 tracking-widest uppercase mb-2">
                highlight.reel
              </p>
              <h2 className="section-title">
                Featured <span className="gradient-text-cyan">Projects</span>
              </h2>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-28">
          {featured.map((proj, i) => (
            <FeaturedCard key={proj.number} proj={proj} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
