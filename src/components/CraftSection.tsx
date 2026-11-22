"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { DISCIPLINES } from "@/data/portfolio";

interface CraftSectionProps {
  mouseNormRef: RefObject<{ x: number; y: number }>;
}

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  vy: number;
}

export default function CraftSection({ mouseNormRef }: CraftSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let rafId = 0;

    function initStars() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = Math.max(300, rect.width);
      canvas.height = Math.max(300, rect.height);
      stars = [];
      const count = Math.min(
        110,
        Math.floor((canvas.width * canvas.height) / 9500)
      );
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.45 + 0.35,
          a: Math.random() * 0.65 + 0.2,
          vy: Math.random() * 0.16 + 0.04,
        });
      }
    }

    function drawStars() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const normX = mouseNormRef.current.x;
      const normY = mouseNormRef.current.y;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y -= s.vy;
        if (s.y < -4) s.y = canvas.height + 4;
        const px = s.x + normX * 14 * s.r;
        const py = s.y + normY * 10 * s.r;
        ctx.fillStyle = `rgba(241, 237, 228, ${s.a.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(drawStars);
    }

    initStars();
    rafId = requestAnimationFrame(drawStars);
    window.addEventListener("resize", initStars);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", initStars);
    };
  }, [mouseNormRef]);

  const activeDiscipline = DISCIPLINES[activeIdx] ?? DISCIPLINES[0];

  return (
    <section className="sec-craft" id="sec-craft">
      <canvas id="starfield-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="craft-inner">
        <h2 className="craft-heading">WHAT I BUILD</h2>

        <div className="constellation-grid" id="discipline-grid">
          {DISCIPLINES.map((d) => (
            <button
              key={d.index}
              type="button"
              className={`discipline-node${activeIdx === d.index ? " active" : ""}`}
              data-discipline={d.index}
              data-depth-layer={d.index === 1 || d.index === 2 ? "front" : "back"}
              onClick={() => setActiveIdx(d.index)}
            >
              <span className="discipline-num">{d.tag}</span>
              <div className="discipline-name">{d.title}</div>
              <p className="discipline-desc">{d.desc}</p>
            </button>
          ))}
        </div>

        <div className="craft-detail-bar" id="craft-detail-bar">
          <p id="craft-detail-text">{activeDiscipline.text}</p>
          <div className="craft-stack-tags" id="craft-stack-tags">
            {activeDiscipline.stack.map((tag) => (
              <span key={tag} className="stack-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
