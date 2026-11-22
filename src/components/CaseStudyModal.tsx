"use client";

import type { ProjectItem } from "@/data/portfolio";

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function CaseStudyModal({
  project,
  onClose,
}: CaseStudyModalProps) {
  return (
    <div
      className={`case-modal-backdrop${project ? " open" : ""}`}
      id="case-modal-backdrop"
      aria-hidden={!project}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="case-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-modal-title"
      >
        <img
          className="case-modal-hero"
          id="case-modal-img"
          src={project?.img || undefined}
          alt={project?.title ?? ""}
        />
        <div className="case-modal-body">
          <div className="case-modal-top">
            <div>
              <div className="case-modal-cat" id="case-modal-cat">
                {project?.cat ?? ""}
              </div>
              <h3 className="case-modal-title" id="case-modal-title">
                {project?.title ?? ""}
              </h3>
            </div>
            <button
              type="button"
              className="case-close-btn"
              id="case-close-btn"
              aria-label="Close details"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <p className="case-modal-desc" id="case-modal-desc">
            {project?.desc ?? ""}
          </p>
          <ul className="case-highlights" id="case-modal-highlights">
            {project?.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className="craft-stack-tags" id="case-modal-tags">
            {project?.tags.map((t) => (
              <span key={t} className="stack-chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
