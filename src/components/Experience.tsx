import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experience } from '../data/experience'

const posters = [
  ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex items-center justify-center relative overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 100%)' }}>
      <svg viewBox="0 0 200 160" className="w-full h-full opacity-80">
        {[[100,80],[50,40],[150,40],[30,100],[170,100],[80,130],[120,130]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={i===0?8:5} fill={i===0?'#cc2200':'#662200'} opacity={0.9} />
        ))}
        {[[100,80,50,40],[100,80,150,40],[100,80,30,100],[100,80,170,100],[50,40,30,100],[150,40,170,100],[80,130,100,80],[120,130,100,80]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke='#cc2200' strokeWidth={0.8} opacity={0.4} />
        ))}
        <circle cx={100} cy={80} r={14} fill="none" stroke="#cc2200" strokeWidth={0.5} opacity={0.3}/>
        <circle cx={100} cy={80} r={22} fill="none" stroke="#cc2200" strokeWidth={0.3} opacity={0.15}/>
      </svg>
      <div className="absolute bottom-3 left-3 right-3">
        <div className="font-mono text-[9px] text-[#cc2200] opacity-60 uppercase tracking-widest">RAG · AGENT · PINECONE</div>
      </div>
    </div>
  ),
  ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex items-end justify-center pb-6 relative overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a00 100%)' }}>
      <svg viewBox="0 0 200 120" className="w-full h-[80%]">
        {[40,65,52,80,95,72,87,60,45,70,88,55].map((h,i) => (
          <rect key={i} x={8+i*15} y={120-h} width={10} height={h} fill={i===4?'#cc2200':'#441100'} opacity={0.85} rx={1}/>
        ))}
        <polyline points="13,80 28,55 43,68 58,40 73,25 88,48 103,33 118,60 133,75 148,50 163,32 178,65"
          fill="none" stroke="#ff6633" strokeWidth={1.5} opacity={0.6}/>
      </svg>
      <div className="absolute bottom-3 left-3 right-3">
        <div className="font-mono text-[9px] text-[#cc2200] opacity-60 uppercase tracking-widest">CATBOOST · 87% ACCURACY</div>
      </div>
    </div>
  ),
  ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex items-center justify-center relative overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0a1a 100%)' }}>
      <div className="grid grid-cols-3 gap-1.5 p-4 w-full">
        {[['450+','Defects'],['95%','Coverage'],['40%','↓ Anomaly'],['12k','SQL Rows'],['Ø','Delta'],['55%','↓ Bug Time'],['97%','Build OK'],['6×','Faster'],['3','Dashboards']].map(([v,l],i) => (
          <div key={i} className="text-center p-1.5 rounded-sm" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)'}}>
            <div className="font-mono text-[11px] font-bold" style={{color: i===0||i===3?'#cc2200':'#ffffff'}}>{v}</div>
            <div className="font-mono text-[7px] text-[#525252] uppercase mt-0.5">{l}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  ({ className }: { className?: string }) => (
    <div className={`w-full h-full flex flex-col justify-center p-4 relative overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #050a05 100%)' }}>
      {['SELECT campaign_runs id','  FROM campaign_runs cr','  JOIN defects d USING(id)','GROUP BY channel;','','→ 12,842 rows · 1.2GB scanned'].map((line,i) => (
        <div key={i} className="font-mono leading-relaxed" style={{fontSize:'9px',color:line.startsWith('→')?'#4ade80':line.startsWith(' ')?'#a3a3a3':'#cc2200',opacity:0.8}}>
          {line || ' '}
        </div>
      ))}
    </div>
  ),
]

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

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {experience.map((item, i) => {
          const Poster = posters[i] ?? posters[0]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover="hovered"
              className="netflix-card group flex flex-col relative overflow-hidden cursor-pointer"
              style={{ isolation: 'isolate' }}
            >
              {/* Poster */}
              <div className="relative flex-shrink-0" style={{ aspectRatio: '16/10', minHeight: 120 }}>
                <Poster className="absolute inset-0" />
                <div className="absolute top-3 left-3 font-mono text-[10px] text-[#a3a3a3] uppercase tracking-widest">
                  EPISODE {String(i + 1).padStart(2, '0')} · {item.period.slice(-4)}
                </div>
                <div className="absolute top-3 right-3 match-badge flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#4ade80]" />
                  {95 - i * 1}% Match
                </div>

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
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-black text-white text-base leading-tight mb-1 group-hover:text-[#cc2200] transition-colors duration-200">
                  {item.role.toUpperCase()}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wide mb-3" style={{ color: '#cc2200' }}>
                  {item.company}
                </p>
                <p className="text-[#a3a3a3] text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
                  {item.highlights[0]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Hover overlay — slides up to reveal all highlights */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-5 z-10"
                style={{
                  background: 'linear-gradient(to top, rgba(10,10,10,0.98) 55%, rgba(10,10,10,0.75) 80%, rgba(10,10,10,0.3) 100%)',
                }}
                variants={{
                  hovered: { opacity: 1, y: 0 },
                }}
                initial={{ opacity: 0, y: '100%' }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              >
                <p className="font-mono text-[10px] text-[#cc2200] uppercase tracking-widest mb-3">
                  EPISODE {String(i + 1).padStart(2, '0')} · {item.period}
                </p>
                <h3 className="font-display font-black text-white text-sm mb-1">{item.role.toUpperCase()}</h3>
                <p className="font-mono text-[10px] uppercase tracking-wide mb-4" style={{ color: '#cc2200' }}>{item.company}</p>
                <div className="space-y-2">
                  {item.highlights.slice(0, 3).map((h, hi) => (
                    <motion.p
                      key={hi}
                      className="text-[#a3a3a3] text-[10px] leading-relaxed flex gap-2"
                      variants={{ hovered: { opacity: 1, y: 0 } }}
                      initial={{ opacity: 0, y: 8 }}
                      transition={{ delay: 0.1 + hi * 0.07 }}
                    >
                      <span className="text-[#cc2200] flex-shrink-0">›</span>
                      {h.length > 90 ? h.slice(0, 90) + '…' : h}
                    </motion.p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.tags.map(tag => (
                    <span key={tag} className="tag-pill text-[9px] px-2 py-0.5">{tag}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
