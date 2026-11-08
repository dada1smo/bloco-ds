# Foundations

Decisões: [ADR 0005](../decisions/0005-tres-camadas-de-tokens.md) (camadas) e [ADR 0006](../decisions/0006-foundations-carbon.md) (modelo Carbon). O [ADR 0002](../decisions/0002-tokens-semanticos-sobre-tailwind.md) é o histórico.

Fonte única: `packages/ui/src/theme.css` (export `@bloco/ui/theme.css`). Ele só importa as fontes e os partials de `packages/ui/src/theme/`:

| Partial | Conteúdo |
|---|---|
| `color.css` | cor e tema: `background`, `layer-*`, `field-*`, bordas, texto, ícone, `interactive`, `accent`, `support-*`, foco; `.light` e `.dark` |
| `typography.css` | `font-sans`, `font-mono` e o type set (`text-body-01`, `text-heading-03`…) |
| `spacing.css` | alturas de controle (`control-xs..xl`) e `shadow-floating` |
| `layout.css` | breakpoints do grid 2x |

Categoria nova = partial novo + uma linha de `@import` no `theme.css`. Cada token leva, no partial, um comentário de uma linha dizendo quando usar.

## Camadas

| Camada | O que é | Onde | Quem lê |
|---|---|---|---|
| Primitiva | paleta e escalas do Tailwind (`slate-900`, `text-sm`, `--spacing`) | Tailwind | só a semântica |
| Semântica | intenção, no vocabulário do Carbon (`layer-01`, `text-secondary`, `text-body-01`) | `packages/ui/src/theme/` | componentes |
| Componente (opcional) | valor de um único componente (`--bl-modal-enter-duration`) | `X.module.css` | só aquele componente |

Valores semânticos sempre derivam da primitiva: cor = `var(--color-<tailwind>)`; o resto = `var(--text-sm)`, `var(--font-weight-semibold)` ou `calc(var(--spacing) * n)`.

## Cor

Cada token fica no namespace da propriedade do Tailwind v4, por isso só gera a utility do seu papel:

| Namespace | Utility | Exemplo |
|---|---|---|
| `--background-color-*` | `bg-*` | `bg-layer-01` |
| `--text-color-*` | `text-*` | `text-secondary`, `text-icon-secondary` |
| `--border-color-*` | `border-*` | `border-subtle` |
| `--outline-color-*` | `outline-*` | `outline-focus` |
| `--color-*` | qualquer | `bg-support-error`, `text-support-success` |

Light ≈ Carbon White, dark ≈ Carbon G100. Os valores ficam em `light-dark()` no próprio token. O tema segue o sistema; `.light`/`.dark` no `<html>` forçam um modo.

### Camadas: profundidade sem sombra

`background` → `layer-01` → `layer-02` → `layer-03`. Cada nível tem `-hover` e `-selected`. Uma superfície sobre a página usa `layer-01`; o que fica dentro dela usa `layer-02`, e assim por diante. Item clicável usa o hover **do nível em que está** (`bg-layer-hover-01` dentro de um menu `bg-layer-01`, `bg-background-hover` direto na página). Campos seguem a mesma regra: `field-01` sobre `background`, `field-02` sobre `layer-01`.

### Tokens

| Grupo | Tokens |
|---|---|
| Fundo | `background`, `background-hover`, `background-selected`, `background-inverse` |
| Camada | `layer-01..03`, `layer-hover-01..03`, `layer-selected-01..03` |
| Campo | `field-01`, `field-02`, `field-hover-01`, `field-hover-02` |
| Ação principal | `bg-interactive`, `-hover`, `-active`, tinta `text-on-color`, borda `border-interactive` |
| Destaque | `bg-accent`, `-hover`, `bg-accent-subtle`, `-subtle-hover`, tinta `text-on-accent` / `text-accent`, borda `border-accent` |
| Borda | `border-subtle` (divisor), `border-strong` (contorno de controle), `border-interactive`, `border-accent`, `border-disabled` |
| Texto | `text-primary`, `-secondary`, `-placeholder`, `-helper`, `-disabled`, `-on-color`, `-inverse`, `-error`, `-accent`, `-on-accent`, `-link-primary(-hover)` |
| Ícone | `text-icon-primary`, `-secondary`, `-disabled`, `-on-color` |
| Status | `support-error`, `-success`, `-warning`, `-info` e `support-*-subtle` (fundo de notificação) |
| Foco e véu | `outline-focus`, `outline-focus-inset`, `bg-overlay` |

Fundo e tinta formam um par e andam juntos (`bg-interactive` + `text-on-color`, `bg-accent` + `text-on-accent`).

### Contraste (WCAG 2.1, medido com os valores oklch do Tailwind 4.3)

Mínimos: 4.5:1 para texto, 3:1 para texto grande, borda de controle e ícone.

| Par | Light | Dark |
|---|---|---|
| `text-primary` / `background` | 17.8 | 19.3 |
| `text-secondary` / `background` | 7.6 | 7.7 |
| `text-secondary` / `layer-01` | 6.9 | 6.8 |
| `text-placeholder` / `field-01` | 6.9 | 6.8 |
| `text-on-color` / `interactive` | 17.0 | 16.3 |
| `text-on-accent` / `accent` | 7.0 | 8.7 |
| `text-accent` / `background` | 5.1 | 11.7 |
| `text-accent` / `accent-subtle` | 4.5 | 8.7 |
| `text-error` / `background` | 4.8 | 7.0 |
| `text-link-primary` / `background` | 6.8 | 7.6 |
| `border-strong` / `field-01` | 4.3 | 6.8 |
| `outline-focus` / `background` | 17.8 | 20.2 |
| `support-success` / `background` | 3.2 | 11.4 |
| `text-on-color` / `support-error` | 4.6 | 6.2 |
| `support-warning` / `background` | **2.1** | 11.7 |

`support-warning` só serve de preenchimento com tinta escura por cima, como o amarelo do Carbon. Nunca use como texto nem como ícone solto. `text-disabled` é isento.

## Tipografia

Type set produtivo do Carbon. O token já traz tamanho, line-height, tracking e peso: `text-body-01` sozinho basta, sem `font-*` nem `leading-*`.

| Token | px / line-height | Peso | Uso |
|---|---|---|---|
| `code-01` / `code-02` | 12/16 · 14/20 | 400 | código (com `font-mono`) |
| `label-01` / `label-02` | 12/16 · 14/18 | 400 | rótulo de campo, tag, metadado |
| `helper-text-01` | 12/16 | 400 | ajuda e erro abaixo de campo |
| `body-compact-01` / `-02` | 14/18 · 16/22 | 400 | texto de uma linha em controle (botão, menu, campo) |
| `body-01` / `body-02` | 14/20 · 16/24 | 400 | texto corrido |
| `heading-compact-01` / `-02` | 14/18 · 16/22 | 600 | título de uma linha em componente denso |
| `heading-01` / `heading-02` | 14/20 · 16/24 | 600 | título de grupo e de seção em componente |
| `heading-03` | 20/28 | 400 | título de modal e de seção de página |
| `heading-04` / `heading-05` | 28/36 · 32/40 | 400 | título de página |
| `heading-06` / `heading-07` | 42/50 · 54/64 | 300 | display, hero |

Pesos do sistema: 300, 400 e 600. `font-medium` e `font-bold` não são usados. O nível do heading HTML (`h1`…`h6`) é escolhido pela estrutura da página, não pelo tamanho. Fontes: `font-sans` = Archivo Variable, `font-mono` = Space Mono.

## Espaçamento

A escala do Carbon é um subconjunto da escala numérica do Tailwind (`--spacing` = 4px). Use só estes passos em `p-*`, `m-*`, `gap-*` e `space-*`:

| Carbon | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | 11 | 12 | 13 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| px | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 64 | 80 | 96 | 160 |
| Tailwind | `0.5` | `1` | `2` | `3` | `4` | `6` | `8` | `10` | `12` | `16` | `20` | `24` | `40` |

## Sizing

| Token | px | Uso |
|---|---|---|
| `control-xs` | 24 | linha de árvore |
| `control-sm` | 32 | botão pequeno |
| `control-md` | 40 | botão, campo, item de menu (padrão) |
| `control-lg` | 48 | botão grande, cabeçalho de accordion |
| `control-xl` | 64 | controle de destaque |

Altura e largura de controle sempre por token (`h-control-md`, `w-control-sm`, `min-h-control-md`). Ícones: `size-4` (16px) em controles `sm`/`md`, `size-5` (20px) e `size-6` (24px) nos maiores.

## Forma e elevação

- **Raio**: zero. Nenhum `rounded-*`, exceto `rounded-full` em elementos circulares.
- **Elevação**: por camada (`layer-*`). A única sombra é `shadow-floating`, só em menu, popover e tooltip. Modal não tem sombra: o `bg-overlay` basta.
- **z-index**: `z-10` para elemento sticky, `z-50` para overlay, modal e popover.

## Layout

Breakpoints do grid 2x do Carbon, que substituem os do Tailwind:

| Breakpoint | Largura | Colunas |
|---|---|---|
| `sm` | 320px (20rem) | 4 |
| `md` | 672px (42rem) | 8 |
| `lg` | 1056px (66rem) | 16 |
| `xl` | 1312px (82rem) | 16 |
| `2xl` | 1584px (99rem) | 16 (largura máxima) |

Gutter `gap-8` (32px), margem `px-4` (16px).

## Regras para componentes

1. Só tokens semânticos em `*.styles.ts`. Proibido: primitivas de cor (`slate-*`, `red-*`…), `bg-white`, hex, `[#…]` e opacidade em cor (`/10`).
2. Espaçamento só nos passos da tabela; altura de controle por `control-*`; sem raio; sem sombra além de `shadow-floating`; sem `font-medium`/`font-bold`.
3. Token interativo ganha os estados usados (`-hover`, `-active`, `-selected`).
4. Faltou um token? Ele entra no partial da categoria, com comentário, no mesmo PR que o usa, sempre a partir das primitivas do Tailwind.

As regras 1 e 2 são verificadas por `packages/ui/src/theme/tokens.test.ts`, que roda em `pnpm test`.

## ThemeSwitch

`theme-switch/` alterna `.light`/`.dark` no `<html>` e persiste em `localStorage` (chave `theme`). O valor inicial vem do storage ou de `prefers-color-scheme`.

## Catálogo

O app web mostra as foundations em `foundations/color.tsx` e `foundations/spacing.tsx`, e o type set em `typography/variants.tsx`.
