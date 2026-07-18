# Copilot Instructions

## Design System

This project uses **shadcn/ui** as its design system.

Before creating any UI, check whether an existing shadcn/ui component satisfies the requirement.

Never recreate components that already exist.

Prefer composition over custom implementations.

## Theme

All styling must use the project's shadcn theme tokens.

Use semantic Tailwind classes such as:

- bg-background
- bg-card
- bg-primary
- bg-secondary
- bg-accent
- text-foreground
- text-muted-foreground
- border-border
- ring-ring

Never hardcode:

- Colors
- Border radius
- Font families
- Shadows

Do not use:

- Tailwind color utilities (bg-pink-200, text-gray-500, etc.)
- Hex colors
- RGB/HSL values
- Arbitrary color values

## Components

New reusable components should:

- Accept className
- Support dark mode automatically
- Use CVA for variants where appropriate
- Follow shadcn/ui conventions

## Styling

Use this priority:

1. Existing shadcn/ui component
2. Existing project component
3. Tailwind utilities using theme tokens
4. Custom CSS only if absolutely necessary

## Accessibility

All interactive elements must:

- Be keyboard accessible
- Have visible focus states
- Meet WCAG AA contrast requirements

## Responsive Design

Use a mobile-first approach.

Do not use fixed widths unless required by the design.

## Forbidden

Do not use:

- bg-red-*
- bg-blue-*
- bg-pink-*
- text-gray-*
- border-zinc-*
- rounded-[...]
- text-[#...]
- bg-[#...]

Use the project's semantic design tokens instead.