# BLSelect

Campo de formulário para escolher **um** valor de uma lista fechada. O botão fechado mostra a opção escolhida; a lista abre num popover.

## Quando usar

- Escolha única entre opções conhecidas, sobretudo quando são mais de 4–5 ou o espaço é curto.
- Opções que precisam de explicação: cada uma aceita `description` e `icon`.

## Quando não usar

- Disparar ações ("Editar", "Excluir") → `BLDropdown`.
- Duas ou três opções que devem ficar todas visíveis → um radio group (ainda não existe no DS).

## Semântica e acessibilidade

- Elementos: RAC `Select` + `ListBox`; o botão é ligado ao rótulo, e as opções têm role `option`, com `description` como descrição acessível.
- Teclado: setas abrem e navegam a lista; Enter escolhe; Escape fecha.
- Do consumidor: `label` visível ou, sem ele, `aria-label`.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `label` | string | Rótulo visível do campo. |
| `helperText` | string | Ajuda abaixo do campo. |
| `errorMessage` | string | Mensagem de erro; substitui a ajuda enquanto o campo está inválido. |
| `successMessage` | string | Confirmação; substitui a ajuda enquanto o campo é válido. Erro vence sucesso. |
| `isInvalid` | boolean | Marca o campo como inválido (borda e `errorMessage`). |
| `options` | `{ value, label, description?, icon?, isDisabled? }[]` | Opções. `value` é o identificador devolvido nos callbacks; `description` aparece só na lista, não no botão fechado; `isDisabled` bloqueia a opção. |
| `selectedKey` / `defaultSelectedKey` | `value` de uma opção | Seleção controlada ou inicial. |
| `onSelectionChange` | `(value) => void` | Recebe o `value` da opção escolhida. |
| `placeholder` | string | Texto enquanto nada foi escolhido. |
| `isDisabled` | boolean | Campo bloqueado; não mostra erro nem sucesso. |

Demais props: as do RAC `Select`; `className` vai para o container do campo.

## Composição

- Rótulo, ajuda e feedback vêm de `BLFieldLabel`, `BLFieldHelperText` e `BLFieldFeedback` (ADR 0010).
- Em formulário, empilhe campos com `BLStack` e passe o espaço pelo `gap` do pai.

## Exemplo

```tsx
import { BLSelect } from '@bloco/ui';

<BLSelect
  label="Tamanho"
  placeholder="Escolha um tamanho"
  options={[
    { value: 'sm', label: 'Pequeno', description: 'Para espaços apertados' },
    { value: 'lg', label: 'Grande' },
  ]}
  onSelectionChange={setSize}
/>
```
