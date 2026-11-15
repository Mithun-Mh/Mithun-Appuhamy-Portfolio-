import React from "react";
import { Container } from "@/components/ui/container";
import { SITE_CONFIG } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-portfolio-border bg-portfolio-surface/60 py-10 mt-20 transition-colors">
      <Container size="lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-portfolio-muted">
          <div className="flex items-center gap-2">
            <span className="font-medium text-portfolio-dark">{SITE_CONFIG.name}</span>
            <span>•</span>
            <span>Designed for Global & Sri Lankan Tech Standards</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#home"
              className="hover:text-portfolio-dark transition-colors"
            >
              Back to top ↑
            </a>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
