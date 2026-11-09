# BLCheckbox

Campo de formulário booleano: o usuário marca ou desmarca uma opção independente das outras. Também expressa o estado misto (indeterminado) de um item que resume outros.

## Quando usar

- Ligar ou desligar uma opção que vale por si só (aceitar termos, receber e-mails).
- Escolher zero ou mais itens de uma lista curta, com um `BLCheckbox` por item.
- Um item "selecionar todos" com `isIndeterminate` quando só parte dos filhos está marcada.

## Quando não usar

- Escolher exatamente uma opção entre várias → um grupo de rádio (ainda não existe no DS) ou `BLSelect`.
- Ação imediata com efeito instantâneo (liga/desliga) → um switch (ainda não existe no DS).
- Ação ou navegação → `BLButton`.

## Semântica e acessibilidade

- Elementos: RAC `CheckboxField` + `CheckboxButton`; `<input type="checkbox">` real, role `checkbox`, rótulo ligado ao campo; ajuda e feedback viram a descrição acessível.
- Teclado: Tab foca; Espaço alterna.
- `isRequired` dá `aria-required` (o asterisco é só visual); `isInvalid` dá `aria-invalid`; `isIndeterminate` expõe o estado misto.
- Do consumidor: `label` visível ou, sem ele, `aria-label`.
- Desabilitado: não é focável e não mostra erro nem sucesso.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `label` | node | Rótulo visível ao lado da caixa. |
| `helperText` | string | Ajuda abaixo do campo. |
| `errorMessage` | string | Mensagem de erro; substitui a ajuda enquanto o campo está inválido. |
| `successMessage` | string | Confirmação; substitui a ajuda enquanto o campo é válido. Erro vence sucesso. |
| `isSelected` / `defaultSelected` / `onChange` | boolean / `(isSelected) => void` | Estado controlado ou inicial; `onChange` recebe o booleano. |
| `isIndeterminate` | boolean | Estado misto; só visual, o consumidor decide o que ele significa. |
| `isInvalid` / `isRequired` / `isDisabled` / `isReadOnly` | boolean | Estados do campo. |

Demais props: as do RAC `CheckboxField` (`name`, `value`, `validate`…); `className` vai para o container do campo.

## Composição

- Ajuda e feedback vêm de `BLFieldHelperText` e `BLFieldFeedback` (ADR 0010).
- Para várias opções, empilhe `BLCheckbox` com `BLStack` e passe o espaço pelo `gap` do pai.
- Não há grupo (`BLCheckboxGroup`) por ora; cada caixa é independente.

## Decisões

- O rótulo é um texto com a tipografia e a cor de controle (como o valor do `BLInput`, não as do `BLFieldLabel`), porque clicar nele alterna a caixa; não é o componente: a caixa já é um `<label>` do RAC, e um `Label` aninhado seria inválido. O asterisco de obrigatório é o mesmo dos outros campos.
- Do Carbon, ficou só a caixa simples com rótulo, ajuda e estados; grupo com legenda, skeleton e o rótulo oculto ficaram de fora.

## Exemplo

```tsx
import { BLCheckbox } from '@bloco/ui';

<BLCheckbox label="Accept terms and conditions" name="terms" isRequired />
```
