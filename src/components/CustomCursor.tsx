import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 450, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 450, damping: 30 });

  const ringX = useSpring(0, { stiffness: 180, damping: 22 });
  const ringY = useSpring(0, { stiffness: 180, damping: 22 });

  useEffect(() => {
    // Disable on mobile/touch screens
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor="interactive"]');
        setIsPointer(!!isInteractive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer subtle fluid refraction ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/30 backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 56 : 32,
          height: isPointer ? 56 : 32,
          backgroundColor: isPointer ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.02)',
          boxShadow: isPointer ? '0 0 20px rgba(56, 189, 248, 0.25)' : 'none',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />

      {/* Inner sharp specular core */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 8 : 4,
          height: isPointer ? 8 : 4,
          backgroundColor: isPointer ? '#38bdf8' : '#ffffff',
        }}
      />
    </div>
  );
};
