"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Bot, Brain, Workflow, Code2, Cloud } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger fade-in + upward movement when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Technical focus items for the decorative sidebar
  const techFocus = [
    { icon: Bot, label: "Agentic AI" },
    { icon: Sparkles, label: "Generative AI" },
    { icon: Brain, label: "Machine Learning & MLOPs" },
    { icon: Workflow, label: "RAG & Multi-Agent" },
    { icon: Code2, label: "Python & FastAPI" },
    { icon: Cloud, label: "AWS & Docker" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-24"
      aria-label="About Me Section"
    >
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left Column — Heading & Content */}
          <div className="lg:col-span-8">
            {/* Section Header */}
            <div className="flex flex-col mb-8 sm:mb-10">
              <span className="inline-block text-xs uppercase tracking-widest font-semibold text-portfolio-muted mb-2.5">
                About
              </span>
              <Heading variant="h2" className="text-2xl sm:text-3xl lg:text-4xl">
                About Me
              </Heading>
            </div>

            {/* Paragraphs with subtle tech-term highlighting */}
            <div
              className={cn(
                "space-y-6 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:duration-0",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0"
              )}
            >
              <p className="text-base sm:text-lg text-portfolio-text leading-relaxed">
                I'm an Information Technology graduate from{" "}
                <span className="font-medium text-portfolio-dark">SLIIT</span> with{" "}
                <span className="font-medium text-portfolio-dark">
                  12 months of professional software engineering experience
                </span>
                , specializing in{" "}
                <span className="font-medium text-portfolio-dark">Agentic AI</span>,{" "}
                <span className="font-medium text-portfolio-dark">Generative AI</span>,
                and{" "}
                <span className="font-medium text-portfolio-dark">
                  Machine Learning & MLOPs
                </span>
                .
              </p>

              <p className="text-base sm:text-lg text-portfolio-text leading-relaxed">
                I develop intelligent applications using{" "}
                <span className="font-medium text-portfolio-dark">Python</span>,{" "}
                <span className="font-medium text-portfolio-dark">LangChain</span>,{" "}
                <span className="font-medium text-portfolio-dark">LangGraph</span>,{" "}
                <span className="font-medium text-portfolio-dark">
                  Google Gemini
                </span>
                , and{" "}
                <span className="font-medium text-portfolio-dark">FastAPI</span>, with
                experience in{" "}
                <span className="font-medium text-portfolio-dark">
                  multi-agent systems
                </span>
                , <span className="font-medium text-portfolio-dark">RAG</span>, and{" "}
                <span className="font-medium text-portfolio-dark">
                  AI automation
                </span>
                .
              </p>

              <p className="text-base sm:text-lg text-portfolio-text leading-relaxed">
                I also have hands-on experience with{" "}
                <span className="font-medium text-portfolio-dark">AWS</span>,{" "}
                <span className="font-medium text-portfolio-dark">Docker</span>, and{" "}
                <span className="font-medium text-portfolio-dark">CI/CD</span>. I enjoy
                transforming real-world problems into practical, scalable AI solutions
                through end-to-end engineering.
              </p>

              <p className="text-base sm:text-lg text-portfolio-text leading-relaxed">
                Currently seeking opportunities in{" "}
                <span className="font-medium text-portfolio-dark">
                  AI Engineering
                </span>
                , <span className="font-medium text-portfolio-dark">Agentic AI</span>,{" "}
                <span className="font-medium text-portfolio-dark">
                  Generative AI
                </span>
                ,{" "}
                <span className="font-medium text-portfolio-dark">
                  Machine Learning
                </span>
                , and{" "}
                <span className="font-medium text-portfolio-dark">
                  Software Engineering
                </span>
                , where I can contribute to innovative projects and grow as an
                engineer.
              </p>
            </div>
          </div>

          {/* Right Column — Decorative Tech Focus Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div
              className={cn(
                "p-6 sm:p-8 rounded-2xl bg-portfolio-surface border border-portfolio-border shadow-card transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:duration-0",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0"
              )}
            >
              {/* Decorative Icon */}
              <div className="w-12 h-12 rounded-xl bg-portfolio-accent-subtle flex items-center justify-center border border-portfolio-border mb-6">
                <Sparkles className="w-6 h-6 text-portfolio-accent" />
              </div>

              {/* Tech Focus List */}
              <h3 className="text-sm font-semibold uppercase tracking-wider text-portfolio-muted mb-4">
                Technical Focus
              </h3>
              <ul className="space-y-3.5">
                {techFocus.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-portfolio-accent-subtle/60 flex items-center justify-center border border-portfolio-border/60 shrink-0">
                      <item.icon className="w-4 h-4 text-portfolio-muted" />
                    </div>
                    <span className="text-sm font-medium text-portfolio-text">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
