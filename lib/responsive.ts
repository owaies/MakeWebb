export type Presentation = 'mobile' | 'tablet' | 'desktop'

export function getPresentation(): Presentation {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  const touch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false
  const noHover = window.matchMedia?.('(hover: none)').matches ?? false
  if (touch && (coarse || noHover) && width >= 900) return 'tablet'
  if (width < 768) return 'mobile'
  if (width < 1100) return 'tablet'
  return 'desktop'
}
