"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Github, ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { PROJECTS, FILTER_LABELS, type ProjectCategory, type Project } from "@/lib/projects-data";
import { ProjectDetailModal } from "./project-detail-modal";

// ─── Placeholder gradient map (shown when image not yet uploaded) ─────────────
const CARD_GRADIENTS: Record<string, string> = {
  rubberex: "from-emerald-900 via-emerald-800 to-emerald-700",
  "tripmate-ai": "from-blue-900 via-blue-800 to-blue-700",
  "book-publisher-api": "from-slate-800 via-slate-700 to-slate-600",
  "fashion-wander-wear": "from-rose-900 via-rose-800 to-rose-700",
  infoplus: "from-violet-900 via-violet-800 to-violet-700",
};

const CARD_ACCENT: Record<string, string> = {
  rubberex: "text-emerald-300",
  "tripmate-ai": "text-blue-300",
  "book-publisher-api": "text-slate-300",
  "fashion-wander-wear": "text-rose-300",
  infoplus: "text-violet-300",
};

const FILTERS: ProjectCategory[] = ["all", "agentic-ai", "ml-cv", "software-engineering", "cloud-devops"];

// ─── Card Thumbnail — real image with graceful fallback ───────────────────────
const CardThumbnail: React.FC<{ project: Project }> = ({ project }) => {
  const [imgError, setImgError] = useState(false);
  const gradient = CARD_GRADIENTS[project.id] ?? "from-gray-800 to-gray-700";
  const accent   = CARD_ACCENT[project.id]    ?? "text-gray-300";
  const imgSrc   = `/projects/${project.id}.jpg`;

  return (
    <div className={cn(
      "relative h-44 overflow-hidden flex items-end p-5",
      imgError ? cn("bg-gradient-to-br", gradient) : "bg-portfolio-dark"
    )}>
      {/* Real image (hidden via state if it 404s) */}
      {!imgError && (
        <Image
          src={imgSrc}
          alt={`${project.name} screenshot`}
          fill
          sizes="(max-width: 640px) 320px, 360px"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      )}

      {/* Gradient fallback pattern (only when no image) */}
      {imgError && (
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}
          aria-hidden="true"
        />
      )}

      {/* Dark overlay so text is always readable over real photos */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" aria-hidden="true" />

      {/* Watermark initials (gradient fallback only) */}
      {imgError && (
        <span className="absolute top-4 right-4 text-white/15 font-black text-6xl leading-none select-none pointer-events-none">
          {project.name.substring(0, 2).toUpperCase()}
        </span>
      )}

      {/* Category label (always shown) */}
      <span className={cn("relative z-10 text-xs font-semibold uppercase tracking-widest", imgError ? accent : "text-white/70")}>
        {project.categoryLabel}
      </span>

      {/* GitHub badge on thumbnail */}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} GitHub repository`}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 left-4 z-10 p-2 rounded-lg bg-black/40 text-white/80 hover:bg-black/70 hover:text-white transition-colors"
      >
        <Github className="w-4 h-4" />
      </a>
    </div>
  );
};

// ─── Project Card ─────────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  index: number;
  visible: boolean;
  onDetails: (p: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, visible, onDetails }) => (
  <article
    className={cn(
      "group relative flex flex-col w-[320px] sm:w-[360px] flex-shrink-0 rounded-2xl bg-portfolio-surface border border-portfolio-border shadow-card overflow-hidden",
      "transition-all duration-500 ease-out motion-reduce:transition-none",
      "hover:shadow-elevated hover:-translate-y-1 hover:border-portfolio-accent/50",
      visible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0",
    )}
    style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
  >
    <CardThumbnail project={project} />

    {/* Body */}
    <div className="flex flex-col flex-1 p-5 space-y-3">
      <h3 className="text-base font-bold text-portfolio-dark leading-snug line-clamp-2 group-hover:text-portfolio-accent transition-colors duration-200">
        {project.title}
      </h3>

      <p className="text-sm text-portfolio-muted leading-relaxed line-clamp-3 flex-1">
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.tech.slice(0, 5).map((t) => (
          <span key={t} className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-portfolio-accent-subtle border border-portfolio-border text-portfolio-muted">
            {t}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-portfolio-accent-subtle border border-portfolio-border text-portfolio-muted">
            +{project.tech.length - 5}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <button
          type="button"
          onClick={() => onDetails(project)}
          className="flex-1 h-9 px-3 rounded-lg bg-portfolio-dark text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-portfolio-text transition-colors focus-visible:outline-2 focus-visible:outline-portfolio-accent focus-visible:outline-offset-2"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-3 rounded-lg border border-portfolio-border text-portfolio-dark text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-portfolio-accent-subtle transition-colors"
            aria-label={`${project.name} live demo`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Demo
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 w-9 rounded-lg border border-portfolio-border text-portfolio-muted inline-flex items-center justify-center hover:bg-portfolio-accent-subtle hover:text-portfolio-dark transition-colors"
          aria-label={`${project.name} GitHub`}
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </div>
  </article>
);

// ─── Projects Section ─────────────────────────────────────────────────────────
export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.includes(activeFilter));

  // Intersection observer for section entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.06, rootMargin: "0px 0px -60px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Track scroll position for arrow buttons
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState, filtered]);

  // Reset scroll when filter changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      updateScrollState();
    }
  }, [activeFilter, updateScrollState]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="scroll-mt-24"
      aria-label="Featured Projects Section"
    >
      <Container size="lg">
        {/* Section header */}
        <div
          className={cn(
            "flex flex-col mb-8 sm:mb-10 items-start text-left max-w-3xl transition-all duration-700 ease-out motion-reduce:transition-none",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0"
          )}
        >
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-portfolio-muted mb-2.5">
            Selected Work
          </span>
          <Heading variant="h2" className="text-2xl sm:text-3xl lg:text-4xl">
            Featured Projects
          </Heading>
          <p className="mt-3 text-base sm:text-lg text-portfolio-muted leading-relaxed">
            Transforming ideas into intelligent solutions through Artificial Intelligence, Machine Learning, software engineering, and cloud technologies. Explore selected projects that demonstrate my technical expertise and practical problem-solving approach.
          </p>
        </div>

        {/* Category filters */}
        <div
          className={cn(
            "flex flex-wrap gap-2 mb-8 transition-all duration-700 ease-out delay-100 motion-reduce:transition-none",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0"
          )}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-portfolio-accent focus-visible:outline-offset-2",
                activeFilter === f
                  ? "bg-portfolio-dark text-white border-portfolio-dark"
                  : "bg-portfolio-surface text-portfolio-muted border-portfolio-border hover:text-portfolio-dark hover:border-portfolio-accent/60 hover:bg-portfolio-accent-subtle/50"
              )}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>

        {/* Horizontal scroll container */}
        <div
          className={cn(
            "relative transition-all duration-700 ease-out delay-200 motion-reduce:transition-none",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0"
          )}
        >
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll projects left"
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full bg-portfolio-surface border border-portfolio-border shadow-card flex items-center justify-center text-portfolio-dark hover:bg-portfolio-accent-subtle transition-all duration-200",
              canScrollLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll projects right"
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full bg-portfolio-surface border border-portfolio-border shadow-card flex items-center justify-center text-portfolio-dark hover:bg-portfolio-accent-subtle transition-all duration-200",
              canScrollRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Scroll track */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filtered.map((project, i) => (
              <div key={project.id} className="snap-start shrink-0">
                <ProjectCard
                  project={project}
                  index={i}
                  visible={isVisible}
                  onDetails={setSelectedProject}
                />
              </div>
            ))}

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="w-full min-h-[240px] flex items-center justify-center text-portfolio-muted text-sm">
                No projects in this category yet.
              </div>
            )}
          </div>

          {/* Right fade gradient */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-portfolio-bg to-transparent pointer-events-none" aria-hidden="true" />
          )}
        </div>

        {/* Project count */}
        <p className="mt-5 text-xs text-portfolio-muted text-right">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} · scroll to explore →
        </p>
      </Container>

      {/* Detail modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
