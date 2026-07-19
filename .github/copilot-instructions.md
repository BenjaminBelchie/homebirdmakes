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

## Forms

Use **TanStack Form** (`@tanstack/react-form`) for all forms. Do not manage form field values with individual `useState` calls.

- Create the form with `useForm({ defaultValues, onSubmit })` — keep async logic inside `onSubmit`.
- Use `form.Field` render props; read `field.state.value`, `field.handleChange`, `field.handleBlur`, and `field.state.meta.errors`.
- Add `onChange` and `onSubmit` validators for real-time and on-submit validation.
- Wrap fields with `Field` / `FieldLabel` / `FieldError` from `components/ui/field.tsx`. Pass `data-invalid={errors.length > 0}` to `Field` and `aria-invalid` to the input.
- Drive the submit button with `form.state.canSubmit` (disabled) and `form.state.isSubmitting` (loading label).
- File/blob inputs cannot be managed by TanStack Form — keep them in `useState` and guard them in the submit-button disabled check.



## Code Quality

After every code change, run both commands to verify quality before finishing:

```bash
npm run lint
npm run build
```
