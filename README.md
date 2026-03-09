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
