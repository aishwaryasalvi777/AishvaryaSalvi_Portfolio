import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX = useSpring(mouseX, { damping: 50, stiffness: 500, mass: 0.2 })
  const dotY = useSpring(mouseY, { damping: 50, stiffness: 500, mass: 0.2 })
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 280, mass: 0.5 })
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 280, mass: 0.5 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    const onEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-hover]')) setHovering(true)
    }
    const onLeave = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('a, button, [data-hover]')) setHovering(false)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [mouseX, mouseY])

  if (!visible) return null

  const ringSize = hovering ? 48 : clicking ? 20 : 36

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        style={{ left: ringX, top: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: hovering ? 'rgba(0,212,255,0.8)' : 'rgba(0,212,255,0.4)',
        }}
        transition={{ duration: 0.2 }}
        className="fixed rounded-full border pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      {/* Inner dot */}
      <motion.div
        style={{ left: dotX, top: dotY }}
        animate={{
          backgroundColor: hovering ? '#00d4ff' : '#ffffff',
          scale: clicking ? 0.6 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="fixed w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  )
}
