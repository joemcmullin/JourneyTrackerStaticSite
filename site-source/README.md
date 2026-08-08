# Site source — First Light redesign

React 19 + Vite + Tailwind source for the deployed site at the repo root.

Build & deploy:

```bash
npm install
npm run build
rsync -a dist/ ../   # copy build output over the repo root, then commit + push (GitHub Pages deploys main)
```

Never hand-edit the built bundles in `../assets/` — rebuild from here. Imported 2026-08-08 from the former `~/Projects/Sites/JourneyTrackerNext` working folder (its git history is archived with the folder).
