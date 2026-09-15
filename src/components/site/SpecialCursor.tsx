import { useEffect, useRef } from "react";
import "./special-cursor.css";

export function SpecialCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    const move = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    const down = () => document.documentElement.classList.add("mw-cursor-down");
    const up = () => document.documentElement.classList.remove("mw-cursor-down");

    const frame = () => {
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;
      const { x, y } = current.current;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      rafRef.current = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("mw-cursor-down");
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
      window.setTimeout(() => ripple.remove(), 700);
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
