"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Brain,
  Code2,
  Layout,
  Cloud,
  Database,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface SkillItem {
  name: string;
  level?: "hands-on" | "working" | "fundamentals";
}

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  description?: string;
  primary?: true;
  skills: SkillItem[];
}

const CATEGORIES: SkillCategory[] = [
  {
    id: "ai-agentic",
    label: "AI Engineering & Agentic AI",
    icon: Bot,
    primary: true,
    skills: [
      { name: "LangChain",                  level: "hands-on"    },
      { name: "LangGraph",                  level: "hands-on"    },
      { name: "Google Gemini",              level: "hands-on"    },
      { name: "Claude",                     level: "working"     },
      { name: "Large Language Models (LLMs)", level: "hands-on"  },
      { name: "Retrieval-Augmented Generation (RAG)", level: "hands-on" },
      { name: "AI Agents",                  level: "hands-on"    },
      { name: "Multi-Agent Systems",        level: "hands-on"    },
      { name: "Model Context Protocol (MCP)", level: "working"   },
      { name: "AI Security Guardrails",     level: "working"     },
      { name: "LangSmith",                  level: "hands-on"    },
      { name: "Prompt Engineering",         level: "hands-on"    },
    ],
  },
  {
    id: "ml-data",
    label: "Machine Learning, Data Science & MLOps",
    icon: Brain,
    skills: [
      { name: "Python",                     level: "hands-on"    },
      { name: "Pandas",                     level: "hands-on"    },
      { name: "Scikit-learn",               level: "hands-on"    },
      { name: "Statistical Machine Learning", level: "hands-on"  },
      { name: "Random Forest",              level: "working"     },
      { name: "Computer Vision",            level: "hands-on"    },
      { name: "Deep Learning Fundamentals", level: "fundamentals"},
      { name: "Time-Series Forecasting",    level: "hands-on"    },
      { name: "Predictive Analytics",       level: "hands-on"    },
      { name: "Data Preprocessing",         level: "hands-on"    },
      { name: "MLOps",                      level: "working"     },
    ],
  },
  {
    id: "backend",
    label: "Programming & Backend Engineering",
    icon: Code2,
    skills: [
      { name: "Python",         level: "hands-on" },
      { name: "JavaScript",     level: "hands-on" },
      { name: "C#",             level: "hands-on" },
      { name: "Node.js",        level: "hands-on" },
      { name: "Express.js",     level: "hands-on" },
      { name: "FastAPI",        level: "hands-on" },
      { name: ".NET 8",         level: "hands-on" },
      { name: "REST API Development", level: "hands-on" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend & Application Development",
    icon: Layout,
    description: "User interface engineering across web and mobile platforms.",
    skills: [
      { name: "React.js",                   level: "hands-on"    },
      { name: "Next.js",                    level: "hands-on"    },
      { name: "React Native",               level: "hands-on"    },
      { name: "Tailwind CSS",               level: "hands-on"    },
      { name: "HTML5",                      level: "hands-on"    },
      { name: "CSS3",                       level: "hands-on"    },
      { name: "Responsive Web Development", level: "hands-on"    },
      { name: "UI/UX Fundamentals",         level: "working"     },
    ],
  },
  {
    id: "cloud-devops",
    label: "Cloud, DevOps & Infrastructure",
    icon: Cloud,
    description: "Container orchestration, CI/CD pipelines and cloud deployment.",
    skills: [
      { name: "AWS EC2",                    level: "hands-on"    },
      { name: "Amazon EKS",                 level: "working"     },
      { name: "Docker",                     level: "hands-on"    },
      { name: "Docker Hub",                 level: "hands-on"    },
      { name: "GitHub Actions",             level: "hands-on"    },
      { name: "CI/CD Pipelines",            level: "hands-on"    },
      { name: "Linux",                      level: "fundamentals"    },
      { name: "Kubernetes Fundamentals",    level: "fundamentals"},
      { name: "Terraform Fundamentals",     level: "fundamentals"},
    ],
  },
  {
    id: "databases-tools",
    label: "Databases & Development Tools",
    icon: Database,
    description: "Data storage, querying and essential developer tooling.",
    skills: [
      { name: "MongoDB",             level: "hands-on" },
      { name: "PostgreSQL",          level: "working"  },
      { name: "SQL",                 level: "working"  },
      { name: "Git",                 level: "hands-on" },
      { name: "GitHub",              level: "hands-on" },
      { name: "Postman",             level: "hands-on" },
      { name: "Claude Code",         level: "working"  },
      { name: "Visual Studio Code",  level: "hands-on" },
    ],
  },
];

// ─── Level badge ──────────────────────────────────────────────────────────────
const LEVEL_CONFIG = {
  "hands-on":    { label: "Hands-on",    className: "bg-portfolio-accent-subtle text-portfolio-dark border-portfolio-border" },
  "working":     { label: "Working",     className: "bg-portfolio-surface      text-portfolio-muted border-portfolio-border" },
  "fundamentals":{ label: "Fundamentals",className: "bg-portfolio-surface      text-portfolio-muted border-portfolio-border opacity-80" },
};

// ─── Skill tag ────────────────────────────────────────────────────────────────
const SkillTag: React.FC<{ item: SkillItem }> = ({ item }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-portfolio-border bg-portfolio-surface text-xs font-medium text-portfolio-text shadow-subtle hover:border-portfolio-accent/60 hover:bg-portfolio-accent-subtle/50 transition-colors duration-150 cursor-default select-none">
    {item.name}
    {item.level && (
      <span className={cn(
        "px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border",
        LEVEL_CONFIG[item.level].className
      )}>
        {LEVEL_CONFIG[item.level].label}
      </span>
    )}
  </span>
);

// ─── Skill card ───────────────────────────────────────────────────────────────
interface SkillCardProps {
  category: SkillCategory;
  index: number;
  visible: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, index, visible }) => {
  const Icon = category.icon;

  return (
    <div
      className={cn(
        "flex flex-col p-5 rounded-2xl bg-portfolio-surface border shadow-card transition-all duration-500 ease-out motion-reduce:transition-none",
        "hover:shadow-elevated hover:-translate-y-0.5",
        category.primary
          ? "border-portfolio-accent/40 bg-portfolio-accent-subtle/20"
          : "border-portfolio-border",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0"
      )}
      style={{ transitionDelay: visible ? `${index * 70}ms` : "0ms" }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center border shrink-0",
          category.primary
            ? "bg-portfolio-accent text-white border-portfolio-accent/60"
            : "bg-portfolio-accent-subtle border-portfolio-border text-portfolio-dark"
        )}>
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-semibold text-sm text-portfolio-dark leading-snug">
          {category.label}
        </h3>
      </div>

      {/* Divider */}
      <div className="border-t border-portfolio-border mb-4" />

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1.5">
        {category.skills.map((skill) => (
          <SkillTag key={skill.name} item={skill} />
        ))}
      </div>
    </div>
  );
};

// ─── Skills Section ───────────────────────────────────────────────────────────
export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.06, rootMargin: "0px 0px -60px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="scroll-mt-24"
      aria-label="Technical Competencies Section"
    >
      <Container size="lg">
        {/* Section header */}
        <div
          className={cn(
            "flex flex-col mb-10 sm:mb-12 items-start text-left max-w-3xl transition-all duration-700 ease-out motion-reduce:transition-none",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0"
          )}
        >
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-portfolio-muted mb-2.5">
            Skills & Technologies
          </span>
          <Heading variant="h2" className="text-2xl sm:text-3xl lg:text-4xl">
            Technical Competencies
          </Heading>
          <p className="mt-3 text-base sm:text-lg text-portfolio-muted leading-relaxed">
            Practical expertise across AI, Machine Learning, Software Engineering, Cloud, and DevOps.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-portfolio-border w-full">
            <span className="text-xs font-semibold text-portfolio-muted uppercase tracking-wider mr-1">Proficiency:</span>
            {(["hands-on", "working", "fundamentals"] as const).map((level) => (
              <span key={level} className={cn(
                "px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide border",
                LEVEL_CONFIG[level].className
              )}>
                {LEVEL_CONFIG[level].label}
              </span>
            ))}
          </div>
        </div>

        {/* 3-column grid on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CATEGORIES.map((cat, i) => (
            <SkillCard
              key={cat.id}
              category={cat}
              index={i}
              visible={isVisible}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
