'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { animate, stagger } from 'animejs'
import { getPresentation } from '@/lib/responsive'
import StudioScene from './StudioScene'
import { FounderCard } from './FounderCard'
import { Glass } from './Glass'

const founders=[
{name:'Mohammed Owaies',role:'AI/ML Engineer',description:'Building intelligent solutions for a smarter tomorrow.',phone:'7619329863',email:'owaies786@gmail.com',focus:'AI · ML · DATA',portfolio:'https://github.com/owaies',github:'https://github.com/owaies',linkedin:'https://www.linkedin.com/'},
{name:'Mohammed Afaf Hassan',role:'Web Developer',description:'Crafting modern web experiences with clean code and creative design.',phone:'8073818817',email:'kingahassan786@gmail.com',focus:'WEB · APPS · UI/UX',portfolio:'#projects',github:'https://github.com/',linkedin:'https://www.linkedin.com/'}]
const services=[['01','Web Design & Development','Modern, fast and scalable web experiences.','▣'],['02','Android App Development','Powerful mobile apps for real users.','▱'],['03','Windows App Development','Desktop apps with modern technology.','⊞'],['04','AI Integration','Smarter products with AI/ML.','AI']]

export default function Hero(){
 const ref=useRef<HTMLDivElement>(null);const[menu,setMenu]=useState(false)
 useEffect(()=>{const setPresentation=()=>{document.documentElement.dataset.presentation=getPresentation()};setPresentation();window.addEventListener('resize',setPresentation,{passive:true});return()=>window.removeEventListener('resize',setPresentation)},[])
 useEffect(()=>{const root=ref.current;if(!root||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const a=animate(root.querySelectorAll('[data-hero]'),{opacity:[0,1],translateY:[22,0],delay:stagger(80),duration:800,ease:'out(4)'});return()=>a.pause()},[])
 return <section ref={ref} className="hero" id="home"><StudioScene/>
  <header className="nav glass-shell"><Link href="#home" className="brand" aria-label="MakeWebb home"><span className="brand-mark">M</span><span>MakeWebb</span></Link><nav className={`desktop-nav ${menu?'open':''}`}>{['Home','About','Services','Projects','Team','Contact'].map(x=><Link key={x} href={`#${x.toLowerCase()}`} onClick={()=>setMenu(false)}>{x}</Link>)}</nav><div className="nav-actions"><Link className="nav-cta" href="#contact">Start a Project <span>↗</span></Link><button className="menu-btn" onClick={()=>setMenu(v=>!v)} aria-label="Toggle menu" aria-expanded={menu}>☰</button></div></header>
  <div className="hero-side hero-side-left"><span>PEOPLE</span><span>IDEAS</span><span>TECHNOLOGY</span><span>IMPACT</span></div><div className="hero-side hero-side-right"><span>MODERN</span><span>SCALABLE</span><span>BEAUTIFUL</span><span>TOGETHER</span></div>
  <div className="hero-copy"><div data-hero className="eyebrow">BUILDING A BETTER DIGITAL WORLD</div><h1 data-hero><span>MakeWebb</span><strong>Web. Android. Windows.</strong><em>Ideas into real products.</em></h1><p data-hero>We design and develop modern digital experiences<br className="desktop-only"/> with 3D, AI and next-gen technologies.</p><div data-hero className="hero-actions"><Link href="#contact" className="button button-primary">Let&apos;s Build Together <span>↗</span></Link><Link href="#projects" className="button">View Our Work <span>↗</span></Link></div></div>
  <div className="founder-stage"><FounderCard founder={founders[0]}/><div className="center-stack"><div className="center-cube" aria-hidden="true"><div className="cube-face">M</div></div><div className="trusted"><span>TRUSTED BY INNOVATORS</span><div><b>Next.js</b><b>React</b><b>Android</b><b>Windows</b></div></div></div><FounderCard founder={founders[1]}/></div>
  <div className="service-grid hero-services">{services.map(([num,title,desc,icon])=><Glass key={num} className="service-card"><span className="service-num">{num}</span><div className="service-icon">{icon}</div><h3>{title}</h3><p>{desc}</p><span className="service-arrow">↗</span></Glass>)}</div>
 </section>
}
