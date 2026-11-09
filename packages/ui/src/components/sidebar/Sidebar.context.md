# BLSidebar

Layout com um trilho lateral de largura fixa à esquerda e o conteúdo ocupando o resto. Em telas pequenas, o trilho fica acima do conteúdo.

## Quando usar

- Navegação lateral + área principal (o catálogo do app de demo).
- Filtros ou índice ao lado do conteúdo.

## Quando não usar

- Colunas proporcionais → `BLGrid`.
- Itens empilhados → `BLStack`.

## Semântica e acessibilidade

- Elemento: `<div>` sem role. O trilho vem antes do conteúdo no DOM, que é a ordem de leitura e de Tab.
- O landmark é do consumidor: envolva a navegação em `<nav aria-label>` e o conteúdo em `<main>`/`<article>` conforme o caso.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `side` | ReactNode | Conteúdo do trilho lateral. |
| `children` | ReactNode | Conteúdo principal. |

Demais props: as de `<div>`; `className` é repassado por último.

## Composição

- Com `BLNavigationTree` no `side` e um `BLStack` no conteúdo.
- O espaço entre trilho e conteúdo acompanha o gutter do `BLGrid`.

## Decisões

- Trilho só à esquerda e largura fixa, por enquanto ([ADR 0008](../../../../../docs/decisions/0008-grid-e-layout.md)).

## Exemplo

```tsx
import { BLNavigationTree, BLNavigationTreeItem, BLSidebar, BLStack } from '@bloco/ui';

<BLSidebar side={<nav aria-label="Componentes"><BLNavigationTree><BLNavigationTreeItem title="Button" href="/button" /></BLNavigationTree></nav>}>
  <BLStack>{page}</BLStack>
</BLSidebar>
```
