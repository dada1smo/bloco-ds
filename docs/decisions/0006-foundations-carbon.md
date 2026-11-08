# 0006. Definir as foundations pelo modelo do Carbon sobre as primitivas do Tailwind

- Status: Aceita
- Data: 2026-11-08

## Contexto

Os componentes vieram antes das foundations. Havia só cor (17 tokens com nomes ad hoc: `primary`, `foreground`, `surface-hover`) e seis tamanhos de texto grandes (corpo de 18px). Espaçamento, altura de controle, raio, elevação e breakpoints não existiam, e cada `.styles.ts` resolvia do seu jeito (`h-9`, `gap-2.5`, `rounded-md`, `shadow-lg`, `min-h-[26px]`). O `palette.css` (`primary-50..950`, `accent-*`) não tinha leitor: o `color.css` lia `slate-*` direto e os componentes eram proibidos de usá-lo.

Referências: a estrutura de foundations do [designsystems.one](https://www.designsystems.one/foundations) (color, typography, spacing, layout) e, como visual, o [Carbon](https://carbondesignsystem.com) da IBM.

## Decisão

As foundations seguem o Carbon, com as escalas do Tailwind como primitivas. As três camadas do [0005](0005-tres-camadas-de-tokens.md) continuam.

- **Cor**: vocabulário do Carbon (`background`, `layer-01..03`, `field-*`, `border-subtle/strong`, `text-primary/secondary/helper/…`, `icon-*`, `interactive`, `support-*`, `focus`). Cada token fica no namespace da propriedade do Tailwind v4 (`--background-color-*`, `--text-color-*`, `--border-color-*`, `--outline-color-*`), o que gera nomes limpos (`bg-layer-01`, `text-primary`) e impede o uso fora do papel. Light ≈ Carbon White, dark ≈ G100, ambos via `light-dark()`. A marca continua slate (primário) e amber (accent), escolhida direto no `color.css`.
- **Profundidade**: por camada de fundo, não por sombra. Existe uma única sombra, `shadow-floating`, para o que flutua (menu, popover).
- **Tipografia**: type set produtivo do Carbon (`code`, `label`, `helper-text`, `body-compact`, `body`, `heading-compact`, `heading-01..07`). Cada token carrega tamanho, line-height, tracking e peso. Os pesos são só 300, 400 e 600. As fontes continuam Archivo e Space Mono.
- **Espaçamento**: a escala 01–13 do Carbon (2–160px) é um subconjunto exato da escala numérica do Tailwind, por isso não ganha tokens. Ficam permitidos só os passos `0.5 1 2 3 4 6 8 10 12 16 20 24 40`.
- **Sizing**: `control-xs..xl` = 24/32/40/48/64px (`h-control-md`).
- **Raio**: zero. Nenhum `rounded-*` exceto `rounded-full`.
- **Layout**: breakpoints do grid 2x do Carbon (320/672/1056/1312/1584px) no lugar dos do Tailwind.
- **Guarda**: `packages/ui/src/theme/tokens.test.ts` falha se um `*.styles.ts` usar cor primitiva, hex, opacidade em cor, raio, outra sombra, peso fora do set ou espaçamento fora da escala.

O `palette.css` foi apagado. Este ADR substitui os nomes de token do [0002](0002-tokens-semanticos-sobre-tailwind.md) e a frase do 0005 que tratava o `palette.css` como parte da camada semântica.

## Alternativas consideradas

- **Manter os nomes do 0002 e só acrescentar o que falta**: o 0002 rejeitou renomear porque mexeria em todos os componentes. Com 8 componentes, o custo é uma passada só, e um vocabulário conhecido (Carbon) evita inventar nomes para cada papel novo.
- **Nomes Carbon em `--color-*`**: gerariam `text-text-primary` e `bg-text-primary`. Os namespaces por propriedade evitam as duas coisas.
- **Tokens para a escala de espaçamento (`p-05`)**: duplicariam valores que já existem no Tailwind e confundiriam com `p-5`.
- **Manter `palette.css` e ligá-lo ao `color.css`**: daria um ponto único de troca de marca, mas acrescenta uma camada e gera utilities proibidas. Trocar a marca é editar as linhas `light-dark()` do `color.css`.
- **IBM Plex**: troca de identidade que não foi pedida.

## Consequências

- O visual fica mais denso (corpo 14px, controles 32/40/48px) e com cantos retos.
- `Typography` passa de `size` para `variant` com os nomes do type set, e o peso padrão vem do token.
- Token novo continua entrando no partial da sua categoria, com comentário de uma linha, a partir da paleta e das escalas do Tailwind.
- Ficam para o próximo ciclo: motion (durações e easings do Carbon), ícones, auditoria de a11y, temas G10/G90 e um componente `Grid`.
