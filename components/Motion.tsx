'use client'

import { useEffect, useRef } from 'react'
import { reveal } from '@/lib/motion'

export function MotionSection({ children, className = '', ...props }: React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { reveal(ref.current); observer.unobserve(entry.target) }
    }), { threshold: 0.14 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <section ref={ref} className={className} {...props}>{children}</section>
}
