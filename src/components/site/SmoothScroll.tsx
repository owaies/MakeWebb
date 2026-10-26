import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let raf = 0;
    let destroy: (() => void) | undefined;
    let cancelled = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    import("lenis")
      .then(({ default: Lenis }) => {
        // The dynamic import may finish after this component has unmounted.
        if (cancelled) return;

        const lenis = new Lenis({
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.6,
        });

        const loop = (time: number) => {
          if (cancelled) return;
          lenis.raf(time);
          raf = requestAnimationFrame(loop);
        };

        raf = requestAnimationFrame(loop);
        destroy = () => {
          cancelAnimationFrame(raf);
          lenis.destroy();
        };
      })
      .catch((error: unknown) => {
        if (!cancelled) console.error("Unable to initialize smooth scrolling", error);
      });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return <>{children}</>;
}
