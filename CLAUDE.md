# Lunar Divide Folio - AI Assistant Documentation

Portfolio website for Anindya Mukherjee (Andysenclave) featuring an interactive dual-theme design with Engineering and Adventure personas.

## Tech Stack

- **Framework**: Next.js 16.1.1 with React 19.2.3
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4.1 with CSS custom properties
- **Animation**: Framer Motion 12.23
- **Data Viz**: D3 7.9 + TopoJSON (for future use)

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
└── sections/           # Page sections (HeroSection with nested components)

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
<MotionDiv preset="fadeIn">Content</MotionDiv>

// Available presets: fadeIn, slideUp, slideDown, slideLeft, slideRight, scaleIn, scaleUp
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

## Navigation Sections (Planned)
- Engineering (left side) - Technical work
- Adventure (right side) - Travel/exploration
- Journal - Blog/writing
- Contact - CTA

## Git Workflow
- Main branch: `master`
- Feature branches for development
