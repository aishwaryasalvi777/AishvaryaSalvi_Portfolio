import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useGitHubStarred } from '../hooks/useGitHubProjects'

export default function StarredProjects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const { starred, loading } = useGitHubStarred()

  return (
    <section id="starred" className="py-12 max-w-[1400px] mx-auto" ref={ref}>
      <div className="px-8 mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-label mb-2"
        >
          <span className="dot" />
          <span style={{ color: '#cc2200', fontWeight: 700 }}>MY LIST</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-heading"
        >
          STARRED & TRACKED
        </motion.h2>
      </div>

      {loading && (
        <div className="px-8 flex gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-52 h-36 rounded-sm animate-pulse" style={{ background: '#111' }} />
          ))}
        </div>
      )}

      {!loading && (
        <div className="horizontal-scroll px-8 pb-4">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {starred.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="netflix-card flex-shrink-0 flex flex-col"
                style={{ width: '220px' }}
              >
                {/* Poster */}
                <div
                  className="relative flex items-end p-3"
                  style={{
                    height: 130,
                    background: `linear-gradient(135deg, #0f0f0f 0%, #1a1010 100%)`,
                  }}
                >
                  <div className="absolute top-2 right-2 match-badge text-[10px] flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#4ade80]" />
                    {Math.max(79, 95 - i)}% MATCH
                  </div>
                  <div className="font-mono text-[9px] text-[#525252] uppercase tracking-wider">
                    @AISHWARYASALVI777
                  </div>
                  <div className="font-mono text-[8px] text-[#525252] uppercase tracking-wider ml-auto">
                    {repo.language ?? 'CODE'} · 1
                  </div>
                  <div
                    className="absolute right-2 bottom-1 font-display font-black select-none"
                    style={{ fontSize: 64, color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="font-display font-black text-white text-xs leading-tight uppercase mb-1 line-clamp-2">
                    {repo.name.replace(/[-_]/g, ' ')}
                  </h3>
                  <p className="text-[#525252] text-[10px] font-mono">{repo.full_name.split('/')[0]}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
