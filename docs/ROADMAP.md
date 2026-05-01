# Colourly — Roadmap

## v0.1 (shipped)
- 5 difficulty modes (Beginner → Extreme)
- XP & level system
- 8 achievements
- Colour-blind mode
- Streaks per mode, distribution histogram
- Spoiler-safe share grid
- localStorage persistence
- Daily auto-rollover at local midnight

## v0.2 — web polish (this commit)
- [x] Full rename Hue → Colourly across the app
- [x] British-English copy throughout
- [x] Puzzle-number epoch fixed (Day 1 = 2026-04-30)
- [x] Difficulty redesigned as a single-row segmented control with sliding indicator
- [x] Spoiler-safe circle glyphs in shares (●, ◐, ○)
- [x] Custom in-app share modal with copy-text, save-image, challenge-friend
- [x] Premium visual pass: paper grain, layered peg shadows, springy taps, win/loss sequences
- [x] Win/loss takeover modal with grid reveal and next-puzzle countdown
- [x] Stats screen as a destination — lifetime grid, by-mode rates, achievement gallery
- [x] Wordless first-launch onboarding
- [ ] Custom domain (verify trademark — see CLAUDE.md note)
- [ ] Cloudflare Pages or Vercel deploy
- [ ] Open Graph image for link unfurls
- [ ] Favicon set
- [ ] Privacy policy page

## v0.3 — iOS via Capacitor
- [ ] `npm i @capacitor/cli @capacitor/ios @capacitor/haptics @capacitor/share`
- [ ] `npx cap add ios`
- [ ] Native haptics on colour tap, submit, win
- [ ] App icon (1024×1024 + iOS sizes)
- [ ] Launch screen
- [ ] Apple Developer account, code signing
- [ ] App Store submission with 4+ rating
- [ ] Lead App Store description with "daily puzzle, fresh hue every midnight"
  not with "Mastermind" or "Wordle" comparisons

## v0.4 — backend (Supabase)
- [ ] Supabase project, three tables: `profiles`, `solves`, `stats`
- [ ] Sign in with Apple (required by App Store if any third-party auth offered)
- [ ] Anonymous accounts for friction-free first-time play
- [ ] In-app account deletion (App Store requirement)
- [ ] Cross-device sync of stats and streaks
- [ ] One-time migration: hue.v2 → colourly.v1 (helper stub already in place)

## v0.5 — leaderboard
- [ ] Daily, weekly, all-time leaderboards
- [ ] Rank by `(guesses_used ASC, time_to_solve ASC)`
- [ ] Server validates solves against deterministic seed (anti-cheat)
- [ ] Friend lists (invite via shareable link)
- [ ] Mode-specific leaderboards

## v1.0 — push notifications & retention
- [ ] Daily streak reminder push (opt-in)
- [ ] Streak-saver: don't drop streak on a single missed day if level ≥ 5
- [ ] Weekly recap email/push

## Beyond
- Themes (sakura, dusk, monochrome) — paid IAP
- Practice mode with unranked random seeds (separate from the daily ritual)
- Classic mode (true Mastermind: count-only feedback) as paid hard-mode unlock
