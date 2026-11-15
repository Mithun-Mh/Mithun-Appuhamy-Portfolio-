"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, ArrowRight, Mail, Sparkles, Code2, Bot, Layers } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";

export const Hero = () => {
  const [imageError, setImageError] = useState(false);

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
    <section
      id="home"
      aria-label="Hero Section"
      className="relative pt-6 sm:pt-10 md:pt-14 pb-16 sm:pb-20 md:pb-24 overflow-hidden"
    >
      <Container size="lg">
        {/* Desktop: 2-column layout (text left, portrait right) | Mobile: single-column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 items-center">
          
          {/* Left Column — Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-7 animate-slide-up">
            
            {/* Status / Title Overline */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="status" dot size="sm">
                Available for Opportunities
              </Badge>
              <span className="hidden sm:inline-block text-portfolio-border">•</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-portfolio-muted">
                Sri Lanka & Remote
              </span>
            </div>

            {/* Name & Professional Title */}
            <div className="space-y-2">
              <span className="block text-xs sm:text-sm font-semibold tracking-widest uppercase text-portfolio-accent">
                {SITE_CONFIG.name}
              </span>
              <p className="text-sm sm:text-base font-medium text-portfolio-text/90 tracking-normal">
                Software Engineer | AI Engineering | Agentic AI | RAG | LLM Applications
              </p>
            </div>

            {/* Main Heading */}
            <Heading
              variant="display"
              as="h1"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-portfolio-dark leading-[1.12]"
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

            {/* Exactly Three Buttons */}
            <div className="w-full pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Button 1: Watch My 2-Minute Introduction */}
              <Button
                variant="secondary"
                size="md"
                onClick={(e) => handleScrollTo(e, "introduction")}
                leftIcon={<Play className="w-4 h-4 fill-current" />}
                className="justify-center shadow-subtle"
              >
                Watch My 2-Minute Introduction
              </Button>

              {/* Button 2: Get in Touch */}
              <Button
                variant="outline"
                size="md"
                onClick={(e) => handleScrollTo(e, "contact")}
                leftIcon={<Mail className="w-4 h-4 text-portfolio-accent" />}
                className="justify-center"
              >
                Get in Touch
              </Button>

              {/* Button 3: Explore My Projects */}
              <Button
                variant="primary"
                size="md"
                onClick={(e) => handleScrollTo(e, "projects")}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="justify-center shadow-subtle"
              >
                Explore My Projects
              </Button>
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
                    src="/profile.jpg"
                    alt="Mithun Appuhamy — Software Engineer"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    className="object-cover object-top transition-all duration-700 hover:scale-105 motion-reduce:transform-none"
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
                    Software Engineer
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
