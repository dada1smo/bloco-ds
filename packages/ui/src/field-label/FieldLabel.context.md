# BLFieldLabel

Rótulo visível de um campo de formulário. Faz parte do padrão de form fields ([ADR 0010](../../../../docs/decisions/0010-padrao-de-form-fields.md)).

## Quando usar

- Dentro de um campo do DS ou de um campo RAC novo, sempre que o campo tiver rótulo visível.

## Quando não usar

- Fora de um campo RAC: o rótulo só se liga ao controle pelo contexto do campo.
- Para texto de ajuda → `BLFieldHelperText`; para validação → `BLFieldFeedback`.

## Semântica e acessibilidade

- RAC `Label`: vira o nome acessível do controle. Sem rótulo visível, o campo precisa de `aria-label`.
- Acompanha o estado desabilitado do campo sozinho; não há prop própria.

## API

| Prop | Significado |
|---|---|
| `children` | Texto do rótulo. |
| `isRequired` | Mostra o asterisco. É só o sinal visual: quem torna o campo obrigatório é o `isRequired` do campo, e os campos do DS já repassam. |

Demais props: as do RAC `Label`; `className` vai para o elemento.

## Composição

- Primeiro filho do campo, antes do controle.

## Exemplo

```tsx
<TextField>
  <BLFieldLabel>Email</BLFieldLabel>
  <Input />
</TextField>
```
