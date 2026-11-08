# 0008. Usar grid 4/8/16 com gutter responsivo e quatro primitivas de layout

- Status: Aceita
- Data: 2026-11-08

## Contexto

O [0006](0006-foundations-carbon.md) só definiu os breakpoints do grid 2x do Carbon e deixou um componente `Grid` para depois. Faltava o resto da foundation de layout do [designsystems.one](https://www.designsystems.one/foundations/layout): gutter e margem por breakpoint, largura de container por tipo de conteúdo e primitivas de composição. A documentação também se contradizia: o gutter era `gap-8` (32px, Carbon), mas a tabela de Densidade do [0007](0007-densidade-aberta.md) pedia `gap-10` entre colunas de página.

## Decisão

- **Grid**: colunas do Carbon (4 no base, 8 a partir de `md`, 16 a partir de `lg`). Gutter e margem crescem por breakpoint, nos passos da nossa escala: 16px no base, 24px em `md`, 32px em `lg`/`xl`, 40px em `2xl`. Largura máxima de 1584px, centrada.
- **Containers**: a largura depende do tipo de conteúdo, não da página. `max-w-prose` (65ch, do Tailwind) para texto longo, `max-w-reading` (768px) para formulário e coluna única, `max-w-page` (1584px) para a página. `w-sidebar` (288px) para trilho lateral.
- **Primitivas**: as quatro do designsystems.one (vindas do *Every Layout*) viram componentes: `BLGrid`, `BLStack`, `BLCluster` e `BLSidebar`. O pai é dono do layout pelo `gap`; componente não define a própria margem externa.
- **Guarda**: `tokens.test.ts` proíbe breakpoint arbitrário (`min-[…]`, `max-[…]`) em `*.styles.ts`.

## Alternativas consideradas

- **Gutter fixo de 32px (Carbon 2x)**: aperta demais as 4 colunas no celular e não conversa com a densidade aberta do 0007 nas telas largas.
- **Gutter fixo de 40px (Carbon + um passo, regra do 0007)**: no celular, 40px de gutter e margem tomam um terço da tela.
- **12 colunas (designsystems.one)**: divide por 3, mas trocaria os breakpoints e as proporções do Carbon que já adotamos; 16 divide por 2, 4 e 8, e 12+4 ou 4+4+4+4 cobrem os mesmos layouts.
- **Primitivas só como padrão documentado (`flex flex-col gap-*`)**: menos código, mas cada tela escolheria passos e quebras por conta própria.

## Consequências

- Componente novo não ganha margem externa; quem posiciona é o `Stack`, `Cluster`, `Grid` ou `Sidebar` em volta.
- Filhos do `BLGrid` se posicionam com `col-span-*` do Tailwind, prefixados pelo breakpoint (`md:col-span-4`); não há componente `Column`.
- Ficam de fora por enquanto: `Column` com spans por prop, prop `as` nas primitivas, sidebar à direita, modos narrow/condensed do Carbon e subgrid.
