'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  minDurationMs = 2200,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const hardCutoffTimeout = setTimeout(() => {
      // Hard cutoff at 3.0s max
      setProgress(100);
      setTimeout(() => {
        setIsFinished(true);
        if (onComplete) onComplete();
      }, 400);
    }, 3000);

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const calculatedProgress = Math.min(
        100,
        Math.floor((elapsed / minDurationMs) * 100)
      );

      setProgress(calculatedProgress);

      if (calculatedProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        clearTimeout(hardCutoffTimeout);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(hardCutoffTimeout);
    };
  }, [minDurationMs, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#050508] px-8 py-12 text-white select-none pointer-events-auto"
        >
          {/* Top header bar */}
          <div className="w-full max-w-7xl flex items-center justify-between text-xs tracking-widest uppercase text-zinc-500 font-mono">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00f3ff] animate-ping" />
              Md Iftekhar Ferdous
            </span>
            <span>Creative Portfolio &bull; 2026</span>
          </div>

          {/* Center Logo Path & Brand Reveal */}
          <div className="flex flex-col items-center justify-center space-y-8 my-auto">
            {/* SVG Logo with stroke path reveal animation */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-[#00f3ff] filter drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]"
              >
                {/* Outer Hexagon / Shield Frame */}
                <motion.polygon
                  points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
                  fill="none"
                  stroke="#9d00ff"
                  strokeWidth="2"
                  strokeDasharray="300"
                  strokeDashoffset={300 - (progress / 100) * 300}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />

                {/* Inner Signature Initials IF Logo Path */}
                <motion.path
                  d="M30,30 L30,70 M30,30 L45,30 M30,50 L42,50 M30,70 L45,70 M55,30 L70,30 M62.5,30 L62.5,70 M55,70 L70,70"
                  fill="none"
                  stroke="#00f3ff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="250"
                  strokeDashoffset={250 - (progress / 100) * 250}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </svg>

              {/* Central Glow Effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#00f3ff]/10 to-[#9d00ff]/10 rounded-full blur-xl transition-opacity duration-300"
                style={{ opacity: progress / 100 }}
              />
            </div>

            {/* Title / Studio Tagline */}
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                MD IFTEKHAR FERDOUS
              </h2>
              <p className="text-xs md:text-sm text-zinc-500 font-mono tracking-wider">
                WEBDEV &bull; AI/ML ENTHUSIAST &bull; CMO & DEPUTY CTO
              </p>
            </div>
          </div>

          {/* Bottom Progress Bar & Percentage Counter */}
          <div className="w-full max-w-xl space-y-4">
            <div className="flex items-center justify-between text-sm font-mono text-zinc-400">
              <span className="text-[#00f3ff]">INITIALIZING EXPERIENCE</span>
              <span className="text-[#9d00ff] font-bold text-lg">{progress}%</span>
            </div>

            {/* Glowing Linear Progress Bar */}
            <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00f3ff] via-[#9d00ff] to-[#00f3ff] shadow-[0_0_12px_rgba(0,243,255,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
