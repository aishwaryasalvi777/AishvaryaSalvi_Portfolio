import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import type React from 'react'

export function useTilt(maxDeg = 8) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxDeg, -maxDeg]), {
    stiffness: 400, damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxDeg, maxDeg]), {
    stiffness: 400, damping: 30,
  })

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return { rotateX, rotateY, transformPerspective: 900, onMouseMove, onMouseLeave }
}
