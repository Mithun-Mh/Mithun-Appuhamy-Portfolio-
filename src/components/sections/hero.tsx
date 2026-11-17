"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, ArrowRight, X, Sparkles, Bot, Layers } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const photos = [
  { src: "/profile.jpg",    alt: "Mithun Appuhamy — Software Engineer" },
  { src: "/graduation.jpg", alt: "Mithun Appuhamy — SLIIT Graduate" },
];

export const Hero = () => {
  const [imageError, setImageError] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [fading, setFading] = useState(false);

  // Auto-cycle photos: show first for 4 s, fade to second, repeat
  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setPhotoIndex((prev) => (prev + 1) % photos.length);
        setFading(false);
      }, 600); // matches transition duration below
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVideoModalOpen(false);
      }
    };

    if (isVideoModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoModalOpen]);

  // Smooth scroll handler with offset for sticky navbar
  const handleScrollTo = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section
        id="home"
        aria-label="Hero Section"
        className="relative pt-6 sm:pt-10 md:pt-14 pb-16 sm:pb-20 md:pb-24 overflow-hidden"
      >
        <Container size="lg">
          {/* Desktop: 2-column layout (text left, portrait right) | Mobile: single-column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 items-center">
            
            {/* Left Column — Text & Refined Two-Button CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5 sm:space-y-6 animate-slide-up">
              
              {/* Status Overline */}
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="status" dot size="sm">
                  Available for Opportunities
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-wider text-portfolio-muted hidden sm:inline-block">
                  Sri Lanka &amp; Global Remote
                </span>
              </div>

              {/* Name & Professional Title */}
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-portfolio-accent-hover leading-none">
                  {SITE_CONFIG.name}
                </h2>
                <p className="text-sm sm:text-base font-medium text-portfolio-muted tracking-wide">
                  Software Engineer&nbsp;·&nbsp;AI Engineering&nbsp;·&nbsp;Agentic AI&nbsp;·&nbsp;RAG&nbsp;·&nbsp;LLM Applications
                </p>
              </div>

              {/* Main Heading */}
              <Heading
                variant="display"
                as="h1"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl font-bold tracking-tight text-portfolio-dark leading-[1.12]"
              >
                Building Intelligent Solutions for Real-World Problems.
              </Heading>

              {/* Description */}
              <Text
                variant="lead"
                className="text-base sm:text-lg text-portfolio-text leading-relaxed max-w-2xl font-normal"
              >
                I am an Information Technology graduate with approximately one year of software development experience, passionate about building intelligent applications, AI-powered solutions, and scalable software systems.
              </Text>

              {/* Key Focus Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-portfolio-surface border border-portfolio-border text-portfolio-text shadow-subtle">
                  <Bot className="w-3.5 h-3.5 text-portfolio-accent" />
                  Agentic AI & RAG
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-portfolio-surface border border-portfolio-border text-portfolio-text shadow-subtle">
                  <Sparkles className="w-3.5 h-3.5 text-portfolio-accent" />
                  LLM Applications
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-portfolio-surface border border-portfolio-border text-portfolio-text shadow-subtle">
                  <Layers className="w-3.5 h-3.5 text-portfolio-accent" />
                  Scalable Systems
                </span>
              </div>

              {/* Exactly Two Buttons — Side by Side on Desktop, Stacked on Mobile */}
              <div className="w-full pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-full">
                
                {/* 1. Watch Introduction Button */}
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={isVideoModalOpen}
                  className="h-12 px-6 sm:px-7 rounded-xl bg-portfolio-accent text-white font-medium text-sm sm:text-base inline-flex items-center justify-center gap-2.5 whitespace-nowrap shadow-subtle transition-all duration-200 hover:bg-portfolio-accent-hover hover:-translate-y-0.5 hover:shadow-card active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-portfolio-accent focus-visible:outline-offset-2 select-none w-full sm:w-auto sm:min-w-[180px]"
                >
                  <Play className="w-4 h-4 fill-current shrink-0" />
                  <span>Watch Introduction</span>
                </button>

                {/* 2. Explore Projects Button */}
                <button
                  type="button"
                  onClick={(e) => handleScrollTo(e, "projects")}
                  className="h-12 px-6 sm:px-7 rounded-xl bg-portfolio-dark text-white font-medium text-sm sm:text-base inline-flex items-center justify-center gap-2.5 whitespace-nowrap shadow-subtle transition-all duration-200 hover:bg-portfolio-text hover:-translate-y-0.5 hover:shadow-card active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-portfolio-dark focus-visible:outline-offset-2 select-none w-full sm:w-auto sm:min-w-[180px]"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>

            </div>

            {/* Right Column — Real Portrait with Modern Architectural Frame */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
                
                {/* Background Architectural Accent Layer */}
                <div
                  className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-3xl bg-portfolio-accent-subtle/80 border border-portfolio-border pointer-events-none"
                  aria-hidden="true"
                />

                {/* Main Portrait Frame */}
                <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-portfolio-surface border border-portfolio-border shadow-elevated transition-transform duration-500 ease-out hover:scale-[1.01]">
                  {!imageError ? (
                    <Image
                      src={photos[photoIndex].src}
                      alt={photos[photoIndex].alt}
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                      className={cn(
                        "object-cover object-top transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none",
                        fading ? "opacity-0" : "opacity-100"
                      )}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    /* Accessible Fallback if file is missing */
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-portfolio-surface text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-portfolio-accent-subtle border border-portfolio-border flex items-center justify-center text-portfolio-dark font-bold text-2xl">
                        MA
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-portfolio-dark text-base">
                          {SITE_CONFIG.name}
                        </p>
                        <p className="text-xs text-portfolio-muted">
                          Software Engineer & AI Solutions
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Photo dot indicators */}
                  <div className="absolute top-3 right-3 flex gap-1.5 z-10 motion-reduce:hidden" aria-hidden="true">
                    {photos.map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "block w-1.5 h-1.5 rounded-full transition-all duration-300",
                          i === photoIndex
                            ? "bg-white scale-110"
                            : "bg-white/40"
                        )}
                      />
                    ))}
                  </div>

                  {/* Subtle Inner Gradient Overlay for Visual Depth */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/25 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Floating Role Pill on Portrait */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-portfolio-surface/90 backdrop-blur-md border border-portfolio-border/80 shadow-subtle flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
                      <span className="text-xs font-semibold text-portfolio-dark">
                        Mithun Appuhamy
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-portfolio-muted">
                      Aspiring AI Engineer
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Introduction Video Modal */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-portfolio-dark/65 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl bg-portfolio-surface border border-portfolio-border shadow-elevated overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-portfolio-border flex items-center justify-between bg-portfolio-bg/50">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-portfolio-accent" />
                <h3
                  id="video-modal-title"
                  className="font-semibold text-sm sm:text-base text-portfolio-dark"
                >
                  Mithun Appuhamy — Introduction
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 rounded-lg text-portfolio-muted hover:text-portfolio-dark hover:bg-portfolio-accent-subtle transition-colors focus-visible:outline-2 focus-visible:outline-portfolio-accent"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player / Container */}
            <div className="relative aspect-video w-full bg-portfolio-dark flex flex-col items-center justify-center text-white p-6">
              <div className="w-16 h-16 rounded-full bg-portfolio-accent/20 border border-portfolio-accent/40 flex items-center justify-center mb-4 text-portfolio-accent shadow-lg animate-pulse">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
              <p className="text-base sm:text-lg font-semibold text-center text-white mb-1">
                2-Minute Video Introduction
              </p>
              <p className="text-xs sm:text-sm text-portfolio-border text-center max-w-md">
                An overview of engineering capabilities, software philosophy, and intelligent AI applications built by Mithun Appuhamy.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-portfolio-border bg-portfolio-surface flex items-center justify-between text-xs text-portfolio-muted">
              <span>Press ESC to close</span>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg bg-portfolio-dark text-white font-medium hover:bg-portfolio-text transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
