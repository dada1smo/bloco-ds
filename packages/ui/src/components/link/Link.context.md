# BLLink

Link de texto em linha, para navegar para outra página ou âncora dentro de um texto.

## Quando usar

- Referência dentro de parágrafos, listas e conteúdo markdown.

## Quando não usar

- Ação visualmente destacada ou que muda estado → `BLButton` (com `as="a"` se navegar).
- Item de navegação lateral → `BLNavigationTree`.
- Cartão inteiro clicável → `BLAnchorCard`.

## Semântica e acessibilidade

- Renderiza `<a>` via RAC `Link`; com `href` navega pelo `BLRouterProvider`. O sublinhado mantém o link reconhecível sem depender só da cor.
- Texto do link deve fazer sentido fora do contexto ("Ver docs", não "clique aqui").

## API

Props de RAC `Link` (`href`, `target`, `onPress`, `isDisabled`, `aria-label`…); `className` vai por último.

## Composição

- Vive dentro de `BLTypography` ou texto corrido; sem margem externa.

## Decisões

- Um único estilo (cor de link + sublinhado); variantes, tamanhos e ícone de link externo ficaram de fora.
