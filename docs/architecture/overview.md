# Visão geral

Monorepo pnpm (`packages/*`, `apps/*`).

| Pacote | Papel |
|---|---|
| `packages/ui` (`@bloco/ui`) | O design system. React 19, Tailwind v4, `class-variance-authority`, Phosphor icons. |
| `apps/web` (`@bloco/web`) | Catálogo/demo em Vite + react-router. |

`@bloco/ui` é consumido **como código-fonte**: `main`/`types` apontam para `src/index.ts`, sem etapa de build. Por isso o app usa `@source "../../../packages/ui/src"` no CSS, para o Tailwind enxergar as classes do pacote.

Entradas públicas do pacote: `@bloco/ui` (componentes `BL*`) e `@bloco/ui/theme.css` (tokens).

Não há testes nem lint configurados. A verificação hoje é `tsc` (ver comandos no CLAUDE.md).
