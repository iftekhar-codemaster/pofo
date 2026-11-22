"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CHAPTERS } from "@/data/portfolio";

interface UseSmoothChoreographyOptions {
  menuOpen: boolean;
  modalOpen: boolean;
  onCloseAll: () => void;
  onStepCarousel: (delta: number) => void;
}

export function useSmoothChoreography({
  menuOpen,
  modalOpen,
  onCloseAll,
  onStepCarousel,
}: UseSmoothChoreographyOptions) {
  const [smoothEnabled, setSmoothEnabled] = useState(true);
  const [activeChapter, setActiveChapter] = useState<string>(CHAPTERS[0].id);
  const [dhakaTime, setDhakaTime] = useState<string>("DHK --:--:--");

  const smoothEnabledRef = useRef(true);
  const menuOpenRef = useRef(menuOpen);
  const modalOpenRef = useRef(modalOpen);
  const onCloseAllRef = useRef(onCloseAll);
  const onStepCarouselRef = useRef(onStepCarousel);

  const mouseNormRef = useRef({ x: 0, y: 0 });
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const maxScrollRef = useRef(1);
  const totalPathLenRef = useRef(1);
  const statsAnimatedRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    modalOpenRef.current = modalOpen;
  }, [modalOpen]);

  useEffect(() => {
    onCloseAllRef.current = onCloseAll;
  }, [onCloseAll]);

  useEffect(() => {
    onStepCarouselRef.current = onStepCarousel;
  }, [onStepCarousel]);

  const syncDocumentHeight = useCallback(() => {
    const smoothContent = document.getElementById("smooth-content");
    const scrollSpacer = document.getElementById("scroll-spacer");
    const threadSvg = document.getElementById("cobalt-thread-layer");
    const threadGuide = document.getElementById("thread-guide");
    const threadActive = document.getElementById(
      "thread-active"
    ) as SVGPathElement | null;

    if (!smoothContent) return;

    const contentHeight = smoothContent.scrollHeight;
    maxScrollRef.current = Math.max(1, contentHeight - window.innerHeight);

    if (smoothEnabledRef.current && scrollSpacer) {
      scrollSpacer.style.height = `${contentHeight}px`;
    }

    if (threadSvg && threadGuide && threadActive) {
      const w = window.innerWidth;
      const h = contentHeight;
      threadSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      threadSvg.style.height = `${h}px`;

      const pts: [number, number][] = [
        [w * 0.06, Math.min(540, h * 0.055)],
        [w * 0.92, h * 0.125],
        [w * 0.1, h * 0.235],
        [w * 0.86, h * 0.345],
        [w * 0.22, h * 0.455],
        [w * 0.82, h * 0.565],
        [w * 0.14, h * 0.685],
        [w * 0.88, h * 0.805],
        [w * 0.5, h * 0.905],
        [w * 0.5, h * 0.965],
      ];

      let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const curr = pts[i];
        const midY = (prev[1] + curr[1]) / 2;
        d += ` C ${prev[0].toFixed(1)} ${midY.toFixed(1)}, ${curr[0].toFixed(1)} ${midY.toFixed(1)}, ${curr[0].toFixed(1)} ${curr[1].toFixed(1)}`;
      }

      threadGuide.setAttribute("d", d);
      threadActive.setAttribute("d", d);
      const pathLen = Math.max(1, threadActive.getTotalLength());
      totalPathLenRef.current = pathLen;
      threadActive.style.strokeDasharray = String(pathLen);
      threadActive.style.strokeDashoffset = String(pathLen);
    }
  }, []);

  const scrollToSelector = useCallback((selector: string) => {
    const target = document.querySelector<HTMLElement>(selector);
    if (!target) return;
    const top = target.offsetTop;
    if (smoothEnabledRef.current) {
      window.scrollTo({ top, behavior: "auto" });
      targetScrollRef.current = Math.max(
        0,
        Math.min(maxScrollRef.current, top)
      );
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const toggleSmooth = useCallback(() => {
    const next = !smoothEnabledRef.current;
    smoothEnabledRef.current = next;
    setSmoothEnabled(next);

    document.body.classList.toggle("smooth-active", next);
    document.body.classList.toggle("native-scroll", !next);

    const smoothContent = document.getElementById("smooth-content");
    if (!next) {
      if (smoothContent) smoothContent.style.transform = "none";
      window.scrollTo(0, currentScrollRef.current);
    } else {
      syncDocumentHeight();
      const y = window.scrollY || window.pageYOffset;
      targetScrollRef.current = y;
      currentScrollRef.current = y;
    }
  }, [syncDocumentHeight]);

  // Live Dhaka Clock (Asia/Dhaka)
  useEffect(() => {
    const updateDhakaClock = () => {
      try {
        const now = new Date();
        const fmt = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setDhakaTime(`DHK ${fmt.format(now)}`);
      } catch {
        // Fallback ignored
      }
    };

    updateDhakaClock();
    const id = window.setInterval(updateDhakaClock, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Main Choreography, Smooth Scroll, Cobalt Thread, Magnetic Cursor & Keyboard Shortcuts
  useEffect(() => {
    let scrollVelocity = 0;
    let marqueeOffset = 0;
    let cubeRotY = 24;
    const cubeRotX = -16;

    let cx = -100;
    let cy = -100;
    let rx = -100;
    let ry = -100;

    let tickRafId = 0;
    let cursorRafId = 0;
    const counterRafIds: number[] = [];

    const smoothContent = document.getElementById("smooth-content");
    const threadActive = document.getElementById(
      "thread-active"
    ) as SVGPathElement | null;
    const threadNodeHalo = document.getElementById("thread-node-halo");
    const threadNodeCore = document.getElementById("thread-node-core");

    const heroLine1 = document.getElementById("hero-line-1");
    const heroLine2 = document.getElementById("hero-line-2");
    const heroMonolith = document.getElementById("hero-monolith");
    const heroStarburst = document.getElementById("hero-starburst");
    const aboutCard = document.getElementById("about-parallax-card");
    const aboutSec = document.getElementById("sec-about");
    const manifestoEl = document.getElementById("manifesto-text");
    const scrubWords = Array.from(document.querySelectorAll(".scrub-word"));
    const numbersBand = document.getElementById("numbers-band");
    const timelineRows = Array.from(document.querySelectorAll(".timeline-row"));
    const statNums = Array.from(document.querySelectorAll(".stat-num"));
    const journeyTitle = document.getElementById("journey-title");
    const workGiantTitle = document.getElementById("work-giant-title");
    const closingEl = document.getElementById("kinetic-closing");
    const footerMarquee = document.getElementById("footer-marquee");
    const monogramCube = document.getElementById("monogram-cube");
    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");

    // Ensure initial body class matches smoothEnabledRef
    document.body.classList.toggle("smooth-active", smoothEnabledRef.current);
    document.body.classList.toggle("native-scroll", !smoothEnabledRef.current);

    function animateCounters() {
      if (statsAnimatedRef.current) return;
      statsAnimatedRef.current = true;
      statNums.forEach((el) => {
        const target = parseInt(
          el.getAttribute("data-count-target") || "0",
          10
        );
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1200;
        const start = performance.now();

        function step(now: number) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const val = Math.round(target * eased);
          el.textContent = `${prefix}${val}${suffix}`;
          if (t < 1) {
            const id = requestAnimationFrame(step);
            counterRafIds.push(id);
          }
        }
        const id = requestAnimationFrame(step);
        counterRafIds.push(id);
      });
    }

    function tick() {
      if (smoothEnabledRef.current) {
        const diff = targetScrollRef.current - currentScrollRef.current;
        scrollVelocity = diff * 0.088;
        currentScrollRef.current += scrollVelocity;
        if (Math.abs(diff) < 0.08) {
          currentScrollRef.current = targetScrollRef.current;
          scrollVelocity = 0;
        }
        if (smoothContent) {
          smoothContent.style.transform = `translate3d(0, ${(-currentScrollRef.current).toFixed(2)}px, 0)`;
        }
      } else {
        const next = window.scrollY || window.pageYOffset;
        scrollVelocity = (next - currentScrollRef.current) * 0.25;
        currentScrollRef.current = next;
      }

      const currentScroll = currentScrollRef.current;
      const vh = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, currentScroll / maxScrollRef.current)
      );

      // 1. Continuous Cobalt SVG Thread + Live Glowing Node
      if (threadActive) {
        const totalPathLen = totalPathLenRef.current;
        const drawn = totalPathLen * Math.min(1, progress * 1.03 + 0.025);
        threadActive.style.strokeDashoffset = String(
          Math.max(0, totalPathLen - drawn)
        );
        try {
          const pt = threadActive.getPointAtLength(
            Math.min(totalPathLen, drawn)
          );
          if (threadNodeHalo) {
            threadNodeHalo.setAttribute("cx", pt.x.toFixed(1));
            threadNodeHalo.setAttribute("cy", pt.y.toFixed(1));
            const pulseR = 10 + Math.sin(performance.now() * 0.005) * 3.5;
            threadNodeHalo.setAttribute("r", pulseR.toFixed(1));
          }
          if (threadNodeCore) {
            threadNodeCore.setAttribute("cx", pt.x.toFixed(1));
            threadNodeCore.setAttribute("cy", pt.y.toFixed(1));
          }
        } catch {
          // safe guard
        }
      }

      // 2. Hero Kinetic Split Typography & Monolith Parallax
      const heroP = Math.min(1.4, currentScroll / Math.max(1, vh));
      if (heroLine1) {
        heroLine1.style.transform = `translate3d(${(-heroP * 75).toFixed(1)}px, ${(heroP * 26).toFixed(1)}px, 0)`;
      }
      if (heroLine2) {
        heroLine2.style.transform = `translate3d(${(heroP * 90).toFixed(1)}px, ${(-heroP * 18).toFixed(1)}px, 0)`;
      }
      if (heroMonolith) {
        heroMonolith.style.transform = `translate3d(0, ${(heroP * 54).toFixed(1)}px, 0) scale(${(1 + heroP * 0.08).toFixed(3)})`;
      }
      if (heroStarburst) {
        heroStarburst.style.transform = `rotate(${(currentScroll * 0.22).toFixed(1)}deg)`;
      }

      // 3. About Parallax Card
      if (aboutSec && aboutCard) {
        const rel = (currentScroll - aboutSec.offsetTop) / Math.max(1, vh);
        aboutCard.style.transform = `translate3d(0, ${Math.max(-24, Math.min(28, rel * 22)).toFixed(1)}px, 0)`;
      }

      // 4. Scroll-Scrubbed Manifesto Word Fill
      if (manifestoEl) {
        const secTop = manifestoEl.getBoundingClientRect().top;
        const startY = vh * 0.86;
        const endY = vh * 0.16;
        const scrubP = Math.max(
          0,
          Math.min(1, (startY - secTop) / Math.max(1, startY - endY))
        );
        const activeCount = Math.floor(scrubP * (scrubWords.length + 0.5));
        scrubWords.forEach((w, idx) => {
          if (idx < activeCount) w.classList.add("lit");
          else w.classList.remove("lit");
        });
      }

      // 5. Counters & Timeline Reveals
      if (numbersBand && !statsAnimatedRef.current) {
        if (numbersBand.getBoundingClientRect().top < vh * 0.85) {
          animateCounters();
        }
      }

      timelineRows.forEach((row) => {
        if (row.getBoundingClientRect().top < vh * 0.84) {
          row.classList.add("in-view");
        }
      });

      // 6. Journey & Work Kinetic Title Tracking
      if (journeyTitle) {
        const jRect = journeyTitle.getBoundingClientRect();
        const jShift = (jRect.top / Math.max(1, vh) - 0.4) * 34;
        journeyTitle.style.transform = `translate3d(${jShift.toFixed(1)}px, 0, 0)`;
      }
      if (workGiantTitle) {
        const wRect = workGiantTitle.getBoundingClientRect();
        const wScale =
          1 +
          Math.max(-0.06, Math.min(0.08, (0.5 - wRect.top / Math.max(1, vh)) * 0.1));
        workGiantTitle.style.transform = `scale(${wScale.toFixed(3)})`;
      }

      // 7. Kinetic Closing Headline Drop-In
      if (closingEl && closingEl.getBoundingClientRect().top < vh * 0.82) {
        closingEl.classList.add("in-view");
      }

      // 8. Footer Marquee (Velocity Boosted) & 3D Monogram Cube
      marqueeOffset -= 0.85 + Math.min(8, Math.abs(scrollVelocity) * 0.18);
      if (marqueeOffset < -900) marqueeOffset = 0;
      if (footerMarquee) {
        footerMarquee.style.transform = `translate3d(${marqueeOffset.toFixed(1)}px, 0, 0)`;
      }
      if (monogramCube) {
        cubeRotY += 0.35 + Math.abs(scrollVelocity) * 0.04;
        const rotX = cubeRotX + mouseNormRef.current.y * 18;
        const rotY = cubeRotY + mouseNormRef.current.x * 26;
        monogramCube.style.transform = `rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg)`;
      }

      // 9. Update Active Chapter Ruler
      let nextChapter = CHAPTERS[0].id;
      for (let i = 0; i < CHAPTERS.length; i++) {
        const sec = document.getElementById(CHAPTERS[i].id);
        if (sec && currentScroll + vh * 0.42 >= sec.offsetTop) {
          nextChapter = CHAPTERS[i].id;
        }
      }
      setActiveChapter((prev) => (prev === nextChapter ? prev : nextChapter));

      tickRafId = requestAnimationFrame(tick);
    }

    function animateCursorRing() {
      rx += (cx - rx) * 0.16;
      ry += (cy - ry) * 0.16;
      if (cursorRing) {
        cursorRing.style.left = `${rx.toFixed(1)}px`;
        cursorRing.style.top = `${ry.toFixed(1)}px`;
      }
      cursorRafId = requestAnimationFrame(animateCursorRing);
    }

    const handleScroll = () => {
      targetScrollRef.current = Math.max(
        0,
        Math.min(maxScrollRef.current, window.scrollY || window.pageYOffset)
      );
    };

    const handleWheel = (e: WheelEvent) => {
      if (!smoothEnabledRef.current) return;
      if (menuOpenRef.current || modalOpenRef.current) return;
      e.preventDefault();
      const delta = Math.max(-160, Math.min(160, e.deltaY));
      targetScrollRef.current = Math.max(
        0,
        Math.min(maxScrollRef.current, targetScrollRef.current + delta * 1.05)
      );
      window.scrollTo(0, targetScrollRef.current);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseAllRef.current();
      } else if (e.key === "ArrowRight") {
        onStepCarouselRef.current(1);
      } else if (e.key === "ArrowLeft") {
        onStepCarouselRef.current(-1);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      mouseNormRef.current = {
        x: e.clientX / Math.max(1, window.innerWidth) - 0.5,
        y: e.clientY / Math.max(1, window.innerHeight) - 0.5,
      };
      if (cursorDot) {
        cursorDot.style.left = `${cx}px`;
        cursorDot.style.top = `${cy}px`;
      }
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest("button, a, .carousel-card, .tl-card")
      );
      document.body.classList.toggle("cursor-hover", isInteractive);
    };

    const handleResize = () => {
      syncDocumentHeight();
    };

    const handleLoad = () => {
      syncDocumentHeight();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleLoad);

    let resizeObserver: ResizeObserver | null = null;
    if (smoothContent && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        syncDocumentHeight();
      });
      resizeObserver.observe(smoothContent);
    }

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        syncDocumentHeight();
      });
    }

    syncDocumentHeight();
    tickRafId = requestAnimationFrame(tick);
    cursorRafId = requestAnimationFrame(animateCursorRing);

    return () => {
      cancelAnimationFrame(tickRafId);
      cancelAnimationFrame(cursorRafId);
      counterRafIds.forEach((id) => cancelAnimationFrame(id));
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
      resizeObserver?.disconnect();
    };
  }, [syncDocumentHeight]);

  return {
    smoothEnabled,
    activeChapter,
    dhakaTime,
    mouseNormRef,
    scrollToSelector,
    toggleSmooth,
    syncDocumentHeight,
  };
}
