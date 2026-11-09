# App de demonstração e starter (`apps/web`)

TanStack Start em SPA mode, rotas por arquivo ([ADR 0014](../decisions/0014-tanstack-start-no-app.md)), organizado em quatro camadas: `routes`, `domain`, `ui` e `global` ([ADR 0015](../decisions/0015-camadas-do-app-web.md)).

- `vite.config.ts` — plugin `tanstackStart({ spa: { enabled: true } })`, React, Tailwind e `resolve.tsconfigPaths` (alias `@/*` → `src/*`).
- `src/router.tsx` — `getRouter()` e registro de tipos. `src/routeTree.gen.ts` é gerado; não edite.
- `src/layers.test.ts` — falha se um import quebrar a regra de dependência entre camadas ou se um arquivo fugir da nomenclatura (kebab-case em `ui`, `domain` e `global`). A regra completa de nomes está na [ADR 0015](../decisions/0015-camadas-do-app-web.md).

## routes

- `routes/__root.tsx` — o documento: `<head>` (meta, `@/ui/styles/index.css`), script que aplica o tema salvo antes do primeiro paint, `<Scripts/>`. É pré-renderizado no build, então não use `window`/`localStorage` no render.
- `routes/_pages/index.tsx` — home (`/`), só marcação com componentes do DS, dentro do layout.
- `routes/_pages.tsx` — layout pathless: `BLRouterProvider` ligado ao roteador, mais `AppLayout` com `DemoNavigation` na sidebar e `<Outlet/>`.
- `routes/_pages/components/$folder.$id.tsx` — renderiza a demo `demos[folder]` com aquele `id`; se ela não existir, volta para `/`.

## domain/demo

- `data/demos.tsx` exporta `demos: Record<pasta, Demo[]>`.
- `types/demo.ts` — `Demo = { id, render }`.
- `utils/find-demo.ts` — `findDemo(folder, id)`.
- `components/demo-navigation.tsx` — a árvore lateral (foundations / components / patterns) gerada a partir de `demos`.

## ui

- `components/app-layout.tsx` — `BLAppShell` com header (toggle de menu, título, `BLThemeSwitch`), a sidebar recebida por prop e a área de conteúdo.
- `styles/index.css` — importa Tailwind e `@bloco/ui/theme.css`, e declara `@source` para o pacote `ui`.

Para um componente novo aparecer no catálogo, adicione uma entrada em `domain/demo/data/demos.tsx`. Para uma página nova, crie um arquivo em `routes/_pages/` que componha peças de `domain` e `ui`.

Scripts: `pnpm dev`, `pnpm build` (build + `tsc`), `pnpm --filter @bloco/web test`, `pnpm --filter @bloco/web preview`.
