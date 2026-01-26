# Journey Section Backlog

> Last Updated: 2025-01-26

## Legend

| Status | Description |
|--------|-------------|
| ✅ Refined | Ready for development |
| 🔄 Pending | Needs refinement |
| 🚧 In Progress | Currently being worked on |

---

## P1 - HIGH PRIORITY

### ✅ J-005 | Story | Complete milestone information

**Priority:** P1  
**Status:** ✅ REFINED  
**Estimate:** L (Large — content integration + component updates)

**Description:**  
Fill in complete professional and adventure content for each location milestone in JourneyGlobe.jsx.

**Source Documents:**
- `/home/claude/PROFESSIONAL_EXPERIENCE.md` — Complete career timeline with detailed narratives
- `/home/claude/ADVENTURE_EXPERIENCE.md` — Complete adventure timeline with narratives

**Acceptance Criteria:**

**Content Structure (per location):**
- [ ] Each location shows accurate period dates
- [ ] Engineering cards match professional experience documentation
- [ ] Adventure cards match adventure experience documentation
- [ ] Card descriptions are concise but compelling (2-3 sentences max)
- [ ] Modal content uses full narrative from source documents

**Locations to Update:**

| Location | Period | Engineering | Adventure |
|----------|--------|-------------|-----------|
| Chennai | 2013-2015 | Cognizant Junior Dev (Healthcare) | Kotivakkam Beach, Pondicherry weekends |
| Kolkata | 2015-2016 | Cognizant (Belgium Insurance) | Gurudongmar Lake, Bali Pass trek |
| Oslo/Norway | 2016-2019 | Cognizant Onsite (Storebrand) | Sognefjord, Skydiving, Europe travels |
| Berlin | 2019-2021 | FinCompare | Krakow offsite, Munich, Amsterdam month |
| Kolkata | 2021-Present | Nous (Fitch → RBC) + Localoi | Road trips, Andy's Enclave |

**Technical:**
- [ ] Update LOCATIONS array in JourneyGlobe.jsx with accurate data
- [ ] Ensure modal content renders HTML properly (narratives use `<p>`, `<h3>`, `<ul>`)
- [ ] Update tags to reflect actual technologies/places
- [ ] Featured flags on standout experiences (Bali Pass, Skydiving, RBC)

---

### ✅ J-006 | Story | Tune scroll timeline pacing

**Priority:** P1  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
Adjust scroll pacing so recent history moves faster, European years linger longer, and the section waits for full viewport visibility before animating.

**Acceptance Criteria:**

- [ ] **Initial hold:** Globe stays on Kolkata with location name + year visible until Journey section is 100% in viewport (~8% of scroll progress as buffer)
- [ ] **Kolkata (2021-Present):** Faster dwell (~8%) — recent history, user knows this
- [ ] **Berlin (2019-2021):** Slower dwell (~18%) — European experience worth savoring
- [ ] **Oslo (2016-2019):** Slower dwell (~18%) — European experience worth savoring
- [ ] **Kolkata (2015-2016):** Standard dwell (~14%)
- [ ] **Chennai (2013-2015):** Standard dwell (~14%)
- [ ] Flight transitions remain at current 5%
- [ ] Section height stays at `2800vh`

**Technical Approach:**

```javascript
// In buildScrollTimeline()
const initialHold = 0.08;
const dwellTimes = {
  'kolkata-2': 0.08,
  'berlin': 0.18,
  'oslo': 0.18,
  'kolkata-1': 0.14,
  'chennai': 0.14,
};
```

---

### ✅ J-007 | Task | Limit visible cards per side

**Priority:** P1  
**Status:** ✅ REFINED  
**Estimate:** S

**Description:**  
Ensure no more than 2 cards are visible at a time on each side (Engineering left, Adventure right).

**Acceptance Criteria:**

- [ ] Maximum 2 Engineering cards visible simultaneously on left side
- [ ] Maximum 2 Adventure cards visible simultaneously on right side
- [ ] Cards animate in/out smoothly as user scrolls — older cards fade out as new ones appear
- [ ] When location has 3+ experiences of same type, show most recent 2, cycle as scroll progresses

**Technical Approach:**

Update `cardVisibility` logic in `buildScrollTimeline()` to cap visible indices per type. In render, filter `engineeringCards` and `adventureCards` to show only last 2 from `visibleCards`.

---

### ✅ J-001 | Story | Replace modal hero placeholder

**Priority:** P1  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
ExperienceModal has a placeholder div with emoji icon. Replace with actual images or contextual visuals.

**Acceptance Criteria:**

- [ ] Engineering modals show: code snippet visualization, tech stack icons, or abstract geometric pattern in cyan theme
- [ ] Adventure modals show: placeholder for future photos (gradient + location icon), or map snippet of the place
- [ ] If `hasPhotos` or `hasVideo` flag exists, show "Media coming soon" indicator with appropriate icon
- [ ] Fallback: Stylized gradient background with large location name typography (not just emoji)
- [ ] Modal hero maintains 16:10 aspect ratio
- [ ] Smooth fade-in animation on modal open

**Technical Approach:**

Create `ModalHero` component that switches based on `exp.type`:
- Engineering: Dark gradient + subtle code pattern + tech tags
- Adventure: Warm gradient + topographic/map pattern + place name

**Blocked By:** None (can implement with generated visuals, real photos added later via J-002/J-003)

---

## P2 - MEDIUM PRIORITY

### ✅ J-002 | Story | Implement video viewing

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
Journey data has `hasVideo: true` flags on some experiences (e.g., Skydiving, Andy's Enclave) but modal doesn't display videos.

**Current Experiences with hasVideo:**
- Skydiving Over Hemsedal (Norway)
- Andy's Enclave (Content Creation)

**Acceptance Criteria:**

- [ ] Add video embed section in ExperienceModal
- [ ] Support YouTube embed (primary) or direct video URL
- [ ] Add `videoUrl` field to experience data structure
- [ ] Show video thumbnail with play button if video exists
- [ ] Lazy load video iframe to avoid performance hit
- [ ] Consider lightbox for fullscreen viewing
- [ ] Fallback to placeholder if video URL missing

**Video Sources Needed:**
| Experience | Video Source |
|------------|--------------|
| Skydiving | YouTube/personal footage |
| Andy's Enclave | YouTube channel trailer |

---

### ✅ J-003 | Story | Implement photo gallery

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** L

**Description:**  
Journey data has `hasPhotos: true` flags but modal only shows placeholder. Implement photo gallery/carousel.

**Current Experiences with hasPhotos:**
- Europe Travels (Brussels, Paris, Amsterdam)
- Norway Explore (Bergen, Lillehammer, Fjords)
- Sikkim Trek
- Krakow Offsite

**Acceptance Criteria:**

- [ ] Add `photos` array field to experience data structure
- [ ] Implement carousel/grid view in modal
- [ ] Support swipe gestures on mobile
- [ ] Add lightbox for full-size viewing
- [ ] Lazy load images
- [ ] Show photo count badge on card if photos exist
- [ ] Fallback gracefully if no photos provided

**Photo Requirements:**
- Format: WebP (fallback JPEG)
- Thumbnail: 400px width, ~50KB
- Full size: 1200px width, ~200KB
- Alt text for accessibility

---

## P3 - LOW PRIORITY

### ✅ J-004 | Task | Display places visited

**Priority:** P3  
**Status:** ✅ REFINED  
**Estimate:** S

**Description:**  
Experience data includes `places` array (e.g., `['Brussels', 'Paris', 'Amsterdam']`) but it's only shown in some card views, not consistently.

**Acceptance Criteria:**

- [ ] Show places as location tags on experience cards
- [ ] Display in modal under date/period
- [ ] Consider map pins visualization (stretch goal)
- [ ] Style: subtle pill badges with location icon
- [ ] Limit to 3 places on card, show all in modal

**Example Display:**
```
📍 Brussels • Paris • Amsterdam
```

---

## Summary

| ID | Type | Priority | Title | Estimate | Status |
|----|------|----------|-------|----------|--------|
| J-005 | Story | P1 | Complete milestone information | L | ✅ Refined |
| J-006 | Story | P1 | Tune scroll timeline pacing | M | ✅ Refined |
| J-007 | Task | P1 | Limit visible cards per side | S | ✅ Refined |
| J-001 | Story | P1 | Replace modal hero placeholder | M | ✅ Refined |
| J-002 | Story | P2 | Implement video viewing | M | ✅ Refined |
| J-003 | Story | P2 | Implement photo gallery | L | ✅ Refined |
| J-004 | Task | P3 | Display places visited | S | ✅ Refined |
