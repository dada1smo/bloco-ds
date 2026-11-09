# BLFieldHelperText

Texto de ajuda abaixo de um campo de formulário: formato esperado, regra, exemplo. Parte do padrão de form fields ([ADR 0010](../../../../../docs/decisions/0010-padrao-de-form-fields.md)).

## Quando usar

- Orientação que vale antes de o usuário errar.

## Quando não usar

- Mensagem de erro ou sucesso → `BLFieldFeedback`. Os campos do DS mostram o feedback no lugar da ajuda.
- Informação essencial para preencher: ponha no rótulo; o placeholder também não substitui o rótulo.
- Fora de um campo RAC: a ligação com o controle vem do contexto.

## Semântica e acessibilidade

- RAC `Text` no slot de descrição: vira a descrição acessível do controle.
- Acompanha o estado desabilitado do campo.

## API

| Prop | Significado |
|---|---|
| `children` | Texto de ajuda. |

Demais props: as do RAC `Text` (menos `slot`); `className` vai para o elemento.

## Composição

- Último filho do campo, depois do controle. Mostre no máximo um entre ajuda e feedback.

## Exemplo

```tsx
<TextField>
  <BLFieldLabel>Email</BLFieldLabel>
  <Input />
  <BLFieldHelperText>Use o endereço de trabalho</BLFieldHelperText>
</TextField>
```
