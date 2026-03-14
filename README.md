# Alok Prasad – AI Developer Portfolio (CMS)

A **fully customizable** portfolio with a modern **light theme**, admin dashboard (Decap CMS), dynamic theme/layout, hero background animations, and optional 3D effects.

## Features

- **Modern light design**: White base, soft blue primary, purple accent, glass cards, soft shadows
- **Hero section**: Developer photo, tagline, subtitle; **animated backgrounds** (particles, aurora, gradient waves, cyber grid) selectable from admin; optional **3D floating shapes**
- **Global theme settings**: Primary/secondary colors, font family, font scale, button/card style (editable in admin)
- **Built-in theme presets**: Modern Light, Glass, Soft Gradient, Minimal (switch in admin)
- **Layout control**: Enable/disable sections and set section order from admin
- **Decap CMS admin** at `/admin`: Hero, Theme, Layout, Projects, Skills, Certificates, Blog
- **Content folders**: `public/content/` (hero, theme, layout, projects, skills, certificates, blog)
- **GitHub auto-fetch**: Repos with name, description, stars, language
- **AI portfolio chatbot**: Answers questions about projects, skills, technologies
- **Contact form**: Name, Email, Message → serverless `api/contact`
- **Vercel Analytics**: Page visits, engagement
- **Images**: CMS uploads go to `public/images`

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Admin: [http://localhost:5173/admin](http://localhost:5173/admin).

---

## Deploy (Vercel)

1. Push repo to GitHub.
2. Import in [Vercel](https://vercel.com); build command `npm run build`, output `dist`.
3. Deploy. Site and `/admin` will be live.

---

## How to access the admin panel

- **URL**: `https://your-domain.com/admin` (or `http://localhost:5173/admin` in dev).
- **Login**: Uses **GitHub** backend. Configure GitHub OAuth (e.g. Netlify Identity or [Decap GitHub backend](https://decapcms.org/docs/backend/#github)) so the CMS can commit to your repo.
- **Repo**: Set `backend.repo` in `public/admin/config.yml` to your repo (e.g. `AlokPrasad09/alok-prasad-portfolio`).

---

## How to change themes

1. Go to **Admin** → **Theme**.
2. **Preset**: Choose **Modern Light**, **Glass**, **Soft Gradient**, or **Minimal**.
3. **Primary color** / **Secondary color**: Hex values (e.g. `#3B82F6`, `#8B5CF6`).
4. **Background style**, **Font family**, **Font scale**, **Button style**, **Card style**: Adjust as needed.
5. Save. The site uses these values (via CSS variables) on the next load.

---

## How to switch hero background animations

1. Go to **Admin** → **Hero**.
2. **Background Animation**: Select one of:
   - **particles** – dot network
   - **aurora** – soft gradient glow
   - **gradient_waves** – moving gradient waves
   - **cyber_grid** – grid + glow
3. **Enable 3D Animation**: Turn on for floating 3D shapes behind the hero.
4. Save. Refresh the site to see the change.

---

## How to update layout (sections)

1. Go to **Admin** → **Layout**.
2. **Sections Enabled**: Toggle **Hero**, **About**, **Skills**, **Projects**, **Certificates**, **Timeline**, **GitHub**, **Blog**, **Resume**, **Contact** on or off.
3. **Section Order**: List section IDs in the order you want (e.g. `hero`, `about`, `skills`, `projects`, …). Only **enabled** sections are shown; order is used for the content sections list.
4. Save. Reload the site to see the new layout.

---

## How to add or edit projects

1. Go to **Admin** → **Projects**.
2. Add an entry or edit existing: **Title**, **Description**, **Tech Stack** (list), **GitHub Link**, **Demo Link**, **Image** (upload to `public/images`).
3. Save. The Projects section loads from `public/content/projects.json`.

---

## Content structure

| Path | Purpose |
|------|--------|
| `public/content/hero.json` | Name, tagline, subtitle, profile image, background animation type, 3D on/off |
| `public/content/theme.json` | Preset, primary/secondary colors, font, button/card style |
| `public/content/layout.json` | Sections enabled, section order |
| `public/content/projects.json` | Projects list |
| `public/content/skills.json` | Skills list |
| `public/content/certificates.json` | Certificates list |
| `public/content/blog/` | Blog posts (markdown) |
| `public/images/` | Uploaded images from CMS |

---

## Contact form & email

- Form POSTs to `/api/contact` (Vercel serverless: `api/contact.ts`).
- To send email, add **Resend**, **SendGrid**, or similar in `api/contact.ts` and set env vars (e.g. `RESEND_API_KEY`) in Vercel.

---

## Tech stack

- React 19, TypeScript, Vite 8
- Tailwind CSS 4, Framer Motion
- Decap CMS (admin)
- Vercel (hosting, serverless, analytics)
