# ರಹಸ್ಯ — Kannada detective game

A self-contained Kannada detective puzzle, inspired by Mystery-o-matic's deduction mechanics. It is an independent adaptation with original Kannada content, not an official translation or a mirror of the original daily cases.

## Run locally on Windows

1. Extract this project ZIP.
2. Open its `rahasya-kannada` folder in VS Code.
3. Open a terminal in that folder.
4. Run:

```powershell
py -m http.server 8000 --directory dist
```

5. Open http://localhost:8000 in your browser.
6. Press Ctrl+C in the terminal to stop the server.

If `py` is unavailable but Python is installed, use `python` instead. Serving over HTTP provides consistent browser storage behavior compared with double-clicking an HTML file.

## Deploy with Netlify Drop (simplest)

1. Sign in to your Netlify account at https://app.netlify.com/.
2. Open https://app.netlify.com/drop.
3. Drag the extracted **dist folder** onto the drop area. It contains `index.html`, JavaScript, CSS, headers and the `assets` folder.
4. Wait until deployment completes, then open the URL Netlify gives you.
5. Open that URL on your phone and complete the short smoke checklist in `QA.md`.

Do not upload only `index.html`. Do not drag the outer project folder for this manual deployment: `index.html` must be at the root of the folder you drop. Manual deployment needs no build command, API key, database or npm install.

For subsequent updates, open the existing Netlify project and use its Deploys page to upload the replacement dist folder. This preserves the same site URL. Uploading to the general new-project drop area can create another project.

Official instructions: https://docs.netlify.com/deploy/create-deploys/ and https://docs.netlify.com/start/choose-your-path/.

## Deploy from a Git repository

Commit this outer project directory to your own repository, then import that repository in Netlify. The included `netlify.toml` sets:

- Publish directory: `dist`
- Build command: leave empty
- Environment variables: none

The project does not require Node at runtime. Node 20 or newer is needed only for running automated tests. After importing, Netlify can redeploy changes pushed to the selected branch. Consult the current hosting dashboard for available plans and domain settings.

## Test before updates

From the project folder, with Node 20+ installed:

```powershell
npm test
```

There are no npm dependencies to install. The tests cover generated case consistency, input rejection, storage recovery, scores, date boundaries, mode isolation, multi-tab conflicts and UI-controller actions in a simulated DOM. These are not visual browser tests. See `QA.md` for exact coverage and remaining manual checks.

## Files

- `dist/index.html`: Kannada interface and accessibility structure.
- `dist/style.css`: responsive light/dark styles and reduced-motion behavior.
- `dist/app.js`: interactions, scoring, notebook, persistence and optional WebMCP tools.
- `dist/engine.js`: deterministic daily case generator.
- `dist/state.js`: strict saved-state normalization.
- `dist/assets/case-banner.webp`: original AI-generated decorative illustration.
- `dist/_headers`: security and cache headers used by Netlify-compatible hosts.
- `tests/`: regression tests using Node's built-in test runner.
- `netlify.toml`: static publishing configuration.

## Behavior and limitations

- Cases use India time (Asia/Kolkata). The open page announces a new day without replacing an unfinished case. Click the notification to switch.
- Five story settings, shuffled characters, time choices and weapon variations share one deduction structure. This is a complete casual game, not an unlimited narrative generator. Repeated patterns are possible.
- Easy and hard versions of a day's case share its answer but use different clue sets and separate progress.
- Scores and solutions live in client-side code. This is not suitable for competitive, tamper-proof leaderboards or paid contests without a server-authoritative redesign.
- Progress is stored on the current browser and origin only. It does not sync across devices, domains or private browsing sessions. Moving to a new domain does not transfer progress.
- If browser storage is blocked or full, the game keeps progress in memory while the page stays open and shows a Kannada warning. Copy notes before closing or reloading.
- If another tab updates the same case, the current tab stops overwriting it and offers to load the latest progress. Copy any unsaved note edits before doing so. This detects ordinary cross-tab changes; simultaneous read/write races are not a transactional synchronization system.
- Google Fonts enhances Kannada typography. If it cannot load, the interface falls back to Nirmala UI or the system Kannada font. The game itself uses no remote game API.
- The site does not register a service worker or promise offline installation. Keep the page open for in-memory play if connectivity drops; a fresh visit requires the hosting service.
- WebMCP is feature-detected. The ordinary interface works without it.

## Privacy

The application includes no analytics, advertising, sign-up form or game server. Browser storage holds game progress. Google Fonts and your hosting provider receive ordinary asset/network requests under their own policies. A third-party host's access controls and logging are separate from this static game's behavior.
