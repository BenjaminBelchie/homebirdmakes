# Homebird Makes

Marketing website built with Next.js (Pages Router), Material UI, Clerk authentication, and Convex-backed data access.

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Material UI 7
- Clerk (`@clerk/nextjs`)
- Convex (`convex` package with `ConvexHttpClient`)

## Environment Variables

Add these values to `.env`:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Canonical site URL used by metadata/sitemap
NEXT_PUBLIC_SITE_URL=

# Convex deployment URL
NEXT_PUBLIC_CONVEX_URL=

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS=

# Contact + mailing list APIs
CONTACT_EMAIL_FROM=
CONTACT_EMAIL_TO=
CONTACT_EMAIL_BRAND_URL=https://homebirdmakes.co.uk
CONTACT_EMAIL_LOGO_URL=https://homebirdmakes.co.uk/images/homebirdmakes_logo.png
MAILCHIMP_API_KEY=
MAILCHIMP_API_SERVER=
MAILCHIMP_AUDIENCE_ID=

# Resend (set in Convex dashboard for Convex functions)
RESEND_API_KEY=
RESEND_WEBHOOK_SECRET=
```

## Convex Functions Expected By The Website

The site currently queries these Convex functions:

- `collections:list`
- `links:list`

These are called from `lib/convex.ts`.

## Local Development

```bash
npm install
npm run dev
```

## Validation Commands

```bash
npm run lint
npm run build
```
