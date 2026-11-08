# Componentes

Local: `packages/ui/src/<kebab-name>/`

```
button/
├── index.tsx          # único lugar com o prefixo BL
├── Button.tsx
├── Button.styles.ts
├── Button.test.tsx
└── Button.context.md  # quando e por que usar (ADR 0009)
```

## Testes

`X.test.tsx` ao lado de `X.tsx`, com Vitest + Testing Library ([ADR 0004](../decisions/0004-testes-com-vitest.md)). Testa só comportamento: callbacks de clique/teclado, estado, `disabled`, atributos ARIA, foco e o repasse de `className`. Busca por `getByRole`, interage com `userEvent`. Proibido assert de aparência (classes do DS, `toHaveStyle`, snapshot). `pnpm test:coverage` falha abaixo de 80%. Componente novo entra com o seu teste.

## Contexto

`X.context.md` ao lado de `X.tsx` ([ADR 0009](../decisions/0009-documento-de-contexto-por-componente.md)): propósito, quando usar e quando não usar, semântica e acessibilidade, significado funcional das props, composição e decisões. Público principal é a IA que vai escolher o componente, mas o texto serve a pessoas também. Não repete aparência. Gerado e atualizado pela skill `/create-component-context` (`.claude/skills/create-component-context/SKILL.md`).

## Estilos

`Button.styles.ts` exporta um `cva` (`buttonStyles`) e o tipo `ButtonStyleProps`. As classes são agrupadas em `const`s por responsabilidade (`displayStyles`, `typographyStyles`, `shapeStyles`, `interactionStyles`, `focusStyles`). Variants que só existem por combinação usam `''` + `compoundVariants` (ex.: cor × nível do Button). O TSX não tem classes inline.

## Props e `className`

Props = props do componente RAC base (ou atributos nativos do elemento, se não houver RAC) + `StyleProps`. `className` é sempre aceito e passado por último ao cva, para o consumidor sobrescrever.

## Composição

Decisão: [ADR 0003](../decisions/0003-react-aria-components-como-base.md). Prefira, nesta ordem: componentes do DS (ex.: `ThemeSwitch` reutiliza `Button`); componentes do `react-aria-components` (RAC) sem estilo, para tudo que é interativo (`Button`, `Link`, `Menu`, `Dialog`, `Select`, `Disclosure`, `Tree`…); outras libs já instaladas; só então código novo.

Em componentes RAC: estado pelos data-attributes (`data-hovered:`, `data-pressed:`, `data-selected:`, `data-disabled:`, `data-open:`), foco com `data-focus-visible:` + `outline-focus` (não `focus-visible:`), e `className` combinado via `composeRenderProps`. A API segue o RAC (`onPress`, `isDisabled`).

## Exports

`index.tsx` da pasta reexporta com o prefixo (`Button as BLButton`) e `packages/ui/src/index.ts` reexporta para o pacote.

## CSS extra

Só quando classes não bastam (keyframes, seletores complexos): `X.module.css` com classe `bl:<nome>`, referenciada a partir do `.styles.ts`. Tokens de componente (`--bl-<comp>-*`, opcionais) também vivem aí ([ADR 0005](../decisions/0005-tres-camadas-de-tokens.md)).

Checklist completo de criação: skill `/create-component` (`.claude/skills/create-component/SKILL.md`).
