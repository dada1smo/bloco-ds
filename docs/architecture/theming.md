# Tema

Decisão: [ADR 0002](../decisions/0002-tokens-semanticos-sobre-tailwind.md).

Fonte única: `packages/ui/src/theme.css` (export `@bloco/ui/theme.css`). Ele só importa as fontes e os partials de `packages/ui/src/theme/`:

| Partial | Conteúdo |
|---|---|
| `palette.css` | camada de marca: `primary-50..950` → slate, `accent-50..950` → amber |
| `color.css` | tokens semânticos de cor (`@theme inline` + valores `light-dark()` em `:root`), `.light` e `.dark` |
| `typography.css` | `font-sans`, `font-mono` e `text-caption … headline` |

Categoria nova (ex.: `sizing.css` para `spacing-control-*` e `radius-*`) = partial novo + uma linha de `@import` no `theme.css`.

## Camadas

Primitiva (paleta do Tailwind) → marca (`primary-*`, `accent-*`) → semântica (intenção). Componentes leem **só a semântica**.

## Tokens semânticos

Cada token tem, no seu partial, um comentário de uma linha dizendo quando usar.

| Token | Uso |
|---|---|
| `primary` | ação principal: fundo de botão sólido, foco |
| `primary-hover` | fundo de `primary` em hover |
| `on-primary` | texto e ícone sobre `primary` |
| `accent` | ação de destaque: fundo de botão accent |
| `accent-hover` | fundo de `accent` em hover |
| `accent-soft` | fundo suave de destaque (subtle accent, hover do outline accent) |
| `accent-soft-hover` | `accent-soft` em hover |
| `on-accent` | texto e ícone sobre `accent` |
| `accent-text` | texto em cor de destaque sobre `background` |
| `background` | fundo da página e das superfícies |
| `foreground` | texto principal |
| `focus-ring` | contorno de foco visível em controles |
| `foreground-muted` | texto secundário: descrição, ícone de apoio |
| `border` | borda de superfície e divisor |
| `surface-hover` | fundo de item/linha em hover ou foco |
| `surface-selected` | fundo do item selecionado |
| `overlay` | véu atrás de modais |
| `text-caption` | legenda, metadado |
| `text-body` | texto corrido |
| `text-interactive` | rótulo de controle |
| `text-subtitle` | subtítulo de seção |
| `text-title` | título de página ou modal |
| `text-headline` | destaque de tela inteira |

Previstos pelo ADR, criados quando o primeiro componente precisar: `border-strong`, `control-sm/md/lg`, `radius-control`, `radius-surface`.

## Regras para componentes

1. Só tokens semânticos em `*.styles.ts`. Proibido: `slate-*`, `amber-*`, `primary-500`, hex, rgb, `[#…]`.
2. Sem modificador de opacidade em cor semântica (`/10`, `/70`). Faltou token? Crie um.
3. Token interativo ganha os estados usados (`-hover`, `-selected`, `-disabled`).
4. Valor novo vira token no partial da categoria, com descrição, no mesmo PR que o usa. Sempre a partir da paleta do Tailwind.
5. Gap e padding podem usar a escala do Tailwind; altura de controle e raio usam tokens.

Nomes: `--<namespace Tailwind>-<conceito>[-<papel>][-<estado>]` (`--color-border` → `border-border`, `--radius-control` → `rounded-control`).

A migração dos componentes atuais é incremental: quem mexer num componente o migra.

## Light/dark e ThemeSwitch

- Variáveis em `:root` com `light-dark()`; o tema segue o sistema. `.light` / `.dark` no `<html>` forçam um modo.
- **ThemeSwitch** (`theme-switch/`): alterna a classe no `<html>` e persiste em `localStorage` (chave `theme`); o valor inicial vem do storage ou de `prefers-color-scheme`.

## Fontes

`font-sans` = Archivo Variable, `font-mono` = Space Mono.
