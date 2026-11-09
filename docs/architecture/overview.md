# Visão geral

Monorepo pnpm (`packages/*`, `apps/*`).

| Pacote | Papel |
|---|---|
| `packages/ui` (`@bloco/ui`) | O design system. React 19, Tailwind v4, `class-variance-authority`, Phosphor icons. |
| `apps/web` (`@bloco/web`) | Catálogo e starter em TanStack Start (SPA mode) — [ADR 0014](../decisions/0014-tanstack-start-no-app.md). |

`@bloco/ui` é consumido **como código-fonte**: `main`/`types` apontam para `src/index.ts`, sem etapa de build. Por isso o app usa `@source "../../../packages/ui/src"` no CSS, para o Tailwind enxergar as classes do pacote.

O design system tem três camadas, com dependência só para baixo: **foundations** (tokens), **components** (blocos base) e **patterns** (exemplos de composição, sempre composable) — [ADR 0011](../decisions/0011-tres-camadas-do-design-system.md). Patterns ficam em `packages/ui/patterns/<nome>/` (`.pattern.md` + `.example.tsx`), fora do `index.ts` — [ADR 0012](../decisions/0012-estrutura-da-camada-de-patterns.md).

Entradas públicas do pacote: `@bloco/ui` (componentes `BL*`) e `@bloco/ui/theme.css` (tokens).

Não há lint. A verificação é `tsc` mais os testes de comportamento com Vitest em `packages/ui`, com cobertura mínima de 80% (`pnpm test:coverage`, [ADR 0004](../decisions/0004-testes-com-vitest.md); ver [componentes](components.md#testes)).
