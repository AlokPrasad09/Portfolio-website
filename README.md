# Alok Prasad – AI Developer Portfolio

A modern, futuristic portfolio for an AI developer: Vite + React + Tailwind CSS, with an admin dashboard (Decap CMS), dynamic content, GitHub API integration, and an AI portfolio chatbot.

## Features

- **Modern UI**: Dark gradient background, grid pattern, soft glowing orbs, glassmorphism cards, smooth transitions
- **Larger typography**: Base font ~2px larger; responsive headings and body text
- **Animations**: Framer Motion for fade-in sections, scroll reveal, hover effects on cards
- **Hero section**: Prominent name, tagline, CTA buttons (View Projects, Download Resume, Contact)
- **Admin panel**: Decap CMS at `/admin` for editing content via GitHub
- **CMS content**: Projects, Blog, Certificates, Skills stored in `public/content/` and loaded dynamically
- **GitHub integration**: Fetches repositories (name, description, stars, language) from GitHub API
- **Portfolio chatbot**: Bottom-right widget that answers questions about projects, skills, and technologies
- **Analytics**: Vercel Analytics for page visits and engagement
- **Contact form**: Name, Email, Message with serverless API at `api/contact.ts` (ready for Resend/SendGrid)
- **Performance**: Lazy-loaded images, responsive layout

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build & deploy

```bash
npm run build
npm run preview   # test production build locally
```

### Deploy to Vercel

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com); use the default build command and output directory (`dist`).
3. Optional: Add environment variables (e.g. for email in `api/contact.ts`).
4. Deploy. The site will be live and `/admin` will load Decap CMS.

## Admin panel (`/admin`)

- **URL**: After deployment, open `https://your-domain.com/admin`.
- **Login**: Uses GitHub OAuth. Configure a GitHub OAuth App or use Netlify Identity / Decap’s recommended backend so Decap can write to your repo.
- **Collections**:
  - **Projects**: Edit `public/content/projects.json` (title, description, tech_stack, github_link, demo_link, image).
  - **Blog**: Files in `public/content/blog/` (markdown with title, date, body).
  - **Certificates**: Edit `public/content/certificates.json`.
  - **Skills**: Edit `public/content/skills.json`.

Update `public/admin/config.yml` and set `backend.repo` to your GitHub repo (e.g. `AlokPrasad09/alok-prasad-portfolio`).

## How to add or edit projects

1. Go to `https://your-domain.com/admin` and log in with GitHub.
2. Open **Projects** and add or edit entries (title, description, tech stack, GitHub link, demo link, image).
3. Save; Decap commits to your repo. On the next deploy, the portfolio will load the new data from `public/content/projects.json`.

You can also edit `public/content/projects.json` directly in the repo.

## How to update the portfolio without code

- **Projects, Certificates, Skills**: Use the admin panel or edit the JSON files in `public/content/`.
- **Blog**: Add or edit markdown files in `public/content/blog/` or via the Blog collection in the admin panel.
- **Profile links**: Still in code (`src/App.tsx`) for GitHub, LinkedIn, Trailblazer, etc. Change them there or move to a CMS “settings” file later.

## Contact form and email

- The form POSTs to `/api/contact` (serverless function in `api/contact.ts`).
- To send emails, add Resend, SendGrid, or another provider in `api/contact.ts` and set the required env vars (e.g. `RESEND_API_KEY`) in Vercel.

## Tech stack

- React 19, TypeScript, Vite 8
- Tailwind CSS 4, Framer Motion
- Decap CMS (admin)
- Vercel (hosting + serverless + analytics)

## License

Private / personal use.
