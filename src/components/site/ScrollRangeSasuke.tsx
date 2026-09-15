import { useEffect, useState } from "react";
import { HeroModel } from "./HeroModel";
import "./scroll-range-sasuke.css";

export function ScrollRangeSasuke() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Keep Sasuke mounted and centered throughout the home page so the
        // animation can be driven continuously by the full-page scroll.
        setActive(true);
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
