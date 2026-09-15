import { useEffect, useRef, useState } from "react";
import "./rinnegan-background.css";

type VideoKind = "mobile" | "mobileDesktop" | "desktop";

const SOURCES: Record<VideoKind, string> = {
  mobile: "/videos/rinnegan-mobile.mp4",
  mobileDesktop: "/videos/rinnegan-mobile-desktop.mp4",
  desktop: "/videos/rinnegan-desktop.mp4",
};

function detectVideoKind(): VideoKind {
  if (typeof window === "undefined" || typeof navigator === "undefined") return "desktop";

  const ua = navigator.userAgent || "";
  const uaData = (navigator as Navigator & {
    userAgentData?: { mobile?: boolean; platform?: string };
  }).userAgentData;
  const platform = `${navigator.platform || ""} ${uaData?.platform || ""}`.toLowerCase();
  const touchPoints = navigator.maxTouchPoints || 0;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  const fine = window.matchMedia?.("(pointer: fine)").matches ?? false;

  const android = /android/i.test(ua) || /android/i.test(platform);
  const iosPhone = /iphone|ipod/i.test(ua) || /iphone|ipod/i.test(platform);
  const ipad = /ipad/i.test(ua) || (platform.includes("mac") && touchPoints > 1);

  // Android Chrome Desktop Site may expose a desktop UA and a wide CSS
  // viewport. Touch + coarse pointer preserves the physical-device signal.
  const mobileHardware =
    android ||
    iosPhone ||
    ipad ||
    (touchPoints >= 2 && coarse && !fine && Math.max(screen.width, screen.height) <= 1600);

  if (!mobileHardware) return "desktop";

  const viewportWidth = Math.round(
    window.visualViewport?.width || window.innerWidth || document.documentElement.clientWidth || 0,
  );

  return viewportWidth >= 768 ? "mobileDesktop" : "mobile";
}

export function RinneganBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [kind, setKind] = useState<VideoKind>("desktop");
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
      setKind(detectVideoKind());
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    window.visualViewport?.addEventListener("resize", update, { passive: true });
    media.addEventListener?.("change", update);

    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
      media.removeEventListener?.("change", update);
    };
  }, []);

  const src = SOURCES[kind];

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    setReady(false);
    video.load();

    const onCanPlay = () => {
      setReady(true);
      void video.play().catch(() => undefined);
    };
    const onError = () => setReady(false);

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src, reducedMotion]);

  return (
    <div className="rinnegan-background" aria-hidden="true">
      <div className="rinnegan-background-fallback" />
      {!reducedMotion && (
        <video
          ref={videoRef}
          className={`rinnegan-background-video ${ready ? "is-ready" : ""}`}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
        />
      )}
      <div className="rinnegan-background-overlay" />
    </div>
  );
}
