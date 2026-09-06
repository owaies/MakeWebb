'use client'

import { animate, stagger } from 'animejs'

export function reveal(root: Element | null) {
  if (!root) return () => undefined
  const targets = root.querySelectorAll<HTMLElement>('[data-reveal]')
  if (!targets.length) return () => undefined
  const animation = animate(targets, { opacity:[0,1], translateY:[28,0], delay:stagger(70), duration:760, ease:'out(4)' })
  return () => animation.pause()
}

export { animate, stagger }
