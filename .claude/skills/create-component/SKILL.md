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
└── {ComponentName}.styles.ts   # opcional se o componente não tiver estilo próprio
```

## Antes de começar

1. Se o nome ou os variants não vierem no pedido, pergunte (nome, elemento HTML base, variants e valores).
2. Leia `packages/ui/src/theme.css` e use apenas tokens existentes (`primary`, `accent`, `on-primary`, `accent-text`, ...). Não invente cores.
3. Confirme que não existe já um componente equivalente em `packages/ui/src`.

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
- `className` é repassado ao `cva` (último, para o consumidor sobrescrever).
- Props: atributos nativos do elemento + `StyleProps`. Sem lógica extra que não foi pedida.
- Acessibilidade: foco visível (`focus-visible:`), `disabled:` quando aplicável, `aria-*` em componentes interativos sem texto.

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

Rode `pnpm --filter ./packages/ui exec tsc --noEmit` (ou o typecheck do workspace) e corrija erros. Se o app web (`apps/web`) tiver uma página de demonstração, adicione uma instância do novo componente.
