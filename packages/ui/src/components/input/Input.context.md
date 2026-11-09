# BLInput

Campo de formulário de texto de uma linha (nome, e-mail, busca, URL…). O valor é digitado livremente.

## Quando usar

- Entrada curta de texto livre ou formatado (`type` de `text`, `email`, `password`, `search`, `url`, `tel`).

## Quando não usar

- Escolha entre opções conhecidas → `BLSelect`.
- Texto longo, de várias linhas → um textarea (ainda não existe no DS).

## Semântica e acessibilidade

- Elementos: RAC `TextField` + `Input`; o rótulo é ligado ao campo, e ajuda e feedback viram a descrição acessível.
- `isRequired` dá `aria-required` (o asterisco no rótulo é só visual); `isInvalid` dá `aria-invalid`.
- Do consumidor: `label` visível ou, sem ele, `aria-label`.
- Desabilitado: não é focável e não mostra erro nem sucesso.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `label` | string | Rótulo visível do campo. |
| `helperText` | string | Ajuda abaixo do campo. |
| `errorMessage` | string | Mensagem de erro; substitui a ajuda enquanto o campo está inválido. |
| `successMessage` | string | Confirmação; substitui a ajuda enquanto o campo é válido. Erro vence sucesso. |
| `isInvalid` | boolean | Marca o campo como inválido. |
| `placeholder` | string | Dica de formato ou exemplo; não substitui o rótulo. |
| `isRequired` / `isDisabled` / `isReadOnly` | boolean | Estados do campo. |
| `value` / `defaultValue` / `onChange` | string / `(value) => void` | Valor controlado ou inicial; `onChange` recebe a string. |

Demais props: as do RAC `TextField` (`type`, `name`, `validate`…); `className` vai para o container do campo.

## Composição

- Rótulo, ajuda e feedback vêm de `BLFieldLabel`, `BLFieldHelperText` e `BLFieldFeedback` (ADR 0010).
- Em formulário, empilhe campos com `BLStack` e passe o espaço pelo `gap` do pai.

## Decisões

- Estilo Carbon: fundo `field`, só a borda inferior; sem tamanhos além do `md` por ora.
- Sem ícones, botão de limpar ou contador de caracteres; ficaram de fora do Carbon até haver necessidade.

## Exemplo

```tsx
import { BLInput } from '@bloco/ui';

<BLInput label="E-mail" type="email" placeholder="voce@exemplo.com" helperText="Nunca compartilhamos" onChange={setEmail} />
```
