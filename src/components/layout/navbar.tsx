"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-portfolio-bg/85 backdrop-blur-md border-b border-portfolio-border transition-colors duration-200">
      <Container size="lg">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-semibold text-portfolio-dark text-lg sm:text-xl tracking-tight transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-portfolio-dark text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-portfolio-accent transition-colors">
              MA
            </span>
            <span className="flex flex-col">
              <span className="leading-tight">{SITE_CONFIG.name}</span>
              <span className="text-[10px] text-portfolio-muted font-normal uppercase tracking-wider hidden sm:block">
                Software Engineer
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {SITE_CONFIG.navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 rounded-md text-sm font-medium text-portfolio-text hover:text-portfolio-dark hover:bg-portfolio-accent-subtle/70 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action / Status */}
          <div className="hidden sm:flex items-center gap-3">
            <Badge variant="status" dot size="sm" className="hidden lg:inline-flex">
              {SITE_CONFIG.status}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              href="#contact"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Get in touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-portfolio-dark hover:bg-portfolio-accent-subtle focus-visible:outline-2 focus-visible:outline-portfolio-accent transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-portfolio-border bg-portfolio-surface/95 rounded-b-xl shadow-card px-4 mt-1 mb-3 space-y-3 animate-slide-up">
            <div className="flex items-center justify-between pb-2 border-b border-portfolio-border">
              <span className="text-xs font-semibold text-portfolio-muted uppercase tracking-wider">
                Navigation
              </span>
              <Badge variant="status" dot size="sm">
                Available
              </Badge>
            </div>
            <nav className="flex flex-col space-y-1">
              {SITE_CONFIG.navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-portfolio-text hover:text-portfolio-dark hover:bg-portfolio-accent-subtle transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                href="#contact"
                className="w-full justify-center"
                onClick={() => setIsOpen(false)}
                rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                Get in touch
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};
