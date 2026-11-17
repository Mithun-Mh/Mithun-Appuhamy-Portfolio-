"use client";

import React, { useState, useRef, useEffect } from "react";
import { Briefcase, ExternalLink, Calendar, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const roles = [
  {
    title: "Trainee Software Engineer",
    period: "December 2025 – May 2026",
    type: null,
    bullets: [
      "Contributed to developing modern web applications using Next.js and Node.js.",
      "Managed source code and collaborative development workflows using Git and GitHub.",
      "Performed API integration, testing, and debugging using Postman.",
      "Gained hands-on exposure to Docker, containerization, and CI/CD pipeline workflows.",
    ],
  },
  {
    title: "Full Stack Developer Intern",
    period: "May 2025 – November 2025",
    type: "Remote",
    bullets: [
      "Developed and supported full-stack web application features.",
      "Contributed to modern web application development and frontend-backend integration.",
      "Used GitHub for source code management and version control.",
      "Collaborated on implementation, debugging, and application improvements.",
      "Applied UI/UX design principles to create user-friendly interfaces.",
    ],
  },
];

export const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="scroll-mt-24"
      aria-label="Professional Experience Section"
    >
      <Container size="lg">
        {/* Section Header */}
        <div className="flex flex-col mb-10 sm:mb-12 items-start text-left max-w-3xl">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-portfolio-muted mb-2.5">
            Experience
          </span>
          <Heading variant="h2" className="text-2xl sm:text-3xl lg:text-4xl">
            Professional Experience
          </Heading>
          <p className="mt-3 text-base sm:text-lg text-portfolio-muted leading-relaxed">
            Hands-on software engineering experience building production-grade
            applications and AI-powered systems.
          </p>
        </div>

        {/* Timeline */}
        <div
          className={cn(
            "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:duration-0",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0"
          )}
        >
          {/* Company Card */}
          <div className="bg-portfolio-surface border border-portfolio-border rounded-2xl shadow-card overflow-hidden">

            {/* Company Header */}
            <div className="px-6 sm:px-8 py-5 border-b border-portfolio-border bg-portfolio-accent-subtle/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-portfolio-surface border border-portfolio-border flex items-center justify-center shadow-subtle shrink-0">
                  <Briefcase className="w-5 h-5 text-portfolio-dark" />
                </div>
                <div>
                  <a
                    href="https://www.flowiix.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-lg sm:text-xl font-bold text-portfolio-dark hover:text-portfolio-accent transition-colors duration-200 group"
                    aria-label="Visit FLOWIIX website"
                  >
                    FLOWIIX
                    <ExternalLink className="w-3.5 h-3.5 text-portfolio-muted group-hover:text-portfolio-accent transition-colors duration-200" />
                  </a>
                  <p className="text-xs text-portfolio-muted font-medium mt-0.5">
                    Software Engineering
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-portfolio-muted bg-portfolio-surface border border-portfolio-border px-3 py-1 rounded-full self-start sm:self-auto">
                1 Year
              </span>
            </div>

            {/* Roles */}
            <div className="divide-y divide-portfolio-border">
              {roles.map((role, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "px-6 sm:px-8 py-6 sm:py-7 transition-all duration-200",
                    "hover:bg-portfolio-accent-subtle/20"
                  )}
                >
                  {/* Role header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-portfolio-dark tracking-tight">
                        {role.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                        <span className="inline-flex items-center gap-1.5 text-xs text-portfolio-muted">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          {role.period}
                        </span>
                        {role.type && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-portfolio-muted">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            {role.type}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Role badge */}
                    <span
                      className={cn(
                        "self-start shrink-0 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border",
                        idx === 0
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-portfolio-accent-subtle text-portfolio-muted border-portfolio-border"
                      )}
                    >
                      {idx === 0 ? "Latest" : "Previous"}
                    </span>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2">
                    {role.bullets.map((point, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-portfolio-accent shrink-0" />
                        <span className="text-sm text-portfolio-text leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};
