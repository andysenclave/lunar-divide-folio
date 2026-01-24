# Lunar Divide Folio - AI Assistant Documentation

**Professional Portfolio & Interactive Experience**

Portfolio website for Anindya Mukherjee (Andysenclave) featuring an innovative dual-theme design that seamlessly blends Engineering and Adventure personas. Built as a full-stack interactive experience with scroll-driven animations, real-time interactivity, and sophisticated state management.

**Last Updated**: January 2026  
**Current Branch**: develop  
**Staging**: GitHub Copilot badge asset added

## Tech Stack

| Layer                  | Technology       | Version | Purpose                           |
| ---------------------- | ---------------- | ------- | --------------------------------- |
| **Framework**          | Next.js          | 16.1.1  | App Router, SSR, streaming        |
| **Runtime**            | React            | 19.2.3  | Component library, hooks          |
| **Language**           | TypeScript       | 5.x     | Strict mode, full type safety     |
| **Styling**            | Tailwind CSS     | 4.1     | Utility-first, design tokens      |
| **Animation**          | Framer Motion    | 12.23   | Scroll triggers, gesture handling |
| **Data Visualization** | D3.js + TopoJSON | 7.9     | Globe rendering (Journey section) |

## Project Structure

```
app/                    # Next.js app directory (pages & routing)
├── layout.tsx          # Root layout with fonts, ThemeProvider, ErrorBoundary
├── page.tsx            # Main landing page with AnimationProvider
├── mockup/page.tsx     # Mockup showcase page
└── globals.css         # Global styles, typography, accessibility utilities

components/
├── ErrorBoundary/      # Error boundary component
├── layout/             # Header, GlobalBackground, FloatingMoon, ThemeToggle
├── motion/             # Enhanced Framer Motion wrappers with presets
└── sections/           # Page sections
    ├── Hero/           # Hero section with dual-perspective narrative
    ├── Journey/        # Scroll-driven timeline with D3 globe
    │   ├── context/    # JourneyProvider (modal state, section structure)
    │   └── components/ # CardsContainer, GlobeView, Timeline, Modal
    └── Experience/     # Professional experience showcase
        ├── context/    # ExperienceProvider (tab/side state, section structure)
        ├── components/ # SectionHeader, ContentArea, Tabs, Timeline
        └── data/       # Skills, tools, stats data

context/                # React Context providers
└── AnimationContext.tsx # Scroll, mouse, and animation state management

theme/                  # Theme system
├── theme.ts            # THEME object with dark/light color palettes
├── ThemeProvider.tsx   # React Context for theme state
└── applyTheme.ts       # Applies theme to document

hooks/                  # Custom hooks (legacy, use context instead)
└── useActiveSide.tsx   # Deprecated - use useAnimation from context

styles/
└── theme.css           # CSS custom properties for design tokens

resources/              # Mockups & backups (skip during exploration)
```

## Key Patterns

### Animation Context (Primary)

Use `useAnimation()` from `@/context` to access:

- `scrollYProgress` - Scroll progress MotionValue
- `smoothMouseX` - Mouse position MotionValue (0-1, smoothed)
- `activeSide` - Current side: 'engineering' | 'adventure' | 'neutral'
- `lastActiveSide` - Last non-neutral side
- `heroRef` / `heroContentRef` - Refs for scroll/mouse tracking
- `handleMouseMove` / `handleMouseLeave` - Mouse event handlers
- `prefersReducedMotion` - Accessibility preference

### Enhanced Motion Components

Motion components support presets and automatic reduced-motion:

```tsx
import { MotionDiv } from '@/components/motion';

// With animation preset
<MotionDiv preset="fadeIn">Content</MotionDiv>;

// Available presets: fadeIn, slideUp, slideDown, slideLeft, slideRight, scaleIn, scaleUp
```

### Section Provider Pattern

Sections use a Provider pattern for encapsulated state and structure:

```tsx
// JourneyProvider/ExperienceProvider handle:
// - Internal state (modal, tabs, expanded items)
// - Section structure (wrapper, sticky viewport)
// - Child components receive state via context

<JourneyProvider scrollProgress={progress} sectionRef={ref}>
  <CardsContainer /> {/* Accesses context internally */}
</JourneyProvider>
```

### ExperienceTimeline Pattern

Self-contained component with co-located types and data:

```
ExperienceTimeline/
├── context/         # TimelineProvider (expandedId state)
├── components/      # TimelineItem, TimelineContent, TechTags
├── types.ts         # WorkExperience interface (scoped)
└── data.ts          # EXPERIENCE_DATA (scoped)
```

### Theme System (Three Layers)

1. **CSS Variables** (`styles/theme.css`) - Design tokens
2. **TypeScript Theme** (`theme/theme.ts`) - THEME object
3. **Tailwind Config** - Uses CSS variables

### Color Palette

- **Cyan (Engineering)**: #00D9FF - left side accent
- **Orange (Adventure)**: #FF6B35 - right side accent
- Dark bg: #0A0E27, Light bg: #FAFBFF

## Fonts

- **Sora** (600, 700): Headings via `--font-heading`
- **Inter** (all weights): Body via `--font-body`
- **JetBrains Mono** (400, 600): Code via `--font-mono`

## Accessibility Features

- Skip link for keyboard navigation (`#main-content`)
- `prefers-reduced-motion` support (CSS + JS)
- Focus-visible styles on interactive elements
- Screen reader utilities (`.sr-only`)
- Error boundary with fallback UI

## Typography Classes (globals.css)

- `.t-h1`, `.t-h2`, `.t-h3` - Responsive headings
- `.t-body-lg`, `.t-body`, `.t-body-sm` - Body text
- `.t-label` - Uppercase labels
- `.t-code-inline`, `.t-code-block` - Code styling
- `.focus-ring` - Focus ring utility
- `.sr-only` - Screen reader only

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Important Notes

- Use `useAnimation()` from `@/context` (not useActiveSide from hooks)
- All motion components support `preset` prop for animations
- Reduced motion is automatically handled
- Use Tailwind classes + style prop for MotionValue-driven values
- ErrorBoundary wraps the entire app

## Component Patterns & Best Practices

### Motion Components Presets

All motion components (`MotionDiv`, `MotionSection`, etc.) support these presets:

- `fadeIn` - Opacity animation
- `slideUp` / `slideDown` / `slideLeft` / `slideRight` - Directional slides
- `scaleIn` / `scaleUp` - Scale transformations

```tsx
import { MotionDiv } from '@/components/motion';

<MotionDiv preset="slideUp">Content</MotionDiv>;
```

### Section Provider Pattern

For sections with complex internal state, use the Provider pattern:

```tsx
// In section context file
export const SectionProvider = ({ children, ...props }) => {
  const [state, setState] = useState(...);
  return (
    <SectionContext.Provider value={{...}}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error('must be within provider');
  return ctx;
};

// In child component
const Child = () => {
  const { state } = useSection();
  return <div>{state}</div>;
};
```

Used in: Journey, Experience, Contact sections.

### Scroll-Driven State

For scroll-based animations:

1. Capture scroll with Framer's `useScroll()`
2. Use `useTransform()` to map scroll progress to values
3. Connect via ref to section element

```tsx
const { scrollYProgress } = useScroll({ target: sectionRef });
const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
```

### Theme Integration

Always use `useTheme()` to access color system:

```tsx
const { colors } = useTheme();

<div style={{ color: colors.cyan }}>
```

Colors available:

- `bg`, `bgSecondary`, `bgDark`
- `text`, `textSecondary`, `textMuted`, `textDim`
- `cyan`, `orange`, `gold`
- `border`, `divider`
- Glow variants: `cyanGlow`, `orangeGlow`, `goldGlow`

---

## Development Workflow

### Adding a New Feature to a Section

1. **Create component file** in appropriate subdirectory
2. **Add to index.ts** barrel export
3. **Import in parent** section component
4. **Connect to context** if sharing state
5. **Apply theme colors** via `useTheme()`
6. **Test** scroll/animation interactions
7. **Accessibility**: Add ARIA labels, focus rings, keyboard support

### Modifying Section Data

- **Journey**: Edit experience/location data in components' files
- **Experience**: Update skill categories, tools, or work history in `/data` folder
- **Contact**: Modify social links, locations in `/data/links.ts` & `/data/locations.ts`

### Performance Considerations

- D3 globe (Journey) uses SVG—monitor performance on low-end devices
- Parallax effects use Framer MotionValues (GPU-accelerated)
- Modal animations use custom easing: `[0.16, 1, 0.3, 1]`
- Scroll events are throttled; use `margin` in viewport detection

---

## Assets

### Badges & Visual Elements

- **Location**: `public/badges/` (production) & `resources/mockups/badges/` (development)
- **Current**:
  - `github-copilot.svg` - GitHub Copilot integration badge
- **Future**: Technology badges for tech stack display

### Images & Media

- Portrait images (stored separately, not in repo currently)
- D3 map data (TopoJSON files for globe)
- Background patterns (CSS + SVG)

### Resources

- `resources/backups/` - Version history of major components (don't delete)
- `resources/mockups/` - Full-page mockups for reference
- Useful for archaeological investigations during refactoring

---

## File Organization Reference

```
components/
├── ErrorBoundary/          # App-level error handling
├── layout/
│   ├── Header/            # Navigation bar
│   ├── GlobalBackground/  # Animated background system
│   ├── FloatingMoon/      # Corner moon element
│   └── ThemeToggle/       # Dark/light mode switch
├── motion/                # Framer Motion wrappers
│   ├── MotionDiv, MotionSection, etc.
│   ├── types.ts          # Animation preset types
│   └── variants.ts       # Predefined animation variants
└── sections/             # Full-page sections
    ├── Hero/
    ├── Journey/
    │   ├── context/       # JourneyProvider (modal, scroll state)
    │   ├── components/    # GlobeView, ExperienceCard, Modal
    │   ├── hooks/         # useJourneyScroll
    │   ├── types.ts       # Experience, Location types
    │   └── data/          # Journey data
    ├── Experience/
    │   ├── context/       # ExperienceProvider (tab, side state)
    │   ├── components/    # Timeline, SkillConstellation, ToolsGrid
    │   ├── types.ts       # SkillCategory, WorkExperience
    │   └── data/          # Skills, tools, experience data
    ├── Showcase/
    │   ├── context/       # ShowcaseProvider (filter, modal state)
    │   ├── components/    # ProjectCard, CaseStudy, FilterBar
    │   ├── types.ts       # Project, CaseStudy types
    │   └── data/          # Projects, case studies
    └── Contact/
        ├── context/       # ContactProvider (scroll state)
        ├── components/    # HeroContent, CTAButtons, Footer
        ├── hooks/         # useContactScroll
        ├── types.ts       # SocialLink, CTA types
        └── data/          # Links, locations data

context/
└── AnimationContext.tsx  # Global scroll & mouse state

theme/
├── theme.ts             # THEME object (colors, tokens)
├── ThemeProvider.tsx    # React Context wrapper
└── applyTheme.ts        # DOM utilities

styles/
└── theme.css           # CSS custom properties

hooks/                  # Custom hooks (mostly deprecated)
└── useActiveSide.tsx   # Use useAnimation() instead
```

---

## Database & External Services

**Current Setup**: All data is hardcoded/static

**Future Considerations**:

- Move Experience/Journey data to CMS or API
- Link social profiles via OAuth
- Contact form submission handling
- Resume hosting (currently static PDF)

---

## Deployment & CI/CD

- **Build**: `npm run build` → Next.js static/hybrid export
- **Preview**: `npm run start` → Production server
- **Linting**: ESLint via `npm run lint`
- **Mockup Page**: Available at `/mockup` route for testing

---

## Accessibility Checklist

- [ ] Skip link to main content (#main-content)
- [ ] Keyboard navigation on all interactive elements
- [ ] Focus-visible rings on buttons/links
- [ ] ARIA labels on images, buttons, sections
- [ ] Color contrast ratios ≥ 4.5:1 for text
- [ ] `prefers-reduced-motion` support (CSS + JS)
- [ ] Alt text on all images
- [ ] Semantic HTML (nav, main, footer, article, etc.)
- [ ] Screen reader testing with VoiceOver/NVDA

---

## Git Workflow

- **Main branch**: `master` (stable production)
- **Development branch**: `develop` (current working branch)
- **Feature branches**: `feature/description` (pull into develop)
- **Commits**: Descriptive messages, reference issues/PRs

**Example**:

```bash
git checkout -b feature/hero-refactor
# ... make changes ...
git commit -m "refactor: extract Title component from Hero"
git push origin feature/hero-refactor
# Create pull request to develop
```

---

## Known Issues & TODOs

### Code Organization

- ⚠️ Reduce inline styles across all components
- ⚠️ Consolidate sectional styles (move from inline to CSS)
- ⚠️ Replace GlobalBackground heavy rendering with canvas/WebGL

### Features

- [ ] Journal section (blog, writing)
- [ ] Showcase section (projects, case studies)
- [ ] Scroll-to-section navigation
- [ ] Dark mode persistence in localStorage
- [ ] Contact form with email validation

### Performance

- [ ] Lazy-load D3 globe in Journey section
- [ ] Optimize SVG paths and animations
- [ ] Image optimization for portraits
- [ ] Font subsetting (load only used glyphs)

### Content

- [ ] Fill out experience descriptions fully
- [ ] Add project images to Showcase section
- [ ] Update resume PDF with latest info

---

## Resources & Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [D3.js API](https://d3js.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Sections Overview

### 1. Hero Section (`/components/sections/Hero/`)

**Purpose**: Dual-perspective introduction establishing the Engineering/Adventure duality

**Architecture**:

- **HeroSection.tsx** - Main container, handles scroll & mouse tracking
- **Components**:
  - `Title` - Name display with fade-out on scroll
  - `OrbitalRings` - Animated SVG rings with rotation
  - `SideLabel` - "ENGINEERING" (left) & "ADVENTURE" (right) labels with mouse tracking
  - `PortraitOverlays` - Dual portrait system revealing based on scroll
  - `Tagline` - Dynamic tagline that changes based on active side
  - `ScrollIndicator` - Animated scroll cue disappearing on scroll

**Key Features**:

- Mouse-driven side activation (hover left/right → Engineering/Adventure)
- Scroll-based content opacity (fade out at 33% scroll progress)
- Portrait overlay reveal system (left/right based on side)
- Responsive cursor (crosshair on Hero area)
- Connected to GlobalBackground for synchronized theming

**State Management**:

- Uses `useAnimation()` context for:
  - `activeSide` - Current detected side
  - `lastActiveSide` - Previous non-neutral side
  - `smoothMouseX` - Smoothed mouse position (0-1)
  - `scrollYProgress` - Scroll position

**Styling Approach**:

- CSS custom properties for color switching
- Tailwind for layout & spacing
- Framer Motion for animations

---

### 2. Journey Section (`/components/sections/Journey/`)

**Purpose**: Interactive timeline with D3 globe visualization spanning 2013-2026

**Architecture**:

```
Journey/
├── JourneySection.tsx           # Main orchestrator
├── context/JourneyContext.tsx   # Modal state, visibility
├── hooks/useJourneyScroll.ts    # Scroll-driven keyframe interpolation
├── types.ts                      # Experience, Location, Timeline types
├── components/
│   ├── GlobeView.tsx            # D3-rendered 3D globe (optional flight paths)
│   ├── CardsContainer.tsx       # Left (engineering) + right (adventure) cards
│   ├── ExperienceCard.tsx       # Individual card with hover states
│   ├── ExperienceModal.tsx      # Full-screen detail view (modal)
│   ├── YearDisplay.tsx          # Current year/era indicator
│   ├── LocationDisplay.tsx      # Active location badge
│   ├── ProgressBar.tsx          # Top-of-page scroll progress
│   ├── ScrollIndicator.tsx      # "Scroll to explore" hint
│   └── StarField.tsx            # Parallax background
└── data/                        # Locations, experiences (via external API/config)
```

**Key Features**:

- **Scroll-Driven Timeline**: Keyframes interpolate between journey states
- **Dual Card System**: Engineering (left) & Adventure (right) experiences
- **Interactive Modals**: Click card → detailed view with images, content, fun facts
- **Globe Integration**: D3.js renders 3D globe with location markers
- **Dynamic Filtering**: Visible cards update based on scroll position
- **Flight Paths**: Optional animated arcs between locations (when transitioning)

**Data Structure**:

```typescript
interface Location {
  id: string;
  name: string;
  country: string;
  coords: [lng, lat];
  period: string; // e.g., "2019 – 2021"
  year: number;
  era: string; // e.g., "The Pivot"
  experiences: Experience[];
}

interface Experience {
  id: string;
  type: 'engineering' | 'adventure';
  title: string;
  subtitle?: string;
  desc: string;
  date: string;
  featured?: boolean;
  places?: string[];
  content: {
    intro: string;
    body: string; // HTML allowed
    tags: string[];
  };
  funFact?: string;
  hasVideo?: boolean;
  hasPhotos?: boolean;
}
```

**Scroll Keyframes** (0 → 1 scroll progress):

- Interpolates between timeline waypoints
- Each keyframe includes: year, era, scale, rotation, location visibility, card visibility
- Easing function: `easeOutQuart` for natural deceleration

**State Flow**:

1. Scroll → `useJourneyScroll` calculates interpolated state
2. State includes: `currentYear`, `currentLocation`, `visibleCards`, `flightData`
3. `JourneyProvider` distributes context to children
4. Components subscribe via `useJourney()` hook
5. Modal state via `JourneyContext.setModalExp()`

---

### 3. Experience Section (`/components/sections/Experience/`)

**Purpose**: Professional skills, tools, and work history showcase

**Architecture**:

```
Experience/
├── ExperienceSection.tsx          # Main wrapper with side toggle
├── context/ExperienceContext.tsx  # Tab & side state
├── types.ts                       # SkillCategory, Skill, Tool, WorkExperience
├── components/
│   ├── SectionHeader.tsx         # Title & description
│   ├── ContentArea.tsx           # Tab content switcher
│   ├── SectionTabs.tsx           # Expertise | Profession | Tools
│   ├── SideToggle.tsx            # Engineering | Adventure toggle
│   ├── SkillConstellation.tsx    # Skill bars with constellation backdrop
│   ├── ExperienceTimeline.tsx    # Work experience timeline
│   │   ├── TimelineItem.tsx      # Individual timeline entry
│   │   ├── TimelineContent.tsx   # Expandable role details
│   │   └── data.ts               # EXPERIENCE_DATA array
│   ├── ToolsGrid.tsx             # Grid of tools/equipment
│   └── Background.tsx            # Gradient orbs, grid pattern
└── data/
    ├── skills.ts                 # SKILL_CATEGORIES (engineering & adventure)
    └── tools.ts                  # TOOLS object + STATS array
```

**Three Tab Views**:

1. **Expertise** (Skills):
   - Engineering categories: Frontend, Backend, DevOps, Leadership
   - Adventure categories: Video Production, Photography, Storytelling
   - Each category has multiple skills with proficiency (0-100) & years
   - Visual: Skill bars with dots + optional constellation overlay

2. **Profession** (Work History):
   - Timeline from 2013 → Present
   - 4 major roles: CTS (current), FinCompare, Storebrand, CTS (initial)
   - Click timeline item to expand: highlights + tech stack
   - Visual: Vertical timeline with dots, connectors, and badges

3. **Tools**:
   - Engineering tools: VS Code, Node.js, React, Docker, AWS, etc.
   - Adventure gear: DJI Osmo, Sony A6000, GoPro, Rode Mic, etc.
   - Grid layout with icons + category labels
   - Organized by side (toggle left/right)

**Work Experience Data**:

```typescript
interface WorkExperience {
  id: string;
  period: string; // "2021 — Present"
  role: string; // "Senior Technical Lead"
  company: string; // "Cognizant Technology Solutions"
  location: string; // "Kolkata, India"
  type: 'engineering';
  current?: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
}
```

**Current Roles**:

1. **Senior Technical Lead** (2021–Present)
   - Cognizant, Kolkata
   - Leading 3-5 teams, enterprise clients (AXA, Allianz, S&P Global)
   - Tech: React, Node.js, GraphQL, AWS, Docker

2. **Senior UI Lead** (2019–2021)
   - FinCompare GmbH, Berlin
   - Component library, SME onboarding, FinTech

3. **UI Developer & Knowledge Lead** (2016–2019)
   - Storebrand ASA, Oslo
   - Full-stack customer portal ownership, React knowledge transition

4. **Software Engineer → Programmer Analyst** (2013–2016)
   - Cognizant, Chennai → Kolkata
   - Healthcare domain, innovation demos, COE member

**Accessibility**:

- Keyboard navigation on timeline items
- Screen reader labels for skill percentages
- Focus rings on interactive elements

---

### 4. Showcase Section (`/components/sections/Showcase/`)

**Status**: In development  
**Purpose**: Display of selected projects, case studies, and portfolio pieces

**Architecture**:

```
Showcase/
├── ShowcaseSection.tsx           # Main orchestrator
├── context/ShowcaseContext.tsx   # Filter, modal, sorting state
├── hooks/useShowcaseScroll.ts    # Scroll-driven visibility
├── types.ts                      # Project, CaseStudy, Technology
├── components/
│   ├── ProjectGrid.tsx          # Responsive grid layout
│   ├── ProjectCard.tsx          # Individual project preview
│   ├── CaseStudyModal.tsx       # Full case study view
│   ├── FilterBar.tsx            # Technology/domain filters
│   ├── SortOptions.tsx          # Sort by date, complexity, impact
│   ├── SearchBox.tsx            # Full-text project search
│   ├── TechBadges.tsx           # Technology pills/badges
│   ├── ImageGallery.tsx         # Case study photo carousel
│   ├── MetricsDisplay.tsx       # Performance, stats, metrics
│   └── Background.tsx           # Gradient, pattern styling
└── data/
    ├── projects.ts              # PROJECTS array
    ├── caseStudies.ts           # CASE_STUDIES object
    └── technologies.ts          # TECH_CATEGORIES
```

**Key Features**:

- **Project Grid**: Responsive card layout with image, title, description, tech stack
- **Filtering System**: Filter by technologies, project type, or timeline
- **Case Study Modal**: Deep-dive with problem statement, solution, results, metrics
- **Search**: Full-text search across project titles and descriptions
- **Sorting**: By date (latest first), complexity, impact, or alphabetical
- **Live Demos**: Links to deployed projects or GitHub repos
- **Image Gallery**: Before/after screenshots or process photos
- **Metrics Display**: Performance improvements, user impact, code stats

**Data Structure** (Planned):

```typescript
interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string; // Hero image
  technologies: string[]; // Tech used
  type: 'engineering' | 'adventure' | 'mixed';
  featured?: boolean;
  startDate: string;
  endDate?: string;
  links: {
    demo?: string; // Live URL
    repo?: string; // GitHub URL
    writeup?: string; // Blog post
  };
}

interface CaseStudy {
  projectId: string;
  challenge: string; // Problem statement
  solution: string; // How it was solved
  results: string; // Outcomes & impact
  metrics?: {
    label: string;
    value: string | number;
    unit?: string;
  }[];
  timeline?: string; // Duration
  team?: string; // Who was involved
  images?: string[]; // Gallery
  learnings?: string[]; // Key takeaways
}

enum TechCategory {
  Frontend = 'frontend',
  Backend = 'backend',
  DevOps = 'devops',
  Design = 'design',
  Video = 'video',
  Photography = 'photography',
}
```

**State Flow**:

1. `ShowcaseProvider` manages: `activeFilters`, `searchQuery`, `sortBy`, `selectedProject`
2. `useShowcase()` provides access to state and setters
3. `ProjectGrid` subscribes to filters and displays matching projects
4. Click project card → modal opens with full `CaseStudy` details
5. Scroll → `useShowcaseScroll` updates card visibility animations

**Styling Approach**:

- Grid layout: Tailwind responsive (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Cards: Hover scale effect, border highlight on filter match
- Modal: Overlay with smooth fade-in, scrollable content area
- Tech badges: Colored pills per category (cyan for engineering, orange for adventure)

**Accessibility**:

- Keyboard navigation: Tab through projects, Enter to open modal, Escape to close
- Screen reader labels: Project title, tech stack as list
- Focus management: Modal focus trap, restore on close
- Color + iconography for filter indicators (not color-only)

---

### 5. Contact Section (`/components/sections/Contact/`)

**Purpose**: Call-to-action, availability status, footer with social links

**Architecture**:

```
Contact/
├── ContactSection.tsx             # Main wrapper
├── context/ContactContext.tsx     # Scroll-driven state
├── hooks/useContactScroll.ts      # Scroll tracking
├── types.ts                       # SocialLink, CTAButton, TargetLocation
├── components/
│   ├── HeroContent.tsx           # Main CTA text + badge
│   ├── AvailabilityBadge.tsx     # Status indicator (actively looking, etc.)
│   ├── CTAButtons.tsx            # Primary & secondary buttons
│   │   ├── PrimaryCTA.tsx        # "Get in Touch" email link
│   │   ├── SecondaryCTA.tsx      # LinkedIn, Resume, GitHub
│   │   └── Icons.tsx             # SVG icon components
│   ├── CosmicBackground.tsx      # Animated particle/glow effects
│   ├── Footer/
│   │   ├── Footer.tsx            # Footer container
│   │   ├── FooterNav.tsx         # Navigation links
│   │   ├── SocialLinks.tsx       # LinkedIn, GitHub, Twitter, Instagram
│   │   ├── Copyright.tsx         # Year & attribution
│   │   └── TechStack.tsx         # "Built with Next.js, Framer Motion"
│   └── BackToTop.tsx             # Fixed scroll-to-top button
└── data/
    ├── links.ts                  # SOCIAL_LINKS, FOOTER_LINKS, CTA_CONFIG
    └── locations.ts              # TARGET_LOCATIONS, CURRENT_LOCATION
```

**CTA Buttons**:

- **Primary**: "Get in Touch" (mailto: hello@anindya.dev)
- **Secondary**:
  - LinkedIn (professional profile)
  - Resume (PDF download)
  - GitHub (code portfolio)

**Contact Information**:

- Email: hello@anindya.dev
- LinkedIn: linkedin.com/in/anindya
- GitHub: github.com/anindya
- Twitter: twitter.com/andysenclave
- Instagram: instagram.com/andysenclave

**Footer Content**:

- Signature: "🌙 ✨ The Divide between Engineering & Adventure"
- Tech stack: "Built with Next.js, Framer Motion & D3.js"
- Copyright: "© 2026 Thimple Solutions Pvt Ltd"
- Crafted in Kolkata with ☕

**Target Locations** (for future globe feature):

- Remote-friendly engineer seeking next chapter
- Willing to relocate globally

**Scroll Behavior**:

- `useContactScroll` hook tracks scroll position
- CTA buttons appear fixed on scroll (BackToTop style)
- Footer sticks to bottom with gradient fade-in effect
- Animations use custom easing: `[0.16, 1, 0.3, 1]` for bounce

**State Management**:

```typescript
interface ContactState {
  isScrolled: boolean;
  scrollProgress: MotionValue<number>;
  activeLink?: string;
}

interface ContactContextType {
  state: ContactState;
  setActiveLink: (link: string) => void;
}
```

**Styling Approach**:

- CTA buttons: Gradient backgrounds (cyan for primary, orange tint for secondary)
- Footer: Dark gradient background, light text for contrast
- Social icons: Animated hover states (lift + glow)
- Copyright: Small muted text, right-aligned on desktop
- Tech stack: Monospace font, smaller size, aligned with footer nav

**Accessibility**:

- All links have visible focus rings
- Icon buttons have aria-label descriptions
- Semantic footer element with landmarks
- Social links open in new tab with rel="noopener noreferrer"
- Skip link from header jumps to main content (includes Contact section)

**Performance**:

- CosmicBackground uses CSS animations (no JS scroll tracking)
- Lazy-load social link icons (SVG inline)
- BackToTop button only renders when scrolled past fold
- Footer uses CSS transforms for smooth animations

---

## Footer Component Details

**Location**: `components/sections/Contact/components/Footer/`

**Structure**:

```
Footer/
├── Footer.tsx          # Container, grid layout
├── FooterNav.tsx       # "About", "Projects", "Blog", etc.
├── SocialLinks.tsx     # LinkedIn, GitHub, Twitter, Instagram
├── Copyright.tsx       # Year & company attribution
├── TechStack.tsx       # "Built with..." credits
└── styles.module.css   # Scoped footer styles
```

**Content Sections**:

1. **Navigation Links** (FooterNav):
   - Home
   - Journey
   - Experience
   - Showcase
   - Contact
   - Blog (future)

2. **Social Links** (SocialLinks):
   - LinkedIn: https://linkedin.com/in/anindya
   - GitHub: https://github.com/andysenclave
   - Twitter: https://twitter.com/andysenclave
   - Instagram: https://instagram.com/andysenclave

3. **Tech Stack** (TechStack):
   - "Built with Next.js, Framer Motion & D3.js"
   - Version info: Next.js 16.1.1, React 19.2.3, Tailwind 4.1
   - Styled with monospace font for code feel

4. **Copyright** (Copyright):
   - "© 2026 Thimple Solutions Pvt Ltd"
   - "Crafted in Kolkata with ☕"
   - Auto-update year (current year variable)

**Layout**:

- Desktop: 3-column grid (Nav | Social | Tech+Copyright)
- Tablet: 2-column (Nav+Social | Tech+Copyright)
- Mobile: Single column, stacked vertically
- All elements centered within their cells

**Styling**:

- Background: Dark gradient (from `bg` → `bgDark`)
- Text: Light/muted gray for hierarchy
- Dividers: Subtle border between sections on desktop
- Spacing: Generous padding, 16px gaps between columns
- Hover states: Links underline + color change (cyan/orange)

**Responsive Breakpoints**:

```tsx
// Desktop (lg): 3 columns
// Tablet (md): 2 columns with wrapping
// Mobile (sm): 1 column, full width
```

**TypeScript Interfaces**:

```typescript
interface FooterLink {
  label: string;
  href: string;
  ariaLabel?: string;
  target?: '_blank' | '_self';
}

interface SocialLink extends FooterLink {
  icon: React.ReactNode;
  platform: 'linkedin' | 'github' | 'twitter' | 'instagram';
}
```

**Common Issues & Solutions**:

- **Footer not sticky**: Ensure parent layout uses `flex flex-col min-h-screen` and footer gets `mt-auto`
- **Links color mismatch**: Use `text-secondary` class, apply hover state with `hover:text-primary`
- **Social icons misaligned**: Use `flex items-center justify-center` on icon containers
- **Responsive spacing**: Use Tailwind breakpoints (`md:`, `lg:`) for column layout changes

---

## Sections

## Assets

- **Badges** (`public/badges/` and `resources/mockups/badges/`) - Technology badges and portfolio visual assets
  - `github-copilot.svg` - GitHub Copilot integration badge

## Git Workflow

- Main branch: `master`
- Feature branches for development
