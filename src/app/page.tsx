import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Compass,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Monitor,
  Tablet,
  Check,
  Mail,
  Briefcase,
  FolderGit2,
  User,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading, Text, Code } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { SITE_CONFIG } from "@/lib/constants";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  const paletteItems = [
    {
      name: "Background",
      hex: "#F8F7F4",
      role: "Base canvas & warm off-white canvas",
      bgClass: "bg-[#F8F7F4]",
      borderClass: "border-[#E7E3DC]",
      textColor: "text-[#252525]",
    },
    {
      name: "Surface",
      hex: "#FFFFFF",
      role: "Cards, modals & elevated elements",
      bgClass: "bg-[#FFFFFF]",
      borderClass: "border-[#E7E3DC]",
      textColor: "text-[#252525]",
    },
    {
      name: "Primary Text",
      hex: "#252525",
      role: "Standard reading body & copy",
      bgClass: "bg-[#252525]",
      borderClass: "border-transparent",
      textColor: "text-[#FFFFFF]",
    },
    {
      name: "Dark Text",
      hex: "#171717",
      role: "Headings, titles & primary buttons",
      bgClass: "bg-[#171717]",
      borderClass: "border-transparent",
      textColor: "text-[#FFFFFF]",
    },
    {
      name: "Secondary Accent",
      hex: "#A69B8C",
      role: "Refined highlights, focus states & badges",
      bgClass: "bg-[#A69B8C]",
      borderClass: "border-transparent",
      textColor: "text-[#FFFFFF]",
    },
    {
      name: "Borders",
      hex: "#E7E3DC",
      role: "Dividers, boundaries & card borders",
      bgClass: "bg-[#E7E3DC]",
      borderClass: "border-[#D1CABE]",
      textColor: "text-[#171717]",
    },
    {
      name: "Muted Text",
      hex: "#77736E",
      role: "Subtitles, metadata & captions",
      bgClass: "bg-[#77736E]",
      borderClass: "border-transparent",
      textColor: "text-[#FFFFFF]",
    },
  ];

  const foundationPrinciples = [
    {
      title: "Clean Architectural Rigor",
      description:
        "Built strictly with Next.js App Router, TypeScript, and Tailwind CSS. Modularity and component reusability prioritized over one-off styles.",
      icon: <Layers className="w-5 h-5 text-portfolio-dark" />,
    },
    {
      title: "Recruiter-First Readability",
      description:
        "Engineered for high readability, subtle contrast, and calm editorial aesthetics tailored for international recruiters and Sri Lankan IT enterprises.",
      icon: <ShieldCheck className="w-5 h-5 text-portfolio-dark" />,
    },
    {
      title: "Adaptive & Accessible",
      description:
        "Tested across mobile, tablet, and desktop viewports. Strict adherence to prefers-reduced-motion accessibility standards.",
      icon: <Compass className="w-5 h-5 text-portfolio-dark" />,
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. Hero Section */}
      <Hero />

      {/* Target anchor for 2-Minute Introduction */}
      <div id="introduction" className="scroll-mt-24" />

      {/* 2. About Section */}
      <section id="about" className="scroll-mt-24">
        <Container size="lg">
          <SectionHeader
            badge="About"
            title="Professional Background & Philosophy"
            description="Dedicated to building scalable web applications, robust backends, and elegant user interfaces."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foundationPrinciples.map((item, index) => (
              <Card key={index} hoverable className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-portfolio-accent-subtle flex items-center justify-center border border-portfolio-border">
                  {item.icon}
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription className="text-sm">
                  {item.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Experience Section */}
      <section id="experience" className="scroll-mt-24">
        <Container size="lg">
          <SectionHeader
            badge="Experience"
            title="Career & Work History"
            description="Proven track record collaborating with software teams, delivering business-critical features, and maintaining system reliability."
          />

          <Card className="p-8 sm:p-10 border-portfolio-border bg-portfolio-surface space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-portfolio-accent-subtle flex items-center justify-center border border-portfolio-border">
                <Briefcase className="w-5 h-5 text-portfolio-dark" />
              </div>
              <div>
                <CardTitle className="text-xl">Experience Section Ready</CardTitle>
                <CardDescription>
                  Prepared for Section 03/04 integration. Structured timeline and
                  company achievements will be placed here.
                </CardDescription>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* 4. Skills Section */}
      <section id="skills" className="scroll-mt-24">
        <Container size="lg">
          <SectionHeader
            badge="Skills & Technologies"
            title="Technical Competencies"
            description="Full-stack engineering capabilities across modern frontend frameworks, cloud platforms, and backend architectures."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Design Tokens & Palette */}
            <Card className="p-6 space-y-4">
              <CardTitle className="text-base sm:text-lg">Design System Palette</CardTitle>
              <CardDescription>
                Seven tones engineered for calm sophistication and high WCAG contrast.
              </CardDescription>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {paletteItems.slice(0, 4).map((color) => (
                  <div
                    key={color.name}
                    className="p-2.5 rounded-lg border border-portfolio-border bg-portfolio-surface text-center space-y-1"
                  >
                    <div
                      className={`w-full h-8 rounded ${color.bgClass} border ${color.borderClass} mx-auto`}
                    />
                    <span className="text-[11px] font-medium text-portfolio-dark block truncate">
                      {color.name}
                    </span>
                    <span className="text-[10px] text-portfolio-muted font-mono block">
                      {color.hex}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Badges & Tech Tags */}
            <Card className="p-6 space-y-4">
              <CardTitle className="text-base sm:text-lg">Technical Stack Tags</CardTitle>
              <CardDescription>
                Standardized tags and status indicators for technical competencies.
              </CardDescription>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Badge variant="accent" size="md">Next.js App Router</Badge>
                <Badge variant="default" size="md">TypeScript</Badge>
                <Badge variant="outline" size="md">Tailwind CSS</Badge>
                <Badge variant="secondary" size="md">React 18</Badge>
                <Badge variant="outline" size="md">REST & GraphQL</Badge>
                <Badge variant="status" dot size="md">Available</Badge>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* 5. Projects Section */}
      <section id="projects" className="scroll-mt-24">
        <Container size="lg">
          <SectionHeader
            badge="Projects"
            title="Featured Engineering Work"
            description="Selected enterprise and web applications demonstrating system architecture, performance, and clean code."
          />

          <Card className="p-8 sm:p-10 border-portfolio-border bg-portfolio-surface space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-portfolio-accent-subtle flex items-center justify-center border border-portfolio-border">
                <FolderGit2 className="w-5 h-5 text-portfolio-dark" />
              </div>
              <div>
                <CardTitle className="text-xl">Projects Portfolio Ready</CardTitle>
                <CardDescription>
                  Project cards, case studies, live links, and GitHub repository
                  links will be showcased in this section.
                </CardDescription>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="scroll-mt-24">
        <Container size="lg">
          <Card className="p-8 sm:p-12 border-portfolio-border bg-portfolio-surface">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-portfolio-muted">
                    Get In Touch
                  </span>
                </div>
                <Heading variant="h2">
                  Let’s build something exceptional together.
                </Heading>
                <Text variant="muted">
                  Open for opportunities with international engineering teams and Sri
                  Lankan IT enterprises. Feel free to connect for discussions or
                  inquiries.
                </Text>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                <Button
                  variant="primary"
                  size="md"
                  href="mailto:contact@mithun.dev"
                  rightIcon={<Mail className="w-4 h-4" />}
                >
                  Send an Email
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href="#home"
                >
                  Back to Top
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
}
