---
name: create-component
description: Cria um novo componente no design system (packages/ui) seguindo o padrão do Button — pasta própria, cva + Tailwind, classes separadas em .styles.ts. Use ao pedir "criar componente", "novo componente do ds", "add component".
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
└── {ComponentName}.test.tsx    # obrigatório (ADR 0004)
```

## Antes de começar

1. Se o nome ou os variants não vierem no pedido, pergunte (nome, elemento HTML base, variants e valores).
2. Leia os partials em `packages/ui/src/theme/` e use **apenas tokens semânticos** (`primary`, `on-primary`, `accent-text`, `foreground`, `text-body`, ...) — regras em `docs/architecture/theming.md` (ADR 0002 e 0005):
   - Proibido em `.styles.ts`: `slate-*`, `amber-*`, `primary-500`, hex, rgb, `[#…]` e opacidade em cor semântica (`/10`, `/70`).
   - Faltou um token? Crie-o no partial da categoria, com comentário de uma linha dizendo quando usar, a partir da paleta do Tailwind.
   - Altura de controle e raio usam tokens; gap e padding podem usar a escala do Tailwind.
3. Confirme que não existe já um componente equivalente em `packages/ui/src`.
4. **Primitivos primeiro:** sempre tente compor com o que já existe, nesta ordem:
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
- Estados pelos data-attributes do RAC: `data-hovered:`, `data-pressed:`, `data-selected:`, `data-disabled:`, `data-open:`. Foco: `outline-none data-focus-visible:outline-2 data-focus-visible:outline-focus-ring` (nunca `focus-visible:` em componente RAC).
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

Rode `pnpm --filter ./packages/ui exec tsc --noEmit` e `pnpm test:coverage` (mínimo 80%) e corrija erros. Se o app web (`apps/web`) tiver uma página de demonstração, adicione uma instância do novo componente.
