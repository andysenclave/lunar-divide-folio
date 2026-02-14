# Deployment Plan — andysenclave.com

**Project**: Lunar Divide Folio (Next.js 16.1.1 Portfolio)
**Domain**: andysenclave.com (GoDaddy)
**Platform**: Vercel
**CI/CD**: GitHub Actions (quality gates) + Vercel (deployment)
**Last Updated**: February 2026

---

## Table of Contents

1. [Platform Decision](#1-platform-decision)
2. [Architecture Overview](#2-architecture-overview)
3. [Phase 1 — Foundation: Vercel + CI Basics](#3-phase-1--foundation)
4. [Phase 2 — Environments: dev / QA / UAT](#4-phase-2--environments)
5. [Phase 3 — Testing & Quality Gates](#5-phase-3--testing--quality-gates)
6. [Phase 4 — Production Release](#6-phase-4--production-release)
7. [Environment Variables](#7-environment-variables)
8. [Cost Analysis](#8-cost-analysis)

---

## 1. Platform Decision

**Vercel** — the native hosting platform for Next.js.

Why this is the right fit:

- **Zero-config deployment** — push to GitHub, Vercel builds and deploys automatically
- **`@vercel/blob` already integrated** — CDN assets (`config/cdn.ts`) point to Vercel Blob storage; no migration needed
- **`next/image` optimization built-in** — edge-optimized image serving, no self-hosted image server
- **Automatic SSL** — certificates provisioned and renewed without configuration
- **Preview deployments** — every PR gets a unique URL for review
- **Edge network** — 100+ PoPs globally, CDN + DDoS protection included
- **Free tier** — more than sufficient for a portfolio (100 GB bandwidth, 6,000 build minutes/month)
- **No maintenance burden** — no OS updates, no Node version management, no Nginx, no process managers

This project has no database, no backend API routes, no middleware, and no custom server — making Vercel's serverless-first model a perfect match.

---

## 2. Architecture Overview

```
                        GitHub Actions              Vercel
                        (Quality Gates)             (Deployment)
                        ─────────────               ──────────────

PR opened ──────────┬── Lint (ESLint)           ┬── Preview URL
                    ├── Type-check (tsc)        │   (*.vercel.app)
                    ├── Tests (Jest)            │
                    └── SonarCloud              │
                                                │
All checks pass? ───┤                           │
  NO  → PR blocked  │                           │
  YES → Mergeable ──┘                           │
                                                │
Merge ──────────────────────────────────────────┴── Deploy to environment
                                                    ├── develop  → dev.andysenclave.com
                                                    ├── staging  → uat.andysenclave.com
                                                    └── master   → andysenclave.com
```

### Git Workflow

```
Feature Branch                    Preview URL (auto-generated)
    │
    ▼ PR to develop
develop ──────────────────────── dev.andysenclave.com
    │
    ▼ PR to release/v0.x.x
release/v0.x.x ─────────────── qa.andysenclave.com
    │                            (QA testing)
    ▼ PR to staging
staging ─────────────────────── uat.andysenclave.com
    │                            (Stakeholder sign-off)
    ▼ PR to master
master ──────────────────────── andysenclave.com
                                 (Production)
```

---

## 3. Phase 1 — Foundation

**Goal**: Get the app building and deploying on Vercel with basic CI checks.

### 3.1 Vercel Project Setup

1. Create Vercel account (or sign in) at [vercel.com](https://vercel.com)
2. Import GitHub repo: `andysenclave/lunar-divide-folio`
3. Set `master` as the production branch
4. Verify build succeeds — test at the auto-generated `*.vercel.app` URL

### 3.2 Domain Configuration (GoDaddy → Vercel)

**Recommended**: Transfer DNS management to Vercel for fastest propagation.

```
GoDaddy → Domain Settings → Nameservers → Change to:

  ns1.vercel-dns.com
  ns2.vercel-dns.com
```

Then in Vercel Dashboard → Domains, add:

```
andysenclave.com       → master branch (Production)
www.andysenclave.com   → redirects to andysenclave.com
```

**Alternative** (keep GoDaddy DNS):

```
Type    Name    Value                   TTL
─────────────────────────────────────────────────
A       @       76.76.21.21             600
CNAME   www     cname.vercel-dns.com    600
```

Note: GoDaddy DNS propagation can take 24-48 hours vs minutes with Vercel nameservers.

### 3.3 Vercel Configuration

Add `vercel.json` to project root:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": {
      "master": true,
      "develop": true,
      "staging": true
    }
  },
  "redirects": [
    {
      "source": "/mockup",
      "destination": "/",
      "permanent": false,
      "has": [
        {
          "type": "host",
          "value": "andysenclave.com"
        }
      ]
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

This blocks `/mockup` on production and adds security headers globally.

### 3.4 GitHub Actions — CI Pipeline

Location: `.github/workflows/ci.yml`

**Phase 1 jobs** (active immediately):

| Job | What it does | Blocks merge? |
|-----|-------------|---------------|
| `lint` | Runs ESLint with Prettier rules | Yes |
| `typecheck` | Runs `tsc --noEmit` (full type check) | Yes |
| `build` | Runs `next build` (depends on lint + typecheck) | Yes |

**Concurrency**: Duplicate runs on the same branch auto-cancel.

### 3.5 Branch Protection — develop

GitHub → Settings → Branches → Add rule for `develop`:

```
✓ Require status checks to pass before merging
  Required checks: lint, typecheck, build
✓ Require branches to be up to date before merging
```

### Phase 1 Checklist

- [x] ~~Vercel project created and linked to GitHub~~
- [x] ~~`master` set as production branch~~
- [x] ~~Environment variables added in Vercel Dashboard~~
- [x] ~~Nameservers transferred (or DNS records added)~~ *(kept GoDaddy DNS; A + CNAME records added)*
- [x] ~~SSL auto-provisioned, `andysenclave.com` resolves~~
- [ ] `vercel.json` committed *(created locally, pending push)*
- [ ] `.github/workflows/ci.yml` committed *(created locally, pending push)*
- [ ] Branch protection enabled on `develop`
- [ ] First successful CI run on a PR

---

## 4. Phase 2 — Environments

**Goal**: Set up dev, QA, and UAT subdomains with branch-based deployments.

### 4.1 Subdomain DNS

If using Vercel nameservers (recommended), add in Vercel Dashboard → Domains:

```
dev.andysenclave.com   → develop branch
qa.andysenclave.com    → release/* branches
uat.andysenclave.com   → staging branch
```

If using GoDaddy DNS, add CNAME records:

```
Type    Name    Value                   TTL
─────────────────────────────────────────────────
CNAME   dev     cname.vercel-dns.com    600
CNAME   qa      cname.vercel-dns.com    600
CNAME   uat     cname.vercel-dns.com    600
```

### 4.2 Branch Setup

Create the `staging` branch (for UAT):

```bash
git checkout master
git checkout -b staging
git push origin staging
```

### 4.3 Environment Matrix

```
Branch              Environment    Domain                      Purpose
────────────────────────────────────────────────────────────────────────
develop             DEV            dev.andysenclave.com        Active development
release/* or qa/*   QA             qa.andysenclave.com         QA testing
staging             UAT            uat.andysenclave.com        Stakeholder sign-off
master              PRODUCTION     andysenclave.com            Live site
                                   www.andysenclave.com
```

### 4.4 Vercel Analytics

Enable in Vercel Dashboard (free with Hobby tier):

- **Analytics** — Core Web Vitals (LCP, FID, CLS) per deployment
- **Speed Insights** — Real user performance monitoring

### Phase 2 Checklist

- [x] ~~`staging` branch created from `master`~~
- [x] ~~`dev.andysenclave.com` assigned to `develop` branch~~
- [ ] `qa.andysenclave.com` assigned to `release/*` pattern *(deferred — not needed until release branches are in use)*
- [x] ~~`uat.andysenclave.com` assigned to `staging` branch~~
- [x] ~~All subdomains resolve with SSL~~
- [x] ~~Vercel Analytics enabled~~ *(Web Analytics + Speed Insights)*
- [ ] `/mockup` blocked on production, accessible on dev *(configured in `vercel.json`, pending push)*
- [ ] Lighthouse audit run on production URL

---

## 5. Phase 3 — Testing & Quality Gates

**Goal**: Set up Jest, write tests, enforce coverage thresholds, integrate SonarCloud.

### 5.1 Jest Configuration

**`jest.config.ts`**:
```typescript
import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterSetup: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'context/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'config/**/*.{ts,tsx}',
    'theme/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/types.ts',
    '!**/index.ts',
    '!**/data/**',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};

export default createJestConfig(config);
```

**`jest.setup.ts`**:
```typescript
import '@testing-library/jest-dom';
```

**Package.json scripts to add**:
```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

### 5.2 Test Directory Structure

```
__tests__/
├── components/
│   ├── layout/
│   │   └── Header.test.tsx
│   ├── motion/
│   │   └── MotionDiv.test.tsx
│   └── sections/
│       ├── Hero.test.tsx
│       └── Journey.test.tsx
├── context/
│   └── AnimationContext.test.tsx
├── config/
│   └── cdn.test.ts
└── theme/
    └── ThemeProvider.test.tsx
```

**Priority test targets** (start here for fastest coverage gains):
1. `config/cdn.ts` — pure functions, easy to test
2. `theme/ThemeProvider.tsx` — context provider, predictable behavior
3. `context/AnimationContext.tsx` — context provider
4. `components/motion/*` — wrapper components with presets

### 5.3 CI Test Job

The `test` job in `.github/workflows/ci.yml` runs:
```
npm test -- --coverage --coverageReporters=text --coverageReporters=lcov
```

Coverage report is uploaded as a GitHub artifact (retained 7 days).

### 5.4 Branch Protection — staging (UAT gate)

GitHub → Settings → Branches → Add rule for `staging`:

```
✓ Require status checks to pass before merging
  Required checks: lint, typecheck, build, test
✓ Require branches to be up to date before merging
```

### 5.5 SonarCloud Integration

1. Sign up at [sonarcloud.io](https://sonarcloud.io) with GitHub
2. Import `andysenclave/lunar-divide-folio`
3. Copy `SONAR_TOKEN` → add as GitHub repo secret (Settings → Secrets → Actions)
4. Create `sonar-project.properties` in project root:

```properties
sonar.projectKey=andysenclave_lunar-divide-folio
sonar.organization=andysenclave
sonar.sources=app,components,config,context,hooks,theme
sonar.tests=__tests__
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.coverage.exclusions=**/*.test.tsx,**/*.spec.tsx,**/types.ts,**/data/**
sonar.qualitygate.wait=true
```

5. Uncomment the `sonar` job in `.github/workflows/ci.yml`

**SonarCloud default quality gate enforces**:
```
Coverage on new code ≥ 80%
Duplicated lines on new code < 3%
Maintainability rating: A
Reliability rating: A
Security rating: A
No new bugs
No new vulnerabilities
No new security hotspots
```

### 5.6 Coverage Ramp-Up Plan

```
Phase 3a: Initial tests       → 0% → 30%  (CDN, theme, context)
Phase 3b: Component tests     → 30% → 60% (motion, layout, sections)
Phase 3c: Production-ready    → 60% → 80% (edge cases, integration)
```

The Jest config starts with a 60% threshold. Raise to 80% before enabling the production gate.

### Phase 3 Checklist

- [x] ~~`jest.config.ts` and `jest.setup.ts` created~~ *(created locally, pending push)*
- [x] ~~Test scripts added to `package.json`~~ *(test, test:watch, test:coverage added)*
- [ ] First tests written (CDN config, theme provider)
- [ ] CI test job running and passing
- [ ] Coverage at 60%+ (Phase 3b threshold)
- [ ] Branch protection on `staging` requires `test` check
- [ ] SonarCloud project created and token stored
- [x] ~~`sonar-project.properties` created~~ *(created locally, pending push)*
- [ ] Sonar job uncommented and running
- [ ] Coverage at 80%+ (Phase 3c threshold)

---

## 6. Phase 4 — Production Release

**Goal**: Full quality gates enforced, first production deployment to andysenclave.com.

### 6.1 Final Jest Threshold

Update `jest.config.ts` coverage threshold:

```typescript
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
},
```

### 6.2 Branch Protection — master (Production gate)

GitHub → Settings → Branches → Add rule for `master`:

```
✓ Require status checks to pass before merging
  Required checks: lint, typecheck, build, test, sonar
✓ Require branches to be up to date before merging
✓ Require pull request reviews (1 approval)
✓ Do not allow bypassing the above settings
✓ Restrict who can push (no direct pushes)
```

### 6.3 Quality Gate Summary

```
                    develop     staging     master
                    (dev/QA)    (UAT)       (Production)
────────────────────────────────────────────────────────
Lint                REQUIRED    REQUIRED    REQUIRED
Type-check          REQUIRED    REQUIRED    REQUIRED
Build               REQUIRED    REQUIRED    REQUIRED
Tests pass          —           REQUIRED    REQUIRED
Coverage ≥ 80%      —           —           REQUIRED
SonarCloud pass     —           —           REQUIRED
PR review           —           —           REQUIRED
```

### 6.4 Production Release Flow

```
1. Code on feature branch, PR to develop
   → CI: lint + typecheck + build
   → Vercel: preview URL
   → Merge → deploys to dev.andysenclave.com

2. Create release branch, PR to staging
   → CI: lint + typecheck + build + tests
   → Vercel: preview URL
   → QA tests on qa.andysenclave.com
   → Merge → deploys to uat.andysenclave.com

3. PR staging to master
   → CI: lint + typecheck + build + tests + sonar
   → Coverage ≥ 80%, quality gate pass
   → PR review approved
   → Merge → deploys to andysenclave.com
```

### 6.5 Post-Release

- Verify `andysenclave.com` serves the new version
- Check Vercel Analytics for Core Web Vitals
- Run Lighthouse audit (target: 90+ across all categories)
- Verify `robots.txt` and `sitemap.xml` at production URL
- Confirm Open Graph and Twitter Card meta tags

### Phase 4 Checklist

- [ ] Coverage threshold raised to 80%
- [ ] SonarCloud quality gate passing
- [ ] Branch protection on `master` fully configured
- [ ] First PR merged to `master` through full pipeline
- [x] ~~`andysenclave.com` live and verified~~ *(deployed, edge-served from BOM1 Mumbai)*
- [ ] Lighthouse scores 90+
- [ ] SEO meta tags verified (OG, Twitter, canonical)
- [x] ~~`www.andysenclave.com` redirects to `andysenclave.com`~~ *(301 redirect configured in Vercel)*

---

## 7. Environment Variables

### The Rule

**Local** = `.env.local` (gitignored, Next.js auto-loads it)
**Vercel** = Dashboard UI (injected at build time, no `.env` file deployed)

### Local Development

```
.env.local (on your machine, never committed)
  BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
  NEXT_PUBLIC_BLOB_BASE_URL=https://...public.blob.vercel-storage.com
  NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Vercel Dashboard Scoping

```
Variable                        Production   Preview   Development
──────────────────────────────────────────────────────────────────
BLOB_READ_WRITE_TOKEN           ✓            ✓         ✓
  (same token — all environments share one Blob store)

NEXT_PUBLIC_BLOB_BASE_URL       ✓            ✓         ✓
  (same CDN URL — assets are shared across environments)

NEXT_PUBLIC_SITE_URL
  Production:  https://andysenclave.com       ✓
  Preview:     https://dev.andysenclave.com             ✓         ✓
```

Path variables (`NEXT_PUBLIC_*_PATH`) have defaults in `config/cdn.ts` — no need to set them in Vercel unless overriding.

**Required variables** (minimum to set in Vercel):
1. `BLOB_READ_WRITE_TOKEN` — Blob storage secret
2. `NEXT_PUBLIC_BLOB_BASE_URL` — CDN base URL

### .gitignore Pattern

```gitignore
# env files (keep .env.example for documentation)
.env
.env.local
.env*.local
```

Allows `.env.example` to be committed as a setup template.

### Security Notes

- `BLOB_READ_WRITE_TOKEN` is a write token — only needed for uploading assets, not for reads
- CDN reads are public (the `NEXT_PUBLIC_BLOB_BASE_URL` is a public URL)
- Production may not need the write token unless uploading assets during build
- All secrets stay in Vercel Dashboard — never in code, never in git

---

## 8. Cost Analysis

```
Vercel Hobby (Free Tier):
├── 100 GB bandwidth/month          ✓ Portfolio won't exceed this
├── 6,000 build minutes/month       ✓ More than enough
├── Serverless function executions   ✓ None needed
├── Image optimization              ✓ 1,000 source images
├── Analytics                       ✓ Core Web Vitals included
├── Preview deployments              ✓ Unlimited
├── SSL certificates                 ✓ Auto-provisioned
├── Custom domains                   ✓ Unlimited
└── Edge network (100+ PoPs)         ✓ Global CDN

Vercel Blob (current usage):
├── 250 MB storage (free)            ✓ Portfolio images fit easily
└── 1 GB bandwidth/month (free)      ✓ Sufficient for portfolio traffic

GitHub Actions (free for public repos, 2,000 min/mo for private):
├── CI runs per month                ✓ Well within limits
└── Artifact storage                 ✓ Coverage reports (7-day retention)

SonarCloud:
└── Free for public repos            ✓ Open source plan

GoDaddy domain:
└── ~$12-20/year renewal             (already owned)

Total monthly cost: $0
Total annual cost: $12-20 (domain renewal only)
```

Vercel Pro ($20/mo) only needed for: team collaboration, password-protected previews, or advanced analytics.
