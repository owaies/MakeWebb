'use client';

import { useEffect } from 'react';

export default function PremiumLiquidGlass() {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    if (!finePointer.matches) return;

    const surfaces = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.hero-founder-card, .hero-service-card, .hero-glass-cube-body, .button, .text-link, .hero-founder-links a'
      )
    );

    const onMove = (event: PointerEvent) => {
      for (const surface of surfaces) {
        const rect = surface.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        const clampedX = Math.max(0, Math.min(100, x));
        const clampedY = Math.max(0, Math.min(100, y));
        surface.style.setProperty('--gx', `${clampedX}%`);
        surface.style.setProperty('--gy', `${clampedY}%`);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return null;
}
