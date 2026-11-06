import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    let starting = false;
    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const stop = () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      lenis?.destroy();
      lenis = undefined;
    };

    const start = async () => {
      if (motionQuery.matches || lenis || starting) return;
      cancelled = false;
      starting = true;

      try {
        const { default: Lenis } = await import("lenis");
        starting = false;
        if (cancelled || motionQuery.matches) return;

        lenis = new Lenis({
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.6,
        });

        const loop = (time: number) => {
          if (cancelled || motionQuery.matches || !lenis) return;
          lenis.raf(time);
          raf = requestAnimationFrame(loop);
        };

        raf = requestAnimationFrame(loop);
      } catch (error: unknown) {
        starting = false;
        if (!cancelled) console.error("Unable to initialize smooth scrolling", error);
      }
    };

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        stop();
      } else {
        cancelled = false;
        void start();
      }
    };

    motionQuery.addEventListener("change", handleMotionChange);
    void start();

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      stop();
    };
  }, []);

  return <>{children}</>;
}
