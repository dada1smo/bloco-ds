# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

pnpm workspace (`packages/*`, `apps/*`). No test runner or linter is configured.

- `pnpm dev` — Vite dev server for the demo app (`@bloco/web`)
- `pnpm build` — `tsc && vite build` for the demo app
- `pnpm --filter ./packages/ui exec tsc --noEmit` — typecheck the UI package

## Architecture

- `packages/ui` (`@bloco/ui`, private, consumed as source: `main` points to `src/index.ts`) — the design system. React 19, Tailwind v4, `class-variance-authority`, `react-aria-components`, Phosphor icons.
- `apps/web` (`@bloco/web`) — Vite + react-router demo/catalog. `src/demos.tsx` maps `folder -> [{ id, ... }]`; `App.tsx` builds the sidebar file tree from it and routes to `/components/<folder>/<id>`. A new component needs a demo entry here to show up.
- `packages/ui/src/theme.css` — design tokens entry (exported as `@bloco/ui/theme.css`); it only imports partials from `packages/ui/src/theme/` (`palette.css`, `color.css`, `typography.css`). Primary = slate, accent = amber.
- Tokens (ADR 0002, [docs/architecture/theming.md](docs/architecture/theming.md)): components use **only semantic tokens** (`primary`, `on-primary`, `accent-text`, `foreground`, `text-body`, …). No `slate-*`/`amber-*`/`primary-500`, hex, arbitrary colors or opacity modifiers on semantic colors (`/10`, `/70`) in `*.styles.ts`. Missing token → add it to its category partial with a one-line usage comment, from the Tailwind palette. Existing components migrate incrementally when touched.

### Component conventions (`packages/ui/src/<kebab-name>/`)

- `X.tsx` + `X.styles.ts` + `index.tsx`. All Tailwind classes live in `.styles.ts` as a `cva` (`xStyles`, `XStyleProps`); no inline classes in TSX.
- The `BL` prefix appears **only** in the folder's `index.tsx` re-export and in `packages/ui/src/index.ts` (e.g. `Button as BLButton`). Internally everything uses the plain name.
- Components always accept `className` and pass it last into the cva call so consumers can override.
- Compose from existing DS components first (e.g. `Button`), then unstyled `react-aria-components` for anything interactive (ADR 0003, [docs/architecture/components.md](docs/architecture/components.md)), before writing from scratch. RAC components style state via `data-hovered:`/`data-pressed:`/`data-selected:`/`data-disabled:`, focus via `data-focus-visible:` + `focus-ring` token, and merge `className` with `composeRenderProps`. `PrimitiveButton` is legacy (still used by Dropdown until it migrates). Don't add dependencies without asking.
- Extra CSS (keyframes, complex selectors) goes in `X.module.css` with a `bl:<name>` class, referenced from `.styles.ts`.

Use the `/create-component` skill ([.claude/skills/create-component/SKILL.md](.claude/skills/create-component/SKILL.md)) when adding a component; it holds the full checklist. After adding one, export it from `packages/ui/src/index.ts`, add a demo, and typecheck.
