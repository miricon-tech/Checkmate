# Checkmate Landing Page

Landing page scaffold built with `Next.js`, `TypeScript`, `Tailwind CSS` and an Adobe Typekit font.

## Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`

## Local commands

```bash
pnpm dev
pnpm lint
pnpm build
```

## Where to edit

- `src/app/page.tsx`: entry point for the homepage.
- `src/components/landing/landing-page.tsx`: landing page sections and layout.
- `src/components/landing/section-heading.tsx`: reusable section heading component.
- `src/content/landing.ts`: headline text, cards, and section content.
- `src/app/layout.tsx`: metadata, RTL setup, and Adobe Typekit link.
- `src/app/globals.css`: design tokens, global styles, and font variables.

## Adobe font

The project loads this stylesheet globally:

```html
<link rel="stylesheet" href="https://use.typekit.net/nvz5wxq.css">
```

The loaded font family is `avenir-next-world`, exposed through the `font-display` utility and CSS variables in `src/app/globals.css`.

## Vercel flow

1. Create or connect a remote Git repository.
2. Push the `main` branch.
3. Import the repository into Vercel.
4. Set any required environment variables.
5. Deploy.

## Lead form email delivery

The lead form posts to `POST /api/lead` and sends each submission by SMTP.

Set these variables in `.env.local` for local testing and in Vercel project settings for production:

```bash
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
LEAD_FORM_FROM_EMAIL=
LEAD_FORM_TO_EMAIL=ofek@checkmate.co.il
ALLOWED_FORM_ORIGINS=https://checkmate.co.il,https://www.checkmate.co.il
LEAD_FORM_RATE_LIMIT_MAX=5
LEAD_FORM_RATE_LIMIT_WINDOW_SECONDS=600
LEAD_FORM_MAX_BODY_BYTES=12000
UNIMI_SITE_KEY=
UNIMI_LEADS_ENDPOINT=https://unimi.io/api/leads
```

Notes:

- `LEAD_FORM_TO_EMAIL` defaults to `ofek@checkmate.co.il` if not set.
- `LEAD_FORM_FROM_EMAIL` should be an address your SMTP provider allows sending from.
- If your provider uses port `465`, set `SMTP_SECURE=true`.
- `ALLOWED_FORM_ORIGINS` lets you whitelist production domains explicitly.
- The default rate limit is `5` submissions per `10` minutes per IP, with a max body size of `12KB`.
- `UNIMI_SITE_KEY` enables server-side lead sync from `POST /api/lead` to the central `unimi.io` dashboard.
- The sync is sent server-to-server so it does not depend on browser `Origin` whitelisting.
