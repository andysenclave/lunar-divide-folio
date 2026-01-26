# Contact & Footer Section Backlog

> Last Updated: 2025-01-26

## Legend

| Status | Description |
|--------|-------------|
| ✅ Refined | Ready for development |
| 🔄 Pending | Needs refinement |
| 🚧 In Progress | Currently being worked on |

---

## P1 - HIGH PRIORITY

### ✅ C-001 | Story | Verify contact information

**Priority:** P1  
**Status:** ✅ REFINED  
**Estimate:** S

**Description:**  
Current contact links use placeholder usernames. Need to verify and update with real social handles.

**Current Values (Placeholders):**

| Type | Current | Action Required |
|------|---------|-----------------|
| Email | `hello@anindya.dev` | Verify domain is active or use Gmail |
| LinkedIn | `linkedin.com/in/anindya` | Update with real username |
| GitHub | `github.com/anindya` | Update with real username |
| Twitter/X | `twitter.com/anindya` | Update with real username or remove |
| YouTube | `youtube.com/@andysenclave` | ✅ Looks correct |
| Instagram | `instagram.com/andysenclave` | ✅ Looks correct |

**Acceptance Criteria:**

- [ ] Confirm email address (Gmail fallback if custom domain not ready)
- [ ] Get real LinkedIn username and update
- [ ] Get real GitHub username and update
- [ ] Decide: keep Twitter/X or remove if not active
- [ ] Verify YouTube and Instagram handles are correct
- [ ] Test all links work and open in new tabs

---

### ✅ C-006 | Bug | Fix footer navigation links

**Priority:** P1  
**Status:** ✅ REFINED  
**Estimate:** S

**Description:**  
Footer nav links need to match actual section IDs in the page.

**Current Links:**

| Label | Current href | Expected |
|-------|--------------|----------|
| Home | `#` | Scroll to top or `/` |
| Expertise | `#expertise` | Verify section ID |
| Journey | `#journey` | Verify section ID |
| Projects | `#projects` | Verify section ID |

**Acceptance Criteria:**

- [ ] Home: Use `onClick` scroll to top instead of `#`
- [ ] Verify all section IDs match actual components
- [ ] Add smooth scroll behavior
- [ ] Add "Contact" link (current section anchor)
- [ ] Test on mobile navigation

---

## P2 - MEDIUM PRIORITY

### ✅ C-002 | Story | Add resume download

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
Resume download button exists but points to `/resume.pdf` which doesn't exist.

**Acceptance Criteria:**

- [ ] Create or upload actual PDF resume to `/public/resume.pdf`
- [ ] Alternative: Link to Google Drive/Dropbox hosted resume
- [ ] Add download tracking (optional, for analytics)
- [ ] Consider offering multiple formats (PDF, DOCX)
- [ ] Keep filename: `Anindya_Mukherjee_Resume.pdf`

**Resume Content Should Include:**

- Current role at Nous Infosystems (RBC client)
- Key achievements: 8 developers, CI/CD ownership, 92% GH-300 score
- Tech stack summary
- Career highlights from Europe (Berlin, Oslo)

---

### ✅ C-003 | Task | Update availability regions

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** S

**Description:**  
Verify target locations are accurate and complete.

**Current Locations:** Sydney, Singapore, Tokyo, Dubai, Hong Kong

**Acceptance Criteria:**

- [ ] Confirm these 5 locations are still target regions ✓
- [ ] Consider adding: Melbourne (Australia), London (UK)
- [ ] Verify map coordinates display correctly on mobile
- [ ] Current base (Kolkata) pin is correct ✓

**No changes required** — current data matches your stated preferences.

---

### ✅ C-004 | Bug | Profile CosmicBackground performance

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
CosmicBackground renders 80 animated stars with individual motion animations. May cause performance issues on mobile.

**Current Implementation:**

```jsx
{Array.from({ length: 80 }).map((_, i) => (
  <motion.div animate={{ opacity, scale }} ... />
))}
```

**Acceptance Criteria:**

- [ ] Test on real mobile device (not just Chrome DevTools)
- [ ] Measure frame rate during scroll
- [ ] If <30fps on mid-range mobile: reduce to 40 stars
- [ ] Consider using CSS animations instead of Framer Motion for stars
- [ ] Alternative: Use static star positions with single CSS keyframe animation
- [ ] Aurora waves (3 elements) are acceptable — low impact

---

## P3 - LOW PRIORITY

### ✅ C-005 | Task | Optimize Stars component

**Priority:** P3  
**Status:** ✅ REFINED  
**Estimate:** S

**Description:**  
Related to C-004. Extract stars to separate optimized component.

**Acceptance Criteria:**

- [ ] Create `<StarField count={40} />` component
- [ ] Use `useMemo` to generate star positions once
- [ ] Use CSS `@keyframes` for twinkle effect instead of JS
- [ ] Add `will-change: opacity` hint
- [ ] Lazy load stars after main content renders

---

## Summary

| ID | Type | Priority | Title | Estimate | Status |
|----|------|----------|-------|----------|--------|
| C-001 | Story | P1 | Verify contact information | S | ✅ Refined |
| C-006 | Bug | P1 | Fix footer navigation links | S | ✅ Refined |
| C-002 | Story | P2 | Add resume download | M | ✅ Refined |
| C-003 | Task | P2 | Update availability regions | S | ✅ Refined |
| C-004 | Bug | P2 | Profile CosmicBackground performance | M | ✅ Refined |
| C-005 | Task | P3 | Optimize Stars component | S | ✅ Refined |
