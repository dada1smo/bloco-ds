# 0014. Usar TanStack Start (SPA mode) como base do app de catálogo e starter

- Status: Proposta
- Data: 2026-11-08

## Contexto

`apps/web` nasceu como catálogo de demos do design system, em Vite + react-router com rotas declaradas à mão em `App.tsx`. Ele passa a ter um segundo papel: ser o **starter** de novos projetos que consomem `@bloco/ui`, já com padrões de arquitetura definidos. Um starter precisa de convenções que o projeto novo herda sem decidir de novo: onde ficam as rotas, onde ficam os layouts, como o documento HTML é montado, como os links dos componentes RAC falam com o roteador. Um roteador solto deixa tudo isso em aberto, e a evolução para SSR, loaders e server functions exigiria trocar de base depois.

## Decisão

O app usa **TanStack Start em SPA mode**, com rotas por arquivo em `apps/web/src/routes/`. Convenções do starter:

- `routes/__root.tsx` é só o documento: `<html>`, `head()` (meta, CSS), script de tema anti-flash, `<HeadContent/>` e `<Scripts/>`. Ele é pré-renderizado no build (o shell do SPA), então nada nele toca `window`/`localStorage` durante o render.
- Layouts são rotas de layout (ex.: `routes/components.tsx` com `BLAppShell` e `<Outlet/>`); páginas são rotas filhas. Código que depende do navegador fica nessas rotas, fora do shell.
- `src/router.tsx` exporta `getRouter()` e registra o tipo do router. `src/routeTree.gen.ts` é gerado pelo plugin e versionado, nunca editado à mão.
- UI vem só de `@bloco/ui` (nomes `BL…`). Links de componentes RAC (`href`) passam pelo roteador via `BLRouterProvider` com o `navigate` do TanStack Router, no layout.
- O catálogo continua dirigido por `src/demos.tsx`; a rota `components.$folder.$id.tsx` resolve a demo e volta para `/` se ela não existir.

## Alternativas consideradas

- **Manter Vite + react-router** — funciona para o catálogo, mas não dá convenção de starter (rotas por arquivo, documento, head) nem caminho para SSR/server functions.
- **Next.js** — acoplado ao próprio runtime e a RSC; mais peso para um app que consome o DS como código-fonte via Vite e Tailwind v4.
- **TanStack Start com SSR** — adiado: o `BLThemeSwitch` lê `localStorage` no render e precisaria ficar seguro para servidor. Como a estrutura já é a do Start, ligar SSR depois é tirar `spa.enabled` do `vite.config.ts` e ajustar esse componente.

## Consequências

- Vite sobe para a versão 8 (exigida pelo Start atual) e `@vitejs/plugin-react` para a compatível.
- `index.html` e `main.tsx` deixam de existir; o `<head>` é declarado em `__root.tsx`.
- Rota nova = arquivo novo em `src/routes/`; o `routeTree.gen.ts` atualiza sozinho no `dev`/`build`.
- O build gera um shell estático (`dist/client/_shell.html`) e o servidor de produção é `vite preview` (ou qualquer host estático com fallback para o shell).
- Skills e docs que citavam `App.tsx` passam a citar `routes/components.tsx`.
