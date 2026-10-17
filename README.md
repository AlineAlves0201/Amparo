# Amparo

Milestone 1: accessible Brazilian Portuguese customer demonstration for a digital-assistance marketplace. Built with Next.js App Router, React, TypeScript, Tailwind CSS and Zod. No real account, dispatch or payment processing is enabled.

## Run locally

Requires Node.js 22 or 24 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000 in your browser. For a phone on the same trusted network, use the computer's LAN IP with port 3000. Development binds to 0.0.0.0. Do not expose this demonstration publicly or enter real personal information.

```sh
npm test
npm run typecheck
npm run build
npm start
```

For the optional Chromium end-to-end test on a machine with browser dependencies:

```sh
npx playwright install chromium
npm run test:e2e
```

The Playwright config starts the development server automatically. Browser installation requires network access and suitable OS libraries.

## Try the demo

Select a service, review the fictional address and full simulated price, and confirm. The 2.5-second animation picks a fictional assistant using an illustrative adjusted rating. Request another person or progress the simulated service. Enter **4826** at arrival; this is a demo service code, never a banking code. Confirm completion and rate. History is stored only in the browser; request progress and comments are not persisted. Sensitive categories require acknowledgment of safety guidance. Scheduling, remote help and support submission are not available yet.

## Documentation

- [Product requirements](docs/PRODUCT.md)
- [Architecture and PWA limits](docs/ARCHITECTURE.md)
- [Proposed database and RLS](docs/DATABASE.md)
- [Matching concurrency strategy for review](docs/MATCHING.md)
- [Milestones and manual testing](docs/PLAN.md)
- [Security, privacy and regulatory risks](docs/RISKS.md)

## Deployment preparation

Standard Next.js Node/Vercel-compatible scripts are provided. No deployment was performed. Supabase integration and executable migrations belong to Milestone 2. Only public Supabase URL and anon/publishable key may eventually appear in browser configuration; service-role credentials must remain exclusively server-side. The PWA manifest is initial groundwork; offline support and cross-browser installation are not complete.
