# Lunar Divide Folio

> A professional portfolio website showcasing a dual-perspective career narrative through interactive, scroll-driven experiences.

**Live Demo**: [andysenclave.com](https://andysenclave.com)  
**Repository**: [GitHub](https://github.com/andysenclave/lunar-divide-folio)  
**Status**: Active Development (v0.2.0 - Experience Section Release)

---

## 📋 Table of Contents

- [Project Vision](#project-vision)
- [Technical Stack](#technical-stack)
- [Architecture Overview](#architecture-overview)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Guide](#development-guide)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Project Vision

### Concept

Lunar Divide Folio is a next-generation portfolio that presents a **dual-narrative career story** through the metaphor of two personas:

- **Engineering Side** (Cyan #00D9FF) - Technical work, projects, and professional achievements
- **Adventure Side** (Orange #FF6B35) - Travel, exploration, personal growth, and experiences

The portfolio uses sophisticated web technologies to create an immersive, **scroll-driven journey** through a 13-year professional timeline (2013-2026), visualized on an interactive D3.js globe with contextual experience cards.

### Target Audience

- Potential employers and collaborators
- Tech recruiters and hiring managers
- Fellow professionals and peers
- Curious explorers interested in storytelling through code

### Design Philosophy

1. **Functional Beauty** - Aesthetics serve narrative purpose
2. **Performance First** - Smooth animations even on low-end devices
3. **Accessibility Always** - WCAG 2.1 AA compliance with keyboard-first navigation
4. **Progressive Enhancement** - Works without JavaScript, enhanced with it
5. **Mobile Optimized** - Desktop-first design with responsive fallbacks

---

## 🛠 Technical Stack

### Core Framework

| Technology     | Version | Purpose                         | License    |
| -------------- | ------- | ------------------------------- | ---------- |
| **Next.js**    | 16.1.1  | React framework with App Router | MIT        |
| **React**      | 19.2.3  | UI component library            | MIT        |
| **TypeScript** | 5.x     | Static type safety              | Apache 2.0 |

### Styling & Design

| Technology                | Version | Purpose                     | License |
| ------------------------- | ------- | --------------------------- | ------- |
| **Tailwind CSS**          | 4.1     | Utility-first CSS framework | MIT     |
| **PostCSS**               | Latest  | CSS transformation          | MIT     |
| **CSS Custom Properties** | Native  | Design token system         | -       |

### Animation & Motion

| Technology        | Version | Purpose                    | License |
| ----------------- | ------- | -------------------------- | ------- |
| **Framer Motion** | 12.23   | React animation library    | MIT     |
| **D3.js**         | 7.9     | Data visualization library | ISC     |
| **TopoJSON**      | Latest  | Geospatial data format     | BSD     |

### Development Tools

| Tool         | Purpose            |
| ------------ | ------------------ |
| **ESLint**   | JavaScript linting |
| **Prettier** | Code formatting    |
| **npm**      | Package management |
| **Git**      | Version control    |

### External Services

| Service                  | Purpose              | Status     |
| ------------------------ | -------------------- | ---------- |
| **World Atlas (CDN)**    | World map data       | Active     |
| **India TopoJSON (CDN)** | India map data       | Active     |
| **Vercel**               | Hosting & deployment | Production |

---

## 🏗 Architecture Overview

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
│                  (app/ directory structure)                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Root Layout (layout.tsx)                │   │
│  │  ├─ ErrorBoundary (error handling)                   │   │
│  │  ├─ ThemeProvider (dark/light mode)                  │   │
│  │  ├─ Skip Link (keyboard navigation)                  │   │
│  │  └─ Fonts (Sora, Inter, JetBrains Mono)            │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          Page Component (page.tsx)                   │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │     AnimationProvider (Context)                │  │   │
│  │  │                                                │  │   │
│  │  │  ┌──────────────────────────────────────────┐ │  │   │
│  │  │  │      MainLayout Component                │ │  │   │
│  │  │  │                                          │ │  │   │
│  │  │  │ ┌────────────────────────────────────┐  │ │  │   │
│  │  │  │ │   GlobalBackground (Styled Div)   │  │ │  │   │
│  │  │  │ │ ┌─────────────────────────────┐   │  │ │  │   │
│  │  │  │ │ │ Header (Navigation)         │   │  │ │  │   │
│  │  │  │ │ └─────────────────────────────┘   │  │ │  │   │
│  │  │  │ │ ┌─────────────────────────────┐   │  │ │  │   │
│  │  │  │ │ │ FloatingMoon (Animated)     │   │  │ │  │   │
│  │  │  │ │ └─────────────────────────────┘   │  │ │  │   │
│  │  │  │ │ ┌─────────────────────────────┐   │  │ │  │   │
│  │  │  │ │ │ HeroSection (100vh)         │   │  │ │  │   │
│  │  │  │ │ └─────────────────────────────┘   │  │ │  │   │
│  │  │  │ └────────────────────────────────────┘  │  │  │   │
│  │  │  │ ┌──────────────────────────────────────┐│  │  │   │
│  │  │  │ │ JourneySection (2800vh, sticky)      ││  │  │   │
│  │  │  │ │ - Globe, Timeline, Cards, Modal      ││  │  │   │
│  │  │  │ └──────────────────────────────────────┘│  │  │   │
│  │  │  └──────────────────────────────────────────┘  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### State Management Architecture

```
┌─────────────────────────────────────────────────────┐
│           AnimationContext                          │
│                                                     │
│  MotionValues (Framer Motion):                     │
│  ├─ scrollYProgress (0-1, scroll position)         │
│  └─ smoothMouseX (0-1, smoothed mouse X)           │
│                                                     │
│  State (React):                                    │
│  ├─ activeSide (engineering|adventure|neutral)    │
│  ├─ lastActiveSide (persists on mouse leave)      │
│  ├─ prefersReducedMotion (accessibility)          │
│  └─ handlers (handleMouseMove, handleMouseLeave)  │
│                                                     │
│  Consumers: Header, Hero, FloatingMoon, Journey   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Journey Section Data Flow

```
Scroll Event
    │
    ▼
useJourneyScroll Hook
    ├─ Track progress (0-1, based on 2800vh)
    ├─ useScrollTimeline (50+ keyframes)
    ├─ Interpolate state
    └─ Update components:
        ├─ GlobeView (D3 rendering)
        ├─ YearDisplay
        ├─ LocationDisplay
        ├─ CardsContainer
        └─ ScrollIndicator
```

---

## ✨ Key Features

### 1. Dual-Perspective Narrative

- Split-screen design with engineering (left) and adventure (right) personas
- Mouse position dynamically highlights active side
- Smooth transitions between personas
- Color-coded accent colors (cyan/orange)

### 2. Scroll-Driven Journey Timeline

- 2800vh container for extended scrolling experience
- Timeline reveals 5 major locations (2013-2026)
- 30+ experiences organized by location
- Smooth transitions between locations
- Sticky viewport shows global state while page scrolls

### 3. Interactive D3 Globe

- 3D orthographic projection
- World and India maps rendered with TopoJSON
- Color-coded location markers
- Animated flight paths between locations
- Pulse animations on active markers
- Smooth rotation and scaling on scroll

### 4. Experience Cards

- Dual-column layout (engineering left, adventure right)
- Cards reveal sequentially with scroll
- Featured badges on highlighted experiences
- Click to open full modal view
- Rich content with HTML support

### 5. Professional Experience Section

- **Skills Dashboard** - Categorized skills with proficiency indicators
- **Work Timeline** - Interactive chronological career display
  - Expandable role details with highlights
  - Technology stack tags per role
  - Visual current position indicator
- **Tools Overview** - Comprehensive tooling across the stack
- **Tab Navigation** - Switch between Expertise, Experience, and Tools views
- **Side Toggle** - Engineering vs Adventure perspective filter
- Full keyboard navigation and ARIA accessibility

### 6. Accessibility First

- Skip links for keyboard navigation
- Focus-visible indicators on all interactive elements
- Reduced motion support (detects `prefers-reduced-motion`)
- Screen reader utilities (`.sr-only`)
- Semantic HTML throughout
- WCAG 2.1 AA target compliance

### 7. Dark/Light Theme Support

- CSS custom properties for theming
- Framer Motion-powered theme transitions
- Persistent theme selection
- Automatic detection of system preference

### 8. Performance Optimized

- Lazy-loaded D3 assets (from CDN)
- Scroll timeline pre-computed
- Motion values optimized for 60fps
- Image optimization via Next.js Image
- Code splitting and lazy routes

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17+ or 20.9+
- **npm** 8+ or **yarn** 3+
- **Git** 2.0+

### Installation

```bash
# Clone the repository
git clone https://github.com/andysenclave/lunar-divide-folio.git
cd lunar-divide-folio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Useful Commands

```bash
npm run dev              # Start dev server
npm run build            # Create production build
npm start                # Run production build
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript types
```

---

## 📁 Project Structure

```
lunar-divide-folio/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                  # React components
│   ├── ErrorBoundary/           # Error handling
│   ├── layout/                  # Layout components
│   ├── motion/                  # Animation wrappers
│   └── sections/                # Page sections
│       ├── Hero/                # Dual-perspective hero
│       ├── Journey/             # Scroll-driven globe timeline
│       └── Experience/          # Skills, tools, work history
│           ├── context/         # Provider pattern state
│           ├── components/      # Modular UI components
│           └── data/            # Skills, tools data
├── context/                     # React Context
│   └── AnimationContext.tsx
├── theme/                       # Theme system
├── constants/                   # App constants
└── public/                      # Static assets
```

---

## 💻 Development Guide

### Understanding the Animation System

```typescript
import { useAnimation } from '@/context';

function MyComponent() {
  const { scrollYProgress, activeSide, prefersReducedMotion } = useAnimation();
  // Use motion values for animations
}
```

### Motion Components with Presets

```typescript
import { MotionH1, MotionDiv } from '@/components/motion';

<MotionH1 preset="fadeIn">Welcome</MotionH1>
<MotionDiv preset="slideLeft">Content</MotionDiv>
```

Available presets: `fadeIn`, `slideLeft`, `slideRight`, `scaleIn`, `scaleUp`

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### Performance Targets

- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Lighthouse Score: 90+

---

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Developer patterns and architecture
- **[PR_DESCRIPTION.md](./PR_DESCRIPTION.md)** - PR details and changes
- **[Next.js Docs](https://nextjs.org/docs)** - Next.js documentation
- **[Framer Motion Docs](https://www.framer.com/motion)** - Animation library

---

## 👤 Author

**Anindya Mukherjee** (Andysenclave)

- Portfolio: [andysenclave.com](https://andysenclave.com)
- GitHub: [@andysenclave](https://github.com/andysenclave)
- Email: [andysenclave@gmail.com](mailto:andysenclave@gmail.com)

---

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details.

---

**Last Updated**: January 20, 2026
**Version**: 0.2.0
**Status**: Active Development
