# We Are Music — Web app (React + Vite)

This project is **frontend only**: a React app in the `web/` folder. There is no Node API in this repo.

Legacy static files (`home/`, `artist/`, `money/`, PHP in `coach/`, etc.) are kept for reference; the main UI lives under **`web/`**.

## Prerequisites

- Node.js 18+

## Install & run

```bash
cd web
npm install
npm run dev
```

Or from the repo root:

```bash
npm install --prefix web
npm run dev
```

Open **http://localhost:5173**

## Build

```bash
npm run build
```

Output: `web/dist/`

## Theme

- Dark background, gold / purple accents (see `web/src/index.css`)
- Fonts: **Abel**, **Pacifico**, **Raleway** (loaded in `web/index.html`)

## Next steps

- Port remaining legacy pages into React routes under `web/src/pages/`
- Deploy `web/dist` to any static host (Vercel, Netlify, Cloudflare Pages, etc.)
- Add a backend later if you need auth, database, and APIs
