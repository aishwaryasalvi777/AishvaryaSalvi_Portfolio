import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useGitHubProjects } from '../hooks/useGitHubProjects'

const langColors: Record<string, string> = {
  Python: '#3572A5', TypeScript: '#3178c6', JavaScript: '#f1e05a',
  Jupyter: '#DA5B0B', Shell: '#89e051', Go: '#00ADD8',
  R: '#198CE7', SQL: '#e38c00', CSS: '#563d7c',
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const { repos, loading, error } = useGitHubProjects()

  return (
    <section id="projects" className="py-12 max-w-[1400px] mx-auto" ref={ref}>
      <div className="px-8 mb-6">
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
        <div className="px-8 flex gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-52 h-40 rounded-sm shimmer" />
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
        <div className="horizontal-scroll px-8 pb-6">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {repos.slice(0, 12).map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 25 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                whileHover={{ scale: 1.07, y: -6, zIndex: 10 }}
                style={{ width: '220px', position: 'relative' }}
                className="netflix-card flex-shrink-0 flex flex-col group"
              >
                {/* Poster area */}
                <div
                  className="relative flex items-end justify-start p-3 overflow-hidden"
                  style={{ height: 130, background: `linear-gradient(135deg, #111 0%, #1a1a1a 100%)` }}
                >
                  {/* Shimmer overlay on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)', backgroundSize: '200% 100%' }}
                    initial={{ backgroundPosition: '100% 0' }}
                    whileHover={{ backgroundPosition: '-100% 0' }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className="absolute top-2 left-2 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-sm"
                    style={{ background: '#cc2200', color: '#fff' }}>
                    TOP {i + 1}
                  </div>
                  <div className="absolute top-2 right-2 match-badge text-[10px] flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#4ade80]" />
                    {Math.max(78, 96 - i * 1.5).toFixed(0)}%
                  </div>

                  {/* Star count — appears on hover */}
                  {repo.stargazers_count > 0 && (
                    <motion.div
                      className="absolute top-8 right-2 font-mono text-[9px] text-[#f1c40f] flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      ★ {repo.stargazers_count}
                    </motion.div>
                  )}

                  <div className="font-mono text-[9px] text-[#525252] uppercase tracking-wider z-10">
                    {repo.language ?? 'Code'} · {new Date(repo.updated_at).getFullYear()}
                  </div>
                  <div
                    className="absolute right-2 bottom-1 font-display font-black select-none pointer-events-none"
                    style={{ fontSize: 64, color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {repo.language && (
                    <div
                      className="absolute bottom-3 right-3 w-2 h-2 rounded-full"
                      style={{ background: langColors[repo.language] ?? '#525252' }}
                    />
                  )}

                  {/* Bottom red line on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: '#cc2200', scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Info */}
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="font-display font-black text-white text-xs leading-tight uppercase mb-1 group-hover:text-[#cc2200] transition-colors duration-200 line-clamp-2">
                    {repo.name.replace(/[-_]/g, ' ')}
                  </h3>
                  <p className="text-[#525252] text-[10px] leading-relaxed line-clamp-2 flex-1 group-hover:text-[#a3a3a3] transition-colors duration-200">
                    {repo.description ?? 'No description.'}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
