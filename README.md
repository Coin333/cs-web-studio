# CS-Web Studio

Marketing site for CS-Web Studio: a solo web development practice that ships fast, modern websites for local businesses in 2 to 5 days.

## Tech

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Lucide icons
- Inter via `next/font`
- Deploys on Vercel

## Pages

- `/` Home with hero, value props, process, portfolio, testimonials, CTA
- `/services` Pricing tiers and what-you-get grid
- `/about` Studio principles and stack
- `/contact` Inquiry form posting to `/api/contact`

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Quality gates

```bash
npm run typecheck
npm run lint
npm run build
```

All three must pass before shipping.

## Deploy

Push to GitHub, then connect the repo in the Vercel dashboard. No environment variables required for the baseline build.

To wire the contact form to an email/Slack destination, update `app/api/contact/route.ts`.

Built with D1 Vibe Coding
