"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, Github, ExternalLink, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects-data";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

const PLACEHOLDER_COLORS: Record<string, string> = {
  rubberex: "from-emerald-900 to-emerald-700",
  "tripmate-ai": "from-blue-900 to-blue-700",
  "book-publisher-api": "from-slate-800 to-slate-600",
  "fashion-wander-wear": "from-rose-900 to-rose-700",
  infoplus: "from-violet-900 to-violet-700",
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [imgError, setImgError] = useState(false);

  // Escape key + scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const gradientClass = PLACEHOLDER_COLORS[project.id] ?? "from-gray-800 to-gray-600";
  const imgSrc = `/projects/${project.id}.jpg`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-portfolio-dark/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 rounded-2xl bg-portfolio-surface border border-portfolio-border shadow-elevated overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thumbnail — real image with gradient fallback */}
        <div className={cn(
          "relative h-48 sm:h-56 overflow-hidden flex items-end",
          imgError ? cn("bg-gradient-to-br", gradientClass) : "bg-portfolio-dark"
        )}>
          {!imgError && (
            <Image
              src={imgSrc}
              alt={`${project.name} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover object-top"
              onError={() => setImgError(true)}
              priority
            />
          )}

          {/* gradient fallback dot pattern */}
          {imgError && (
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}
              aria-hidden="true"
            />
          )}

          {/* Always-on dark overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" aria-hidden="true" />

          {/* Project name over image */}
          <div className="relative z-10 p-5 pb-4">
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.name}
            </span>
            <p className="text-xs text-white/60 mt-0.5 uppercase tracking-widest font-medium">
              {project.categoryLabel}
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/40 text-white hover:bg-black/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 space-y-7">
          {/* Header */}
          <div className="space-y-2">
            <h2 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-portfolio-dark leading-snug">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-portfolio-dark text-white text-sm font-medium hover:bg-portfolio-text transition-colors"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-portfolio-border text-portfolio-dark text-sm font-medium hover:bg-portfolio-accent-subtle transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          <Divider />

          {/* Overview */}
          <Section title="Project Overview">
            <p className="text-sm text-portfolio-text leading-relaxed">{project.overview}</p>
          </Section>

          {/* Problem / Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-portfolio-accent-subtle/50 border border-portfolio-border">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-portfolio-muted mb-2">Problem</h4>
              <p className="text-sm text-portfolio-text leading-relaxed">{project.problem}</p>
            </div>
            <div className="p-4 rounded-xl bg-portfolio-accent-subtle/50 border border-portfolio-border">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-portfolio-muted mb-2">Solution</h4>
              <p className="text-sm text-portfolio-text leading-relaxed">{project.solution}</p>
            </div>
          </div>

          <Divider />

          {/* Key Features */}
          <Section title="Key Features">
            <div className="space-y-4">
              {project.features.map((f, i) => (
                <div key={i}>
                  <h4 className="text-sm font-semibold text-portfolio-dark mb-2">{f.heading}</h4>
                  <ul className="space-y-1.5">
                    {f.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-portfolio-accent shrink-0" />
                        <span className="text-sm text-portfolio-text leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Divider />

          {/* Architecture */}
          <Section title="System Architecture">
            <p className="text-sm text-portfolio-text leading-relaxed">{project.architecture}</p>
          </Section>

          {/* My Contributions */}
          <Section title="My Contributions">
            <ul className="space-y-2">
              {project.contributions.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-portfolio-accent shrink-0" />
                  <span className="text-sm text-portfolio-text leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Divider />

          {/* Tech Stack */}
          <Section title="Technology Stack">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-portfolio-accent-subtle border border-portfolio-border text-portfolio-dark"
                >
                  {t}
                </span>
              ))}
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-portfolio-border bg-portfolio-bg/50 flex items-center justify-between">
          <span className="text-xs text-portfolio-muted">Press ESC to close</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-portfolio-dark text-white text-sm font-medium hover:bg-portfolio-text transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Divider = () => (
  <div className="border-t border-portfolio-border" />
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-bold uppercase tracking-wider text-portfolio-muted">{title}</h3>
    {children}
  </div>
);
