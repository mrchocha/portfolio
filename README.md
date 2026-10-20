# Portfolio

Portfolio website for Rahul Chocha, built with React, Vite and Motion.

## Getting started

The project needs Node 24 (see `.nvmrc`).

```bash
nvm use            # switch to the Node version in .nvmrc
npm install
npm start          # http://localhost:5173/portfolio/
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Starts the dev server |
| `npm test` | Runs the test suite with Vitest |
| `npm run build` | Builds the site into `dist/` |
| `npm run preview` | Serves the built site locally |
| `npm run deploy` | Builds and publishes `dist/` to GitHub Pages |

## Editing the content

Most of the content lives in JSON files in `src/`:

- `experience.json`: roles, highlights and tech used. The `logo` field picks a company logo from `src/media/logos/`.
- `projects.json`: key projects, GitHub star counts and open-source contributions.
- `contact.json`: contact links. The Gmail entry also powers the "Get in touch" button.

The hero text and terminal lines are in `src/home.jsx`.

## Project structure

- `src/` contains the components, one per section, plus shared pieces such as `Navbar.jsx`, `Reveal.jsx` and `TerminalLines.jsx`.
- `src/css/` holds per-section styles. `src/index.css` and `src/App.css` hold the shared theme and components.
- `public/` holds the favicon, the app icons and the web manifest.
