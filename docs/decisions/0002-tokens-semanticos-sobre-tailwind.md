# 0002. Usar tokens semânticos sobre a paleta do Tailwind

- Status: Aceita (camadas revisadas pelo [0005](0005-tres-camadas-de-tokens.md); nomes e `palette.css` substituídos pelo [0006](0006-foundations-carbon.md))
- Data: 2026-11-08

## Contexto

O `theme.css` já separa as escalas de marca (`primary-50..950` → slate, `accent-*` → amber) de alguns papéis semânticos (`primary`, `on-primary`, `accent`, `on-accent`, `accent-text`, `background`, `foreground`, `text-caption … headline`). Mas os componentes improvisam papéis e estados com opacidade e valores soltos:

- `text-primary/70` (9x) para texto secundário, `border-primary/20` (7x) para borda e `bg-primary/10` (7x) para hover ou seleção.
- `rounded-none` (7x), `h-8/10/12` e `min-h-9/11/12` para tamanhos de controle sem nome.
- O mesmo foco (`outline-2 outline-offset-2 outline-primary`) repetido em cada `.styles.ts`.

Cada contribuição (pessoa ou agente) escolhe uma opacidade diferente para a mesma intenção. Não há um nome que diga "use isto para borda", e o `theme.css` cresce como um arquivo único.

Referência: [designsystems.one: Structure for AI](https://www.designsystems.one/ai-ready/structure). A recomendação de lá: uma camada primitiva e uma semântica, componentes que leem só a semântica, nomes por intenção e uma descrição de uma frase por token.

## Decisão

Os componentes usam **apenas tokens semânticos**, definidos sobre a paleta padrão do Tailwind, que segue como primitiva. O `theme.css` continua sendo a fonte única e passa a ser dividido em partials por categoria.

### Camadas

| Camada | O que é | Exemplo | Quem usa |
|---|---|---|---|
| Primitiva | paleta e escalas padrão do Tailwind | `slate-900`, `amber-500`, `text-lg` | só a camada de marca e a semântica |
| Marca | apelidos das escalas, para trocar a paleta num lugar | `primary-900` → `slate-900` | só a camada semântica |
| Semântica | intenção, com `light-dark()` quando muda entre modos | `foreground-muted`, `border`, `control-md` | componentes |

Uma camada referencia só a de baixo, sempre com `var()`. Nomes de aparência (`slate`, `amber`, `900`) não aparecem na camada semântica.

### Nomes

Formato: `--<namespace Tailwind>-<conceito>[-<papel>][-<estado>]`. Usar o namespace do Tailwind faz a utility ser gerada sem configuração extra (`--color-border` → `border-border`, `--spacing-control-md` → `h-control-md`, `--radius-control` → `rounded-control`).

### Taxonomia inicial

Os nomes atuais que já são semânticos ficam como estão. O que hoje é ad hoc ganha nome.

| Categoria | Tokens | Substitui |
|---|---|---|
| color / action | `primary`, `primary-hover`, `on-primary`, `accent`, `accent-hover`, `on-accent`, `accent-text` | `bg-primary/90`, `bg-accent/90` |
| color / surface | `background`, `surface-hover`, `surface-selected` | `bg-primary/5`, `bg-primary/10` |
| color / content | `foreground`, `foreground-muted` | `text-primary/70` |
| color / border | `border`, `border-strong` | `border-primary/20`, `border-primary` |
| color / focus | `focus-ring` | `outline-primary` |
| text | `caption`, `body`, `interactive`, `subtitle`, `title`, `headline` (já existem) | — |
| spacing | `control-sm`, `control-md`, `control-lg` (8 / 10 / 12) | `h-8/10/12` e os `w-*` dos botões quadrados |
| radius | `control`, `surface` | `rounded-none`, `rounded-md` |

Os valores de cada token novo são definidos quando ele for implementado, sempre a partir da paleta do Tailwind. Cores de feedback (danger, success…) ficam de fora até haver um uso, e entram pelas mesmas regras.

### Partials

`theme.css` vira só o ponto de entrada. O export `@bloco/ui/theme.css` e o import dos consumidores não mudam. O arquivo contém os `@import` das fontes e dos partials em `packages/ui/src/theme/`:

| Partial | Conteúdo |
|---|---|
| `palette.css` | camada de marca: `primary-*` → slate, `accent-*` → amber |
| `color.css` | tokens semânticos de cor: o bloco `@theme inline` e os valores `light-dark()` em `:root`, juntos para que cada token fique ao lado do valor; também `.light` e `.dark` |
| `typography.css` | `font-sans`, `font-mono` e `text-caption … headline` |
| `sizing.css` | `spacing-control-*` e `radius-*` |

Cada partial tem o seu próprio bloco `@theme inline`. Isso funciona porque o Tailwind v4 resolve os `@import` antes de processar. Uma categoria nova ganha um partial novo e uma linha de `@import` no `theme.css`.

Cada token semântico leva, no seu partial, um comentário de uma linha dizendo o que significa e quando usar. É o que permite escolher entre dois tokens parecidos sem adivinhar.

```css
/* Texto secundário: descrições, legendas, ícones de apoio. */
--color-foreground-muted: var(--foreground-muted);
```

### Regras para componentes

1. Usar só tokens semânticos. Escalas primitivas e de marca (`slate-*`, `primary-500`), hex, rgb e valores arbitrários de cor (`[#…]`) são proibidos em `*.styles.ts`.
2. Não usar modificador de opacidade em cor semântica (`/10`, `/70`). Se nenhum token existente serve, cria-se um.
3. Todo token interativo tem os estados que forem usados (`-hover`, e `-selected` ou `-disabled` quando houver uso).
4. Um valor novo vira token no partial da sua categoria, com descrição, no mesmo PR que o usa. Não se inventa cor fora da paleta do Tailwind.
5. Espaçamento interno (gap, padding) pode usar a escala do Tailwind direto. Altura de controle e raio usam tokens.

## Alternativas consideradas

- **`tokens.json` (formato W3C) com gerador**: é o que a referência sugere. Aqui, adicionaria um passo de build e uma segunda fonte para ler, e o `@theme` do Tailwind v4 já é CSS declarativo, legível por pessoas e por agentes.
- **Renomear tudo para `action-primary`, `surface-default` etc.**: mexeria em todos os componentes sem ganho real, porque `primary` e `background` já descrevem intenção.
- **Manter a opacidade ad hoc**: é a causa da inconsistência atual.
- **Manter o `theme.css` num arquivo só**: cresce a cada token, e categorias diferentes se misturam.

## Consequências

- O primeiro passo depois do aceite é dividir o arquivo em partials. Isso só move código, sem mudar valores. A verificação é `pnpm build` e uma comparação visual do demo.
- A migração dos componentes é incremental: quem mexer num componente o migra para os tokens.
- Um gate automático fica como próximo passo, por exemplo um script `check:tokens` que procura `slate-|amber-|primary-[0-9]|/[0-9]+|#[0-9a-f]{3,6}` em `*.styles.ts`. O projeto ainda não tem linter.
- Quando o ADR for aceito, `docs/architecture/theming.md` (tabela de tokens com descrição), a skill `/create-component` e o CLAUDE.md passam a citar estas regras.
