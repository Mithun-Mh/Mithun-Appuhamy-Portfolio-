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
    <div className="py-12 sm:py-16 md:py-20 space-y-20 sm:space-y-28">
      {/* Hero / Overview Section */}
      <section id="overview" className="relative">
        <Container size="lg">
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="status" dot size="sm">
                Section 01 Complete
              </Badge>
              <Badge variant="outline" size="sm">
                Next.js App Router + TypeScript
              </Badge>
              <Badge variant="outline" size="sm">
                Tailwind CSS
              </Badge>
            </div>

            <Heading variant="display" as="h1">
              Engineering with clarity, speed, and modern restraint.
            </Heading>

            <Text variant="lead">
              Foundation and design system setup for{" "}
              <span className="font-semibold text-portfolio-dark">
                {SITE_CONFIG.name}
              </span>
              ’s professional portfolio. Built to international engineering
              benchmarks and tailored for global recruiters and Sri Lankan IT
              leaders.
            </Text>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                href="#design-system"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Inspect Design System
              </Button>
              <Button
                variant="outline"
                size="md"
                href="#components"
              >
                Component Library
              </Button>
            </div>

            {/* Tech Stack Indicator Pills */}
            <div className="pt-6 border-t border-portfolio-border flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-portfolio-muted">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-portfolio-accent" />
                Zero Vite / Pure Next.js
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-portfolio-accent" />
                TypeScript Strict Mode
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-portfolio-accent" />
                Reduced Motion Ready
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-portfolio-accent" />
                Lucide React Icons
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Principles */}
      <section>
        <Container size="lg">
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

      {/* Colour Palette Section */}
      <section id="palette">
        <Container size="lg">
          <SectionHeader
            badge="01 / Foundation Tokens"
            title="Calibrated Colour Palette"
            description="Seven deliberate tones engineered for calm sophistication, high readability, and subtle visual hierarchy."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paletteItems.map((color) => (
              <div
                key={color.name}
                className="bg-portfolio-surface border border-portfolio-border rounded-xl p-4 shadow-subtle hover:shadow-card transition-shadow flex flex-col justify-between space-y-4"
              >
                <div
                  className={`w-full h-20 rounded-lg ${color.bgClass} border ${color.borderClass} flex items-center justify-center shadow-inner`}
                >
                  <span
                    className={`font-mono text-xs font-semibold px-2 py-1 rounded bg-black/10 backdrop-blur-xs ${color.textColor}`}
                  >
                    {color.hex}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-portfolio-dark text-sm">
                      {color.name}
                    </span>
                    <Code>{color.hex}</Code>
                  </div>
                  <p className="text-xs text-portfolio-muted leading-relaxed">
                    {color.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Typography Section */}
      <section id="typography">
        <Container size="lg">
          <SectionHeader
            badge="02 / Typography Hierarchy"
            title="Clean, Professional Type Scale"
            description="Powered by Plus Jakarta Sans for crisp editorial authority across headline and micro-copy scales."
          />

          <Card className="divide-y divide-portfolio-border overflow-hidden">
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-portfolio-muted sm:w-48 shrink-0">
                Display (H1)
              </span>
              <div className="flex-1">
                <Heading variant="display" className="text-3xl sm:text-4xl">
                  Building Scalable Modern Web Systems
                </Heading>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-portfolio-muted sm:w-48 shrink-0">
                Section Heading (H2)
              </span>
              <div className="flex-1">
                <Heading variant="h2">Architecture & Full-Stack Solutions</Heading>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-portfolio-muted sm:w-48 shrink-0">
                Card Title (H3)
              </span>
              <div className="flex-1">
                <Heading variant="h3">Microservices & Distributed Backends</Heading>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-portfolio-muted sm:w-48 shrink-0">
                Lead Text
              </span>
              <div className="flex-1">
                <Text variant="lead">
                  Designed to highlight engineering craft without visual clutter or
                  unnecessary distractions.
                </Text>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-portfolio-muted sm:w-48 shrink-0">
                Body & Code
              </span>
              <div className="flex-1 space-y-2">
                <Text variant="body">
                  Standard body paragraph rendered in <Code>#252525</Code> for
                  optimal contrast ratio exceeding WCAG AA requirements on{" "}
                  <Code>#F8F7F4</Code> background.
                </Text>
                <Text variant="muted">
                  Muted copy in <Code>#77736E</Code> for secondary metadata, timestamps,
                  and technical specifications.
                </Text>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Component Library Section */}
      <section id="components">
        <Container size="lg">
          <SectionHeader
            badge="03 / Component Primitives"
            title="Reusable UI Building Blocks"
            description="Extensible components created for future portfolio sections: buttons, badges, responsive containers, and cards."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Buttons Showcase */}
            <Card className="p-6 space-y-6">
              <div className="space-y-1">
                <CardTitle>Button System</CardTitle>
                <CardDescription>
                  Supports primary, secondary, outline, ghost, loading state, and
                  subtle click feedback.
                </CardDescription>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="md">
                    Primary Button
                  </Button>
                  <Button variant="secondary" size="md">
                    Secondary Accent
                  </Button>
                  <Button variant="outline" size="md">
                    Outline Button
                  </Button>
                  <Button variant="ghost" size="md">
                    Ghost
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Small with icon
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    leftIcon={<Sparkles className="w-4 h-4 text-portfolio-accent" />}
                  >
                    Icon Left
                  </Button>
                  <Button variant="primary" size="md" isLoading>
                    Processing
                  </Button>
                </div>
              </div>
            </Card>

            {/* Badges & Status Indicators */}
            <Card className="p-6 space-y-6">
              <div className="space-y-1">
                <CardTitle>Badges & Status Tags</CardTitle>
                <CardDescription>
                  For technology tags, project status, roles, and availability
                  indicators.
                </CardDescription>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="status" dot size="md">
                    Available for hire
                  </Badge>
                  <Badge variant="default" size="md">
                    Next.js 14
                  </Badge>
                  <Badge variant="accent" size="md">
                    TypeScript
                  </Badge>
                  <Badge variant="outline" size="md">
                    Tailwind CSS
                  </Badge>
                  <Badge variant="secondary" size="md">
                    Full-Stack
                  </Badge>
                </div>

                <div className="p-4 rounded-lg bg-portfolio-accent-subtle/50 border border-portfolio-border text-xs text-portfolio-text space-y-1.5">
                  <span className="font-semibold text-portfolio-dark block">
                    Design System Rule:
                  </span>
                  Badges maintain consistent padding, subtle rounded radius, and
                  semantic contrast matching our palette specifications.
                </div>
              </div>
            </Card>

            {/* Card Layout & Responsive Containers */}
            <Card className="p-6 space-y-4 lg:col-span-2">
              <div className="space-y-1">
                <CardTitle>Responsive Card Container</CardTitle>
                <CardDescription>
                  Surfaces use crisp 1px borders (#E7E3DC) and soft shadows to
                  elevate content cleanly without visual heaviness.
                </CardDescription>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-portfolio-bg border border-portfolio-border space-y-2">
                  <span className="flex items-center gap-2 text-xs font-semibold text-portfolio-dark">
                    <Smartphone className="w-4 h-4 text-portfolio-accent" />
                    Mobile Optimized
                  </span>
                  <p className="text-xs text-portfolio-muted leading-relaxed">
                    Fluid layouts, touch-friendly touch targets (&gt;44px), and
                    collapsible mobile navigation.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-portfolio-bg border border-portfolio-border space-y-2">
                  <span className="flex items-center gap-2 text-xs font-semibold text-portfolio-dark">
                    <Tablet className="w-4 h-4 text-portfolio-accent" />
                    Tablet Adaptive
                  </span>
                  <p className="text-xs text-portfolio-muted leading-relaxed">
                    Balanced column breakpoints ensuring clean grid reflow between
                    640px and 1024px.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-portfolio-bg border border-portfolio-border space-y-2">
                  <span className="flex items-center gap-2 text-xs font-semibold text-portfolio-dark">
                    <Monitor className="w-4 h-4 text-portfolio-accent" />
                    Desktop Refinement
                  </span>
                  <p className="text-xs text-portfolio-muted leading-relaxed">
                    Constrained maximum container width (1152px) preventing
                    stretched line lengths on ultra-wide screens.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Motion & Accessibility Verification */}
      <section id="design-system">
        <Container size="lg">
          <Card className="p-8 sm:p-10 border-portfolio-border bg-portfolio-surface">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-portfolio-muted">
                    Accessibility & Standards
                  </span>
                </div>
                <Heading variant="h3">
                  Motion-Safe Transitions & Semantic HTML
                </Heading>
                <Text variant="muted">
                  Animations gracefully collapse when user preferences request reduced
                  motion (<Code>prefers-reduced-motion: reduce</Code>). All interactive
                  elements include explicit focus rings for keyboard navigation.
                </Text>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                <Button
                  variant="outline"
                  size="md"
                  href="https://github.com"
                  external
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                >
                  GitHub Repository
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  href="#overview"
                >
                  Ready for Section 02
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
}
