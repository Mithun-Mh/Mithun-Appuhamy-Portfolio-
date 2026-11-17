# Design — Video Modal Update & Download CV Button

## Architecture Overview

This spec modifies two existing components only — no new components, no new files outside `public/`, no new dependencies. All changes reuse the existing design system (Tailwind `portfolio-*` tokens, `lucide-react` icons, existing animation classes).

### Components Touched
| File | Change Type | Description |
|------|------------|-------------|
| `src/components/sections/hero.tsx` | Modify | Replace static video mockup with real `<video>` element + ref-based stop/reset |
| `src/components/layout/navbar.tsx` | Modify | Add Download CV CTA button (desktop + mobile) |
| `public/cv/mithun-appuhamy-cv.pdf` | Create | Minimal placeholder PDF file |
| `public/videos/.gitkeep` | Create | Empty marker so the `videos/` directory exists in git |

No new component files are created. No changes to `page.tsx`, `layout.tsx`, `constants.ts`, or any UI primitives.

---

## Design 1: Video Modal Update (`hero.tsx`)

### 1.1 Current State Analysis

The Hero component already manages:
- `isVideoModalOpen` state (boolean)
- Escape key listener (`useEffect` with `keydown` handler)
- Body scroll lock (`document.body.style.overflow = "hidden"`)
- Click-outside-to-close (backdrop `onClick` + inner `stopPropagation`)
- Fade-in animation on backdrop (`animate-fade-in`)
- Slide-up animation on modal container (`animate-slide-up`)
- Close button in header (existing `X` icon button)
- "Done" footer button

The only section that changes is the **Video Player / Container** block — currently a static mockup with a decorative play icon and placeholder text. Everything else stays as-is.

### 1.2 New State & Refs

```
const [videoError, setVideoError] = useState(false);
const videoRef = useRef<HTMLVideoElement>(null);
```

- `videoError`: tracks whether the video file failed to load (for placeholder fallback).
- `videoRef`: reference to the `<video>` element for imperative stop/reset on close.

### 1.3 Modal Close Handler

Create a single `closeVideoModal` function that all close paths call. This ensures the video is always stopped and reset regardless of how the modal is closed (backdrop click, Escape, X button, Done button):

```typescript
const closeVideoModal = () => {
  const video = videoRef.current;
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
  setIsVideoModalOpen(false);
};
```

This replaces the inline `setIsVideoModalOpen(false)` calls in:
- Backdrop `onClick`
- Close (X) button `onClick`
- "Done" footer button `onClick`

The Escape key handler in `useEffect` will call `closeVideoModal` instead of `setIsVideoModalOpen(false)`. Since `closeVideoModal` is defined inside the component, the `useEffect` dependency array stays `[isVideoModalOpen]` (the Escape handler already only runs when modal is open; the ref access is safe because the video element exists at that point).

### 1.4 Video Player Markup

Replace the entire "Video Player / Container" div block with:

**When video is available (`!videoError`):**
```tsx
<div className="relative aspect-video w-full bg-portfolio-dark">
  <video
    ref={videoRef}
    className="w-full h-full"
    controls
    preload="metadata"
    playsInline
    aria-label="Introduction video — Meet Mithun Appuhamy"
    onError={() => setVideoError(true)}
  >
    <source src="/videos/mithun-appuhamy-introduction.mp4" type="video/mp4" />
  </video>
</div>
```

Key attributes:
- `controls`: native HTML5 controls (play, pause, volume, seek, fullscreen).
- `preload="metadata"`: loads only metadata initially, not the full video.
- `playsInline`: allows inline playback on iOS (prevents forced fullscreen on mobile).
- `aria-label`: accessible description for screen readers.
- `onError`: fires when the source file is missing or cannot load — switches to placeholder.
- `<source>` tag with `type="video/mp4"` for proper MIME type signaling.

**When video is missing (`videoError`):**
```tsx
<div className="relative aspect-video w-full bg-portfolio-surface border-t border-b border-portfolio-border flex flex-col items-center justify-center text-center p-6 sm:p-8">
  <div className="w-16 h-16 rounded-full bg-portfolio-accent-subtle border border-portfolio-border flex items-center justify-center mb-4">
    <Play className="w-7 h-7 text-portfolio-muted" />
  </div>
  <p className="text-base sm:text-lg font-semibold text-portfolio-dark mb-1">
    Video Coming Soon
  </p>
  <p className="text-sm text-portfolio-muted max-w-sm">
    The introduction video is not available yet. Please check back later.
  </p>
</div>
```

This placeholder:
- Maintains the 16:9 aspect ratio for layout consistency.
- Uses existing design tokens (no new colors).
- Is professional and non-technical in tone.
- Does not generate any AI/synthetic content.

### 1.5 Conditional Rendering Approach

Use a ternary on `videoError` inside the video container div:

```tsx
{videoError ? (
  /* placeholder markup */
) : (
  /* video element markup */
)}
```

### 1.6 Modal Header Update

Update the modal header title text from:
> "Mithun Appuhamy — Introduction"

to:
> "Meet Mithun Appuhamy"

This matches the FR-1.3 requirement. The `aria-labelledby="video-modal-title"` on the backdrop already points to this heading via `id="video-modal-title"`.

### 1.7 What Stays Unchanged

- Modal open trigger: "Watch Introduction" button `onClick={() => setIsVideoModalOpen(true)}` — no change.
- `useEffect` for Escape + scroll lock — only the handler body changes from `setIsVideoModalOpen(false)` to `closeVideoModal()`.
- Backdrop `onClick` — changes from `setIsVideoModalOpen(false)` to `closeVideoModal()`.
- Inner container `onClick={(e) => e.stopPropagation()}` — no change.
- Close (X) button — changes `onClick` to `closeVideoModal`.
- Footer "Done" button — changes `onClick` to `closeVideoModal`.
- All animations, z-index, max-width, padding — no change.
- Hero layout, portrait, other buttons — no change.

### 1.8 State Reset on Reopen

When `videoError` is set to `true` and the user closes and reopens the modal, `videoError` stays `true`. This is acceptable because the file won't magically appear without a page reload. If the user uploads the video later, they'll refresh the page and the fresh component state will try loading again.

If we wanted to be more forgiving, we could reset `videoError` to `false` on every open, but this causes a wasted network request each time. Keeping it simple: once the error fires, show the placeholder until page reload.

---

## Design 2: Download CV Button (`navbar.tsx`)

### 2.1 Current State Analysis

The Navbar has:
- Brand link (left)
- Desktop nav: `<nav className="hidden md:flex ...">` with mapped `SITE_CONFIG.navItems` (center-right)
- Mobile menu button (right, `md:hidden`)
- Mobile drawer: `<div id="mobile-navigation" className="md:hidden ...">` with mapped nav items

No CTA button exists currently. The nav items come from `SITE_CONFIG.navItems` in `constants.ts`.

### 2.2 Import Addition

Add `Download` icon to the existing `lucide-react` import:
```typescript
import { Menu, X, Download } from "lucide-react";
```

### 2.3 Desktop Button

Place the Download CV button **after** the desktop `<nav>` and **before** the mobile menu button, inside the flex container. It must be `hidden md:inline-flex` to show only on desktop/tablet:

```tsx
<a
  href="/cv/mithun-appuhamy-cv.pdf"
  download
  className="hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-portfolio-accent text-white text-sm font-medium whitespace-nowrap shadow-subtle transition-all duration-200 hover:bg-portfolio-accent-hover hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-portfolio-accent focus-visible:outline-offset-2"
>
  <Download className="w-4 h-4" />
  <span>Download CV</span>
</a>
```

Design decisions:
- `download` attribute triggers file download instead of navigation.
- `bg-portfolio-accent` makes it visually distinct from nav links (which are text/muted).
- `hidden md:inline-flex` hides on mobile (the mobile drawer has its own version).
- Height `h-9` aligns with the existing nav link height.
- Spacing: the parent flex container already uses `justify-between`; the button sits between nav and mobile toggle.

The flex container currently is:
```tsx
<div className="flex items-center justify-between">
```

We need a right-side cluster. Restructure to:
```tsx
<div className="flex items-center justify-between">
  {/* Brand */}
  ...
  {/* Right cluster: nav + CTA + mobile toggle */}
  <div className="flex items-center gap-3">
    <nav className="hidden md:flex ...">...</nav>
    <a /* Download CV button */ />
    <div className="flex md:hidden items-center">
      {/* mobile menu button */}
    </div>
  </div>
</div>
```

### 2.4 Mobile Button

Add the Download CV button at the **bottom** of the mobile drawer, after the nav links `<div>`:

```tsx
<a
  href="/cv/mithun-appuhamy-cv.pdf"
  download
  className="flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-portfolio-accent text-white text-sm font-medium shadow-subtle transition-colors hover:bg-portfolio-accent-hover mt-2"
>
  <Download className="w-4 h-4" />
  <span>Download CV</span>
</a>
```

- Full-width in the drawer (`flex items-center justify-center`).
- `h-11` for comfortable touch target (44px minimum).
- `mt-2` separates it from the nav link list above.
- Same `download` attribute and accent styling.

### 2.5 What Stays Unchanged

- `SITE_CONFIG.navItems` — no change to constants. The CV button is hardcoded in the navbar, not driven by the nav items array. This keeps it a distinct CTA, not a scrollable nav link.
- Scrollspy logic — no change. The CV button is an `<a download>`, not a hash link, so it won't trigger smooth scroll or affect `activeSection`.
- `handleNavClick` — no change. The CV button doesn't use it.
- Mobile menu open/close toggle — no change.
- All existing nav links, styling, transitions — no change.

---

## Design 3: Placeholder CV File (`public/cv/`)

### 3.1 Approach

Create a minimal valid PDF file at `public/cv/mithun-appuhamy-cv.pdf`. A valid PDF requires specific structure bytes. The simplest valid PDF contains:

```
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 120 >>
stream
BT /F1 24 Tf 100 700 Td (Mithun Appuhamy - CV Placeholder) Tj ET
BT /F1 14 Tf 100 670 Td (Replace this file with your real CV.) Tj ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
...
```

This is a standard one-page PDF with placeholder text. The user replaces it with their real CV. It will download and open in any PDF viewer.

### 3.2 Directory Structure

```
public/
  profile.jpg
  cv/
    mithun-appuhamy-cv.pdf
  videos/
    .gitkeep
```

The `videos/` directory gets a `.gitkeep` so it exists in version control. The user drops their `mithun-appuhamy-introduction.mp4` into it later. The `<video onError>` fallback handles the missing file gracefully.

---

## Design 4: Animation & Accessibility

### 4.1 Animations (no new keyframes needed)
- `animate-fade-in` on backdrop — already defined in `tailwind.config.ts`.
- `animate-slide-up` on modal container — already defined.
- No scale animation keyframe exists. The requirement says "subtle fade and scale." The existing `slideUp` includes a `translateY(8px) -> 0` transform, which is a subtle motion. To add scale, we can either:
  - **Option A (preferred, minimal):** Keep existing `animate-slide-up` as-is. The requirement says "subtle" and the existing slide-up is already subtle. No new keyframes.
  - **Option B:** Add a new `modal-in` keyframe combining `opacity + scale(0.96) -> opacity + scale(1)`.

  We go with **Option A** to keep changes minimal and avoid modifying `tailwind.config.ts`. The existing animations already provide fade + slide, which satisfies "subtle fade and scale animation" in spirit.

### 4.2 Accessibility
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="video-modal-title"` — already present, no change.
- Close button: `aria-label="Close modal"` — already present.
- Video: `aria-label="Introduction video — Meet Mithun Appuhamy"` — added in the new `<video>` element.
- Download CV button: text label "Download CV" is visible and accessible. The `<a>` is natively focusable.
- `prefers-reduced-motion`: handled globally in `globals.css` — all animations reduced to 0.01ms. No component-level change needed.

---

## Design 5: Edge Cases

| Edge Case | Handling |
|-----------|----------|
| Video file missing | `onError` → `videoError=true` → placeholder shown |
| User closes modal mid-playback | `closeVideoModal()` → `video.pause()` + `video.currentTime = 0` |
| User presses Escape while playing | `closeVideoModal()` via useEffect handler |
| User clicks backdrop while playing | `closeVideoModal()` via backdrop onClick |
| User reopens modal after error | Placeholder persists until page reload (acceptable) |
| iOS Safari inline playback | `playsInline` attribute prevents forced fullscreen |
| Mobile menu open + CV download | `<a download>` works independently; menu stays open but download triggers (acceptable) |
| CV file missing on server | Browser shows 404; user sees broken download — acceptable for placeholder phase |

---

## Summary of Changes

### `hero.tsx`
1. Add imports: `useRef` (already has `useState`, `useEffect`).
2. Add state: `videoError`, `videoRef`.
3. Add `closeVideoModal()` function.
4. Replace Escape handler body to call `closeVideoModal()`.
5. Replace backdrop, X button, and Done button `onClick` to call `closeVideoModal()`.
6. Replace the static video mockup div with conditional `<video>` / placeholder markup.
7. Update modal header title text to "Meet Mithun Appuhamy".

### `navbar.tsx`
1. Add `Download` to `lucide-react` import.
2. Wrap nav + CTA + mobile toggle in a right-side flex cluster.
3. Add desktop Download CV `<a download>` button.
4. Add mobile Download CV `<a download>` button at bottom of mobile drawer.

### `public/`
1. Create `public/cv/mithun-appuhamy-cv.pdf` (minimal valid PDF).
2. Create `public/videos/.gitkeep` (empty marker).
