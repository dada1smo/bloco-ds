---
name: create-component
description: Cria um novo componente no design system (packages/ui) tendo o Carbon DS como referência e adaptando às decisões do projeto — pasta própria, cva + Tailwind, classes separadas em .styles.ts. Use ao pedir "criar componente", "novo componente do ds", "add component".
---

# Criar componente do DS

## Nomenclatura

O prefixo `BL` aparece **somente** nos exports finais do componente (`index.tsx` da pasta e `src/index.ts`). Internamente tudo usa o nome simples.

| Item | Formato | Exemplo |
|---|---|---|
| Pasta | `{kebab}` | `button/` |
| Arquivos | `{Pascal}` | `Button.tsx`, `Button.styles.ts` |
| Componente / Props | `{Pascal}` / `{Pascal}Props` | `Button`, `ButtonProps` |
| Função cva | `{camel}Styles` | `buttonStyles` |
| Tipo de estilo | `{Pascal}StyleProps` | `ButtonStyleProps` |
| Export final (`index.tsx`) | `BL{Pascal}` | `Button as BLButton` |

## Estrutura

Local: `packages/ui/src/{component-name}/`

```
{component-name}/
├── index.tsx              # único lugar com o prefixo BL
├── {ComponentName}.tsx
├── {ComponentName}.styles.ts   # opcional se o componente não tiver estilo próprio
├── {ComponentName}.test.tsx    # obrigatório (ADR 0004)
└── {ComponentName}.context.md  # obrigatório (ADR 0009)
```

## Antes de começar

1. Se o nome ou os variants não vierem no pedido, pergunte (nome, elemento HTML base, variants e valores).
2. **Referência: Carbon.** Antes de definir a API, estude o componente equivalente no [Carbon Design System](https://carbondesignsystem.com/components/overview/components/) (`https://carbondesignsystem.com/components/{nome}/usage/`, abas *Usage*, *Style* e *Accessibility*). Extraia anatomia, variants e quando usar cada um, estados, tamanhos, comportamento de teclado e regras de conteúdo. Se o Carbon não tiver o componente, use o padrão dele mais próximo e avise o usuário.
   Depois **adapte ao projeto** — as decisões do bloco-ds vencem o Carbon:
   - Visual só com os tokens semânticos e o type set do projeto (passo 3); padding e gap pela tabela **Densidade** (ADR 0007), nunca copiando o px do Carbon.
   - Comportamento pelo RAC e API do RAC (`onPress`, `isDisabled`), não a API React do Carbon (ADR 0003).
   - Nomes de props e variants seguem os que o DS já usa para o mesmo conceito (`level`, `color`, `size`).
   - Só os variants que o pedido precisa; o resto do Carbon fica de fora.
   - Divergências relevantes do Carbon (e o que ficou de fora) vão para a seção "Decisões" do `{ComponentName}.context.md`.
3. Leia `docs/architecture/theming.md` e os partials em `packages/ui/src/theme/` e use **apenas tokens semânticos** com nomes do Carbon (ADR 0006): `bg-background`, `bg-layer-01` (+`-hover`/`-selected`, no nível em que o componente está), `bg-field-01`, `bg-interactive` + `text-on-color`, `bg-accent` + `text-on-accent`, `text-primary`/`text-secondary`/`text-helper`, `text-icon-secondary`, `border-subtle`/`border-strong`, `outline-focus`, `support-*`.
   - Texto pelo type set: `text-body-01`, `text-body-compact-01` (controles), `text-label-01`, `text-heading-0N`. O token traz o peso; não use `font-medium`/`font-bold` nem `leading-*`.
   - Densidade aberta (ADR 0007, corpo 20px): escolha padding/gap pelo papel na tabela **Densidade** de `docs/architecture/theming.md` (controle md = `px-6`, ícone ↔ texto = `gap-3`, ícone `size-5`).
   - Espaçamento só nos passos `0.5 1 2 3 4 6 8 10 12 16 20 24 40`; altura e largura de controle por `h-control-xs..xl`; sem `rounded-*` (exceto `rounded-full`); sombra só `shadow-floating` (menu/popover).
   - Proibido em `.styles.ts`: primitivas de cor (`slate-*`, `red-*`…), hex, rgb, `[#…]` e opacidade em cor (`/10`, `/70`). `src/theme/tokens.test.ts` falha se aparecerem.
   - Faltou um token? Crie-o no partial da categoria, com comentário de uma linha dizendo quando usar, a partir das primitivas do Tailwind.
   - **Form field** (input, textarea, checkbox, select…): ADR 0010 — componha `FieldLabel`, `FieldHelperText` e `FieldFeedback` (`../field-*/…`), com props `label`, `helperText`, `errorMessage`, `successMessage`, `isInvalid`; placeholder e disabled pelos tokens da seção "Estados de campo" de `theming.md`.
4. Confirme que não existe já um componente equivalente em `packages/ui/src`.
5. **Primitivos primeiro:** sempre tente compor com o que já existe, nesta ordem:
   1. Componentes criados dentro do bloco-ds (`packages/ui/src` e demais pacotes em `packages/*`; ex.: `Button`, importado do arquivo interno `../button/Button`).
   2. Componentes do `react-aria-components` (RAC), sem estilo, para qualquer coisa interativa (ADR 0003): `Button`, `Link`, `Menu`, `Dialog`/`Modal`, `Select`/`ListBox`, `Disclosure`, `Tree`…
   3. Outras libs já instaladas em `packages/ui/package.json`.
   4. Só então escreva do zero. Não adicione dependência nova sem pedir.

## `{ComponentName}.styles.ts`

- Imports: `cva` e `type VariantProps` de `class-variance-authority`.
- Strings de classe separadas por responsabilidade em `const` no topo do arquivo, não exportadas (ex.: `displayStyles`, `typographyStyles`, `shapeStyles`, `interactionStyles`, `focusStyles`). Use só os grupos que fizerem sentido.
- Export `{componentName}Styles = cva([...grupos], { variants, compoundVariants, defaultVariants })`.
- Variants com `''` quando o estilo vier só de `compoundVariants`.
- Export `type {ComponentName}StyleProps = VariantProps<typeof {componentName}Styles>`.
- Aspas simples, vírgula final.

## `{ComponentName}.tsx`

```tsx
import type { HTMLAttributes } from 'react'; // atributos do elemento base
import { xStyles, type XStyleProps } from './X.styles';

export type XProps = HTMLAttributes<HTMLDivElement> & XStyleProps;

export function X({ variantA, variantB, className, ...props }: XProps) {
  return <div {...props} className={xStyles({ variantA, variantB, className })} />;
}
```

- Sem classes Tailwind inline no TSX — tudo vem de `.styles.ts`.
- **Sempre** aceitar `className` e passá-lo ao `cva` (último, para o consumidor sobrescrever). Nunca descartar nem concatenar à mão.
- Se o componente tiver mais de um elemento, `className` vai no elemento raiz.
- Props: props do componente RAC base (ou atributos nativos do elemento, se não houver RAC) + `StyleProps`. Sem lógica extra que não foi pedida.
- Em componentes RAC, `className` pode ser função: combine com `composeRenderProps(className, (className) => xStyles({ ..., className }))`.
- Estados pelos data-attributes do RAC: `data-hovered:`, `data-pressed:`, `data-selected:`, `data-disabled:`, `data-open:`. Foco: `outline-none data-focus-visible:outline-2 data-focus-visible:outline-focus` (nunca `focus-visible:` em componente RAC).
- Acessibilidade: o RAC cuida de teclado, foco e ARIA; adicione `aria-label` em componentes interativos sem texto.

## CSS extra (só se necessário)

Tailwind via cva é o padrão. Se algo não for expressável em classes (keyframes, seletores complexos, pseudo-elementos), crie `{ComponentName}.module.css` na pasta do componente:

- A classe usa o prefixo `bl:` + nome do componente em kebab: `bl:button`, `bl:theme-switch`.
- Em CSS o `:` precisa de escape: `.bl\:button { ... }`; no TS, referencie por string literal ou `styles['bl:button']`.
- A referência fica em `.styles.ts` (junto às strings de classe), nunca inline no TSX.
- Use os tokens de `theme.css` (`var(--...)`), sem valores soltos.
- Token de componente (opcional, ADR 0005): só se o valor serve a um único componente e não cabe numa utility (animação, comportamento específico). Declare no seletor `bl:<nome>` como `--bl-<comp>-<prop>[-<estado>]`, com comentário de uma linha, valendo `var()` de token semântico (ou primitiva do Tailwind se não for cor) e use só neste arquivo. Se outro componente precisar, promova a token semântico.

## `index.tsx`

```tsx
export { X as BLX, type XProps as BLXProps } from './X';
```

## Exportar no pacote

Adicione em `packages/ui/src/index.ts`:

```ts
export { BLX, type BLXProps } from './{component-name}';
```

## Verificação

Escreva `{ComponentName}.test.tsx` testando só comportamento (ver [ADR 0004](../../../docs/decisions/0004-testes-com-vitest.md)): `getByRole` + `userEvent`, callbacks, estado, `disabled`, ARIA, foco e repasse de `className`; nunca classes do DS, `toHaveStyle` ou snapshot.

Escreva o context antes da página de docs: ela renderiza o `.md`.

Escreva `{ComponentName}.context.md` seguindo a skill `create-component-context` ([SKILL.md](../create-component-context/SKILL.md), [ADR 0009](../../../docs/decisions/0009-documento-de-contexto-por-componente.md)), depois que a API e o teste estiverem prontos.

Crie a página de docs (`apps/web/src/domain/docs/data/components/{component-name}.tsx`) seguindo a skill `create-component-docs` ([SKILL.md](../create-component-docs/SKILL.md), [ADR 0016](../../../docs/decisions/0016-catalogo-como-site-de-docs.md)): exemplos do conjunto padrão, props e o context ligado.

Rode `pnpm --filter ./packages/ui exec tsc --noEmit` e `pnpm test:coverage` (mínimo 80%) e corrija erros.
