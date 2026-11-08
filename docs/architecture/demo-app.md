# App de demonstração (`apps/web`)

- `main.tsx` monta `BrowserRouter` + `App`.
- `index.css` importa Tailwind e `@bloco/ui/theme.css`, e declara `@source` para o pacote `ui`.
- `demos.tsx` exporta `demos: Record<pasta, Demo[]>`, com `Demo = { id, render }`. Cada pasta é um componente; cada `id` (ex.: `default.tsx`) é uma demo.
- `App.tsx` gera a árvore lateral (`BLNavigationTree`) a partir de `demos` e navega para `/components/<pasta>/<id>`.

Para um componente novo aparecer no catálogo, adicione uma entrada em `demos.tsx`.
