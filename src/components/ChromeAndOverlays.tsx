"use client";

import { CHAPTERS } from "@/data/portfolio";

interface ChromeAndOverlaysProps {
  activeChapter: string;
  menuOpen: boolean;
  toastMessage: string;
  toastVisible: boolean;
  onScrollTo: (selector: string) => void;
  onHomeClick: () => void;
  onToggleMenu: () => void;
}

export default function ChromeAndOverlays({
  activeChapter,
  menuOpen,
  toastMessage,
  toastVisible,
  onScrollTo,
  onHomeClick,
  onToggleMenu,
}: ChromeAndOverlaysProps) {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="cursor-dot" id="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" id="cursor-ring" aria-hidden="true" />
      <div
        className={`toast-banner${toastVisible ? " show" : ""}`}
        id="toast-banner"
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>

      {/* Top Minimal Chrome */}
      <header className="top-chrome">
        <button
          type="button"
          data-scroll-to="#sec-hero"
          onClick={() => onScrollTo("#sec-hero")}
        >
          IFTEKHAR.WORK
        </button>
        <button
          type="button"
          data-scroll-to="#sec-contact"
          onClick={() => onScrollTo("#sec-contact")}
        >
          PORTFOLIO 2026
        </button>
      </header>

      {/* Right-Edge Chapter Ruler */}
      <nav className="chapter-ruler" aria-label="Portfolio sections">
        {CHAPTERS.map((ch) => (
          <button
            key={ch.id}
            type="button"
            className={`ruler-item${activeChapter === ch.id ? " active" : ""}`}
            data-chapter={ch.id}
            data-scroll-to={ch.selector}
            onClick={() => onScrollTo(ch.selector)}
          >
            <span className="ruler-label">{ch.label}</span>
            <span className="ruler-tick" />
          </button>
        ))}
      </nav>

      {/* Floating Bottom-Left Monogram & Bottom-Right Menu Pill */}
      <button
        type="button"
        className="brand-mark-float"
        id="btn-home-mark"
        title="Back to top"
        aria-label="Scroll to top"
        onClick={onHomeClick}
      >
        IF
      </button>
      <button
        type="button"
        className="menu-pill-float"
        id="btn-menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="menu-overlay"
        onClick={onToggleMenu}
      >
        <span className="menu-dots" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span id="menu-pill-label">{menuOpen ? "CLOSE" : "MENU"}</span>
      </button>
    </>
  );
}
