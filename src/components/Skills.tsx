import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillGroups } from '../data/skills'

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" className="py-24 px-8 max-w-[1400px] mx-auto" ref={ref}>
      <div className="divider mb-16" />

      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label mb-4">
        <span className="dot" /><span className="num">06</span><span>—</span><span>TOOLKIT</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="section-heading mb-12"
      >
        THE STACK I <span className="accent-word">REACH FOR.</span>
      </motion.h2>

      <div className="space-y-0">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: gi * 0.08 }}
          >
            <div className="divider" />
            <div className="py-5 flex flex-wrap md:flex-nowrap items-start gap-6 md:gap-12">
              <div className="w-full md:w-56 flex-shrink-0">
                <span className="font-display font-black text-white text-sm uppercase tracking-wide">
                  {group.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: gi * 0.06 + si * 0.025 }}
                    className="tag-pill hover:border-[rgba(255,255,255,0.25)] hover:text-white transition-colors duration-150 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        <div className="divider" />
      </div>
    </section>
  )
}
