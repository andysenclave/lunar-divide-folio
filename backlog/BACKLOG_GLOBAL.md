# Global / Cross-Section Backlog

> Last Updated: 2025-01-26

## Legend

| Status | Description |
|--------|-------------|
| ✅ Refined | Ready for development |
| 🔄 Pending | Needs refinement |
| 🚧 In Progress | Currently being worked on |

---

## P1 - HIGH PRIORITY

### ✅ G-001 | Story | Light mode support

**Priority:** P1  
**Status:** ✅ REFINED (Merge with H-002)  
**Estimate:** L

**Description:**  
Ensure all sections render correctly in light mode. Hero section already has theme toggle — need to propagate to all sections.

**Acceptance Criteria:**

- [ ] Merge into H-002 implementation scope
- [ ] Test Journey globe in light mode (land/ocean colors)
- [ ] Test Experience cards in light mode
- [ ] Test Contact aurora in light mode (may need different effect)
- [ ] Verify all text remains readable in both modes

**Sections to Test:**
| Section | Light Mode Status |
|---------|-------------------|
| Hero | ✅ Has theme toggle |
| Journey | 🔄 Needs dark-only globe colors updated |
| Experience | 🔄 Cards use dark colors |
| Projects | 🔄 Cards use dark colors |
| Contact | 🔄 Aurora may look off in light mode |

---

### ✅ G-007 | Story | Final copy review

**Priority:** P1  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
Review all text content for accuracy, tone, and consistency before launch.

**Acceptance Criteria:**

- [ ] Hero taglines: "Engineering systems. Exploring worlds." — ✓ keep
- [ ] Journey era names match actual timeline periods
- [ ] Experience highlights are accurate per E-001 fixes
- [ ] Contact CTA copy is professional but warm
- [ ] Footer copyright year is dynamic (uses `new Date().getFullYear()`) — ✓ correct
- [ ] No placeholder text like "Lorem ipsum" anywhere
- [ ] Consistent capitalization (Title Case for headers, sentence case for body)

**Copy to Verify:**

| Location | Current Copy | Status |
|----------|--------------|--------|
| Hero tagline | "Engineering systems. Exploring worlds." | ✓ |
| Scroll indicator | "Scroll to explore" | ✓ |
| Contact headline | "Ready to build something extraordinary together?" | ✓ |
| Footer tagline | "Two sides of the moon. One journey." | ✓ |

---

## P2 - MEDIUM PRIORITY

### ✅ G-002 | Task | Theme transition polish

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** S

**Description:**  
Smooth transitions when toggling dark/light mode. Currently uses `transition: 0.4s` on body background.

**Acceptance Criteria:**

- [ ] All color changes animate smoothly (no flicker)
- [ ] Globe doesn't flash/reload on theme change
- [ ] Stars fade out gracefully in light mode
- [ ] Test transition doesn't cause layout shift
- [ ] Consider adding subtle "whoosh" or pulse on toggle click

---

### ✅ G-003 | Task | Keyboard navigation audit

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
Verify all interactive elements are keyboard accessible (Tab, Enter, Escape).

**Acceptance Criteria:**

- [ ] All links and buttons focusable with Tab
- [ ] Focus states visible (outline or glow)
- [ ] Modal closes with Escape key
- [ ] Skip-to-content link for screen readers
- [ ] Theme toggle keyboard accessible
- [ ] Journey cards can be activated with Enter
- [ ] Tab order follows visual flow

---

### ✅ G-004 | Task | Screen reader testing

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
Test with VoiceOver (Mac) or NVDA (Windows) for accessibility.

**Acceptance Criteria:**

- [ ] All images have alt text or aria-hidden if decorative
- [ ] Buttons have descriptive labels (not just icons)
- [ ] Section headings use proper h1-h6 hierarchy
- [ ] Dynamic content updates announced (aria-live)
- [ ] Globe visualization has text alternative
- [ ] Modal has proper aria-modal and focus trap

---

### ✅ G-005 | Task | Mobile performance audit

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** L

**Description:**  
Test animations on mid-range mobile devices. Target: 30+ fps during scroll.

**Acceptance Criteria:**

- [ ] Test on real device (not just emulator)
- [ ] Measure FPS with Chrome DevTools Performance tab
- [ ] Journey globe scroll should be smooth
- [ ] Reduce star count if needed (80 → 40)
- [ ] Lazy load Journey section until near viewport
- [ ] Consider `will-change` hints on animated elements
- [ ] Test on: iPhone SE, Pixel 4a, or similar mid-range

**Performance Budget:**

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Scroll FPS | > 30fps |
| Total bundle size | < 500KB gzipped |

---

### ✅ G-008 | Task | Replace placeholder images

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
Replace emoji placeholders in Project cards and Experience modals with real visuals.

**Current Placeholders:**

| Location | Current | Replace With |
|----------|---------|--------------|
| Project cards | Emoji + "Preview" text | Screenshot or mockup |
| Experience modal hero | Emoji icon | Abstract pattern or photo |
| Design snaps | "🎨" placeholder | Actual screenshots |

**Acceptance Criteria:**

- [ ] Use actual screenshots from `/mnt/project/Screenshot_*.png`
- [ ] Create abstract pattern fallbacks for missing images
- [ ] Optimize images: WebP format, max 200KB each
- [ ] Add loading="lazy" to images below fold
- [ ] Provide 2x resolution for retina displays

---

## P3 - LOW PRIORITY

### ✅ G-006 | Task | Lazy load off-screen sections

**Priority:** P3  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
Defer heavy components until they enter viewport for faster initial load.

**Acceptance Criteria:**

- [ ] Use `React.lazy()` + `Suspense` for section components
- [ ] Journey globe should lazy load (heaviest component)
- [ ] Show skeleton loader while section loads
- [ ] Intersection Observer to trigger load ~200px before visible
- [ ] Hero section loads immediately (above fold)

**Load Order:**
1. Hero (immediate)
2. Journey (lazy, on scroll)
3. Experience (lazy)
4. Projects (lazy)
5. Contact (lazy)

---

## Summary

| ID | Type | Priority | Title | Estimate | Status |
|----|------|----------|-------|----------|--------|
| G-001 | Story | P1 | Light mode support | L | ✅ Merge with H-002 |
| G-007 | Story | P1 | Final copy review | M | ✅ Refined |
| G-002 | Task | P2 | Theme transition polish | S | ✅ Refined |
| G-003 | Task | P2 | Keyboard navigation audit | M | ✅ Refined |
| G-004 | Task | P2 | Screen reader testing | M | ✅ Refined |
| G-005 | Task | P2 | Mobile performance audit | L | ✅ Refined |
| G-008 | Task | P2 | Replace placeholder images | M | ✅ Refined |
| G-006 | Task | P3 | Lazy load off-screen sections | M | ✅ Refined |
