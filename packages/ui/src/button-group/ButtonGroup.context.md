# BLButtonGroup

Distribui botões numa grade de 4 colunas, cada um ocupando de 1 a 4 colunas e preenchendo a largura da célula. Serve para conjuntos de ações com proporção fixa, como o rodapé de um diálogo.

## Quando usar

- Ações de um painel ou diálogo que devem ocupar toda a largura, em proporções definidas (2 + 2, 1 + 3).
- Rodapé de container, com `position="bottom"`.

## Quando não usar

- Botões com largura natural, lado a lado e quebrando linha → `BLCluster`.
- Layout de página em colunas → `BLGrid`.

## Semântica e acessibilidade

- Elemento: `<div>` sem role. Quando as ações formam um conjunto com significado, passe `role="group"` e `aria-label`.
- Não altera o comportamento dos filhos: cada botão mantém foco e eventos próprios.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `items` | `{ cols: 1–4, element }[]` | Cada item ocupa `cols` das 4 colunas; a soma de uma linha deve ser 4. `element` costuma ser um `BLButton`. |
| `position` | `default` \| `bottom` (`default`) | `bottom` prende o grupo à base do container posicionado mais próximo, como no rodapé do `BLModal`. |

Demais props: as de `<div>` (exceto `children`); `className` é repassado por último.

## Composição

- O `BLModal` recebe `actions` no mesmo formato de `items` e renderiza um `BLButtonGroup` com `position="bottom"`.
- Com `position="bottom"`, o container precisa reservar espaço para o grupo e ser posicionado.

## Exemplo

```tsx
import { BLButton, BLButtonGroup } from '@bloco/ui';

<BLButtonGroup
  role="group"
  aria-label="Ações do formulário"
  items={[
    { cols: 2, element: <BLButton level="outline">Cancelar</BLButton> },
    { cols: 2, element: <BLButton>Salvar</BLButton> },
  ]}
/>
```
