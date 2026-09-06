'use client'

import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

export function MotionSection({children,className='',...props}:React.HTMLAttributes<HTMLElement>){
 const ref=useRef<HTMLElement>(null)
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
  const el=ref.current;if(!el)return
  const targets=el.querySelectorAll<HTMLElement>(':scope > *')
  let active:ReturnType<typeof animate>|null=null
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){active=animate(targets,{opacity:[0,1],translateY:[20,0],delay:stagger(65),duration:650,ease:'out(4)'});observer.unobserve(entry.target)}}),{threshold:.12})
  observer.observe(el)
  return()=>{observer.disconnect();active?.pause()}
 },[])
 return <section ref={ref} className={className} {...props}>{children}</section>
}
