# App de demonstração e starter (`apps/web`)

TanStack Start em SPA mode, rotas por arquivo ([ADR 0014](../decisions/0014-tanstack-start-no-app.md)), organizado em quatro camadas: `routes`, `domain`, `ui` e `global` ([ADR 0015](../decisions/0015-camadas-do-app-web.md)).

- `vite.config.ts` — plugin `tanstackStart({ spa: { enabled: true } })`, React, Tailwind e `resolve.tsconfigPaths` (alias `@/*` → `src/*`).
- `src/router.tsx` — `getRouter()` e registro de tipos. `src/routeTree.gen.ts` é gerado; não edite.
- `src/layers.test.ts` — falha se um import quebrar a regra de dependência entre camadas ou se um arquivo fugir da nomenclatura (kebab-case em `ui`, `domain` e `global`). A regra completa de nomes está na [ADR 0015](../decisions/0015-camadas-do-app-web.md).

## routes

- `routes/__root.tsx` — o documento: `<head>` (meta, `@/ui/styles/index.css`), script que aplica o tema salvo antes do primeiro paint, `<Scripts/>`. É pré-renderizado no build, então não use `window`/`localStorage` no render.
- `routes/_pages/index.tsx` — home (`/`), só marcação com componentes do DS, dentro do layout.
- `routes/_pages.tsx` — layout pathless: `BLRouterProvider` ligado ao roteador, mais `AppLayout` com `DocsNavigation` na sidebar e `<Outlet/>`.
- `routes/_pages/$layer.$slug.tsx` — renderiza `DocsPage` com o `Doc` daquela camada e slug (`/components/button`); se ele não existir, volta para `/`.

## domain/docs

Catálogo como site de docs, uma página por item do DS ([ADR 0016](../decisions/0016-catalogo-como-site-de-docs.md)).

- `types/doc.ts` — `Doc = { slug, title, layer, context?, props?, examples }`.
- `data/<layer>/<slug>.tsx` — um `Doc` por arquivo; `context` é o `.context.md`/`.pattern.md` importado com `?raw`.
- `data/shared.tsx` — constantes usadas por mais de uma página. `data/docs.ts` — registro na ordem da sidebar.
- `utils/find-doc.ts` — `findDoc(layer, slug)`. `utils/get-sections.ts` — divide o `.md` em intro e seções `##` (sem `API` e `Exemplo`).
- `components/docs-page.tsx` — template: título, intro, exemplos, props e seções do `.md`; partes sem dados não aparecem.
- `components/docs-navigation.tsx` — a árvore lateral (Foundations / Components / Patterns) com o `title` de cada `Doc`.

## ui

- `components/app-layout.tsx` — `BLAppShell` com header (toggle de menu, título, `BLThemeSwitch`), a sidebar recebida por prop e a área de conteúdo.
- `components/markdown.tsx` — `Markdown`: `react-markdown` + `remark-gfm` com a tipografia do DS.
- `components/preview.tsx` — `Preview`: a moldura de um exemplo.
- `styles/index.css` — importa Tailwind e `@bloco/ui/foundations.css`, e declara `@source` para o pacote `ui`.

Para um componente novo aparecer no catálogo, crie a página dele com `/create-component-docs`. Para uma página nova, crie um arquivo em `routes/_pages/` que componha peças de `domain` e `ui`.

Scripts: `pnpm dev`, `pnpm build` (build + `tsc`), `pnpm --filter @bloco/web test`, `pnpm --filter @bloco/web preview`.
