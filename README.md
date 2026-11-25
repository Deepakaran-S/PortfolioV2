# Deepakaran S — Portfolio

Personal portfolio built with React 19, Vite and Tailwind CSS v4.

## Features

- Bento-style sections: hero, about, projects, skills constellation, experience, freelance, contact
- Experience duration calculated from the career start date in `src/data/profile.js`
- Command palette (`Ctrl/Cmd + K`) for navigation, resume, email and theme actions
- Recruiter view: a condensed, scannable version of the site
- Skills constellation shows which projects each technology was used in
- Dark and light themes

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

## Configuration

- `src/data/profile.js` — name, links, career start date, highlights
- `src/data/projects.js` — projects (`private: true` shows a private badge instead of a repo link)
- `src/data/skills.js` — skills, connections and per-skill project evidence
- `public/resume.pdf` — add this file to enable the resume buttons automatically
- `.env` — EmailJS keys for the contact form

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
