# AGENTS.md

This repository is the phase-one public website for Yayasan Titi Samaguna (Yatina).

## Purpose

- Build and maintain a public-facing informational website.
- Current scope is a static website, not an application platform.
- Primary audience: prospective students, parents, and the surrounding community.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

## Working assumptions

- Prefer React Server Components by default.
- Keep the site statically buildable.
- Do not introduce backend infrastructure unless the task explicitly requires it.
- Keep dependencies minimal.

## Architecture constraints

- Content lives in `src/data/` as typed TypeScript objects.
- UI should stay decoupled from the content source so data can later move to a CMS or database with minimal UI rewrite.
- Avoid unnecessary client-side state and browser-only logic.
- Use `"use client"` only when interactivity actually requires it.

## Current structure

- `src/app/` contains App Router routes and layout files.
- `src/components/` contains presentational and page-section components.
- `src/data/` contains static site content.
- `src/types/` contains shared TypeScript types.
- `docs/about-project.md` contains the original product and design direction.

## Implementation guidance

- Preserve Indonesian site copy unless the task explicitly asks for another language.
- Reuse existing data modules before creating new content sources.
- Prefer small, composable server components.
- Use `next/font`, `next/image`, and built-in Next.js capabilities before adding libraries.
- Keep styling aligned with the current visual direction: Islamic educational institution, modern, simple, and community-friendly.

## Avoid by default

- Databases
- Authentication
- CMS integrations
- API routes without a clear product need
- Server actions without a clear need
- Heavy animation
- Dashboard-style UI patterns

## Validation

When making code changes, prefer validating with:

- `npm run typecheck`
- `npm run lint`
- `npm run build`

Run the smallest useful set for the change.

## If you add new pages or sections

- Keep routing aligned with the App Router structure.
- Prefer static data and static generation patterns.
- Maintain semantic HTML and accessibility basics.
- Keep metadata and SEO implications in mind.

