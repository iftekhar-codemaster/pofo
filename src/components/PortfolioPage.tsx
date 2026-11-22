"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ChromeAndOverlays from "@/components/ChromeAndOverlays";
import MenuOverlay from "@/components/MenuOverlay";
import CaseStudyModal from "@/components/CaseStudyModal";
import CraftSection from "@/components/CraftSection";
import WorkCarousel from "@/components/WorkCarousel";
import HardwareLabSection from "@/components/HardwareLabSection";
import {
  ABOUT_META,
  BECAUSE_PARAGRAPHS,
  CLOSING_TEXT,
  CONTACT_EMAIL,
  HERO_META,
  MANIFESTO_WORDS,
  PROJECTS,
  SPEC_ROWS,
  STATS,
  TIMELINE_ITEMS,
} from "@/data/portfolio";
import { useSmoothChoreography } from "@/hooks/useSmoothChoreography";

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCaseIdx, setActiveCaseIdx] = useState<number | null>(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [toastMessage, setToastMessage] = useState("Email copied to clipboard");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  const closeAll = useCallback(() => {
    setActiveCaseIdx(null);
    setMenuOpen(false);
  }, []);

  const stepCarousel = useCallback((delta: number) => {
    setActiveProjectIdx(
      (prev) => (prev + delta + PROJECTS.length) % PROJECTS.length
    );
  }, []);

  const {
    smoothEnabled,
    activeChapter,
    dhakaTime,
    mouseNormRef,
    scrollToSelector,
    toggleSmooth,
    syncDocumentHeight,
  } = useSmoothChoreography({
    menuOpen,
    modalOpen: activeCaseIdx !== null,
    onCloseAll: closeAll,
    onStepCarousel: stepCarousel,
  });

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastVisible(false);
    }, 2200);
  }, []);

  const fallbackCopy = useCallback(
    (text: string) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        showToast(`Copied ${text}`);
      } catch {
        showToast(text);
      }
      document.body.removeChild(ta);
    },
    [showToast]
  );

  const copyEmail = useCallback(() => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(CONTACT_EMAIL)
        .then(() => {
          showToast(`Copied ${CONTACT_EMAIL}`);
        })
        .catch(() => {
          fallbackCopy(CONTACT_EMAIL);
        });
    } else {
      fallbackCopy(CONTACT_EMAIL);
    }
  }, [fallbackCopy, showToast]);

  const handleMenuNavigate = useCallback(
    (selector: string) => {
      setMenuOpen(false);
      scrollToSelector(selector);
    },
    [scrollToSelector]
  );

  const handleHomeClick = useCallback(() => {
    setMenuOpen(false);
    scrollToSelector("#sec-hero");
  }, [scrollToSelector]);

  const activeProject =
    activeCaseIdx !== null ? (PROJECTS[activeCaseIdx] ?? null) : null;

  return (
    <>
      {/* Global Chrome & Overlays rendered OUTSIDE #smooth-viewport for mix-blend-mode & fixed positioning */}
      <ChromeAndOverlays
        activeChapter={activeChapter}
        menuOpen={menuOpen}
        toastMessage={toastMessage}
        toastVisible={toastVisible}
        onScrollTo={scrollToSelector}
        onHomeClick={handleHomeClick}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
      />

      <MenuOverlay
        open={menuOpen}
        dhakaTime={dhakaTime}
        smoothEnabled={smoothEnabled}
        onNavigate={handleMenuNavigate}
        onToggleSmooth={toggleSmooth}
        onCopyEmail={copyEmail}
      />

      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveCaseIdx(null)}
      />

      {/* Smooth Scroll Spacer */}
      <div id="scroll-spacer" aria-hidden="true" />

      {/* Forced Smooth Scroll Viewport */}
      <div id="smooth-viewport">
        <main id="smooth-content">
          {/* Continuous Scroll-Drawn Cobalt SVG Thread (Mid-depth z:20 weaving between back z:12 and front z:30 cards) */}
          <svg id="cobalt-thread-layer" data-depth-layer="thread" aria-hidden="true">
            <path id="thread-guide" d="" />
            <path id="thread-active" d="" />
            <circle id="thread-node-halo" cx="-50" cy="-50" r={11} />
            <circle id="thread-node-core" cx="-50" cy="-50" r={4.5} />
          </svg>

          {/* 01 · HERO */}
          <section className="sec-hero" id="sec-hero">
            <div className="hero-top-meta">
              <div className="hero-greeting">{HERO_META.greeting}</div>
              <div className="hero-starburst-wrap">
                <svg
                  className="hero-starburst"
                  id="hero-starburst"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <path
                    d="M32 2V62M2 32H62M10.8 10.8L53.2 53.2M53.2 10.8L10.8 53.2"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="hero-pitch">{HERO_META.pitch}</p>
            </div>

            <div className="hero-stage">
              <div
                className="hero-monolith-frame"
                id="hero-monolith"
                data-depth-layer="front"
              >
                <img
                  src={HERO_META.monolithImg}
                  alt={HERO_META.monolithAlt}
                  onLoad={syncDocumentHeight}
                />
                <div className="hero-monolith-glow" />
              </div>

              <div className="hero-type-overlay" data-depth-layer="front">
                <h1 className="hero-line-1" id="hero-line-1">
                  IF<span className="serif-accent">T</span>EKHAR
                </h1>
                <div className="hero-line-2" id="hero-line-2">
                  .WORK
                </div>
              </div>
            </div>

            <div className="hero-bottom-bar">
              <div className="hero-sub-caption">{HERO_META.subCaption}</div>
              <button
                type="button"
                className="scroll-cue"
                data-scroll-to="#sec-about"
                onClick={() => scrollToSelector("#sec-about")}
              >
                <span>{HERO_META.scrollCueLabel}</span>
                <span className="scroll-cue-bar" aria-hidden="true" />
              </button>
            </div>
          </section>

          {/* 02 · ABOUT & TELEMETRY */}
          <section className="sec-about" id="sec-about">
            <div className="about-grid">
              <div className="about-index">{ABOUT_META.indexLabel}</div>

              <div
                className="about-visual-card"
                id="about-parallax-card"
                data-depth-layer="front"
              >
                <img
                  src={ABOUT_META.visualImg}
                  alt={ABOUT_META.visualAlt}
                  onLoad={syncDocumentHeight}
                />
                <div className="about-visual-caption">
                  <span>{ABOUT_META.captionLeft}</span>
                  <span>{ABOUT_META.captionRight}</span>
                </div>
              </div>

              <div>
                <div className="spec-table" data-depth-layer="back">
                  {SPEC_ROWS.map((row) => (
                    <div key={row.key} className="spec-row">
                      <span className="spec-key">{row.key}</span>
                      <span className="spec-val">
                        {row.isClock ? (
                          <>
                            <span className="live-dot" />
                            <span id="about-dhaka-clock">{dhakaTime}</span>
                          </>
                        ) : (
                          row.value
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="about-cta-row">
                  <button
                    type="button"
                    className="btn-vermilion"
                    data-scroll-to="#sec-work"
                    onClick={() => scrollToSelector("#sec-work")}
                  >
                    VIEW WORK &bull;
                  </button>
                  <button
                    type="button"
                    className="btn-outline-dark"
                    data-scroll-to="#sec-lab"
                    onClick={() => scrollToSelector("#sec-lab")}
                  >
                    INSPECT HARDWARE LAB
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 03 · SCRUBBED MANIFESTO + BY THE NUMBERS */}
          <section className="sec-manifesto" id="sec-manifesto">
            <div className="manifesto-inner">
              <div
                className="manifesto-statement"
                id="manifesto-text"
                aria-label="I build products that turn heads — in code and hardware"
              >
                {MANIFESTO_WORDS.map((word, idx) => (
                  <span
                    key={`${word.text}-${idx}`}
                    className={`scrub-word${word.accent ? " italic-serif vermilion-lit" : ""}`}
                  >
                    {word.text}
                  </span>
                ))}
              </div>

              <div className="because-grid">
                <div className="because-label">BECAUSE</div>
                {BECAUSE_PARAGRAPHS.map((paragraph, idx) => (
                  <p key={idx} className="because-copy">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="numbers-band" id="numbers-band">
                {STATS.map((stat) => (
                  <div key={stat.label} className="stat-block">
                    <span className="stat-kicker">{stat.label}</span>
                    <div
                      className="stat-num"
                      data-count-target={stat.target}
                      data-prefix={stat.prefix}
                      data-suffix={stat.suffix}
                    >
                      {stat.initialText}
                    </div>
                    <p className="stat-sub">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 04 · THE JOURNEY SO FAR */}
          <section className="sec-journey" id="sec-journey">
            <div className="journey-header">
              <h2 className="journey-title" id="journey-title">
                THE JOURNEY
              </h2>
              <div className="journey-sub">
                SO <span>far</span>
              </div>
            </div>

            <div className="timeline-list">
              {TIMELINE_ITEMS.map((item, idx) => (
                <article
                  key={item.year}
                  className={`timeline-row${item.reverse ? " reverse" : ""}`}
                  data-depth-layer={idx === 0 || idx === 3 ? "front" : "back"}
                >
                  <div className="tl-year-col">
                    <div className="tl-year">{item.year}</div>
                    <span className="tl-tag">{item.role}</span>
                  </div>
                  <div className="tl-card">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 05 · WHAT I BUILD */}
          <CraftSection mouseNormRef={mouseNormRef} />

          {/* 06 · SELECTED WORK — 3D CURVED CAROUSEL */}
          <WorkCarousel
            activeProjectIdx={activeProjectIdx}
            onSelectProject={setActiveProjectIdx}
            onStepCarousel={stepCarousel}
            onOpenCase={setActiveCaseIdx}
            onImageLoad={syncDocumentHeight}
          />

          {/* 07 · FLAGSHIP HARDWARE LAB */}
          <HardwareLabSection onOpenCase={setActiveCaseIdx} />

          {/* 08 · KINETIC CONTACT + MONOGRAM FOOTER */}
          <section className="sec-contact" id="sec-contact">
            <h2
              className="kinetic-closing"
              id="kinetic-closing"
              aria-label="Let's build something"
            >
              {CLOSING_TEXT.split("").map((ch, idx) =>
                ch === " " ? (
                  <span
                    key={idx}
                    className="kinetic-char"
                    style={{ width: "0.28em" }}
                  >
                    &nbsp;
                  </span>
                ) : (
                  <span
                    key={idx}
                    className="kinetic-char"
                    style={{ transitionDelay: `${idx * 28}ms` }}
                  >
                    {ch}
                  </span>
                )
              )}
            </h2>

            <div className="contact-email-row">
              <a
                className="contact-email-link"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
              <button
                type="button"
                className="copy-email-pill"
                data-copy-email=""
                onClick={copyEmail}
              >
                COPY EMAIL
              </button>
            </div>

            <div className="contact-mini-links">
              <span>DHAKA, BANGLADESH</span>
              <span>&middot;</span>
              <span>DHAKA COLLEGE (HSC &apos;28)</span>
              <span>&middot;</span>
              <span>WEB &middot; AI &middot; HARDWARE</span>
              <span>&middot;</span>
              <span>&copy; 2026 MD IFTEKHAR FERDOUS</span>
            </div>
          </section>

          <footer className="sec-footer" id="sec-footer">
            <div className="footer-glow" aria-hidden="true" />

            <div className="footer-meta-grid">
              <div className="footer-col">
                <div>
                  <div className="footer-label">PORTFOLIO</div>
                  <div>IFTEKHAR.WORK</div>
                </div>
                <div>
                  <div className="footer-label">MAIL</div>
                  <div>ITX.IFTEKHARS@GMAIL.COM</div>
                </div>
              </div>

              <div className="footer-col right">
                <div>
                  <div className="footer-label">EDITION</div>
                  <div>PORTFOLIO 2026</div>
                </div>
                <div>
                  <div className="footer-label">LOCATION</div>
                  <div>DHAKA · BST (UTC+6)</div>
                </div>
              </div>
            </div>

            <div
              className="footer-sculpture-stage"
              id="footer-sculpture-stage"
              data-depth-layer="front"
            >
              <div
                className="monogram-cube"
                id="monogram-cube"
                aria-hidden="true"
              >
                <div className="cube-face face-front">IF</div>
                <div className="cube-face face-back">IF</div>
                <div className="cube-face face-right">26</div>
                <div className="cube-face face-left">BD</div>
                <div className="cube-face face-top">DHAKA</div>
                <div className="cube-face face-bottom" />
              </div>
            </div>

            <div className="footer-marquee-wrap" aria-hidden="true">
              <div className="footer-marquee-track" id="footer-marquee">
                <span>
                  IFTEKHAR<span className="dot-work">.WORK</span>
                </span>
                <span>
                  DHAKA<span className="dot-work">.2026</span>
                </span>
                <span>
                  IFTEKHAR<span className="dot-work">.WORK</span>
                </span>
                <span>
                  DHAKA<span className="dot-work">.2026</span>
                </span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
