# Copilot instructions for NeighborNest

## Project commands

Use npm (the repository includes `package-lock.json`):

```bash
npm run dev       # Start the Next.js development server at http://localhost:3000
npm run build     # Create a production build
npm run start     # Serve the production build
npm run lint      # Run ESLint
```

There is currently no test script or test runner configured, so there is no repository-supported full-suite or single-test command.

## Architecture

- This is a Next.js 16 App Router application under `src/app`. `layout.tsx` is the root layout: it loads the Geist and Dosis fonts, sets global metadata, imports `globals.css`, and renders the shared `Navbar` around every route.
- `page.tsx` is the home route. The application is currently a frontend scaffold; there is no API, database, authentication, or other server-side application layer in this repository.
- `src/components/shared` contains application-level shared components. `src/components/ui` contains shadcn-style reusable primitives generated/configured through `components.json`; compose these primitives rather than duplicating their behavior.
- `src/hooks` contains client-side hooks, including responsive state and incremental code highlighting. `src/lib/highlighter.tsx` owns lazy Shiki language loading and grammar-state-aware tokenization; `use-highlighted-code.ts` adapts it for streaming code displays.
- The `@/*` TypeScript alias resolves to `src/*`. Use it for imports that cross `app`, `components`, `hooks`, and `lib` boundaries.

## Repository conventions

- App Router files are React Server Components by default. Add `"use client"` only to components that use hooks, browser APIs, or client-only interaction; keep layouts and static composition server-rendered.
- Use the shadcn/Tailwind composition style already present: components accept `className`, merge classes with `cn`, expose variants with `class-variance-authority` where appropriate, and use `data-slot`/data attributes for styling and composition.
- Tailwind CSS v4 is loaded from `src/app/globals.css` with `@import "tailwindcss"`, `tw-animate-css`, and `shadcn/tailwind.css`. The shadcn setup uses the `base-nova` style, neutral base color, CSS variables, and Lucide icons; preserve those choices when adding UI.
- The generated UI primitives commonly import `cn` from the `cn` package, while `src/lib/utils.ts` re-exports it for the configured `@/lib/utils` alias. Follow the import style of the surrounding file.
- Next configuration enables `cacheComponents`, `partialPrefetching`, the React Compiler, and Turbopack's Tailwind CSS loader. Preserve these settings and account for them when changing build or styling behavior.
- The project-specific `AGENTS.md` rule is authoritative: before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/`, and follow the version-specific APIs and deprecation guidance.
- `src/lib/highlighter.tsx` intentionally loads Shiki languages on demand. Add a language to its `languages` map and any desired short-name mapping in `aliases` instead of importing every language eagerly.

