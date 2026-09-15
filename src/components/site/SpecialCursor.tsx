import { useEffect, useRef } from "react";
import "./special-cursor.css";

export function SpecialCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    let visible = false;
    let lastTime = performance.now();

    const move = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      visible = true;
      document.documentElement.classList.add("mw-cursor-visible");

      const interactive = (event.target as Element | null)?.closest(
        "a, button, [role=button], input, textarea, select, summary",
      );
      document.documentElement.classList.toggle("mw-cursor-hover", !!interactive);
    };

    const down = () => document.documentElement.classList.add("mw-cursor-down");
    const up = () => document.documentElement.classList.remove("mw-cursor-down");
    const leave = () => {
      visible = false;
      document.documentElement.classList.remove("mw-cursor-visible", "mw-cursor-hover");
    };

    const frame = (time: number) => {
      const dt = Math.min(Math.max(time - lastTime, 0), 32);
      lastTime = time;

      // Frame-rate-independent exponential smoothing. The dot is tight to the
      // pointer while the ring has a softer physical trailing response.
      const dotEase = 1 - Math.exp(-dt / 34);
      const ringEase = 1 - Math.exp(-dt / 105);
      dot.current.x += (target.current.x - dot.current.x) * dotEase;
      dot.current.y += (target.current.y - dot.current.y) * dotEase;
      ring.current.x += (target.current.x - ring.current.x) * ringEase;
      ring.current.y += (target.current.y - ring.current.y) * ringEase;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px,${dot.current.y}px,0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px,${ring.current.y}px,0)`;
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("mw-cursor-visible", "mw-cursor-hover", "mw-cursor-down");
    };
  }, []);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (!coarsePointer.matches) return;

    let lastTouch = 0;
    const touch = (event: TouchEvent) => {
      const point = event.changedTouches[0];
      if (!point) return;
      const now = performance.now();
      if (now - lastTouch < 55) return;
      lastTouch = now;

      const ripple = document.createElement("span");
      ripple.className = "mw-touch-ripple";
      ripple.style.left = `${point.clientX}px`;
      ripple.style.top = `${point.clientY}px`;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    };

    document.addEventListener("touchstart", touch, { passive: true });
    return () => document.removeEventListener("touchstart", touch);
  }, []);

  return (
    <>
      <div ref={ringRef} className="mw-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="mw-cursor-dot" aria-hidden="true" />
    </>
  );
}
