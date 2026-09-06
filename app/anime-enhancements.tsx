'use client';

import { useEffect } from 'react';
import { animate, createScope, stagger } from 'animejs';
import { motionState } from './motion-state';

function rafThrottle<T extends (...args: any[]) => void>(fn: T) {
  let frame = 0;
  let lastArgs: Parameters<T> | null = null;
  const wrapped = (...args: Parameters<T>) => {
    lastArgs = args;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (lastArgs) fn(...lastArgs);
    });
  };
  return wrapped;
}

export default function AnimeEnhancements() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const scope = createScope({ root });
    const cleanups: Array<() => void> = [];
    const observers: IntersectionObserver[] = [];

    root.classList.toggle('motion-reduced', reduced);
    root.classList.toggle('motion-touch', coarse);

    const progress = document.createElement('div');
    progress.className = 'anime-scroll-progress';
    document.body.appendChild(progress);

    let scrollFrame = 0;
    const updateScrollState = () => {
      scrollFrame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      const progressValue = Math.min(1, Math.max(0, y / max));
      root.style.setProperty('--scroll-progress', progressValue.toFixed(4));
      progress.style.transform = `scaleX(${progressValue})`;
      const hero = document.querySelector<HTMLElement>('.hero-reference-shell');
      if (hero) {
        const amount = Math.min(1, Math.max(0, y / Math.max(1, hero.offsetHeight)));
        motionState.scroll = amount;
        root.style.setProperty('--hero-scroll', amount.toFixed(4));
      }
    };
    const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollState); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollState();
    cleanups.push(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      progress.remove();
    });

    const updatePointer = rafThrottle((event: PointerEvent) => {
      if (reduced) return;
      const x = event.clientX / Math.max(1, window.innerWidth) - 0.5;
      const y = event.clientY / Math.max(1, window.innerHeight) - 0.5;
      motionState.pointerX = x;
      motionState.pointerY = y;
      if (!coarse) {
        root.style.setProperty('--pointer-x', x.toFixed(4));
        root.style.setProperty('--pointer-y', y.toFixed(4));
        const cursor = document.querySelector<HTMLElement>('.anime-cursor');
        if (cursor) cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    });

    if (!reduced) {
      window.addEventListener('pointermove', updatePointer, { passive: true });
      cleanups.push(() => window.removeEventListener('pointermove', updatePointer));
      if (!coarse) {
        const cursor = document.createElement('div');
        cursor.className = 'anime-cursor';
        cursor.innerHTML = '<span></span>';
        cursor.setAttribute('aria-hidden', 'true');
        document.body.appendChild(cursor);
        const onOver = (event: PointerEvent) => {
          const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
          if (!target) return;
          const label = cursor.querySelector('span');
          if (label) label.textContent = target.dataset.cursor || 'OPEN';
          cursor.classList.add('has-label');
        };
        const onOut = (event: PointerEvent) => {
          const next = (event.relatedTarget as HTMLElement | null)?.closest?.('[data-cursor]');
          if (next) return;
          const label = cursor.querySelector('span');
          if (label) label.textContent = '';
          cursor.classList.remove('has-label');
        };
        document.addEventListener('pointerover', onOver, { passive: true });
        document.addEventListener('pointerout', onOut, { passive: true });
        cleanups.push(() => {
          document.removeEventListener('pointerover', onOver);
          document.removeEventListener('pointerout', onOut);
          cursor.remove();
        });
      }
    }

    scope.execute(() => {
      const nav = document.querySelector('.nav');
      if (nav && !reduced) animate(nav, { opacity: [0, 1], y: [-12, 0], duration: 620, ease: 'out(4)' });
      const heroIntro = document.querySelectorAll('.hero-reference-copy .eyebrow, .hero-reference-copy h1 strong, .hero-reference-copy h1 em, .hero-reference-copy h1 span, .hero-reference-copy .hero-text, .hero-reference-copy .hero-actions, .hero-trust, .hero-reference-shell .hero-float-copy');
      if (!reduced) animate(heroIntro, { opacity: [0, 1], y: [22, 0], duration: 720, delay: stagger(55), ease: 'out(4)' });
      const brand = document.querySelector('.brand-mark');
      if (brand && !reduced) animate(brand, { rotateZ: [-10, 0], scale: [0.88, 1], duration: 760, delay: 120, ease: 'out(4)' });
      if (!reduced) {
        const marquee = document.querySelector<HTMLElement>('.marquee div');
        if (marquee) animate(marquee, { translateX: ['0%', '-50%'], duration: 30000, loop: true, ease: 'linear' });
      }
      const revealTargets = document.querySelectorAll<HTMLElement>('.section-head, .service-card, .person-card, .process-item, .contact-card, .interactive-block, .architecture, .configurator, .logo-system, .hero-service-card');
      revealTargets.forEach((node, index) => {
        if (reduced) return;
        node.style.opacity = '0';
        node.style.translate = '0 24px';
        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          animate(node, { opacity: [0, 1], y: [24, 0], duration: 520, delay: Math.min(index % 4, 3) * 45, ease: 'out(4)' });
        }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
        observer.observe(node);
        observers.push(observer);
      });
      const hoverTargets = document.querySelectorAll<HTMLElement>('.service-card, .hero-service-card, .person-links a, .contact-person-button');
      hoverTargets.forEach((node) => {
        const enter = () => { if (!coarse && !reduced) animate(node, { translateY: -3, duration: 180, ease: 'out(3)' }); };
        const leave = () => { if (!coarse && !reduced) animate(node, { translateY: 0, duration: 260, ease: 'out(3)' }); };
        node.addEventListener('pointerenter', enter, { passive: true });
        node.addEventListener('pointerleave', leave, { passive: true });
        cleanups.push(() => { node.removeEventListener('pointerenter', enter); node.removeEventListener('pointerleave', leave); });
      });
      const magneticTargets = document.querySelectorAll<HTMLElement>('.button.primary, .nav-cta');
      magneticTargets.forEach((node) => {
        const move = rafThrottle((event: PointerEvent) => {
          if (coarse || reduced) return;
          const rect = node.getBoundingClientRect();
          const x = (event.clientX - (rect.left + rect.width / 2)) * 0.08;
          const y = (event.clientY - (rect.top + rect.height / 2)) * 0.08;
          animate(node, { translateX: x, translateY: y, duration: 180, ease: 'out(3)' });
        });
        const leave = () => animate(node, { translateX: 0, translateY: 0, duration: 320, ease: 'out(4)' });
        node.addEventListener('pointermove', move, { passive: true });
        node.addEventListener('pointerleave', leave, { passive: true });
        cleanups.push(() => { node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', leave); });
      });
      if (!reduced) animate(document.querySelectorAll('.section-number'), { opacity: [0.55, 1], letterSpacing: ['0.1em', '0.16em'], duration: 700, delay: stagger(60), ease: 'out(3)' });
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      cleanups.forEach((cleanup) => cleanup());
      scope.revert();
      root.classList.remove('motion-reduced', 'motion-touch');
      root.style.removeProperty('--scroll-progress');
      root.style.removeProperty('--hero-scroll');
      root.style.removeProperty('--pointer-x');
      root.style.removeProperty('--pointer-y');
      motionState.pointerX = 0;
      motionState.pointerY = 0;
      motionState.scroll = 0;
    };
  }, []);

  return null;
}
