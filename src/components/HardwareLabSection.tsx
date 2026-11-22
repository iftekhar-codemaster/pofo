"use client";

import { useState } from "react";
import { LAB_TABS, OLED_MOODS } from "@/data/portfolio";
import type { OledMood } from "@/data/portfolio";

interface HardwareLabSectionProps {
  onOpenCase: (idx: number) => void;
}

export default function HardwareLabSection({
  onOpenCase,
}: HardwareLabSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [mood, setMood] = useState<OledMood>("curious");

  const currentTab = LAB_TABS[activeTab] ?? LAB_TABS[0];

  return (
    <section className="sec-lab" id="sec-lab">
      <div className="lab-grid">
        <div className="lab-info-col" data-depth-layer="back">
          <div className="lab-badge-row">
            <span className="lab-pill">CURRENT LAB</span>
            <span className="lab-brand">Desk Companion</span>
          </div>
          <h2 className="lab-headline">
            An expressive <em>ESP32-S3</em> desk companion built for two.
          </h2>
          <p className="lab-copy">
            Designed as an affordable, movement-capable alternative to static
            desk bots in Bangladesh. Built as a dual-unit open-breadboard
            prototype with micro-servos, Wi-Fi remote desk pokes, and
            push-to-talk Bangla &amp; English AI voice.
          </p>
          <div className="lab-meta-line">
            ESP32-S3-WROOM-1 N16R8 &middot; OPEN BREADBOARD BLUEPRINT
          </div>
          <button
            type="button"
            className="btn-ink"
            id="btn-lab-inspect"
            onClick={() => onOpenCase(3)}
          >
            VIEW FULL HARDWARE CASE &rarr;
          </button>
        </div>

        <div className="lab-interactive-card" data-depth-layer="front">
          <div className="lab-card-top">
            <div className="lab-tabs" role="tablist">
              {LAB_TABS.map((tab, idx) => (
                <button
                  key={tab.stepNum}
                  type="button"
                  className={`lab-tab-btn${activeTab === idx ? " active" : ""}`}
                  data-lab-tab={idx}
                  role="tab"
                  aria-selected={activeTab === idx}
                  onClick={() => setActiveTab(idx)}
                >
                  {tab.tabLabel}
                </button>
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--muted-light)",
              }}
            >
              PROTO V1.0
            </span>
          </div>

          <div className="lab-card-body">
            <div>
              <div className="lab-step-num" id="lab-step-num">
                {currentTab.stepNum}
              </div>
              <div className="lab-step-sub" id="lab-step-sub">
                OF 03
              </div>
            </div>
            <div>
              <h3 className="lab-panel-title" id="lab-panel-title">
                {currentTab.title}
              </h3>
              <p className="lab-panel-text" id="lab-panel-text">
                {currentTab.text}
              </p>
            </div>
          </div>

          <div className="oled-sim-wrap">
            <div
              className="oled-screen"
              id="oled-screen"
              data-mood={mood}
              aria-label="Interactive OLED face preview"
            >
              <div className="oled-eye" />
              <div className="oled-eye" />
            </div>
            <div className="oled-controls">
              <span className="oled-label">
                LIVE I2C OLED EXPRESSION PREVIEW
              </span>
              <div className="oled-mood-btns">
                {OLED_MOODS.map((item) => (
                  <button
                    key={item.mood}
                    type="button"
                    className={`mood-btn${mood === item.mood ? " active" : ""}`}
                    data-mood={item.mood}
                    onClick={() => setMood(item.mood)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
