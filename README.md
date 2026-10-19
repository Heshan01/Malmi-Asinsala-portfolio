# Malmi Asinsala Konara — Portfolio

A responsive personal portfolio for Malmi Asinsala Konara, an undergraduate in Social Studies in Indigenous Knowledge. It presents her background, projects, learning experiences, leadership work, certificates, and contact details.

## Run locally

Requirements: Node.js 22.13 or newer and npm.

```sh
npm ci
npm run dev
```

Open the local address printed in the terminal. Create the local Worker build with `npm run build`, then run it with `npm start`. Vercel uses `pnpm run build:vercel` to create the standard Next.js deployment output.

## Project structure

- `app/page.tsx` contains the portfolio sections and page interactions.
- `app/portfolio-data.ts` contains project and experience details.
- `app/hero-section.tsx` contains the homepage introduction.
- `app/globals.css` and `app/reference-home.css` contain the site styling and responsive layouts.
- `public/images/` contains portfolio photography.
- `public/Malmi-Asinsala-Konara-CV.pdf` is the downloadable CV.

## Features

- Responsive desktop and mobile navigation.
- Project categories, image galleries, and accessible project dialogs.
- Animated homepage details with reduced-motion support.
- CV download and email and phone contact links.

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates the production build.
- `npm start` serves the built Worker locally.
- `npm run lint` runs ESLint.
