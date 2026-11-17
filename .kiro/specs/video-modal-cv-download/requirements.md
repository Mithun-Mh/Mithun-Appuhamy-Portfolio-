# Requirements — Video Modal Update & Download CV Button

## Overview
Update the existing Hero video modal (created in Section 03) to play a real personal introduction video with native controls, and add a "Download CV" call-to-action button to the navbar that downloads a placeholder CV file.

## Stakeholder
Mithun Appuhamy — portfolio owner.

## User Stories

### US-1: Watch Real Introduction Video
**As a** site visitor (recruiter or potential client),
**I want** to click "Watch Introduction" in the Hero and see Mithun's real personal introduction video play in the existing modal,
**So that** I can quickly understand his background, skills, and personality.

### US-2: Professional Placeholder When Video Unavailable
**As a** site visitor,
**I want** to see a professional message if the video file is not yet uploaded,
**So that** the experience is not broken and I understand the content is coming soon.

### US-3: Download CV From Navbar
**As a** site visitor (recruiter),
**I want** a "Download CV" button in the navigation bar,
**So that** I can quickly download Mithun's resume/CV for offline review.

## Functional Requirements

### FR-1: Video Player (upgrades existing modal in `hero.tsx`)
- **FR-1.1**: Replace the current static mockup inside the existing modal with a real `<video>` element.
- **FR-1.2**: Video source path: `/videos/mithun-appuhamy-introduction.mp4` (read from the `public` folder).
- **FR-1.3**: Video title displayed in modal header: "Meet Mithun Appuhamy".
- **FR-1.4**: Use a responsive 16:9 aspect ratio video player (`aspect-video`).
- **FR-1.5**: Include native HTML5 video controls: play, pause, volume, and fullscreen.
- **FR-1.6**: Add a close button in the top-right corner of the modal.
- **FR-1.7**: Close the modal when clicking the backdrop (outside the video container).
- **FR-1.8**: Close the modal when pressing the Escape key.
- **FR-1.9**: Stop video playback and reset to beginning (currentTime = 0, pause) when the modal closes.
- **FR-1.10**: Prevent background page scrolling while the modal is open (body overflow hidden).
- **FR-1.11**: Apply a subtle fade and scale animation on modal open (reuse existing `animate-fade-in` and `animate-slide-up` classes).

### FR-2: Video File Missing — Placeholder Fallback
- **FR-2.1**: Detect if the video file is unavailable (onError handler on the `<video>` element).
- **FR-2.2**: When missing, display a professional placeholder inside the 16:9 area with a message: "The introduction video is not available yet."
- **FR-2.3**: Do NOT generate an AI avatar, synthetic introduction, or placeholder video.
- **FR-2.4**: Do NOT implement video uploads, cloud storage, or backend functionality.

### FR-3: Modal Reuse Constraints
- **FR-3.1**: Do NOT create a second video modal component.
- **FR-3.2**: Do NOT create a separate video section.
- **FR-3.3**: Do NOT change the Hero layout, other buttons, or portrait section.
- **FR-3.4**: Reuse the existing modal markup, styling, state (`isVideoModalOpen`), and event handlers in `hero.tsx`.
- **FR-3.5**: Keep code changes minimal — only swap the static mockup area for a real video player.

### FR-4: Download CV Button (in `navbar.tsx`)
- **FR-4.1**: Add a "Download CV" call-to-action button to the navbar.
- **FR-4.2**: The button must appear in both desktop navigation and the mobile menu.
- **FR-4.3**: The button links to a downloadable CV file at `/cv/mithun-appuhamy-cv.pdf` (placeholder file placed in `public/cv/`).
- **FR-4.4**: The download should trigger a file download (use `download` attribute on an `<a>` tag).
- **FR-4.5**: Style the button as a distinct CTA — visually prominent (accent or dark background), matching the existing design system.
- **FR-4.6**: Include a download icon (e.g., `Download` from `lucide-react`).
- **FR-4.7**: On desktop, place the button to the right of the nav links, separated with appropriate spacing.
- **FR-4.8**: On mobile, place the button at the bottom of the mobile menu drawer.
- **FR-4.9**: The button must not interfere with the existing scrollspy or smooth-scroll behavior.

### FR-5: Placeholder CV File
- **FR-5.1**: Create a placeholder CV file at `public/cv/mithun-appuhamy-cv.pdf`.
- **FR-5.2**: Since a real PDF cannot be generated in this task, create a minimal valid PDF placeholder or a text file named `.pdf` that the user will replace with their real CV later.

## Non-Functional Requirements

### NFR-1: Accessibility
- **NFR-1.1**: Modal must use `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the video title.
- **NFR-1.2**: Close button must have `aria-label="Close modal"`.
- **NFR-1.3**: Video element must have a descriptive `aria-label` or `<title>` track.
- **NFR-1.4**: Download CV button must be keyboard-focusable and have an accessible label.
- **NFR-1.5**: Respect `prefers-reduced-motion` (already handled globally in CSS).

### NFR-2: Responsiveness
- **NFR-2.1**: Modal and video player must work on mobile, tablet, and desktop.
- **NFR-2.2**: Modal max-width `max-w-3xl`, centered with padding on all viewports.
- **NFR-2.3**: Download CV button must be visible and tappable on all viewport sizes.

### NFR-3: Performance
- **NFR-3.1**: Video must use `preload="metadata"` to avoid loading the full video until the user presses play.
- **NFR-3.2**: No additional dependencies — use native `<video>` element and existing libraries only.

## Out of Scope
- Generating or creating an actual video file.
- Generating or creating an actual PDF CV.
- AI avatar or synthetic video generation.
- Video upload, cloud storage, or streaming backend.
- Changes to Hero layout, portrait, or other Hero buttons.
- Changes to other page sections (About, Experience, Skills, Projects, Contact).
- New dependencies or packages.

## Constraints
- Next.js 14 App Router with TypeScript.
- Tailwind CSS with existing design tokens (`portfolio-*` color classes).
- `lucide-react` for icons.
- Existing component structure: `hero.tsx` (sections), `navbar.tsx` (layout).
- No new packages may be added.
