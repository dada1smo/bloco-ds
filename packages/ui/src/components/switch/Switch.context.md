# BLSwitch

Campo de formulário booleano de liga/desliga: o usuário alterna uma configuração que vale por si só, normalmente com efeito imediato.

## Quando usar

- Ativar ou desativar uma configuração (notificações, modo escuro, recurso opcional).
- Quando o estado atual deve ficar óbvio e a mudança é percebida como "ligar/desligar".

## Quando não usar

- Opção que só vale depois de enviar um formulário, ou escolha de zero ou mais itens de uma lista → `BLCheckbox`.
- Escolher exatamente uma opção entre várias → grupo de rádio (ainda não existe no DS) ou `BLSelect`.
- Ação ou navegação → `BLButton`.

## Semântica e acessibilidade

- Elementos: RAC `SwitchField` + `SwitchButton`; `<input type="checkbox" role="switch">` real, rótulo ligado ao campo; ajuda e feedback viram a descrição acessível.
- Teclado: Tab foca; Espaço alterna.
- `isRequired` dá `aria-required` (o asterisco é só visual); `isInvalid` dá `aria-invalid`.
- Do consumidor: `label` visível ou, sem ele, `aria-label`.
- Desabilitado: não é focável e não mostra erro nem sucesso.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `label` | node | Rótulo visível ao lado do interruptor. |
| `helperText` | string | Ajuda abaixo do campo. |
| `errorMessage` | string | Mensagem de erro; substitui a ajuda enquanto o campo está inválido. |
| `successMessage` | string | Confirmação; substitui a ajuda enquanto o campo é válido. Erro vence sucesso. |
| `isSelected` / `defaultSelected` / `onChange` | boolean / `(isSelected) => void` | Estado controlado ou inicial; `onChange` recebe o booleano. |
| `isInvalid` / `isRequired` / `isDisabled` / `isReadOnly` | boolean | Estados do campo. |

Demais props: as do RAC `SwitchField` (`name`, `value`, `validate`…); `className` vai para o container do campo.

## Composição

- Ajuda e feedback vêm de `BLFieldHelperText` e `BLFieldFeedback` (ADR 0010).
- Para vários interruptores, empilhe `BLSwitch` com `BLStack` e passe o espaço pelo `gap` do pai.

## Decisões

- O rótulo usa a tipografia e a cor de controle (como `BLCheckbox`), porque clicar nele alterna o interruptor; o `SwitchButton` já é um `<label>`.
- Do Carbon, ficou só o toggle padrão com rótulo, ajuda e estados; os textos "On/Off" dentro do rótulo, o tamanho pequeno e o rótulo oculto ficaram de fora.

## Exemplo

```tsx
import { BLSwitch } from '@bloco/ui';

<BLSwitch label="Notifications" name="notifications" defaultSelected />
```
