import { Link } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, Bot, Braces, Globe2 } from "lucide-react";
import { useRef, useState, type ComponentType } from "react";
import { projects, services } from "@/lib/site-data";

type StoryIndex = 0 | 1 | 2;
type StoryCardProps = { index: StoryIndex; progress: ReturnType<typeof useScroll>["scrollYProgress"]; light: boolean };
const cardIcons: Record<StoryIndex, ComponentType<{ className?: string }>> = { 0: Globe2, 1: Braces, 2: Bot };
const positions: Record<StoryIndex, { x: string[]; y: string[]; rotateY: number[]; rotateZ: number[]; scale: number[] }> = {
  0: { x: ["-80vw", "-31vw", "-31vw", "-23vw", "-24vw"], y: ["44vh", "4vh", "4vh", "-4vh", "2vh"], rotateY: [-75, -18, 18, -12, -24], rotateZ: [-14, -6, 3, -4, -7], scale: [0.68, 0.88, 1, 0.92, 0.86] },
  1: { x: ["0vw", "0vw", "0vw", "1vw", "3vw"], y: ["55vh", "-2vh", "-2vh", "3vh", "-4vh"], rotateY: [0, 4, -5, 9, 13], rotateZ: [0, 0, -2, 2, 3], scale: [0.72, 1.05, 1.08, 1.02, 1.04] },
  2: { x: ["80vw", "31vw", "31vw", "25vw", "26vw"], y: ["44vh", "5vh", "5vh", "-3vh", "3vh"], rotateY: [75, 18, -18, 14, 25], rotateZ: [14, 6, -3, 5, 8], scale: [0.68, 0.88, 1, 0.94, 0.88] },
};
function StoryCard({ index, progress, light }: StoryCardProps) {
  const layout = positions[index];
  const x = useTransform(progress, [0.08, 0.25, 0.48, 0.7, 0.9], layout.x);
  const y = useTransform(progress, [0.08, 0.25, 0.48, 0.7, 0.9], layout.y);
  const rotateY = useTransform(progress, [0.08, 0.25, 0.48, 0.7, 0.9], layout.rotateY);
  const rotateZ = useTransform(progress, [0.08, 0.25, 0.48, 0.7, 0.9], layout.rotateZ);
  const scale = useTransform(progress, [0.08, 0.25, 0.48, 0.7, 0.9], layout.scale);
  const Icon = cardIcons[index]; const service = services[index]; const project = projects[index];
  if (!service || !project) return null;
  return <motion.article className={`story-card story-card-${index + 1}`} style={{ x, y, rotateY, rotateZ, scale }}>
    <div className="story-card-shine" /><div className="relative z-10 flex h-full flex-col justify-between">
      <div className="flex items-center justify-between text-[10px] uppercase"><span className="story-pill">{light ? project.type : service.id}</span><span>MW / 0{index + 1}</span></div>
      <div>
        <motion.div animate={{ opacity: light ? 0 : 1, y: light ? -12 : 0 }} className={light ? "pointer-events-none absolute" : ""}><Icon className="mb-5 h-6 w-6" /><h3 className="text-2xl font-semibold md:text-3xl">{service.title}</h3><p className="mt-2 max-w-52 text-xs opacity-70">{service.blurb}</p></motion.div>
        <motion.div animate={{ opacity: light ? 1 : 0, y: light ? 0 : 12 }} className={!light ? "pointer-events-none absolute" : ""}><p className="mb-4 text-[10px] uppercase opacity-65">Featured release</p><h3 className="text-2xl font-semibold md:text-3xl">{project.name}</h3><p className="mt-2 text-xs opacity-70">{project.tech}</p></motion.div>
      </div>
    </div>
  </motion.article>;
}
export function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null); const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const reducedMotion = useReducedMotion(); const [light, setLight] = useState(false);
  const darkOpacity = useTransform(scrollYProgress, [0.48, 0.63], [1, 0]);
  const firstLineX = useTransform(scrollYProgress, [0.24, 0.54], ["75vw", "-155vw"]);
  const firstLineOpacity = useTransform(scrollYProgress, [0.2, 0.28, 0.49, 0.56], [0, 1, 1, 0]);
  const secondLineX = useTransform(scrollYProgress, [0.65, 0.94], ["70vw", "-170vw"]);
  const secondLineOpacity = useTransform(scrollYProgress, [0.62, 0.7, 0.9, 0.96], [0, 1, 1, 0]);
  const cardsOpacity = useTransform(scrollYProgress, [0, 0.08, 0.93, 0.99], [0, 1, 1, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 1, 0]);
  useMotionValueEvent(scrollYProgress, "change", (value) => { const shouldBeLight = value >= 0.59; setLight((current) => current === shouldBeLight ? current : shouldBeLight); });
  if (reducedMotion) return <section className="story-static px-5 py-24 md:px-10"><div className="mx-auto max-w-6xl"><p className="text-xs uppercase text-muted-foreground">Built across every layer</p><h2 className="text-big mt-5 max-w-3xl">We build what moves businesses forward.</h2><div className="mt-12 grid gap-4 md:grid-cols-3">{services.slice(0, 3).map((service) => <div key={service.id} className="story-static-card p-6"><p className="text-xs text-primary">{service.id}</p><h3 className="mt-12 text-2xl font-semibold">{service.title}</h3><p className="mt-3 text-sm text-muted-foreground">{service.blurb}</p></div>)}</div></div></section>;
  return <section ref={sectionRef} className="story-scroll relative h-[520vh]"><div className="story-stage sticky top-0 h-[100svh] overflow-hidden"><div className="story-light absolute inset-0"/><motion.div className="story-dark absolute inset-0" style={{ opacity: darkOpacity }}/><motion.div className="absolute inset-0 z-10 flex items-center justify-center text-center" style={{ opacity: introOpacity }}><div><p className="text-xs uppercase text-story-muted">MakeWebb studio system</p><h2 className="mt-4 text-4xl font-semibold text-story-strong md:text-7xl">One team. Every layer.</h2></div></motion.div><motion.p aria-hidden className="story-runner story-runner-dark" style={{ x: firstLineX, opacity: firstLineOpacity }}>WE BUILD WHAT MOVES</motion.p><motion.p aria-hidden className="story-runner story-runner-light" style={{ x: secondLineX, opacity: secondLineOpacity }}>DESIGN THAT SHIPS</motion.p><motion.div className="story-card-field absolute inset-0 z-20 flex items-center justify-center" style={{ opacity: cardsOpacity }}>{([0,1,2] as const).map((index) => <StoryCard key={index} index={index} progress={scrollYProgress} light={light}/>)}</motion.div><motion.div className="absolute inset-x-0 bottom-7 z-30 flex justify-center" style={{ opacity: cardsOpacity }}><Link to="/work" className={`story-action ${light ? "story-action-light" : ""}`}>Explore our work <ArrowUpRight className="h-4 w-4"/></Link></motion.div><div className={`story-progress z-30 ${light ? "story-progress-light" : ""}`}><span>01</span><motion.span className="story-progress-bar" style={{ scaleX: scrollYProgress }}/><span>05</span></div></div><div className="sr-only">Our services move from websites, applications and AI into released MakeWebb projects.<Link to="/services">See all services <ArrowRight/></Link></div></section>;
}
