# Project: Md Iftekhar Ferdous Portfolio Website

## Architecture
- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS v3 + custom glassmorphism utilities & CSS variables
- **3D / WebGL**: Three.js, `@react-three/fiber`, `@react-three/drei`, custom GLSL Shaders
- **Animation System**: GSAP 3 (ScrollTrigger, MotionPath), Framer Motion, Lenis smooth scroll (`@studio-freight/lenis`)
- **Database & Auth**: SQLite (`prisma/dev.db`), Prisma ORM, JWT authentication (`bcryptjs`, `jose`)
- **Data Proxy**: Server-side API route `/api/tmdb` and `/api/youtube` with automatic fallback mock datasets
- **Typography**: Syne / Space Grotesk (display), Inter / Plus Jakarta Sans (body), JetBrains Mono (code/EXIF)
- **Color Palette**: Dark mode dominant (`#050508` / `#09090b`) with neon cyan (`#00f3ff`) and electric purple (`#9d00ff`) accents

## Feature Inventory
Every feature from the Survey phase and updated requirements R1–R8 is mapped to a designated milestone below:

| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Infrastructure & Database Core | Next.js skeleton, Tailwind, Prisma SQLite schema (Projects, Movies, Certs, Gallery, Youtube, Timeline, Socials), seed data, JWT auth, API proxies | M1 | survey |
| 2 | Hero 3D & Preloader System | 60fps R3F particle hero, curtain preloader, custom cursor, audio toggle | M2 | survey |
| 3 | Portfolio Sections & Visual Showcase | About, Experience, 29 Skills Matrix, Projects Showcase, Gallery with EXIF | M3 | survey |
| 4 | Experience Timeline Section (R7) | Scroll-driven journey timeline with connecting animated lines (School, AmarEvents, Youtube 11.2K, Certs) | M3 | R7 |
| 5 | Movie Tracker Showcase | TMDB movie grid/carousel (Watched/Watching/Favs) with hover overlays | M4 | survey |
| 6 | Certificate Showcase | 10 verified certs with hashes, issuing orgs, skills filter, entrance reveals | M4 | survey |
| 7 | YouTube Channel Showcase (R6) | Draxy Gaming (11.2K subs), DRAXY ML, XxHyper, video embeds & series filters (Midas SMP, Meet Dexter) | M4 | R6 |
| 8 | Social Media Hub & Footer Strip (R8) | Live-feeling cards with hover glows/flips (YouTube, LinkedIn, IG, FB, Discord, GitHub, Email) + sticky/footer bar | M3 | R8 |
| 9 | Protected Admin CMS & Image Upload | Password auth (/admin), full CRUD for all 7 dynamic content types, image upload API | M5 | survey |
| 10 | E2E Testing Suite & Dual Track Verification | Tier 1-4 opaque-box E2E test suite, test runner, coverage reporting | M-TEST | survey |
| 11 | Adversarial Hardening & Final Gate | Pass 100% E2E tests, Tier 5 adversarial stress testing, Lighthouse >=80, 50+ fps audit | M6 | survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Project Setup & Data Backend Core | Next.js setup, dependencies, Prisma schema (9 models), DB seed from identity.md, Auth API, TMDB & Youtube proxies | none | DONE |
| M2 | Hero Canvas, Preloader & FX Engine | R3F particle scene, preloader, custom cursor, audio toggle, Lenis smooth scroll | M1 | IN_PROGRESS |
| M3 | Core Portfolio, Timeline & Social Hub | About, 29 Skills Matrix, GitHub Projects, Interactive Timeline (R7), Photo Gallery + EXIF, Social Hub (R8) | M1, M2 | IN_PROGRESS |
| M4 | Movie Tracker, YouTube & Cert Showcase | TMDB movie grid/carousel, YouTube Showcase (R6), 10 verified certs showcase + skill filtering | M1 | IN_PROGRESS |
| M5 | Protected Admin Panel CMS | Login, Auth middleware, full CRUD UI & API endpoints for all content types, image upload | M1 | IN_PROGRESS |
| M-TEST | E2E Test Infra & Suite Creation | Test harness, Tier 1-4 test cases (35+ total covering R1-R8), TEST_INFRA.md, TEST_READY.md | M1 | IN_PROGRESS |
| M6 | E2E Integration, Hardening & Final Gate | Pass 100% E2E tests, Tier 5 adversarial stress testing, Lighthouse >=80, 50+ fps check | M2, M3, M4, M5, M-TEST | PLANNED |

## Interface Contracts

### Public API ↔ Database (Prisma)
- `GET /api/projects` -> `Project[]`
- `GET /api/certificates` -> `Certificate[]`
- `GET /api/movies?category=watching|watched|favorites` -> `Movie[]` (from TMDB API or fallback DB)
- `GET /api/youtube` -> `YouTubeChannel[]` & `YouTubeVideo[]`
- `GET /api/timeline` -> `TimelineItem[]`
- `GET /api/socials` -> `SocialLink[]`
- `GET /api/gallery` -> `GalleryItem[]`
- `GET /api/identity` -> Full verified identity payload from identity.md

### Admin API ↔ Client Dashboard
- `POST /api/admin/login` -> `{ token, user }` (Sets HTTP-only session cookie)
- `POST /api/admin/logout` -> `{ success: true }`
- `POST /api/admin/[entity]` -> Create entity (requires auth JWT)
- `PUT /api/admin/[entity]/[id]` -> Update entity (requires auth JWT)
- `DELETE /api/admin/[entity]/[id]` -> Delete entity (requires auth JWT)
- `POST /api/admin/upload` -> File upload -> `{ url: "/uploads/filename.ext" }`

### Component Entry Points & FX
- `src/components/3d/HeroCanvas.tsx`: WebGL particle canvas with graceful 2D CSS gradient fallback on touch/no-WebGL
- `src/components/ui/CustomCursor.tsx`: Magnetic tracking ring & dot, hover expansion (`data-cursor="hover"`), hidden on touch (`pointer: coarse`)
- `src/components/ui/Preloader.tsx`: Counter reveal curtain transition (3s hard cutoff)
- `src/components/ui/AudioToggle.tsx`: Sound play/pause toggle with animated SVG equalizer bars
- `src/components/sections/ExperienceTimeline.tsx`: Scroll-triggered SVG path drawing & node reveals (R7)
- `src/components/sections/YoutubeShowcase.tsx`: YouTube channel cards, sub counts, video embeds & series filters (R6)
- `src/components/sections/SocialHubSection.tsx`: Platform branded glow cards & sticky social bar (R8)

## Code Layout
```
/root/pofo/
├── prisma/
│   ├── schema.prisma
│   ├── dev.db
│   └── seed.ts
├── public/
│   ├── fonts/
│   ├── uploads/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   └── dashboard/page.tsx
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── upload/route.ts
│   │   │   │   └── [entity]/[id]/route.ts
│   │   │   ├── tmdb/route.ts
│   │   │   ├── youtube/route.ts
│   │   │   ├── timeline/route.ts
│   │   │   └── socials/route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── HeroCanvas.tsx
│   │   │   └── ParticleField.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ExperienceTimeline.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── MovieTrackerSection.tsx
│   │   │   ├── YoutubeShowcase.tsx
│   │   │   ├── CertificateSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── SocialHubSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── ui/
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── Preloader.tsx
│   │   │   ├── AudioToggle.tsx
│   │   │   ├── StickySocialBar.tsx
│   │   │   └── Navbar.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── tmdb.ts
│   │   ├── youtube.ts
│   │   └── mockData.ts
```
