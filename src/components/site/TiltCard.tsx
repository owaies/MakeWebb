import { type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type TiltCardProps = { children: ReactNode; className?: string; intensity?: number; glare?: boolean };

export function TiltCard({ children, className, intensity = 12, glare = true }: TiltCardProps) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const on = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), spring);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(320px circle at ${gx} ${gy}, oklch(1 0 0 / 0.18), transparent 62%)`;
  return (
    <div className="perspective-far">
      <motion.div
        onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); px.set((e.clientX - r.left) / r.width); py.set((e.clientY - r.top) / r.height); on.set(1); }}
        onPointerLeave={() => { px.set(0.5); py.set(0.5); on.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={cn("relative overflow-hidden rounded-3xl", className)}
      >
        {children}
        {glare && <motion.span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glareBg, opacity: on }} />}
      </motion.div>
    </div>
  );
}
