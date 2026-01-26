# Experience Section Backlog

> Last Updated: 2025-01-26

## Legend

| Status | Description |
|--------|-------------|
| ✅ Refined | Ready for development |
| 🔄 Pending | Needs refinement |
| 🚧 In Progress | Currently being worked on |

---

## P1 - HIGH PRIORITY

### ✅ E-001 | Story | Verify profession data accuracy

**Priority:** P1  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
Current EXPERIENCE_DATA has incorrect company names and missing roles. Update to match actual career timeline.

**Issues Found:**

| Field | Current (Wrong) | Correct |
|-------|-----------------|---------|
| Current company | Cognizant Technology Solutions | Nous Infosystems |
| Current period | 2021-Present | Dec 2021-Present |
| Current clients | AXA, Allianz, S&P Global | Fitch Ratings (2021-2023), RBC (2023-Present) |
| Norway company | Storebrand ASA (direct) | Cognizant (onsite at Storebrand) |
| Missing role | — | Localoi.in CTO (Aug-Dec 2021) |

**Acceptance Criteria:**

- [ ] Update current role: Nous Infosystems, Senior Technical Lead, Dec 2021-Present
- [ ] Split current role highlights into two phases: Fitch Ratings (2021-2023) + RBC (2023-Present)
- [ ] Add Localoi.in entry: CTO & Co-founder, Aug-Dec 2021, Kolkata
- [ ] Fix Norway entry: Cognizant as employer, Storebrand as client, role = Onsite Coordinator & Team Lead
- [ ] Update technologies for RBC: React, React Native, TypeScript, GraphQL, Node.js, Spring Boot, Jenkins, Docker
- [ ] Add highlights: "8 UI developers across 6 squads", "CI/CD ownership with 85% test coverage gate"

**Source:** `/home/claude/PROFESSIONAL_EXPERIENCE.md`

---

### ✅ E-002 | Story | Verify skills data accuracy

**Priority:** P1  
**Status:** ✅ REFINED  
**Estimate:** S

**Description:**  
Verify skill percentages and years against actual experience. Career started 2013, so 12+ years total.

**Acceptance Criteria:**

**Engineering Skills - Adjustments:**
- [ ] React: 95%, 8+ years (started 2016 Norway)
- [ ] React Native: Add — 85%, 4 years (Localoi, RBC)
- [ ] TypeScript: 90%, 5 years ✓
- [ ] Node.js: 92%, 10+ years ✓
- [ ] GraphQL: 88%, 5 years (including subscriptions) ✓
- [ ] Spring Boot: Add — 70%, 1 year (RBC project)
- [ ] MongoDB: Add — 85%, 5 years (Fitch, Localoi)
- [ ] MySQL: Add — 80%, 4 years (Localoi)

**Leadership Skills - Adjustments:**
- [ ] Team Leadership: 95%, 6+ years ✓
- [ ] Add: "CI/CD & DevOps" — 85%, 4 years

**Adventure Skills - Verify with Andy:**
- Current video/photo/audio skills look reasonable, keep as placeholder until confirmed

---

### ✅ E-004 | Story | Add portfolio display options

**Priority:** P1  
**Status:** ✅ REFINED  
**Estimate:** L

**Description:**  
Add a fourth tab or subsection to showcase certificates, projects, and external links.

**Acceptance Criteria:**

- [ ] Add "Showcase" or "Portfolio" tab alongside Skills/Experience/Tools
- [ ] Display GitHub Copilot Certification (GH-300) — passed Jan 2025, 92% score
- [ ] Link to GitHub profile
- [ ] Link to Andy's Enclave YouTube channel
- [ ] Placeholder for blog posts (future)
- [ ] Placeholder for Figma designs (future)
- [ ] Each item: icon, title, subtitle, external link, date

**Portfolio Items to Include:**

| Type | Title | Link | Date |
|------|-------|------|------|
| Certificate | GitHub Copilot (GH-300) | credential link | Jan 2025 |
| GitHub | github.com/anindya | profile | — |
| YouTube | Andy's Enclave | channel | Ongoing |
| Project | Localoi.in | website (if live) | 2021 |

---

## P2 - MEDIUM PRIORITY

### ✅ E-003 | Story | Verify tools data accuracy

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** S

**Description:**  
Review and update technology tools list to reflect actual daily toolkit.

**Current Tools (Engineering):** VS Code, Git, Figma, Postman, Jira, Notion, Terminal, Chrome DevTools

**Acceptance Criteria:**

- [ ] Add: SonarQube (Quality), Jenkins (CI/CD), Docker Desktop (Containers)
- [ ] Add: Slack (Communication), Confluence (Documentation)
- [ ] Keep existing tools ✓
- [ ] Adventure tools look accurate (DJI Osmo, Sony A6000, iPhone, iPad, GoPro, Rode Mic)

---

### ✅ E-005 | Story | Group skills and tools

**Priority:** P2  
**Status:** ✅ REFINED  
**Estimate:** M

**Description:**  
Consider merging Skills and Tools into unified "Tech Stack" view for cleaner UX.

**Acceptance Criteria:**

- [ ] Option A: Keep separate tabs but improve visual hierarchy
- [ ] Option B: Merge into single "Tech Stack" tab with sub-sections
- [ ] Add skill category filtering (Frontend, Backend, DevOps, Leadership)
- [ ] Show years of experience as subtle badge, not prominent bar
- [ ] Consider removing percentage bars — subjective and hard to defend

**Design Decision:** Defer to implementation phase. Both options valid.

---

## Summary

| ID | Type | Priority | Title | Estimate | Status |
|----|------|----------|-------|----------|--------|
| E-001 | Story | P1 | Verify profession data accuracy | M | ✅ Refined |
| E-002 | Story | P1 | Verify skills data accuracy | S | ✅ Refined |
| E-004 | Story | P1 | Add portfolio display options | L | ✅ Refined |
| E-003 | Story | P2 | Verify tools data accuracy | S | ✅ Refined |
| E-005 | Story | P2 | Group skills and tools | M | ✅ Refined |
