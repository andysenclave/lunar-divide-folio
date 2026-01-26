# Hero Section Backlog

> Last Updated: 2025-01-26

## Legend

| Status | Description |
|--------|-------------|
| ✅ Refined | Ready for development |
| 🔄 Pending | Needs refinement |
| 🚧 In Progress | Currently being worked on |

---

## P0 - CRITICAL

### ✅ HF-001 | Bug | Fix footer moon deformation

**Summary:**  
After scrolling past the Hero section into the Journey section, the moon sits in the bottom-right corner. Hovering over it in Chrome causes broken visual behavior.

**Current Behavior (Wrong):**
- Moon scales up excessively, nearly filling the screen
- Moon becomes faded/transparent
- Moon continuously bounces up and down in size
- Creates a visually broken, jarring experience
- Occurs in Chrome, specifically in the Journey section
- Does NOT occur in Safari (works correctly there)

**Expected Behavior:**
- Moon grows slightly larger on hover (subtle scale, e.g., 1.1x)
- Moon becomes more prominent/visible on hover (increased opacity or glow)
- Stable — no bouncing or size oscillation
- Click scrolls user back to top of page

**Acceptance Criteria:**
- [ ] Corner moon grows slightly on hover (subtle scale increase)
- [ ] Corner moon becomes more prominent/visible on hover
- [ ] No excessive scaling, fading, or bouncing animation
- [ ] Behavior consistent across Chrome, Safari, Firefox, Edge
- [ ] Click scrolls to top of page smoothly
- [ ] Works correctly within the Journey section

**Technical Notes:**
- Chrome-specific issue
- Likely Framer Motion `whileHover` conflicting with scroll-based transforms
- Bug isolated to Journey section context
- Safari handles the same code correctly

**Estimate:** M (Medium)

**Status:** Ready for dev

---

## P1 - HIGH PRIORITY

### ✅ H-001 | Story | Fix navigation links

**Summary:**  
Wire up header navigation links (Journey, Experience, Showcase) to scroll to their corresponding sections on click.

**Current Behavior (Wrong):**
- Navigation links do nothing when clicked
- No scroll or navigation occurs

**Expected Behavior:**
- Clicking "Journey" scrolls to the Journey section
- Clicking "Experience" scrolls to the Experience section
- Clicking "Showcase" scrolls to the Showcase section
- Header remains fixed at top
- Nav items highlight on hover only (no scroll-spy)

**Acceptance Criteria:**
- [ ] "Journey" link scrolls smoothly to Journey section
- [ ] "Experience" link scrolls smoothly to Experience section
- [ ] "Showcase" link scrolls smoothly to Showcase section
- [ ] Smooth scroll animation (not instant jump)
- [ ] Header stays fixed at top of viewport
- [ ] Nav items highlight on hover
- [ ] Section IDs match link targets (verify in codebase)

**Technical Notes:**
- Check actual nav items and section IDs in the lunar divide portfolio codebase
- Current code may have wrong nav labels (Engineering, Adventure, Journal) — needs update
- Ensure section components have correct `id` attributes

**Estimate:** S (Small)

**Status:** Ready for dev

---

### ✅ H-002 | Story | Implement light mode theme

**Summary:**  
Complete the light mode implementation across all sections, and unify the dark mode background theme. Currently light mode only works well in Hero section.

**Current Behavior (Incomplete):**
- Theme toggle exists in header
- Light mode looks good only in Hero section
- Other sections (Journey, Experience, Showcase, Contact/Footer) don't properly support light mode
- Dark mode has inconsistent backgrounds — different sections have different starry/background styles
- Site defaults to dark mode ✓

**Expected Behavior:**
- Light mode applies correctly across ALL sections
- Dark mode has unified starry background theme across all sections
- Light mode has subtle animated elements (instead of stars) that move as user scrolls
- Always loads in dark mode first

**Acceptance Criteria:**

*Light Mode:*
- [ ] Hero section displays correctly in light mode
- [ ] Journey/Globe section displays correctly in light mode
- [ ] Experience section displays correctly in light mode
- [ ] Showcase/Projects section displays correctly in light mode
- [ ] Contact/Footer section displays correctly in light mode
- [ ] Loading screen displays correctly in light mode
- [ ] Subtle animated background elements replace stars in light mode
- [ ] Animated elements respond to scroll position

*Dark Mode:*
- [ ] Starry background unified across all sections (consistent style)
- [ ] No jarring background transitions between sections

*General:*
- [ ] Theme toggle works from any section
- [ ] Smooth transition when toggling themes
- [ ] Site always loads in dark mode initially
- [ ] All text maintains readable contrast in both modes

**Technical Notes:**
- Existing color palette defined in HeroSection needs to be shared/consumed by all sections
- Currently each section has its own hardcoded COLORS constant
- Light mode background animation is new scope — consider parallax floating shapes, gradient orbs, or similar
- Dark mode starry backgrounds need consolidation

**Estimate:** L (Large)

**Status:** Ready for dev — consider breaking into sub-tasks during implementation

---

### ✅ HM-001 | Story | Finalize header text and font

**Summary:**  
Implement a typing animation for the hero title and finalize the hero section text content.

**Current Behavior:**
- Static text "ANINDYA MUKHERJEE" displays immediately
- Taglines change based on hover state
- "Scroll into Engineering/Adventure" text at bottom
- No typing animation

**Expected Behavior:**
- Typing animation plays on page load (once only)
- Animation sequence: `Building systems...` → deletes → `Exploring worlds...` → deletes → settles on `ANINDYA MUKHERJEE`
- Taglines remain as-is (neutral, engineering hover, adventure hover)
- Subtitle/role title: to be decided during implementation
- Bottom scroll indicator replaced with classic "scroll to journey" style text (e.g., "Begin the Journey", "Explore", or similar)
- Font: Sora (confirmed)

**Acceptance Criteria:**
- [ ] Typing animation implemented using MagicUI or similar approach
- [ ] Animation sequence: "Building systems..." → delete → "Exploring worlds..." → delete → "ANINDYA MUKHERJEE"
- [ ] Animation plays once on initial page load only
- [ ] Animation does not replay when scrolling back to hero
- [ ] Taglines work correctly on hover (neutral/engineering/adventure states)
- [ ] Remove "Scroll into Engineering/Adventure" text
- [ ] Add classic-style scroll indicator pointing to Journey section
- [ ] Sora font family maintained
- [ ] Subtitle/role title: TBD during implementation

**Technical Notes:**
- Reference: https://magicui.design/docs/components/typing-animation
- May need to track "hasPlayed" state to prevent replay
- Scroll indicator should link to Journey section (ties into H-001)

**Estimate:** M (Medium)

**Status:** Ready for dev

---

### ✅ HM-004 | Bug | Fix hover image positions

**Summary:**  
In the Hero section, when hovering on the left or right side, the portrait images (Engineering/Adventure personas) appear but are positioned higher than the moon instead of overlapping it.

**Current Behavior (Wrong):**
- Portrait images appear higher than the moon position
- Images and moon are not aligned
- Looks visually off/disconnected
- Occurs in all browsers

**Expected Behavior:**
- Portrait images exactly overlap the moon
- When hovering left: Engineering portrait fills the moon circle
- When hovering right: Adventure portrait fills the moon circle
- Seamless visual transition between moon and portraits

**Acceptance Criteria:**
- [ ] Engineering portrait exactly overlaps the moon on left-side hover
- [ ] Adventure portrait exactly overlaps the moon on right-side hover
- [ ] Portraits are perfectly centered and aligned with moon position
- [ ] Portraits maintain same size as the moon circle
- [ ] Smooth fade/reveal transition as mouse moves between zones
- [ ] Works consistently across Chrome, Safari, Firefox, Edge
- [ ] Alignment maintained across different screen sizes/viewports

**Technical Notes:**
- PortraitOverlays component positioning needs adjustment
- Check transform/translate values relative to moon container
- Both elements should share the same center point

**Estimate:** S (Small)

**Status:** Ready for dev

---

## P2 - MEDIUM PRIORITY

### ✅ H-003 | Story | Update contact button to download resume

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** S

**Description:**  
Change header "CONTACT →" CTA to download resume PDF instead of scrolling to contact section.

**Current Behavior:**
- Button links to `#contact` section

**Expected Behavior:**
- Button triggers resume PDF download
- Label changes to "RESUME →" or "CV →"
- Keep secondary "Contact" option in nav or footer

**Acceptance Criteria:**

- [ ] Change button href to `/resume.pdf` with download attribute
- [ ] Update label: "RESUME →" or "DOWNLOAD CV"
- [ ] Ensure resume file exists in `/public/resume.pdf`
- [ ] Add hover state feedback (scale + glow)
- [ ] Consider keeping "Contact" as nav item instead

**Alternative:** Keep "CONTACT →" and add separate resume download in Contact section (C-002).

---

### ✅ HM-002 | Story | Enhance the Moon

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
Improve moon visual effects to match Awwwards-level quality. Current moon is good but could be more dynamic.

**Current State:**
- Realistic moon surface with craters ✓
- Mouse-responsive lighting ✓
- Scroll-driven position/scale ✓

**Enhancement Options:**

1. **Subtle Rotation Animation**
   - Very slow idle rotation (360° over 120s)
   - Reveals different crater patterns over time

2. **Enhanced Glow**
   - Pulsing outer glow that syncs with hover state
   - Different glow color based on active side (cyan/orange)

3. **Particle Dust**
   - Tiny floating particles around moon
   - Drift away on scroll

4. **Surface Shimmer**
   - Subtle light reflection that follows mouse
   - Like moonlight on water

**Acceptance Criteria:**

- [ ] Choose 1-2 enhancements that don't impact performance
- [ ] Maintain current mouse-responsive lighting behavior
- [ ] Ensure effects work in both dark and light mode
- [ ] Test on mobile (may need to disable some effects)
- [ ] Keep moon recognizable as central portfolio element

---

### ✅ HM-003 | Task | Replace hover images

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** S

**Description:**  
Replace placeholder portraits with actual photos or high-quality illustrations.

**Current Placeholders:**
- `EngineeringPortrait`: Code text + laptop silhouette
- `AdventurePortrait`: Mountain silhouette + camera shape

**Options:**

| Option | Engineering | Adventure |
|--------|-------------|-----------|
| A | Professional headshot (dark filter) | Travel photo (warm filter) |
| B | Abstract code visualization | Abstract landscape/map |
| C | Stylized illustration | Stylized illustration |
| D | Keep current (refined) | Keep current (refined) |

**Acceptance Criteria:**

- [ ] Decide on portrait style with Andy
- [ ] If using photos: obtain/create professional shots
- [ ] If using illustrations: commission or create
- [ ] Images should be circular and fit moon overlay
- [ ] Apply consistent filter/treatment to both sides
- [ ] Test reveal animation with final images
- [ ] Optimize images (WebP, max 100KB each)

**Recommended:** Option D (refine current abstract placeholders) for MVP, upgrade to Option A or C for v2.

---

## Summary

| ID | Type | Priority | Title | Estimate | Status |
|----|------|----------|-------|----------|--------|
| HF-001 | Bug | P0 | Fix footer moon deformation | M | ✅ Ready |
| H-001 | Story | P1 | Fix navigation links | S | ✅ Ready |
| H-002 | Story | P1 | Implement light mode theme | L | ✅ Ready |
| HM-001 | Story | P1 | Finalize header text and font | M | ✅ Ready |
| HM-004 | Bug | P1 | Fix hover image positions | S | ✅ Ready |
| H-003 | Story | P2 | Update contact button to download resume | S | ✅ Ready |
| HM-002 | Story | P2 | Enhance the Moon | M | ✅ Ready |
| HM-003 | Task | P2 | Replace hover images | S | ✅ Ready |
