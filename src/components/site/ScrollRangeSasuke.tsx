import { useEffect, useState } from "react";
import { HeroModel } from "./HeroModel";
import "./scroll-range-sasuke.css";

export function ScrollRangeSasuke() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const start = document.querySelector<HTMLElement>("#selected-work");
        const footer = document.querySelector<HTMLElement>("footer");
        if (!start || !footer) return;
        const scrollY = window.scrollY;
        const startY = start.getBoundingClientRect().top + scrollY - window.innerHeight * 0.55;
        const endY = footer.getBoundingClientRect().bottom + scrollY;
        setActive(scrollY >= startY && scrollY < endY);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={`scroll-range-sasuke ${active ? "is-active" : ""}`} aria-hidden="true">
      <HeroModel />
    </div>
  );
}
