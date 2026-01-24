# Portfolio Refinement Backlog

> Phase: Mockup → Production Ready
> Last Updated: 2026-01-24

## Legend

| Type | Description |
|------|-------------|
| 🐛 Bug | Broken functionality or incorrect behavior |
| 📖 Story | Feature completion or new functionality |
| 🔧 Task | Small refinements or adjustments |

| Priority | Description |
|----------|-------------|
| P0 | Critical - Blocks release |
| P1 | High - Must have for launch |
| P2 | Medium - Should have |
| P3 | Low - Nice to have |

---

## Hero Section

### Header

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| H-001 | 📖 | P1 | Fix navigation links | Wire up navigation links to scroll to correct sections | Todo |
| H-002 | 📖 | P1 | Implement light mode theme | Apply light theme styling across all sections | Todo |
| H-003 | 📖 | P2 | Update contact button to download resume | Change CTA to trigger resume download instead of scroll | Todo |

### Main (Portrait/Moon Area)

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| HM-001 | 📖 | P1 | Finalize header text and font | Review and finalize the hero title/tagline content | Todo |
| HM-002 | 📖 | P2 | Enhance the Moon | Improve moon visual effects, glow, and animations | Todo |
| HM-003 | 🔧 | P2 | Replace hover images | Update the images that appear in moon on hover with final assets | Todo |
| HM-004 | 🐛 | P1 | Fix hover image positions | Images appearing on hover are mispositioned | Todo |

### Footer (Hero Footer/Moon)

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| HF-001 | 🐛 | P0 | Fix footer moon deformation | Moon gets deformed on hover, breaks entire UI | Todo |

---

## Journey Section

### Content

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| J-005 | 📖 | P1 | Complete milestone information | Add complete information for all professional/adventure milestones | Todo |

### Globe & Timeline

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| J-001 | 🐛 | P1 | Replace modal hero placeholder | ExperienceModal has placeholder div - needs actual image/media | Todo |
| J-002 | 📖 | P2 | Implement video viewing | Journey data has `hasVideo` flags but no video player implementation | Todo |
| J-003 | 📖 | P2 | Implement photo gallery | Journey data has `hasPhotos` flags but no gallery implementation | Todo |
| J-004 | 🔧 | P3 | Display places visited | Experience data includes `places` array - not shown in UI | Todo |
| J-006 | 📖 | P1 | Tune scroll timeline pacing | Wait on 2026 until section fully visible, faster transition 2026→2021, slower 2021→2016 | Todo |

### Cards Display

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| J-007 | 🔧 | P1 | Limit visible cards per side | Ensure no more than 3 cards showing at a time on left or right side | Todo |

---

## Experience Section

### General

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| E-001 | 📖 | P1 | Verify profession data accuracy | Review and update all work experience entries for accuracy | Todo |
| E-002 | 📖 | P1 | Verify skills data accuracy | Review and update skill categories/proficiency levels | Todo |
| E-003 | 📖 | P2 | Verify tools data accuracy | Review and update technology tools list | Todo |

### Features

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| E-004 | 📖 | P1 | Add portfolio display options | Display professional certificates, blogs, GitHub projects, and Figma designs | Todo |
| E-005 | 📖 | P2 | Group skills and tools | Consolidate skills and tools into a unified view/grouping | Todo |

---

## Contact Section

### Content & CTA

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| C-001 | 📖 | P1 | Verify contact information | Ensure email, social links are correct | Todo |
| C-002 | 📖 | P2 | Add resume download | Implement resume/CV download functionality | Todo |
| C-003 | 🔧 | P2 | Update availability regions | Verify target locations (Australia, APAC, UAE) are accurate | Todo |

### Footer

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| C-006 | 🐛 | P1 | Fix footer navigation links | Navigation links in footer are broken | Todo |

### Performance

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| C-004 | 🐛 | P2 | Profile CosmicBackground performance | AuroraWaves uses heavy animations - test on mobile | Todo |
| C-005 | 🔧 | P3 | Optimize Stars component | Large number of positioned elements may impact performance | Todo |

---

## Global / Cross-Section

### Theme

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| G-001 | 📖 | P1 | Light mode support | Ensure all sections render correctly in light mode | Todo |
| G-002 | 🔧 | P2 | Theme transition polish | Smooth transitions when toggling dark/light mode | Todo |

### Accessibility

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| G-003 | 🔧 | P2 | Keyboard navigation audit | Verify all interactive elements are keyboard accessible | Todo |
| G-004 | 🔧 | P2 | Screen reader testing | Test with VoiceOver/NVDA for accessibility | Todo |

### Performance

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| G-005 | 🔧 | P2 | Mobile performance audit | Test animations on low-end mobile devices | Todo |
| G-006 | 🔧 | P3 | Lazy load off-screen sections | Defer heavy components until in view | Todo |

### Content

| ID | Type | Priority | Title | Description | Status |
|----|------|----------|-------|-------------|--------|
| G-007 | 📖 | P1 | Final copy review | Review all text content for accuracy and tone | Todo |
| G-008 | 🔧 | P2 | Replace placeholder images | Ensure all images are final production assets | Todo |

---

## Priority Summary

### P0 - Critical (1 item)
- [ ] HF-001: Fix footer moon deformation

### P1 - High Priority (15 items)
- [ ] H-001: Fix navigation links
- [ ] H-002: Implement light mode theme
- [ ] HM-001: Finalize header text and font
- [ ] HM-004: Fix hover image positions
- [ ] J-001: Replace modal hero placeholder
- [ ] J-005: Complete milestone information
- [ ] J-006: Tune scroll timeline pacing
- [ ] J-007: Limit visible cards per side
- [ ] E-001: Verify profession data accuracy
- [ ] E-002: Verify skills data accuracy
- [ ] E-004: Add portfolio display options
- [ ] C-001: Verify contact information
- [ ] C-006: Fix footer navigation links
- [ ] G-001: Light mode support
- [ ] G-007: Final copy review

### P2 - Medium Priority (14 items)
- [ ] H-003: Update contact button to download resume
- [ ] HM-002: Enhance the Moon
- [ ] HM-003: Replace hover images
- [ ] J-002: Implement video viewing
- [ ] J-003: Implement photo gallery
- [ ] E-003: Verify tools data accuracy
- [ ] E-005: Group skills and tools
- [ ] C-002: Add resume download
- [ ] C-003: Update availability regions
- [ ] C-004: Profile CosmicBackground performance
- [ ] G-002: Theme transition polish
- [ ] G-003: Keyboard navigation audit
- [ ] G-004: Screen reader testing
- [ ] G-005: Mobile performance audit
- [ ] G-008: Replace placeholder images

### P3 - Low Priority (3 items)
- [ ] J-004: Display places visited
- [ ] C-005: Optimize Stars component
- [ ] G-006: Lazy load off-screen sections

---

## Sprint Planning Suggestion

### Sprint 1: Critical Fixes & Navigation
Focus: P0 + navigation bugs
- HF-001 (footer moon deformation)
- H-001, C-006 (navigation links - header & footer)
- HM-004 (hover image positions)

### Sprint 2: Journey Section Polish
Focus: Timeline UX and content
- J-005 (complete milestone information)
- J-006 (tune scroll timeline pacing)
- J-007 (limit cards per side)
- J-001 (modal hero placeholder)

### Sprint 3: Experience & Content
Focus: Data accuracy and new features
- E-001, E-002, E-003 (experience data verification)
- E-004 (portfolio display - certificates, blogs, projects)
- E-005 (group skills and tools)

### Sprint 4: Theme & Visual Polish
Focus: Light mode and visual refinements
- H-002, G-001 (light mode theme)
- HM-001, G-007 (content finalization)
- HM-002, HM-003 (moon enhancements)

### Sprint 5: Media & Downloads
Focus: Rich content features
- J-002, J-003 (video/photo viewing)
- C-002, H-003 (resume download)
- C-001, C-003 (contact info)

### Sprint 6: Performance & Accessibility
Focus: Production readiness
- C-004, G-005 (performance)
- G-003, G-004 (accessibility)
- G-002, G-006 (polish)

---

## Notes

- Items discovered during exploration may need further investigation
- Priority can be adjusted based on user feedback
- Some items may be deferred post-launch
