# Implementation Plan

## Overview

This plan implements two changes to the existing portfolio: (1) upgrading the Hero video modal to play a real introduction video with native controls and a missing-file placeholder, and (2) adding a "Download CV" CTA button to the navbar. All changes reuse existing components, styling, and design tokens. No new dependencies are introduced.

## Tasks

- [ ] 1. Create placeholder files in public directory
  - Create `public/videos/.gitkeep` (empty file) so the videos directory exists in version control.
  - Create `public/cv/mithun-appuhamy-cv.pdf` — a minimal valid PDF file with placeholder text: "Mithun Appuhamy - CV Placeholder" and "Replace this file with your real CV." This must be a valid PDF that opens in any PDF viewer.
  - Do NOT create or generate a real video file.
  - Do NOT create an AI avatar or synthetic video.

- [ ] 2. Update video modal in hero.tsx with real video player
  - Add `useRef` to the React imports (already has `useState`, `useEffect`).
  - Add state: `const [videoError, setVideoError] = useState(false);`
  - Add ref: `const videoRef = useRef<HTMLVideoElement>(null);`
  - Create a `closeVideoModal` function that pauses the video via `videoRef.current?.pause()`, resets video to beginning (`videoRef.current.currentTime = 0`), and sets `setIsVideoModalOpen(false)`.
  - Replace the Escape key handler body in the `useEffect` to call `closeVideoModal()` instead of `setIsVideoModalOpen(false)`. Keep the useEffect dependency array as `[isVideoModalOpen]`. Inline the pause+reset+close logic in the keydown handler if needed to avoid stale closure issues.
  - Replace the backdrop `onClick` to call `closeVideoModal()`.
  - Replace the close (X) button `onClick` to call `closeVideoModal()`.
  - Replace the "Done" footer button `onClick` to call `closeVideoModal()`.
  - Replace the entire "Video Player / Container" div (the block with the decorative play icon and placeholder text) with a conditional render:
    - If `videoError` is false: a `<div className="relative aspect-video w-full bg-portfolio-dark">` wrapping a `<video ref={videoRef} className="w-full h-full" controls preload="metadata" playsInline aria-label="Introduction video — Meet Mithun Appuhamy" onError={() => setVideoError(true)}>` with a `<source src="/videos/mithun-appuhamy-introduction.mp4" type="video/mp4" />` child.
    - If `videoError` is true: a `<div className="relative aspect-video w-full bg-portfolio-surface border-t border-b border-portfolio-border flex flex-col items-center justify-center text-center p-6 sm:p-8">` containing a decorative play icon circle, "Video Coming Soon" heading, and "The introduction video is not available yet. Please check back later." subtext, all using existing portfolio color tokens.
  - Update the modal header title from "Mithun Appuhamy — Introduction" to "Meet Mithun Appuhamy".
  - Do NOT create a new modal component. Reuse the existing modal markup and state.
  - Do NOT change the Hero layout, portrait section, or other buttons.
  - Do NOT add new dependencies.
  - Maintain `role="dialog"`, `aria-modal="true"`, `aria-labelledby="video-modal-title"`.
  - Maintain existing `animate-fade-in` and `animate-slide-up` classes.

- [ ] 3. Add Download CV button to navbar.tsx
  - Add `Download` to the existing `lucide-react` import: `import { Menu, X, Download } from "lucide-react";`
  - Restructure the top flex container to create a right-side cluster wrapping nav + CTA + mobile toggle in a `<div className="flex items-center gap-3">`.
  - Add a desktop Download CV button (between the nav and mobile toggle) using: `<a href="/cv/mithun-appuhamy-cv.pdf" download className="hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-portfolio-accent text-white text-sm font-medium whitespace-nowrap shadow-subtle transition-all duration-200 hover:bg-portfolio-accent-hover hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-portfolio-accent focus-visible:outline-offset-2"><Download className="w-4 h-4" /><span>Download CV</span></a>`
  - Add a mobile Download CV button at the bottom of the mobile navigation drawer (after the nav links map, inside the drawer's inner div) using: `<a href="/cv/mithun-appuhamy-cv.pdf" download className="flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-portfolio-accent text-white text-sm font-medium shadow-subtle transition-colors hover:bg-portfolio-accent-hover mt-2"><Download className="w-4 h-4" /><span>Download CV</span></a>`
  - Do NOT change `SITE_CONFIG.navItems` in constants.ts. The CV button is a hardcoded CTA, not a nav link.
  - Do NOT modify the scrollspy logic, `handleNavClick`, or smooth scroll behavior.
  - Do NOT add new dependencies.
  - Use existing `portfolio-accent` / `portfolio-accent-hover` color tokens.

- [ ] 4. Verify build and test open/close behavior
  - Run `npm run build` to verify there are no TypeScript or compilation errors.
  - Verify the "Watch Introduction" button opens the existing modal.
  - Verify the modal shows the video placeholder (since no real video file exists) OR the video player if a file is added.
  - Verify clicking the backdrop closes the modal and stops/resets the video.
  - Verify clicking the X button closes the modal and stops/resets the video.
  - Verify clicking the "Done" button closes the modal and stops/resets the video.
  - Verify pressing Escape closes the modal and stops/resets the video.
  - Verify background scrolling is prevented while the modal is open and restored when closed.
  - Verify the "Download CV" button appears in the navbar on desktop and mobile.
  - Verify clicking "Download CV" triggers a file download of the placeholder PDF.
  - Verify the navbar layout is not broken — brand, nav links, and CTA button are properly aligned.
  - Report any errors found. Do NOT make code fixes in this task — report issues only.

## Notes

- The existing modal in `hero.tsx` already handles Escape key, click-outside, scroll lock, and animations. Only the video player area and close handlers are being modified.
- The placeholder CV PDF is a minimal valid PDF with placeholder text. The user will replace it with their real CV later.
- The `public/videos/` directory will be empty (just `.gitkeep`) — the user drops their `mithun-appuhamy-introduction.mp4` into it. The `<video onError>` fallback handles the missing file gracefully.
- No new dependencies are added. Only `lucide-react` (already installed) is used for the Download icon.

## Task Dependency Graph

```
task-1 (placeholder files) ──┬──> task-2 (video modal update)
                             └──> task-3 (navbar CV button)
                                      │
task-2 ────────────────────────────────┤
                                      └──> task-4 (build & verify)
task-3 ────────────────────────────────┘
```
