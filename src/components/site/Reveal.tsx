import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, y = 28, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }} className={cn(className)}>
      {children}
    </motion.div>
  );
}

export function RevealWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("inline-block", className)}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span className="inline-block" initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}>
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}
