import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useGitHubStarred } from '../hooks/useGitHubProjects'
import { getRepoImage } from '../data/projectImages'

const langColors: Record<string, string> = {
  Python: '#3572A5', TypeScript: '#3178c6', JavaScript: '#f1e05a',
  Jupyter: '#DA5B0B', Shell: '#89e051', Go: '#00ADD8',
  R: '#198CE7', SQL: '#e38c00', CSS: '#563d7c',
}

const fallbackGradients = [
  'linear-gradient(160deg, #0d1b2e, #1a3a5c)',
  'linear-gradient(160deg, #1a0d00, #3a1800)',
  'linear-gradient(160deg, #0d1a0d, #1a3320)',
  'linear-gradient(160deg, #130d1a, #2a1540)',
  'linear-gradient(160deg, #1a1000, #3a2800)',
  'linear-gradient(160deg, #00141a, #003040)',
]

const CARD_STEP = 3 * 300

export default function StarredProjects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const { starred, loading } = useGitHubStarred()
  const scrollRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>()
  const paused = useRef(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (loading || starred.length === 0) return
    const el = scrollRef.current
    if (!el) return
    const tick = () => {
      if (!paused.current && el) {
        el.scrollLeft += 0.5
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [loading, starred.length])

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -CARD_STEP, behavior: 'smooth' })
  const scrollRight = () => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: CARD_STEP, behavior: 'smooth' })
    setTimeout(() => { if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0 }, 400)
  }

  const count = starred.length

  return (
    <section
      id="starred"
      className="py-16 max-w-[1400px] mx-auto"
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="px-8 mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-label mb-2"
        >
          <span className="dot" />
          <span style={{ color: '#cc2200', fontWeight: 700 }}>MY LIST</span>
        </motion.div>

        {/* Dynamic heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex items-baseline gap-4"
        >
          <h2 className="section-heading">
            TODAY'S TOP{' '}
            <span style={{ color: '#cc2200' }}>
              {loading ? '—' : count}
            </span>
          </h2>
          <span className="font-mono text-xs text-[#525252] uppercase tracking-widest hidden sm:block">
            · Starred on GitHub · Updates live
          </span>
        </motion.div>
      </div>

      {loading && (
        <div className="px-8 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 flex items-end gap-0">
              <div className="shimmer rounded-sm" style={{ width: 72, height: 108, marginRight: -20 }} />
              <div className="shimmer rounded-sm" style={{ width: 160, height: 240 }} />
            </div>
          ))}
        </div>
      )}

      {!loading && count > 0 && (
        <div className="relative">
          {/* Left arrow */}
          <motion.button
            onClick={scrollLeft}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center w-16 focus:outline-none"
            style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.97) 60%, transparent)' }}
            onMouseEnter={() => { paused.current = true }}
            onMouseLeave={() => { paused.current = false }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          {/* Right arrow */}
          <motion.button
            onClick={scrollRight}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center w-16 focus:outline-none"
            style={{ background: 'linear-gradient(to left, rgba(10,10,10,0.97) 60%, transparent)' }}
            onMouseEnter={() => { paused.current = true }}
            onMouseLeave={() => { paused.current = false }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          {/* Scroll track */}
          <div
            ref={scrollRef}
            className="flex items-end pb-6"
            style={{ overflowX: 'hidden', paddingLeft: '4rem', paddingRight: '2rem', gap: 0 }}
            onMouseEnter={() => { paused.current = true }}
            onMouseLeave={() => { paused.current = false }}
          >
            {[...starred, ...starred].map((repo, i) => {
              const idx = i % count
              const rank = idx + 1
              const repoImg = getRepoImage(repo.name)
              const fallbackBg = fallbackGradients[idx % fallbackGradients.length]
              const langColor = langColors[repo.language ?? ''] ?? '#525252'

              return (
                <motion.a
                  key={`${repo.id}-${i}`}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-end flex-shrink-0 group"
                  style={{ marginRight: 8 }}
                  whileHover="hovered"
                >
                  {/* Big rank number */}
                  <motion.div
                    className="flex-shrink-0 select-none pointer-events-none font-display font-black leading-none"
                    style={{
                      fontSize: 200,
                      marginRight: -42,
                      zIndex: 1,
                      color: 'transparent',
                      WebkitTextStroke: '2.5px rgba(255,255,255,0.18)',
                      lineHeight: 1,
                      letterSpacing: '-0.05em',
                    }}
                    variants={{ hovered: { WebkitTextStroke: '2.5px rgba(204,34,0,0.6)' } }}
                    transition={{ duration: 0.2 }}
                  >
                    {rank}
                  </motion.div>

                  {/* Portrait card */}
                  <motion.div
                    className="relative overflow-hidden rounded-sm flex-shrink-0"
                    style={{ width: 220, height: 330, zIndex: 2, background: fallbackBg }}
                    variants={{ hovered: { scale: 1.06, y: -6 } }}
                    transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                  >
                    {/* Background image */}
                    {repoImg && (
                      <div
                        className="absolute inset-0 bg-center bg-cover"
                        style={{ backgroundImage: `url(${repoImg})` }}
                      />
                    )}

                    {/* Gradient overlay — always on */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.3) 70%, transparent 100%)' }}
                    />

                    {/* Hover full-cover overlay */}
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: 'rgba(0,0,0,0.55)' }}
                      variants={{ hovered: { opacity: 1 } }}
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Top — language dot + label */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                      {repo.language && (
                        <>
                          <div className="w-2 h-2 rounded-full" style={{ background: langColor }} />
                          <span className="font-mono text-[9px] uppercase tracking-wide" style={{ color: langColor }}>
                            {repo.language}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Bottom — title always visible */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <p className="font-display font-black text-white text-[13px] leading-tight uppercase line-clamp-2 mb-1.5">
                        {repo.name.replace(/[-_]/g, ' ')}
                      </p>

                      {/* Description — slides up on hover */}
                      <motion.p
                        className="font-mono text-[11px] leading-relaxed text-[#a3a3a3] line-clamp-3"
                        variants={{ hovered: { opacity: 1, y: 0 } }}
                        initial={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                      >
                        {repo.description ?? ''}
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.a>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
