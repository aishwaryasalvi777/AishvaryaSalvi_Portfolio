import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NetflixIntro({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); onComplete() }, 2800)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#0a0a0a' }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 1, 1] }}
        >
          <div className="flex flex-col items-center gap-4">
            {/* Red bar sweep */}
            <div className="relative">
              <motion.h1
                className="font-display font-black tracking-[0.12em] text-white select-none"
                style={{ fontSize: 'clamp(3rem, 9vw, 6rem)' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                AISH<span style={{ color: '#cc2200' }}>FLIX</span>
              </motion.h1>

              {/* Underline sweep */}
              <motion.div
                className="absolute bottom-0 left-0 h-[3px] rounded-full"
                style={{ background: 'linear-gradient(90deg, #cc2200, #ff4422)' }}
                initial={{ width: '0%', opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>

            {/* Tagline */}
            <motion.p
              className="font-mono text-[11px] uppercase tracking-[0.45em] text-[#525252]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              ORIGINAL SERIES
            </motion.p>

            {/* Pulsing dot */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#cc2200' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
              transition={{ delay: 1.9, duration: 0.6 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
