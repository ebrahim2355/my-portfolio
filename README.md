# Ebrahim Ali Portfolio

A production-style personal portfolio built with Next.js and TypeScript, focused on strong visual identity, smooth motion, and recruiter-friendly project storytelling.

This portfolio highlights:
- Modern UI engineering with reusable components
- End-to-end project case studies (problem, role, decisions, impact)
- Responsive layouts for desktop and mobile
- Contact workflow with EmailJS integration
- Performance and UX improvements (static prerendering, lazy loading, accessibility updates)

---

## Table of Contents

1. Project Overview
2. Live Demo
3. Core Features
4. Tech Stack
5. Project Structure
6. Architecture Notes
7. Routes and Pages
8. Data Model
9. UI and Animation System
10. Fire Cursor Effect
11. SEO and Metadata
12. Accessibility
13. Performance
14. Local Development
15. Environment Variables
16. Build and Deployment
17. Customization Guide
18. Troubleshooting
19. Roadmap
20. Contact

---

## 1. Project Overview

This project is a personal developer portfolio designed to:
- Showcase real projects in a case-study format
- Communicate technical depth and product thinking
- Provide a polished, memorable visual experience
- Convert visitors into opportunities (contact, resume download)

The codebase is structured for maintainability with reusable components, page-level sections, and data-driven content via local JSON files.

---

## 2. Live Demo

- Production URL: https://ebrahim.dev

---

## 3. Core Features

### 3.1 Home Experience
- Animated hero with split-text intro
- Resume CTA + contact CTA
- Featured projects preview
- Skills and stats sections

### 3.2 About Page
- About intro and value positioning
- "What I Do" capabilities section
- Education section
- Experience timeline
- Skills grid

### 3.3 Projects System
- Data-driven project listing from `projects.json`
- Technology filter controls
- Dynamic project details route: `/projects/:id`
- Rich case-study sections:
  - Problem
  - Role and duration
  - Engineering decisions
  - What was built
  - Outcomes / impact
- Screenshot viewer with fullscreen preview

### 3.4 Contact Workflow
- React Hook Form for validation
- EmailJS integration for sending messages
- Toast feedback for status and errors

### 3.5 Global Visual Effects
- Neon particle background across pages
- Animated navigation micro-interactions
- Global custom fire cursor effect (desktop, reduced-motion aware)

---

## 4. Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- DaisyUI
- Framer Motion

### Forms / UX
- React Hook Form
- React Hot Toast
- React Icons

### Integrations
- EmailJS

### Tooling
- ESLint

---

## 5. Project Structure

```text
my-portfolio2/
├─ public/
│  ├─ resume.pdf
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ icon.svg
├─ src/
│  ├─ app/                       # App Router: routes, layout, metadata
│  │  ├─ layout.tsx              # shared shell + site metadata
│  │  ├─ globals.css             # Tailwind + DaisyUI "neon" theme
│  │  ├─ page.tsx                # /
│  │  ├─ home/page.tsx           # /home (alias of /)
│  │  ├─ about/page.tsx          # /about
│  │  ├─ contact/page.tsx        # /contact
│  │  ├─ projects/page.tsx       # /projects
│  │  ├─ projects/[id]/page.tsx  # /projects/:id (prerendered per project)
│  │  └─ not-found.tsx           # 404
│  ├─ assets/
│  ├─ components/                # shared UI
│  │  ├─ Navbar.tsx
│  │  ├─ Footer.tsx
│  │  ├─ NeonParticles.tsx
│  │  ├─ FireCursor.tsx
│  │  ├─ ScrollToTop.tsx
│  │  └─ ToasterProvider.tsx
│  ├─ data/
│  │  ├─ index.ts                # typed exports of the JSON below
│  │  ├─ projects.json
│  │  ├─ skills.json
│  │  └─ experience.json
│  ├─ hooks/
│  │  └─ useRandomParticles.ts
│  ├─ types/
│  │  └─ content.ts              # Project / Skill / Experience
│  └─ views/                     # page bodies + their sections
│     ├─ home/
│     ├─ about/
│     ├─ projects/
│     ├─ contact/
│     └─ error/
├─ next.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
└─ package.json
```

Note: the page bodies live in `src/views/`, not `src/pages/`. Next.js treats a
`src/pages` directory as the legacy Pages Router, which would conflict with the
App Router.

---

## 6. Architecture Notes

### 6.1 Layout Strategy
- `src/app/layout.tsx` provides shared shell:
  - global particles
  - navbar
  - page content (`children`)
  - footer
  - fire cursor

### 6.2 Data-Driven Content
- Projects, skills, and experience are loaded from local JSON.
- `src/data/index.ts` re-exports them typed against `src/types/content.ts`.
- Content updates can be made without changing component logic.

### 6.3 Rendering
- Every route is prerendered to static HTML at build time.
- `/projects/[id]` uses `generateStaticParams`, so each project page is prebuilt.
- Interactive sections are client components; code splitting is automatic.
- Decorative particle layers derive positions from `Math.random()`, so they are
  generated on mount via `useRandomParticles` to keep hydration deterministic.

---

## 7. Routes and Pages

- `/` Home
- `/home` Home (alias kept from the previous router)
- `/about` About
- `/projects` Projects list
- `/projects/:id` Project details (dynamic, prerendered per project)
- `/contact` Contact
- Anything else Custom 404 page (`src/app/not-found.tsx`)

An unknown project id such as `/projects/999` renders an inline
"Project Not Found" panel rather than the site-wide 404 page.

---

## 8. Data Model

### 8.1 `projects.json` (extended case-study format)
Each project supports:
- `id`
- `title`
- `description`
- `image`
- `tech[]`
- `live`
- `github`
- `featured`
- `role`
- `duration`
- `problem`
- `decisions[]`
- `highlights[]`
- `outcomes[]`
- `screenshots[]`

### 8.2 `skills.json`
- Skill name, category, and level metadata.

### 8.3 `experience.json`
- Timeline item(s) for role, year range, and skill usage.

---

## 9. UI and Animation System

### 9.1 Styling
- Tailwind utility classes for layout and spacing
- DaisyUI theme for color tokens and component baseline
- Custom CSS utilities and keyframes in `src/app/globals.css`

### 9.2 Motion
- Framer Motion for section reveals and transitions
- CSS keyframes for neon/particle/flicker effects

### 9.3 Visual Direction
- Dark neon aesthetic
- Strong glow accents
- Intentional interactive micro-feedback

---

## 10. Fire Cursor Effect

The project includes a custom global fire cursor effect:
- Ember trail and particle sparks
- Rendered as non-interactive overlay
- Automatically disabled for:
  - coarse pointer devices (touch-first environments)
  - `prefers-reduced-motion: reduce`

Files:
- `src/components/FireCursor.tsx`
- `src/app/globals.css`

Note: the component also renders an arrow-shaped `fire-cursor-outline` SVG whose
classes (`fire-cursor-outline*`, `is-visible`, `fire-cursor-active`) have no CSS
rules. It therefore paints nothing visible, since the overlay uses
`mix-blend-mode: screen`. This was true before the Next.js port and was carried
over unchanged; add the rules back to `globals.css` if you want the outline.

---

## 11. SEO and Metadata

Configured with the Next.js Metadata API in `src/app/layout.tsx`:
- title (with a `%s | Ebrahim Ali` template for child routes)
- meta description
- canonical link
- Open Graph tags
- Twitter card tags

Each route adds its own `title`, `description`, and canonical via a `metadata`
export; `/projects/[id]` builds them per project in `generateMetadata`.

Additional crawl support:
- `public/robots.txt`
- `public/sitemap.xml`

---

## 12. Accessibility

Implemented improvements:
- semantic interactive elements for mobile nav
- proper form labels and control IDs
- image alt text coverage
- internal links use client-side routing where appropriate
- reduced-motion behavior respected by custom cursor effect

---

## 13. Performance

Implemented optimizations:
- static prerendering of every route at build time
- automatic per-route code splitting
- image `loading="lazy"` and `decoding="async"` on project media
- event throttling for mousemove-heavy effects
- global overlay effects marked `pointer-events: none`

---

## 14. Local Development

### 14.1 Install Dependencies

```bash
npm install
```

### 14.2 Start Dev Server

```bash
npm run dev
```

### 14.3 Lint

```bash
npm run lint
```

### 14.4 Type Check

```bash
npm run typecheck
```

### 14.5 Production Build

```bash
npm run build
```

### 14.6 Serve Production Build

```bash
npm start
```

---

## 15. Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Notes:
- The `NEXT_PUBLIC_` prefix is required; the contact form reads these in the browser.
- Values are inlined into the client bundle at build time, so rebuild after changing them.
- Never commit secret keys.
- Use provider dashboard values for your EmailJS account.

---

## 16. Build and Deployment

Recommended hosting:
- Vercel (current)
- Netlify

Deployment basics:
1. Push code to Git repository
2. Connect project to host
3. Set environment variables in hosting dashboard (`NEXT_PUBLIC_EMAILJS_*`)
4. Deploy production build

Notes for the existing Vercel project:
- The framework preset must be **Next.js**, not Vite. Clear any custom build
  command / output directory left over from the Vite setup so Vercel uses its
  Next.js defaults.
- Re-add the EmailJS variables under their new `NEXT_PUBLIC_` names.
- No SPA catch-all rewrite is needed any more; routing is handled by the App Router.

---

## 17. Customization Guide

### 17.1 Update Personal Info
- `src/views/home/HeroSection.tsx`
- `src/views/about/AboutIntro.tsx`
- `public/resume.pdf`

### 17.2 Add / Edit Projects
- `src/data/projects.json`
- Add screenshots and case-study fields for better recruiter impact
- New shapes should be reflected in `src/types/content.ts`

### 17.3 Theme / Color Tweaks
- `src/app/globals.css`
- DaisyUI theme block and custom utility classes

### 17.4 Cursor Effect Tuning
- Flame behavior logic: `src/components/FireCursor.tsx`
- Visual style and animations: `src/app/globals.css`

---

## 18. Troubleshooting

### Issue: `npm` blocked in PowerShell script policy
Use:
```bash
npm.cmd run dev
```
instead of `npm run dev` if execution policy blocks `npm.ps1`.

### Issue: Build fails with `spawn EPERM` in restricted shell
- This can happen in sandboxed environments.
- Re-run build with proper shell permissions or outside sandbox.

### Issue: Contact form not sending
Checklist:
- Confirm `.env.local` keys use the `NEXT_PUBLIC_` prefix
- Confirm EmailJS service/template/public key
- Restart the dev server after `.env.local` changes

### Issue: `Another next dev server is already running`
Next.js allows one dev server per project directory. Either use the existing one
at the port it reports, or stop it first (the message includes its PID).

---

## 19. Roadmap

Potential next upgrades:
- Analytics integration (resume-click and contact-submit events)
- Automated component tests (routing + contact form smoke tests)
- Optional light mode theme
- CMS-backed project content
- Blog/articles section for technical writing

---

## 20. Contact

### Developer
- Name: Ebrahim Ali
- Role: MERN Stack Developer

### Links
- LinkedIn: `https://linkedin.com/in/ebrahim235`
- GitHub: `https://github.com/ebrahim2355`
- Email: `web.ebrahimali@gmail.com`
