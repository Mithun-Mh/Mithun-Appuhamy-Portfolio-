import React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "display" | "h1" | "h2" | "h3" | "h4" | "subheading";
}

const headingVariants = {
  display:
    "text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-portfolio-dark leading-[1.1]",
  h1: "text-3xl sm:text-4xl font-bold tracking-tight text-portfolio-dark leading-tight",
  h2: "text-2xl sm:text-3xl font-semibold tracking-tight text-portfolio-dark leading-snug",
  h3: "text-xl sm:text-2xl font-semibold text-portfolio-dark leading-snug",
  h4: "text-lg sm:text-xl font-medium text-portfolio-dark leading-normal",
  subheading: "text-sm uppercase tracking-wider font-semibold text-portfolio-muted",
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as, variant = "h2", className, children, ...props }, ref) => {
    const Tag = as || (variant === "display" ? "h1" : variant === "subheading" ? "h3" : variant);

    return (
      <Tag
        ref={ref}
        className={cn(headingVariants[variant], className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
Heading.displayName = "Heading";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  variant?: "lead" | "body" | "muted" | "small" | "caption";
}

const textVariants = {
  lead: "text-lg sm:text-xl text-portfolio-text leading-relaxed font-normal",
  body: "text-base text-portfolio-text leading-relaxed",
  muted: "text-sm text-portfolio-muted leading-normal",
  small: "text-sm text-portfolio-text leading-normal",
  caption: "text-xs text-portfolio-muted uppercase tracking-wider font-medium",
};

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ as: Component = "p", variant = "body", className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(textVariants[variant], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = "Text";

export interface CodeSnippetProps extends React.HTMLAttributes<HTMLElement> {}

export const Code = ({ className, children, ...props }: CodeSnippetProps) => {
  return (
    <code
      className={cn(
        "px-2 py-0.5 rounded text-xs sm:text-sm font-mono bg-portfolio-accent-subtle text-portfolio-dark border border-portfolio-border",
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
};
