# App Store Submission Checklist

Generated against Apple's review guidelines as of 2026.

## Before submission
- [ ] Test on real device (not just Simulator)
- [ ] iPhone 14, iPhone SE 3, iPad as minimum device matrix
- [ ] iOS 15+ deployment target

## Metadata
- [ ] App name: `Colourly` (≤ 30 chars) — verify uniqueness in App Store
- [ ] Subtitle: e.g. "Daily Colour Puzzle" (≤ 30 chars)
- [ ] Keywords: `puzzle, daily, colour, brain, logic, mind, code, decode, hue, palette`
- [ ] Description: lead with "daily puzzle, new hue every midnight". Avoid "Mastermind clone" or "Wordle clone" framing
- [ ] What's New: write fresh per version, not generic
- [ ] No "Android" or "Google Play" mentions anywhere
- [ ] Screenshots: actual gameplay only (mode picker, mid-game, win state, stats)
- [ ] App preview: 15–30s recording of an actual play session

## Compliance
- [ ] Age rating: 4+
- [ ] Privacy policy page (required even if no data collected — disclose this fact)
- [ ] In-app accessible privacy link
- [ ] No tracking — no IDFA prompt needed
- [ ] No third-party login in v0.3 (defer Sign in with Apple to v0.4)
- [ ] Account deletion flow if any account creation exists

## Technical
- [ ] IPv6-only network test passes (Apple test requires this)
- [ ] No background activity
- [ ] App fully functional offline (it is — localStorage only)
- [ ] No crashes for 24 hours of usage testing

## Likely review questions (and answers)
- "Is this a Mastermind clone?" → No. Colourly uses positional feedback (Wordle-style), not count-only feedback (Mastermind-style). The mechanic, UI, monetisation, and content are all original. Mastermind itself is a 1970 board game by Mordecai Meirowitz; mechanics derived from public-domain Bulls and Cows.
- "Does it use third-party login?" → No, no accounts in v0.3.
- "Does it require a network connection?" → No, fully offline.
