import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useGitHubProjects } from '../hooks/useGitHubProjects'
import { getRepoImage } from '../data/projectImages'

const langColors: Record<string, string> = {
  Python: '#3572A5', TypeScript: '#3178c6', JavaScript: '#f1e05a',
  Jupyter: '#DA5B0B', Shell: '#89e051', Go: '#00ADD8',
  R: '#198CE7', SQL: '#e38c00', CSS: '#563d7c',
}

const langGradients: Record<string, string> = {
  Python:     'linear-gradient(135deg, #0d1b2e 0%, #1a3a5c 100%)',
  TypeScript: 'linear-gradient(135deg, #0d1a2e 0%, #1a3060 100%)',
  JavaScript: 'linear-gradient(135deg, #1a1400 0%, #3a2e00 100%)',
  Jupyter:    'linear-gradient(135deg, #1a0d00 0%, #3a1800 100%)',
  Shell:      'linear-gradient(135deg, #0d1a0d 0%, #1a3320 100%)',
  Go:         'linear-gradient(135deg, #00141a 0%, #003040 100%)',
  R:          'linear-gradient(135deg, #0d1a2e 0%, #1a2e50 100%)',
  SQL:        'linear-gradient(135deg, #1a1000 0%, #3a2800 100%)',
  CSS:        'linear-gradient(135deg, #130d1a 0%, #2a1540 100%)',
}

const CARD_STEP = 3 * 320

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const { repos, loading, error } = useGitHubProjects()
  const scrollRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>()
  const paused = useRef(false)
  const [hovered, setHovered] = useState(false)

  // Auto-scroll via rAF
  useEffect(() => {
    if (loading || repos.length === 0) return
    const el = scrollRef.current
    if (!el) return

    const tick = () => {
      if (!paused.current && el) {
        el.scrollLeft += 0.6
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [loading, repos.length])

  const scrollLeft = () => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: -CARD_STEP, behavior: 'smooth' })
  }

  const scrollRight = () => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: CARD_STEP, behavior: 'smooth' })
    // seamless loop
    setTimeout(() => {
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
    }, 400)
  }

  return (
    <section
      id="projects"
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
          <span style={{ color: '#cc2200', fontWeight: 700 }}>CONTINUE BUILDING</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-heading"
        >
          PROJECTS
        </motion.h2>
      </div>

      {loading && (
        <div className="px-8 flex gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 rounded-sm shimmer" style={{ width: 300, height: 260 }} />
          ))}
        </div>
      )}

      {error && (
        <div className="px-8">
          <a href="https://github.com/aishwaryasalvi777" target="_blank" rel="noreferrer"
            className="font-mono text-xs text-[#cc2200]">View on GitHub ↗</a>
        </div>
      )}

      {!loading && !error && (
        <div className="relative">
          {/* Left arrow */}
          <motion.button
            onClick={scrollLeft}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-0 bottom-6 z-20 flex items-center justify-center w-14 focus:outline-none"
            style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.95) 60%, transparent)' }}
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
            className="absolute right-0 top-0 bottom-6 z-20 flex items-center justify-center w-14 focus:outline-none"
            style={{ background: 'linear-gradient(to left, rgba(10,10,10,0.95) 60%, transparent)' }}
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
            className="flex gap-5 pb-6"
            style={{ overflowX: 'hidden', paddingLeft: '2rem', paddingRight: '2rem', scrollBehavior: 'auto' }}
            onMouseEnter={() => { paused.current = true }}
            onMouseLeave={() => { paused.current = false }}
          >
            {[...repos.slice(0, 12), ...repos.slice(0, 12)].map((repo, i) => {
              const idx = i % 12
              const langColor = langColors[repo.language ?? ''] ?? '#525252'
              const bg = langGradients[repo.language ?? ''] ?? 'linear-gradient(135deg, #111 0%, #1c1c1c 100%)'
              const repoImg = getRepoImage(repo.name)

              return (
                <motion.a
                  key={`${repo.id}-${i}`}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, y: -8, zIndex: 10 }}
                  style={{ width: 300, flexShrink: 0, position: 'relative' }}
                  className="netflix-card flex flex-col group"
                >
                  {/* Poster */}
                  <div
                    className="relative overflow-hidden flex flex-col justify-between p-4"
                    style={{
                      height: 180,
                      background: repoImg ? `url(${repoImg}) center/cover no-repeat` : bg,
                    }}
                  >
                    {/* Dark overlay when image is present so text stays readable */}
                    {repoImg && (
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.35) 100%)', zIndex: 0 }} />
                    )}
                    <div className="flex items-start justify-between relative z-10">
                      <div className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-sm"
                        style={{ background: '#cc2200', color: '#fff' }}>
                        TOP {idx + 1}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="match-badge text-[11px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                          {Math.max(78, 96 - idx * 1.5).toFixed(0)}% MATCH
                        </span>
                        {repo.stargazers_count > 0 && (
                          <span className="font-mono text-[10px] flex items-center gap-1" style={{ color: '#f1c40f' }}>
                            ★ {repo.stargazers_count}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className="absolute right-3 bottom-0 font-display font-black select-none pointer-events-none leading-none"
                      style={{ fontSize: 96, color: 'rgba(255,255,255,0.05)' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    <div className="flex items-center gap-2 z-10">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: langColor }} />
                      <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: langColor }}>
                        {repo.language ?? 'Code'}
                      </span>
                      <span className="font-mono text-[10px] text-[#525252]">
                        · {new Date(repo.updated_at).getFullYear()}
                      </span>
                    </div>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[3px]"
                      style={{ background: '#cc2200', scaleX: 0, originX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.35 }}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4 flex-1 flex flex-col gap-2">
                    <h3 className="font-display font-black text-white text-sm leading-tight uppercase group-hover:text-[#cc2200] transition-colors duration-200 line-clamp-2">
                      {repo.name.replace(/[-_]/g, ' ')}
                    </h3>
                    <p className="text-[#525252] text-xs leading-relaxed line-clamp-3 flex-1 group-hover:text-[#a3a3a3] transition-colors duration-200">
                      {repo.description ?? 'No description.'}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
