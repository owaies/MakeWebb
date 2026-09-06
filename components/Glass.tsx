'use client'

import { useEffect, useRef } from 'react'

export function Glass({ children, className = '', as: Tag = 'div', ...props }: React.HTMLAttributes<HTMLElement> & { as?: any }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${((e.clientX-r.left)/r.width)*100}%`)
      el.style.setProperty('--my', `${((e.clientY-r.top)/r.height)*100}%`)
    }
    el.addEventListener('pointermove', onMove, { passive:true })
    return () => el.removeEventListener('pointermove', onMove)
  }, [])
  return <Tag ref={ref} className={`glass ${className}`} {...props}>{children}</Tag>
}
