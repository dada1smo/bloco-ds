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

Props = atributos nativos do elemento base + `StyleProps`. `className` é sempre aceito e passado por último ao cva, para o consumidor sobrescrever.

## Composição

Prefira o que já existe: `PrimitiveButton` (sem estilo; renderiza `<button>` ou `<a>` conforme `as`) e `Button` são a base de vários componentes (ex.: `ThemeSwitch` reutiliza `Button`). Só depois libs já instaladas; só então código novo.

## Exports

`index.tsx` da pasta reexporta com o prefixo (`Button as BLButton`) e `packages/ui/src/index.ts` reexporta para o pacote.

## CSS extra

Só quando classes não bastam (keyframes, seletores complexos): `X.module.css` com classe `bl:<nome>`, referenciada a partir do `.styles.ts`.

Checklist completo de criação: skill `/create-component` (`.claude/skills/create-component/SKILL.md`).
