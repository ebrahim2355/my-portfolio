# Ebrahim Ali Portfolio

A production-style personal portfolio built with React and Vite, focused on strong visual identity, smooth motion, and recruiter-friendly project storytelling.

This portfolio highlights:
- Modern UI engineering with reusable components
- End-to-end project case studies (problem, role, decisions, impact)
- Responsive layouts for desktop and mobile
- Contact workflow with EmailJS integration
- Performance and UX improvements (lazy loading, route splitting, accessibility updates)

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

- Production URL: `https://web-ebrahim-portfolio.vercel.app/`

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
- React 19
- React Router
- Vite
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
│  ├─ assets/
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ Footer.jsx
│  │  ├─ NeonParticles.jsx
│  │  └─ FireCursor.jsx
│  ├─ data/
│  │  ├─ projects.json
│  │  ├─ skills.json
│  │  └─ experience.json
│  ├─ layouts/
│  │  └─ Root.jsx
│  ├─ pages/
│  │  ├─ Home/
│  │  ├─ About/
│  │  ├─ Projects/
│  │  ├─ Contact/
│  │  └─ ErrorPage/
│  ├─ main.jsx
│  └─ index.css
├─ index.html
├─ package.json
└─ vite.config.js
```

---

## 6. Architecture Notes

### 6.1 Layout Strategy
- `Root.jsx` provides shared shell:
  - global particles
  - navbar
  - page outlet
  - footer
  - fire cursor

### 6.2 Data-Driven Content
- Projects, skills, and experience are loaded from local JSON.
- Content updates can be made without changing component logic.

### 6.3 Route Splitting
- Page modules are lazy-loaded in `main.jsx` for improved startup behavior.

---

## 7. Routes and Pages

- `/` Home
- `/about` About
- `/projects` Projects list
- `/projects/:id` Project details (dynamic)
- `/contact` Contact
- `*` Custom error page

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
- Custom CSS utilities and keyframes in `index.css`

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
- Flame core + aura + flickering tongues
- Ember trail and particle sparks
- Rendered as non-interactive overlay
- Automatically disabled for:
  - coarse pointer devices (touch-first environments)
  - `prefers-reduced-motion: reduce`

Files:
- `src/components/FireCursor.jsx`
- `src/index.css`

---

## 11. SEO and Metadata

Configured in `index.html`:
- title
- meta description
- canonical link
- Open Graph tags
- Twitter card tags

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
- route-level lazy loading
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

### 14.4 Production Build

```bash
npm run build
```

### 14.5 Preview Build

```bash
npm run preview
```

---

## 15. Environment Variables

Create `.env` in the project root:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Notes:
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
3. Set environment variables in hosting dashboard
4. Deploy production build

---

## 17. Customization Guide

### 17.1 Update Personal Info
- `src/pages/Home/HeroSection.jsx`
- `src/pages/About/AboutIntro.jsx`
- `public/resume.pdf`

### 17.2 Add / Edit Projects
- `src/data/projects.json`
- Add screenshots and case-study fields for better recruiter impact

### 17.3 Theme / Color Tweaks
- `src/index.css`
- DaisyUI theme block and custom utility classes

### 17.4 Cursor Effect Tuning
- Flame behavior logic: `src/components/FireCursor.jsx`
- Visual style and animations: `src/index.css`

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
- Confirm `.env` keys
- Confirm EmailJS service/template/public key
- Restart dev server after `.env` changes

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

---

If you use this project as a starter template, keep the case-study style for projects. It is one of the highest-impact sections for technical hiring.
