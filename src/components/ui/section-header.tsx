import React from "react";
import { cn } from "@/lib/utils";
import { Heading } from "./typography";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
  align = "left",
  className,
  ...props
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col mb-10 sm:mb-12",
        isCenter ? "items-center text-center max-w-2xl mx-auto" : "items-start text-left max-w-3xl",
        className
      )}
      {...props}
    >
      {badge && (
        <span className="inline-block text-xs uppercase tracking-widest font-semibold text-portfolio-muted mb-2.5">
          {badge}
        </span>
      )}
      <Heading variant="h2" className="text-2xl sm:text-3xl lg:text-4xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-3 text-base sm:text-lg text-portfolio-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
