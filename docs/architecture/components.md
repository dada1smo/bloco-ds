# Componentes

Local: `packages/ui/src/<kebab-name>/`

```
button/
├── index.tsx          # único lugar com o prefixo BL
├── Button.tsx
└── Button.styles.ts
```

## Estilos

`Button.styles.ts` exporta um `cva` (`buttonStyles`) e o tipo `ButtonStyleProps`. As classes são agrupadas em `const`s por responsabilidade (`displayStyles`, `typographyStyles`, `shapeStyles`, `interactionStyles`, `focusStyles`). Variants que só existem por combinação usam `''` + `compoundVariants` (ex.: cor × nível do Button). O TSX não tem classes inline.

## Props e `className`

Props = props do componente RAC base (ou atributos nativos do elemento, se não houver RAC) + `StyleProps`. `className` é sempre aceito e passado por último ao cva, para o consumidor sobrescrever.

## Composição

Decisão: [ADR 0003](../decisions/0003-react-aria-components-como-base.md). Prefira, nesta ordem: componentes do DS (ex.: `ThemeSwitch` reutiliza `Button`); componentes do `react-aria-components` (RAC) sem estilo, para tudo que é interativo (`Button`, `Link`, `Menu`, `Dialog`, `Select`, `Disclosure`, `Tree`…); outras libs já instaladas; só então código novo.

Em componentes RAC: estado pelos data-attributes (`data-hovered:`, `data-pressed:`, `data-selected:`, `data-disabled:`, `data-open:`), foco com `data-focus-visible:` + token `focus-ring` (não `focus-visible:`), e `className` combinado via `composeRenderProps`. A API segue o RAC (`onPress`, `isDisabled`).

## Exports

`index.tsx` da pasta reexporta com o prefixo (`Button as BLButton`) e `packages/ui/src/index.ts` reexporta para o pacote.

## CSS extra

Só quando classes não bastam (keyframes, seletores complexos): `X.module.css` com classe `bl:<nome>`, referenciada a partir do `.styles.ts`.

Checklist completo de criação: skill `/create-component` (`.claude/skills/create-component/SKILL.md`).
