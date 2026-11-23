"use client";

import { useRef } from "react";
import { PROJECTS } from "@/data/portfolio";

interface WorkCarouselProps {
  activeProjectIdx: number;
  onSelectProject: (idx: number) => void;
  onStepCarousel: (delta: number) => void;
  onOpenCase: (idx: number) => void;
  onImageLoad?: () => void;
}

export default function WorkCarousel({
  activeProjectIdx,
  onSelectProject,
  onStepCarousel,
  onOpenCase,
  onImageLoad,
}: WorkCarouselProps) {
  const dragStartXRef = useRef<number | null>(null);
  const didDragRef = useRef(false);

  const total = PROJECTS.length;
  const current = PROJECTS[activeProjectIdx] ?? PROJECTS[0];

  return (
    <section className="sec-work" id="sec-work">
      <div className="work-header">
        <div className="work-kicker">WHAT YOU&apos;RE HERE FOR (I GUESS)</div>
        <div className="work-giant-title" id="work-giant-title">
          W<span className="serif-o">O</span>RK
        </div>
      </div>

      <div className="work-active-meta">
        <h3 className="work-active-title" id="work-active-title">
          {current.title}
        </h3>
        <div className="work-active-cat" id="work-active-cat">
          {current.cat}
        </div>
      </div>

      <div
        className="carousel-stage"
        id="carousel-stage"
        aria-label="Interactive 3D project showcase"
        onPointerDown={(e) => {
          dragStartXRef.current = e.clientX;
          didDragRef.current = false;
        }}
        onPointerUp={(e) => {
          if (dragStartXRef.current === null) return;
          const dx = e.clientX - dragStartXRef.current;
          dragStartXRef.current = null;
          if (Math.abs(dx) > 45) {
            didDragRef.current = true;
            onStepCarousel(dx < 0 ? 1 : -1);
          }
        }}
      >
        {PROJECTS.map((proj, idx) => {
          let offset = idx - activeProjectIdx;
          if (offset > Math.floor(total / 2)) offset -= total;
          if (offset < -Math.floor(total / 2)) offset += total;

          const absOff = Math.abs(offset);
          const translateX = offset * 62;
          const translateZ = -absOff * 210;
          const rotateY = -offset * 24;
          const scale = absOff === 0 ? 1 : Math.max(0.76, 1 - absOff * 0.14);

          return (
            <div
              key={proj.id}
              className={`carousel-card${offset === 0 ? " is-active" : ""}`}
              data-idx={idx}
              data-depth-layer={offset === 0 ? "front" : "back"}
              style={{
                zIndex: offset === 0 ? 30 : 14 - absOff,
                opacity: absOff > 2 ? 0 : absOff === 0 ? 1 : 0.42,
                filter:
                  absOff === 0 ? "none" : "brightness(0.65) saturate(0.75)",
                transform: `perspective(1400px) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
              }}
              onClick={(e) => {
                if (didDragRef.current) {
                  didDragRef.current = false;
                  return;
                }
                const target = e.target as HTMLElement;
                if (target.closest("[data-open-case]")) {
                  onOpenCase(idx);
                  return;
                }
                if (idx === activeProjectIdx) {
                  onOpenCase(idx);
                } else {
                  onSelectProject(idx);
                }
              }}
            >
              <img src={proj.img} alt={proj.title} onLoad={onImageLoad} />
              <div className="carousel-card-overlay">
                <div className="card-overlay-bottom">
                  <p className="card-overlay-desc">{proj.desc}</p>
                  <button
                    type="button"
                    className="card-inspect-pill"
                    data-open-case={idx}
                  >
                    INSPECT &rarr;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-nav-btn"
          id="carousel-prev"
          aria-label="Previous project"
          onClick={() => onStepCarousel(-1)}
        >
          &larr;
        </button>
        <div className="carousel-counter" id="carousel-counter">
          {`${String(activeProjectIdx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
        </div>
        <button
          type="button"
          className="carousel-nav-btn"
          id="carousel-next"
          aria-label="Next project"
          onClick={() => onStepCarousel(1)}
        >
          &rarr;
        </button>
      </div>
    </section>
  );
}
