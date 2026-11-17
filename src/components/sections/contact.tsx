"use client";

import React, { useState, useRef, useEffect } from "react";
import { Github, Linkedin, MessageCircle, Mail, ArrowRight, ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const CONTACTS = [
  {
    id: "github",
    label: "GitHub",
    value: "github.com/Mithun-Mh",
    href: "https://github.com/Mithun-Mh",
    icon: Github,
    external: true,
    description: "Explore my repositories and open-source work.",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/mithun-appuhamy",
    href: "https://www.linkedin.com/in/mithun-appuhamy/",
    icon: Linkedin,
    external: true,
    description: "Connect professionally and view my full profile.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+94 76 158 0754",
    href: "https://wa.me/94761580754",
    icon: MessageCircle,
    external: true,
    description: "Start a direct conversation.",
  },
  {
    id: "email",
    label: "Email",
    value: "mithunmh19@gmail.com",
    href: "mailto:mithunmh19@gmail.com",
    icon: Mail,
    external: false,
    description: "Send me an email directly.",
  },
];

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="scroll-mt-24"
      aria-label="Contact Section"
    >
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">

          {/* Left — Heading & CTA */}
          <div
            className={cn(
              "lg:col-span-5 flex flex-col gap-6 transition-all duration-700 ease-out motion-reduce:transition-none",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0"
            )}
          >
            {/* Overline */}
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-portfolio-muted">
              Contact
            </span>

            {/* Heading */}
            <Heading variant="h2" className="text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Let's Connect
            </Heading>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-portfolio-muted leading-relaxed">
              Open to opportunities in{" "}
              <span className="font-medium text-portfolio-dark">AI Engineering</span>,{" "}
              <span className="font-medium text-portfolio-dark">Agentic AI</span>,{" "}
              <span className="font-medium text-portfolio-dark">Generative AI</span>,{" "}
              <span className="font-medium text-portfolio-dark">Machine Learning</span>, and{" "}
              <span className="font-medium text-portfolio-dark">Software Engineering</span>.{" "}
              Let's discuss how we can build something meaningful together.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="mailto:mithunmh19@gmail.com"
                className="h-12 px-7 rounded-xl bg-portfolio-dark text-white font-medium text-sm inline-flex items-center justify-center gap-2.5 shadow-subtle transition-all duration-200 hover:bg-portfolio-text hover:-translate-y-0.5 hover:shadow-card active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-portfolio-accent focus-visible:outline-offset-2 select-none"
              >
                <Mail className="w-4 h-4 shrink-0" />
                Send an Email
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
              <a
                href="#home"
                className="h-12 px-7 rounded-xl bg-portfolio-surface text-portfolio-dark font-medium text-sm inline-flex items-center justify-center gap-2 border border-portfolio-border shadow-subtle transition-all duration-200 hover:bg-portfolio-accent-subtle hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-portfolio-accent focus-visible:outline-offset-2 select-none"
              >
                <ArrowUp className="w-4 h-4 shrink-0" />
                Back to Top
              </a>
            </div>
          </div>

          {/* Right — Contact cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTACTS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={`${item.label}: ${item.value}`}
                    className={cn(
                      "group flex items-start gap-4 p-5 rounded-2xl bg-portfolio-surface border border-portfolio-border shadow-card",
                      "transition-all duration-300 ease-out motion-reduce:transition-none",
                      "hover:shadow-elevated hover:-translate-y-0.5 hover:border-portfolio-accent/50",
                      "focus-visible:outline-2 focus-visible:outline-portfolio-accent focus-visible:outline-offset-2",
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0"
                    )}
                    style={{ transitionDelay: isVisible ? `${i * 80}ms` : "0ms" }}
                  >
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl bg-portfolio-accent-subtle border border-portfolio-border flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-portfolio-accent group-hover:border-portfolio-accent/60">
                      <Icon className="w-5 h-5 text-portfolio-muted transition-colors duration-200 group-hover:text-white" />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-portfolio-muted mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-portfolio-dark truncate">
                        {item.value}
                      </p>
                      <p className="text-xs text-portfolio-muted mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
