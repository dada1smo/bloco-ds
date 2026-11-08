# BLCluster

Agrupa itens em linha, alinhados ao centro, que quebram para a linha seguinte quando falta espaço.

## Quando usar

- Botões lado a lado, tags, filtros, barras de ferramentas.

## Quando não usar

- Itens empilhados → `BLStack`.
- Ações em proporções fixas ocupando a largura → `BLButtonGroup`.
- Colunas de página → `BLGrid`.

## Semântica e acessibilidade

- Elemento: `<div>` sem role. Para uma barra de ferramentas, passe `role="toolbar"` e `aria-label`; para um conjunto, `role="group"`.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `gap` | mesmos passos do `BLStack` (`'3'`) | Espaço entre itens; `'3'` é o de itens em linha. |

Demais props: as de `<div>`; `className` é repassado por último.

## Composição

- Combina com `BLStack` (um cluster de ações abaixo de um bloco de conteúdo).
- Filhos não definem margem; o espaço vem do `gap` ([ADR 0008](../../../../docs/decisions/0008-grid-e-layout.md)).

## Exemplo

```tsx
import { BLButton, BLCluster } from '@bloco/ui';

<BLCluster role="toolbar" aria-label="Ações">
  <BLButton level="subtle">Filtrar</BLButton>
  <BLButton level="subtle">Ordenar</BLButton>
</BLCluster>
```
