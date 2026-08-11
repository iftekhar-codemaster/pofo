'use client';

import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if the device is a touch screen or pointer is coarse
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isCoarse || hasTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverElement = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]'
      );

      if (hoverElement) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverElement = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]'
      );

      if (hoverElement) {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 60fps lerp loop for smooth trailing ring cursor
    const render = () => {
      const lerp = (start: number, end: number, factor: number) =>
        start + (end - start) * factor;

      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.18);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.18);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Tracking Dot (Inner Cursor) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#00f3ff] pointer-events-none z-[99999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'scale-150 bg-[#9d00ff]' : ''}`}
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Ring (Outer Cursor) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[99998] transition-all duration-200 ease-out -ml-4 -mt-4 w-8 h-8 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? 'w-16 h-16 -ml-8 -mt-8 border-[#00f3ff] bg-[#00f3ff]/10 scale-110 shadow-[0_0_20px_rgba(0,243,255,0.4)]'
            : 'border-[#00f3ff]/60 bg-transparent shadow-[0_0_10px_rgba(0,243,255,0.15)]'
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;
