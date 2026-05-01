# Colourly

A daily colour puzzle. Crack the secret sequence in six guesses.

## Play

Open `public/index.html` in any modern browser, or deploy the `public/` folder to any static host (Cloudflare Pages, Vercel, Netlify, GitHub Pages).

## What it is

Colourly is a Wordle-shaped daily puzzle. Each day, every player in the world solves the same secret colour sequence. Five difficulty modes (Beginner through Extreme), an XP and level system, achievements, colour-blind mode, persistent stats, and a spoiler-safe share grid.

The entire game is a single self-contained HTML file with zero build step and zero external dependencies. Daily puzzles are generated deterministically from the puzzle number — no backend, no content pipeline.

## Modes

| Mode | Slots | Colours | Guesses | XP base |
|---|---|---|---|---|
| Beginner | 4 | 4 | 6 | 10 |
| Easy | 4 | 5 | 6 | 25 |
| Medium | 5 | 6 | 6 | 50 |
| Hard | 5 | 7 | 7 | 100 |
| Extreme | 6 | 8 | 8 | 250 |

## Stack

- **v0.2 (current)** — vanilla HTML/CSS/JS. State persists in `localStorage`. No accounts, no network calls.
- **v0.3** — Capacitor wrapper for iOS App Store distribution. See [docs/ROADMAP.md](docs/ROADMAP.md).
- **v0.4** — Supabase backend for sign-in (incl. Sign in with Apple), global leaderboard, cross-device stats sync.

## Develop

No build step. Edit `public/index.html` and reload.

```bash
# Optional: serve locally with any static server
cd public
python3 -m http.server 8000
# → open http://localhost:8000
```

## Deploy (web)

The fastest path: drag the `public/` folder onto a Cloudflare Pages or Vercel project. Both are free and globally CDN'd.

```bash
# Cloudflare Pages via Wrangler
npx wrangler pages deploy public --project-name=colourly
```

## License

MIT — see [LICENSE](LICENSE).
