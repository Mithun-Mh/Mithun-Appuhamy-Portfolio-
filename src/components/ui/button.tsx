import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
  external?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const variantClasses = {
  primary:
    "bg-portfolio-dark text-white hover:bg-portfolio-text active:scale-[0.98] shadow-sm",
  secondary:
    "bg-portfolio-accent text-white hover:bg-portfolio-accent-hover active:scale-[0.98] shadow-sm",
  outline:
    "bg-portfolio-surface text-portfolio-dark border border-portfolio-border hover:bg-portfolio-accent-subtle/50 hover:border-portfolio-accent/50 active:scale-[0.98]",
  ghost:
    "text-portfolio-dark hover:bg-portfolio-accent-subtle text-portfolio-text hover:text-portfolio-dark",
  link: "text-portfolio-dark hover:text-portfolio-accent underline-offset-4 hover:underline p-0 h-auto font-medium",
};

const sizeClasses = {
  sm: "text-xs px-3 py-1.5 rounded-md gap-1.5 h-8",
  md: "text-sm px-4 py-2 rounded-lg gap-2 h-10",
  lg: "text-base px-6 py-3 rounded-lg gap-2.5 h-12",
  icon: "h-9 w-9 p-0 rounded-lg justify-center",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      leftIcon,
      rightIcon,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none",
      "focus-visible:outline-2 focus-visible:outline-portfolio-accent focus-visible:outline-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
      variantClasses[variant],
      variant !== "link" && sizeClasses[size],
      className
    );

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin motion-reduce:animate-none" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
          >
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
