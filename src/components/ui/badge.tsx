import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "status" | "secondary";
  size?: "sm" | "md";
  dot?: boolean;
}

const variantClasses = {
  default:
    "bg-portfolio-accent-subtle text-portfolio-dark border border-portfolio-border",
  accent:
    "bg-portfolio-accent text-white border border-portfolio-accent",
  outline:
    "bg-transparent text-portfolio-muted border border-portfolio-border",
  status:
    "bg-emerald-50 text-emerald-800 border border-emerald-200/80",
  secondary:
    "bg-portfolio-surface text-portfolio-text border border-portfolio-border shadow-xs",
};

const sizeClasses = {
  sm: "text-xs px-2.5 py-0.5 rounded-full font-medium gap-1.5",
  md: "text-xs sm:text-sm px-3 py-1 rounded-full font-medium gap-2",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "sm", dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-colors duration-150 select-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full shrink-0",
              variant === "status"
                ? "bg-emerald-500 animate-pulse motion-reduce:animate-none"
                : "bg-portfolio-accent"
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
