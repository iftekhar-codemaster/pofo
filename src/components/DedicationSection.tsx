"use client";

import { useState } from "react";
import type { MouseEvent } from "react";

interface DedicationSectionProps {
  onOpenLightbox: () => void;
  onImageLoad?: () => void;
}

export default function DedicationSection({
  onOpenLightbox,
  onImageLoad,
}: DedicationSectionProps) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
    const y = (e.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
    setTilt({
      rx: Number((-y * 6.5).toFixed(2)),
      ry: Number((x * 6.5).toFixed(2)),
    });
  };

  const resetTilt = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <section
      className="sec-dedication"
      id="sec-dedication"
      aria-label="Personal archive dedication to SaH"
    >
      <div className="dedication-inner">
        <div className="dedication-grid">
          {/* Left: Museum-grade Archival Cotton-Paper Print Plate (Layer 3 in front of Cobalt Thread) */}
          <div className="dedication-plate-wrap" data-depth-layer="front">
            <button
              type="button"
              className="dedication-plate"
              onClick={onOpenLightbox}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              aria-label="Open archival portrait print of Iftekhar and SaH"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              }}
            >
              <span className="plate-tick plate-tick-tl" aria-hidden="true" />
              <span className="plate-tick plate-tick-tr" aria-hidden="true" />
              <span className="plate-tick plate-tick-bl" aria-hidden="true" />
              <span className="plate-tick plate-tick-br" aria-hidden="true" />

              <div className="dedication-art-well">
                <img
                  src="/images/her.png"
                  alt="Illustrated portrait of Iftekhar placing jasmine flowers in SaH's hair"
                  onLoad={onImageLoad}
                />
              </div>

              <div className="dedication-plate-caption">
                <span>PLATE &infin; &middot; IFTEKHAR &times; SaH</span>
                <span className="plate-status">
                  <span className="live-dot" aria-hidden="true" />
                  ALWAYS
                </span>
              </div>
            </button>
          </div>

          {/* Right: Editorial Colophon & Typography */}
          <div className="dedication-copy-col" data-depth-layer="back">
            <div className="dedication-kicker">
              OFF-SCREEN &middot; PERSONAL ARCHIVE
            </div>

            <h2 className="dedication-headline">
              Behind every build,
              <br />
              there is <em>SaH.</em>
            </h2>

            <p className="dedication-lead">
              Between late-night deployments, hardware schematics, and Dhaka
              deadlines &mdash; my favorite part of the story isn&apos;t written
              in code.
            </p>

            <div className="dedication-spec-table">
              <div className="dedication-spec-row">
                <span className="dedication-spec-key">Dedicated To</span>
                <span className="dedication-spec-val">SaH</span>
              </div>
              <div className="dedication-spec-row">
                <span className="dedication-spec-key">Chapter</span>
                <span className="dedication-spec-val">Beyond The Screen</span>
              </div>
              <div className="dedication-spec-row">
                <span className="dedication-spec-key">Constant</span>
                <span className="dedication-spec-val">
                  <span className="live-dot" aria-hidden="true" />
                  The Quiet Favorite
                </span>
              </div>
            </div>

            <div className="dedication-actions">
              <button
                type="button"
                className="dedication-open-pill"
                onClick={onOpenLightbox}
              >
                VIEW ARCHIVAL PRINT &#8599;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface DedicationLightboxProps {
  open: boolean;
  onClose: () => void;
}

export function DedicationLightbox({ open, onClose }: DedicationLightboxProps) {
  return (
    <div
      className={`case-modal-backdrop dedication-lightbox-backdrop${open ? " open" : ""}`}
      id="dedication-lightbox"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="dedication-lightbox-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dedication-lightbox-title"
      >
        <div className="dedication-lightbox-top">
          <div>
            <div className="case-modal-cat">
              PLATE &infin; &middot; PERSONAL ARCHIVE
            </div>
            <h3
              className="dedication-lightbox-title"
              id="dedication-lightbox-title"
            >
              Iftekhar &times; <em>SaH</em>
            </h3>
          </div>
          <button
            type="button"
            className="case-close-btn"
            onClick={onClose}
            aria-label="Close archival print"
          >
            &times;
          </button>
        </div>

        <div className="dedication-lightbox-frame">
          <img
            src="/images/her.png"
            alt="Full archival illustrated portrait of Iftekhar and SaH"
          />
        </div>

        <div className="dedication-lightbox-foot">
          <span>MY FAVORITE PART OF THE STORY</span>
          <span>DHAKA &middot; ALWAYS</span>
        </div>
      </div>
    </div>
  );
}
