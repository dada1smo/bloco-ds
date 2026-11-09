# BLForm

Contêiner de formulário sobre o `Form` do react-aria-components: agrupa campos, valida e envia, e empilha os filhos.

## Quando usar

- Qualquer conjunto de campos (`BLInput`, `BLSelect`, `BLCheckbox`…) enviado junto, com botão de submit.

## Quando não usar

- Um campo solto fora de envio (filtro, busca instantânea): use o campo sozinho.
- Só empilhar conteúdo sem enviar → `BLStack`.

## Semântica e acessibilidade

- Elemento: `<form>`. Tem role `form` só se receber `aria-label`/`aria-labelledby`; passe um quando houver mais de um formulário na página.
- Validação nativa por padrão (`validationBehavior="native"`): o submit é bloqueado e o foco vai ao primeiro campo inválido. Com `"aria"`, a validação é só visual e o submit não é bloqueado.
- Erros do servidor entram por `validationErrors` (mapa `name -> mensagem`) e aparecem no `FieldFeedback` do campo; campos precisam de `name`.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `gap` | mesma escala do `BLStack` (`'6'`) | Espaço entre campos: `'6'` entre campos, `'10'` entre grupos. |
| `onSubmit` | `(e: FormEvent) => void` | Chamado só após a validação passar. Use `e.preventDefault()` para tratar sem recarregar. |
| `validationBehavior` | `'native'` \| `'aria'` (`'native'`) | Quando a validação bloqueia o envio. |
| `validationErrors` | `Record<string, string \| string[]>` | Erros externos por `name` de campo. |

Demais props: as do `Form` do RAC; `className` é repassado por último.

## Composição

- Filhos: campos do DS e, por último, as ações num `BLButtonGroup` (padrão do DS para as ações do formulário), com `role="group"` e `aria-label`. Ação secundária/reset à esquerda (`level="outline"`, `type="reset"`), primária à direita (`type="submit"`); soma de `cols` por linha = 4.
- Form de largura contida (`max-w-reading`/`max-w-prose`): o grupo ocupa a largura do form, alinhado aos campos.
- Form de tela inteira (campos em `BLGrid`): o grupo ocupa só uma fração da tela, alinhado à direita, e não a largura toda. Faça-o filho do `BLGrid` e posicione-o nas últimas colunas (`col-span-4 md:col-start-5 lg:col-span-6 lg:col-start-11`: 6 das 16 colunas (3/8 da tela) no desktop, 1/2 no tablet, largura toda no mobile). `max-w-prose` não serve aqui: é largura de texto (65ch) e deixaria os botões largos demais.
- O pai é dono do espaço: campos não definem margem ([ADR 0008](../../../../../docs/decisions/0008-grid-e-layout.md)).

## Decisões

- Reusa a escala de `gap` do `BLStack`, sem variants próprios.
- Não valida nem serializa por conta própria: tudo vem do RAC.

## Exemplo

```tsx
import { BLButton, BLButtonGroup, BLForm, BLInput } from '@bloco/ui';

<BLForm aria-label="Profile" onSubmit={save}>
  <BLInput label="Name" name="name" isRequired />
  <BLButtonGroup
    role="group"
    aria-label="Form actions"
    items={[
      { cols: 2, element: <BLButton type="reset" level="outline">Reset</BLButton> },
      { cols: 2, element: <BLButton type="submit">Save</BLButton> },
    ]}
  />
</BLForm>
```
