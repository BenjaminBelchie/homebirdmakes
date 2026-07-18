# Homebird Makes – Copilot Instructions

## Project Overview

This is the website for **Homebird Makes**, a small crafts business. It is a Next.js 16 app deployed on Vercel that showcases craft collections, handles a mailing list, and provides a contact form.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui — always prefer existing shadcn components from `components/ui/` before creating new ones
- **Auth**: Clerk (`@clerk/nextjs`)
- **Backend / Database**: Convex (`convex/`) — queries, mutations, and schema live here
- **Email**: Resend via `@convex-dev/resend`
- **Icons**: Tabler Icons (`@tabler/icons-react`) and Lucide React
- **Analytics**: Vercel Analytics

## Project Structure

- `app/` – Next.js App Router pages and layouts
- `components/` – Shared React components; `components/ui/` contains shadcn primitives
- `convex/` – Convex backend: schema, queries, mutations, HTTP actions
- `hooks/` – Custom React hooks
- `lib/` – Utility helpers (`utils.ts`, `site.ts`, `convex.ts`)
- `styles/` – Global CSS (`globals.css`)
- `public/images/` – Static assets (collections, instagram)

## Code Quality

After every code change, run both commands to verify quality before finishing:

```bash
npm run lint
npm run build
```
