# App de demonstração e starter (`apps/web`)

TanStack Start em SPA mode, rotas por arquivo — [ADR 0014](../decisions/0014-tanstack-start-no-app.md).

- `vite.config.ts` — plugin `tanstackStart({ spa: { enabled: true } })`, React e Tailwind.
- `src/router.tsx` — `getRouter()` e registro de tipos. `src/routeTree.gen.ts` é gerado; não edite.
- `src/routes/__root.tsx` — o documento: `<head>` (meta, `index.css`), script que aplica o tema salvo antes do primeiro paint, `<Scripts/>`. Pré-renderizado no build: não use `window`/`localStorage` no render.
- `src/routes/index.tsx` — redireciona para a primeira demo.
- `src/routes/components.tsx` — layout do catálogo: `BLAppShell` + `BLNavigationTree` gerada a partir de `demos`, `BLRouterProvider` ligado ao roteador, `<Outlet/>`.
- `src/routes/components.$folder.$id.tsx` — renderiza a demo `demos[folder]` com aquele `id`; inexistente volta para `/`.
- `src/index.css` importa Tailwind e `@bloco/ui/theme.css`, e declara `@source` para o pacote `ui`.
- `src/demos.tsx` exporta `demos: Record<pasta, Demo[]>`, com `Demo = { id, render }`.

Para um componente novo aparecer no catálogo, adicione uma entrada em `demos.tsx`. Para uma página nova, crie um arquivo em `src/routes/`.

Scripts: `pnpm dev`, `pnpm build` (build + `tsc`), `pnpm --filter @bloco/web preview`.
