"use client";

import { CONTACT_EMAIL, MENU_LINKS } from "@/data/portfolio";

interface MenuOverlayProps {
  open: boolean;
  dhakaTime: string;
  smoothEnabled: boolean;
  onNavigate: (selector: string) => void;
  onToggleSmooth: () => void;
  onCopyEmail: () => void;
}

export default function MenuOverlay({
  open,
  dhakaTime,
  smoothEnabled,
  onNavigate,
  onToggleSmooth,
  onCopyEmail,
}: MenuOverlayProps) {
  return (
    <div className="menu-overlay" id="menu-overlay" aria-hidden={!open}>
      <div className="menu-grid">
        <div className="menu-links">
          {MENU_LINKS.map((link) => (
            <button
              key={link.num}
              type="button"
              className="menu-link-btn"
              data-menu-target={link.target}
              onClick={() => onNavigate(link.target)}
            >
              <span className="menu-link-num">{link.num}</span>
              <span className="menu-link-text">
                {link.labelLead} <em>{link.labelAccent}</em>
              </span>
            </button>
          ))}
        </div>
        <div className="menu-meta">
          <div className="menu-meta-row">
            <span>CREATOR</span>
            <strong>MD Iftekhar Ferdous</strong>
          </div>
          <div className="menu-meta-row">
            <span>DHAKA LOCAL TIME</span>
            <strong id="menu-dhaka-clock">{dhakaTime}</strong>
          </div>
          <div className="menu-meta-row">
            <span>INERTIAL SCROLL</span>
            <button
              type="button"
              className="scroll-mode-toggle"
              id="btn-scroll-mode"
              onClick={onToggleSmooth}
            >
              {smoothEnabled ? "SMOOTH: ON" : "SMOOTH: NATIVE"}
            </button>
          </div>
          <div className="menu-meta-row">
            <span>DIRECT EMAIL</span>
            <button
              type="button"
              className="scroll-mode-toggle"
              data-copy-email=""
              onClick={onCopyEmail}
            >
              {CONTACT_EMAIL}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
