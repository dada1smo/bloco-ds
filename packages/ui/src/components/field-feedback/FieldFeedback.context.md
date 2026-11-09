# BLFieldFeedback

Mensagem de validação de um campo: erro ou sucesso, sempre com ícone e texto. Parte do padrão de form fields ([ADR 0010](../../../../../docs/decisions/0010-padrao-de-form-fields.md)).

## Quando usar

- Dizer ao usuário por que o valor é inválido (`status="error"`) ou confirmar que foi aceito (`status="success"`).

## Quando não usar

- Ajuda neutra → `BLFieldHelperText`.
- Aviso ou erro da tela inteira, fora de um campo → ainda não há componente no DS.
- Fora de um campo RAC.

## Semântica e acessibilidade

- Erro: RAC `FieldError`; aparece só enquanto o campo está inválido (`isInvalid` ou validação nativa) e vira a descrição acessível do controle.
- Sucesso: aparece sempre que renderizado, também como descrição acessível. Quem compõe decide quando renderizar.
- Cor nunca é o único sinal: o ícone acompanha.
- Campo desabilitado não mostra feedback (decisão de quem compõe).

## API

| Prop | Valores | Significado |
|---|---|---|
| `status` | `error` \| `success` | Tipo da mensagem. |
| `children` | node | Texto da mensagem. |

`className` vai para o container.

## Composição

- Ocupa o lugar do `BLFieldHelperText` enquanto visível. Erro vence sucesso.

## Decisões

- O sucesso mantém o texto neutro e só o ícone verde, porque o verde não alcança 4.5:1 como texto no tema claro.

## Exemplo

```tsx
<TextField isInvalid>
  <BLFieldLabel>Email</BLFieldLabel>
  <Input />
  <BLFieldFeedback status="error">Informe um email válido</BLFieldFeedback>
</TextField>
```
