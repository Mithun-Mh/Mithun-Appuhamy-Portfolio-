"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position to adjust background elevation and active section
  useEffect(() => {
    const handleScroll = () => {
      // Background elevation state
      setIsScrolled(window.scrollY > 20);

      // Section scrollspy
      const sectionIds = SITE_CONFIG.navItems.map((item) =>
        item.href.replace("#", "")
      );
      const scrollPosition = window.scrollY + 100; // Offset for sticky navbar

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler with sticky header offset
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navOffset = 76;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        setActiveSection(targetId);
        setIsOpen(false);
      }
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-portfolio-bg/95 backdrop-blur-md border-b border-portfolio-border shadow-subtle py-3.5"
          : "bg-portfolio-bg/80 backdrop-blur-sm border-b border-portfolio-border/60 py-4 sm:py-5"
      )}
    >
      <Container size="lg">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="text-base sm:text-lg font-bold tracking-tight text-portfolio-dark hover:text-portfolio-muted transition-colors select-none"
          >
            {SITE_CONFIG.name}
          </a>

          {/* Right Cluster: Nav Links + Download CV CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Minimal Horizontal Navigation (Desktop & Tablet) */}
            <nav
              className="hidden md:flex items-center space-x-1 lg:space-x-1.5"
              aria-label="Main Navigation"
            >
              {SITE_CONFIG.navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 select-none",
                      isActive
                        ? "text-portfolio-dark font-semibold bg-portfolio-accent-subtle border border-portfolio-border/70"
                        : "text-portfolio-muted font-medium hover:text-portfolio-dark hover:bg-portfolio-accent-subtle/50"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Download CV CTA Button (Desktop & Tablet) */}
            <a
              href="/cv/mithun-appuhamy-cv.pdf"
              download
              className="hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-portfolio-accent text-white text-sm font-medium whitespace-nowrap shadow-subtle transition-all duration-200 hover:bg-portfolio-accent-hover hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-portfolio-accent focus-visible:outline-offset-2"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-portfolio-dark hover:bg-portfolio-accent-subtle focus-visible:outline-2 focus-visible:outline-portfolio-accent transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-portfolio-dark" />
                ) : (
                  <Menu className="w-5 h-5 text-portfolio-dark" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Smooth Transition */}
        <div
          id="mobile-navigation"
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isOpen
              ? "max-h-96 opacity-100 pt-3 pb-1"
              : "max-h-0 opacity-0 pt-0 pb-0 pointer-events-none"
          )}
        >
          <div className="p-3 bg-portfolio-surface border border-portfolio-border rounded-xl shadow-card flex flex-col space-y-1">
            {SITE_CONFIG.navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-colors",
                    isActive
                      ? "text-portfolio-dark font-semibold bg-portfolio-accent-subtle border border-portfolio-border/60"
                      : "text-portfolio-muted font-medium hover:text-portfolio-dark hover:bg-portfolio-accent-subtle/40"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-portfolio-accent" />
                  )}
                </a>
              );
            })}

            {/* Download CV CTA Button (Mobile) */}
            <a
              href="/cv/mithun-appuhamy-cv.pdf"
              download
              className="flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-portfolio-accent text-white text-sm font-medium shadow-subtle transition-colors hover:bg-portfolio-accent-hover mt-2"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
};
