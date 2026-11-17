import React from "react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. Hero Section */}
      <Hero />

      {/* Target anchor for 2-Minute Introduction */}
      <div id="introduction" className="scroll-mt-24" />

      {/* 2. About Section */}
      <About />

      {/* 3. Experience Section */}
      <Experience />

      {/* 4. Skills Section */}
      <Skills />

      {/* 5. Projects Section */}
      <Projects />

      {/* 6. Contact Section */}
      <Contact />
    </div>
  );
}
