import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/TiltCard";
import { ScrollStory } from "@/components/site/ScrollStory";
import { HeroModel } from "@/components/site/HeroModel";
import { RinneganBackground } from "@/components/site/RinneganBackground";
import { projects, services } from "@/lib/site-data";
import "@/components/site/hero-services.css";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "MakeWebb — Websites, Apps, AI Integration & Automation" },
    { name: "description", content: "MakeWebb builds high-craft websites, applications, AI integrations, automation, UI/UX and interactive 3D experiences for founders and teams." },
    { property: "og:title", content: "MakeWebb — Websites, Apps, AI & Automation" },
    { property: "og:description", content: "A two-person studio shipping websites, apps, AI integrations, automation, product design and interactive experiences." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Home,
});

function Hero() {
  return <section className="hero-scroll-scene">
    <div className="hero-scroll-sticky">
      <RinneganBackground />
      <div className="hero-scroll-model"><HeroModel /></div>
      <div className="makewebb-hero-wash" />
      <div className="relative z-10 mx-auto h-full max-w-[1440px] px-6 md:px-10 lg:px-10">
        <div className="grid h-full grid-cols-12">
          <div className="col-span-12 flex flex-col justify-center lg:col-span-5 lg:justify-start lg:pt-[21vh]">
            <p className="makewebb-kicker"><span /> WE BUILD THE NEXT</p>
            <h1 className="makewebb-hero-title">Ideas into<span>Reality</span></h1>
            <p className="makewebb-hero-copy">Websites, Apps, AI Integration,<br className="hidden sm:block" /> Automation and Digital Products<br className="hidden sm:block" /> for the next generation.</p>
            <div className="mt-8 flex items-center gap-5 sm:mt-10">
              <Link to="/contact" className="makewebb-primary-button">Start a Project <ArrowUpRight className="h-4 w-4" /></Link>
              <Link to="/work" className="makewebb-showreel"><span className="makewebb-play"><Play className="ml-0.5 h-4 w-4 fill-current" /></span><span>Watch Showreel</span></Link>
            </div>
          </div>
        </div>
        <div className="makewebb-hero-character-label"><span>う</span><span>ち</span><span>は</span><span>サ</span><span>ス</span><span>ケ</span></div>
        <div className="makewebb-stats"><div><strong>50+</strong><span>Projects Delivered</span></div><div><strong>30+</strong><span>Happy Clients</span></div><div><strong>3+</strong><span>Years of Experience</span></div></div>
        <div className="makewebb-bottom-mark"><span>BUILD</span><span>AUTOMATE</span><span>INNOVATE</span></div>
        <div className="makewebb-scroll-cue"><span className="makewebb-mouse"><i /></span><span>SCROLL</span><i className="makewebb-scroll-line" /></div>
      </div>
    </div>
  </section>;
}

function Marquee(){const items=["WEB","APPS","AI INTEGRATION","AUTOMATION","UI/UX","3D / INTERACTIVE","DATA"];return <div className="overflow-hidden border-y border-border bg-ink py-5"><motion.div className="flex gap-10 whitespace-nowrap" animate={{x:["0%","-50%"]}} transition={{duration:22,repeat:Infinity,ease:"linear"}}>{[...items,...items,...items,...items].map((t,i)=><span key={i} className="font-display text-sm tracking-[0.28em] text-muted-foreground uppercase">{t} <span className="text-primary">✦</span></span>)}</motion.div></div>}
function Services(){return <section className="mx-auto max-w-6xl px-5 py-28 md:px-10"><Reveal><p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">What we do</p><h2 className="text-big mt-5 max-w-2xl">Seven disciplines, one team</h2></Reveal><div className="mt-14 grid gap-5 md:grid-cols-2">{services.map((s,i)=><Reveal key={s.id} delay={i*0.06}><TiltCard intensity={9} className="glass h-full p-7"><div className="flex items-start justify-between"><span className="font-display text-sm text-primary">{s.id}</span><ArrowUpRight className="h-4 w-4 text-muted-foreground"/></div><h3 className="mt-8 text-3xl font-semibold">{s.title}</h3><p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p><div className="mt-6 flex flex-wrap gap-2">{s.tags.map(t=><span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs">{t}</span>)}</div></TiltCard></Reveal>)}</div></section>}
function WorkPreview(){return <section id="selected-work" className="mx-auto max-w-6xl px-5 py-28 md:px-10"><Reveal className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Selected work</p><h2 className="text-big mt-5">Shipped, not slides</h2></div><Link to="/work" className="glass rounded-full px-5 py-2.5 text-sm">All projects</Link></Reveal><div className="mt-14 space-y-3">{projects.slice(0,3).map((p,i)=><Reveal key={p.code} delay={i*0.07}><a href={p.url} target="_blank" rel="noreferrer" className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-2xl border border-border px-5 py-6 transition-colors hover:bg-secondary"><span className="font-display text-xs text-muted-foreground">{p.code}</span><span><span className="block text-xl font-semibold transition-transform group-hover:translate-x-1">{p.name}</span><span className="mt-1 block text-xs text-muted-foreground">{p.tech}</span></span><ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"/></a></Reveal>)}</div></section>}
function CTA(){return <section className="px-5 md:px-10"><div className="aurora grain relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-8 py-24 text-center md:px-16"><Reveal><h2 className="text-huge">Let's build it</h2><p className="mx-auto mt-6 max-w-md text-sm text-foreground/80">Tell us what you're making. We'll come back with a plan, a timeline and a price — no discovery theatre.</p><Link to="/contact" className="mt-9 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]">Get started <ArrowUpRight className="h-4 w-4"/></Link></Reveal></div></section>}
function Home(){return <main><Hero/><Marquee/><Services/><ScrollStory/><WorkPreview/><CTA/></main>}
