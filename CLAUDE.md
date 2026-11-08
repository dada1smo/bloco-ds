# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

pnpm workspace (`packages/*`, `apps/*`). No linter is configured.

- `pnpm dev` — Vite dev server for the demo app (`@bloco/web`)
- `pnpm build` — `tsc && vite build` for the demo app
- `pnpm --filter ./packages/ui exec tsc --noEmit` — typecheck the UI package (includes tests)
- `pnpm test` / `pnpm test:coverage` — Vitest (jsdom) in `packages/ui`; coverage fails below 80%

## Architecture

- `packages/ui` (`@bloco/ui`, private, consumed as source: `main` points to `src/index.ts`) — the design system. React 19, Tailwind v4, `class-variance-authority`, `react-aria-components`, Phosphor icons.
- `apps/web` (`@bloco/web`) — Vite + react-router demo/catalog. `src/demos.tsx` maps `folder -> [{ id, ... }]`; `App.tsx` builds the sidebar file tree from it and routes to `/components/<folder>/<id>`. A new component needs a demo entry here to show up.
- `packages/ui/src/theme.css` — foundations entry (exported as `@bloco/ui/theme.css`); it only imports partials from `packages/ui/src/theme/` (`color.css`, `typography.css`, `spacing.css`, `layout.css`). Primary/neutral = slate, accent = amber.
- Foundations (ADR 0005 + 0006, [docs/architecture/theming.md](docs/architecture/theming.md)): Carbon model on top of Tailwind primitives. Components use **only semantic tokens** with Carbon names, each in its property namespace: `bg-background`, `bg-layer-01..03` (+`-hover`/`-selected`, depth by layer, not shadow), `bg-field-01`, `bg-interactive` + `text-on-color`, `bg-accent` + `text-on-accent`, `text-primary/secondary/helper/placeholder/accent`, `text-icon-*`, `border-subtle/strong/interactive`, `outline-focus`, `support-*`. Type set: `text-body-01`, `text-body-compact-01`, `text-label-01`, `text-heading-01..07`… (weight included; no `font-medium/bold`). Spacing only Carbon steps `0.5 1 2 3 4 6 8 10 12 16 20 24 40`; control heights `h-control-xs..xl`; no `rounded-*` (except `rounded-full`); only `shadow-floating` for menus/popovers. No primitive colors, hex, arbitrary colors or opacity modifiers in `*.styles.ts` — enforced by `packages/ui/src/theme/tokens.test.ts`. Layout (ADR 0008): grid 4/8/16 cols with responsive gutter; compose with `Grid`/`Stack`/`Cluster`/`Sidebar` (parent owns `gap`, components set no outer margin); containers `max-w-prose/reading/page`, `w-sidebar`; no arbitrary breakpoints (`min-[…]`). Missing token → add it to its category partial with a one-line usage comment, valued from Tailwind primitives. Component tokens (`--bl-<comp>-<prop>`) only in `X.module.css` under `bl:<name>`, valued from semantic tokens, only when a value is single-component and can't be a utility (animation, specific behavior).

### Component conventions (`packages/ui/src/<kebab-name>/`)

- `X.tsx` + `X.styles.ts` + `index.tsx`. All Tailwind classes live in `.styles.ts` as a `cva` (`xStyles`, `XStyleProps`); no inline classes in TSX.
- The `BL` prefix appears **only** in the folder's `index.tsx` re-export and in `packages/ui/src/index.ts` (e.g. `Button as BLButton`). Internally everything uses the plain name.
- Components always accept `className` and pass it last into the cva call so consumers can override.
- Compose from existing DS components first (e.g. `Button`), then unstyled `react-aria-components` for anything interactive (ADR 0003, [docs/architecture/components.md](docs/architecture/components.md)), before writing from scratch. RAC components style state via `data-hovered:`/`data-pressed:`/`data-selected:`/`data-disabled:`, focus via `data-focus-visible:` + `outline-focus`, and merge `className` with `composeRenderProps`. Don't add dependencies without asking.
- Tests (ADR 0004, [docs/decisions/0004-testes-com-vitest.md](docs/decisions/0004-testes-com-vitest.md)): every component has `X.test.tsx` next to `X.tsx`, behavior only — `getByRole` + `userEvent`; callbacks, state, `disabled`, ARIA, focus, `className` passthrough. Never assert DS classes, `toHaveStyle` or snapshots. New components ship with their test.
- Extra CSS (keyframes, complex selectors) goes in `X.module.css` with a `bl:<name>` class, referenced from `.styles.ts`.
- Context (ADR 0009, [docs/decisions/0009-documento-de-contexto-por-componente.md](docs/decisions/0009-documento-de-contexto-por-componente.md)): every component has `X.context.md` next to `X.tsx` — purpose, when (not) to use, semantics/a11y, functional meaning of props, composition, decisions. Written for AI first, readable by humans; no classes/tokens. Generate or update it with `/create-component-context` ([.claude/skills/create-component-context/SKILL.md](.claude/skills/create-component-context/SKILL.md)); API or semantic changes update it in the same commit.

Use the `/create-component` skill ([.claude/skills/create-component/SKILL.md](.claude/skills/create-component/SKILL.md)) when adding a component; it holds the full checklist. After adding one, export it from `packages/ui/src/index.ts`, add a demo, write its test and its context, typecheck and run `pnpm test:coverage`.
