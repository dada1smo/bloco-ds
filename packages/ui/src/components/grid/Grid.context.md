# BLGrid

Grade de página de 4, 8 e 16 colunas (base, `md`, `lg`), com gutter e margens que crescem com a tela e largura máxima centralizada.

## Quando usar

- Estrutura de página ou de região grande alinhada às colunas do sistema: dashboards, áreas de cartões, layouts em colunas.

## Quando não usar

- Itens empilhados → `BLStack`.
- Itens em linha que quebram → `BLCluster`.
- Trilho lateral fixo + conteúdo → `BLSidebar`.
- Botões em proporções dentro de um painel → `BLButtonGroup`.

## Semântica e acessibilidade

- Elemento: `<div>` sem role. Se a região tem significado, passe `role`/`aria-label` ou use um landmark por fora.

## API

Sem props próprias. Demais props: as de `<div>`; `className` é repassado por último.

Os filhos definem a largura com `col-span-*` do Tailwind, por breakpoint: `col-span-4 md:col-span-4 lg:col-span-8`.

## Composição

- O grid é dono do espaçamento entre colunas; filhos não usam margem.
- Dentro de cada célula, componha com `BLStack`/`BLCluster`.

## Decisões

- 4/8/16 colunas e gutter responsivo seguem o grid 2x do Carbon ([ADR 0008](../../../../../docs/decisions/0008-grid-e-layout.md)).
- Não há componente `Column`: a posição dos filhos é responsabilidade do consumidor.

## Exemplo

```tsx
import { BLGrid } from '@bloco/ui';

<BLGrid>
  <section className="col-span-4 lg:col-span-10">Conteúdo</section>
  <aside className="col-span-4 lg:col-span-6">Resumo</aside>
</BLGrid>
```
