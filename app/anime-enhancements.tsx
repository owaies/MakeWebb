'use client';

import { useEffect } from 'react';
import { animate, stagger } from 'animejs';

export default function AnimeEnhancements() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    const progress = document.createElement('div');
    progress.className = 'anime-scroll-progress';
    document.body.appendChild(progress);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (reduced) {
      return () => {
        window.removeEventListener('scroll', onScroll);
        progress.remove();
      };
    }

    const animations: Array<{ pause?: () => void; revert?: () => void }> = [];

    const nav = document.querySelector('.nav');
    if (nav) {
      animations.push(animate(nav, {
        opacity: [0, 1],
        y: [-14, 0],
        duration: 700,
        ease: 'out(4)',
      }));
    }

    const brand = document.querySelector('.brand-mark');
    if (brand) {
      animations.push(animate(brand, {
        rotateZ: [-12, 0],
        scale: [0.82, 1],
        duration: 900,
        delay: 250,
        ease: 'out(4)',
      }));
    }

    document.querySelectorAll('.nav-links a, .nav-cta').forEach((el) => {
      const node = el as HTMLElement;
      node.addEventListener('mouseenter', () => {
        animate(node, { y: -2, duration: 220, ease: 'out(3)' });
      });
      node.addEventListener('mouseleave', () => {
        animate(node, { y: 0, duration: 260, ease: 'out(3)' });
      });
    });

    if (!isTouch) {
      const cursor = document.createElement('div');
      cursor.className = 'anime-cursor';
      cursor.innerHTML = '<span></span>';
      document.body.appendChild(cursor);

      const moveCursor = (event: PointerEvent) => {
        animate(cursor, {
          left: event.clientX,
          top: event.clientY,
          duration: 260,
          ease: 'out(3)',
        });
      };
      window.addEventListener('pointermove', moveCursor, { passive: true });

      document.querySelectorAll('a, button, .tilt-card').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          animate(cursor, { scale: 1.8, duration: 220, ease: 'out(3)' });
        });
        el.addEventListener('mouseleave', () => {
          animate(cursor, { scale: 1, duration: 260, ease: 'out(3)' });
        });
      });

      animations.push({
        revert: () => {
          window.removeEventListener('pointermove', moveCursor);
          cursor.remove();
        },
      });
    }

    const magneticTargets = document.querySelectorAll('.button.primary, .nav-cta');
    const magneticCleanups: Array<() => void> = [];
    magneticTargets.forEach((el) => {
      const node = el as HTMLElement;
      const move = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        animate(node, { translateX: x * 0.12, translateY: y * 0.12, duration: 300, ease: 'out(3)' });
      };
      const leave = () => animate(node, { translateX: 0, translateY: 0, duration: 450, ease: 'out(4)' });
      node.addEventListener('pointermove', move);
      node.addEventListener('pointerleave', leave);
      magneticCleanups.push(() => {
        node.removeEventListener('pointermove', move);
        node.removeEventListener('pointerleave', leave);
      });
    });

    const processItems = document.querySelectorAll('.process-item');
    processItems.forEach((item) => {
      const number = item.querySelector(':scope > span') as HTMLElement | null;
      item.addEventListener('mouseenter', () => {
        if (number) animate(number, { translateX: 8, duration: 260, ease: 'out(3)' });
      });
      item.addEventListener('mouseleave', () => {
        if (number) animate(number, { translateX: 0, duration: 350, ease: 'out(3)' });
      });
    });

    const sectionNumbers = document.querySelectorAll('.section-number');
    animations.push(animate(sectionNumbers, {
      opacity: [0.45, 1],
      letterSpacing: ['0.08em', '0.16em'],
      duration: 1100,
      delay: stagger(120),
      ease: 'out(3)',
    }));

    return () => {
      window.removeEventListener('scroll', onScroll);
      progress.remove();
      magneticCleanups.forEach((cleanup) => cleanup());
      animations.forEach((animation) => animation.revert?.());
    };
  }, []);

  return null;
}
