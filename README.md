# 🌌 Ebrahim Ali — Futuristic Neon Portfolio
## **A glowing, animated, fully responsive personal portfolio built using React, Vite, DaisyUI, TailwindCSS, Framer Motion, and EmailJS.**

This website showcases my work, skills, timeline, and contact information in a cyberpunk neon visual style with smooth animations and interactive motion effects.

---

### 🚀 Live Demo

👉 **Visit Portfolio** → https://web-ebrahim-portfolio.vercel.app/

---

## 📌 Core Features

### 🎨 **Neon Futuristic UI**

- Custom neon theme using DaisyUI

- Glow borders, neon particles, animated backgrounds

- Fully responsive modern layout

────────────

### ⚡ **Smooth Animations**

- Framer Motion page transitions

- Split-text animations

- Floating neon particles

- Hover effects on cards & buttons

────────────

### 📁 **Projects System**

- All projects loaded from projects.json

- Tech filter system (React-based filtering)

- Featured projects on Home page

- **Dynamic routes:**
    `/projects/:id` → full detailed project page

- Screenshot viewer & animated card open effect

────────────

### 👤 **About Page**

- Neon particles background

- Timeline of experience (from `experience.json`)

- Skill indicators with animated progress bars

- Downloadable CV button

────────────

### 📬 **Contact Page**

- Email form powered by EmailJS

- React Hook Form validation

- Toast notifications (react-hot-toast)

- Metadata via .env variables for security

────────────

### 🧩 **Reusable Components**

- `NeonParticles.jsx`

- `Footer.jsx`

- `Navbar.jsx`

- Section components (Hero, AboutPreview, SkillsStrip, FeaturedProjects, CTA, etc.)

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)

- Tailwind CSS + DaisyUI

- Framer Motion

- React Router

- React Hot Toast

- EmailJS

────────────

### Data

- `projects.json`

- `skills.json`

- `experience.json`

---

## 📂 Project Structure
```
src/
 ├─ assets/
 ├─ components/
 │   ├─ Navbar.jsx
 │   ├─ Footer.jsx
 │   ├─ NeonParticles.jsx
 │   └─ ...
 ├─ data/
 │   ├─ projects.json
 │   ├─ skills.json
 │   └─ experience.json
 ├─ pages/
 │   ├─ Home/
 │   ├─ About/
 │   ├─ Projects/
 │   └─ Contact/
 ├─ App.jsx
 ├─ main.jsx
 └─ index.css
```
---

## ⚙️ Environment Variables
Create a .env file:
```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 🙌 Author

**MD. Ebrahim Ali**
MERN Stack Developer — Clean UI | Practical Solutions | Real Projects

- 💼 LinkedIn — https://linkedin.com/in/ebrahim235

- 📧 Email — web.ebrahimali@gmail.com

- 🐙 GitHub — https://github.com/ebrahim2355