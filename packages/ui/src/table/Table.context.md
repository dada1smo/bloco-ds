# BLTable

Tabela de dados: mostra registros em linhas e atributos em colunas, para ler, comparar e ordenar valores.

## Quando usar

- Listas de registros com os mesmos atributos (membros, pedidos, arquivos) que o usuário compara linha a linha.
- O usuário precisa ordenar por uma coluna.

## Quando não usar

- Itens com um único atributo ou conteúdo livre → uma lista simples ou `BLStack`.
- Estrutura hierárquica → `BLFileTree`.
- Alinhar blocos de layout em colunas → `BLGrid`.

## Semântica e acessibilidade

- Elementos: RAC `Table` (`<table>` com role `grid`), `columnheader`, `row`, `gridcell`; a coluna com `isRowHeader` vira `rowheader` e nomeia a linha para leitores de tela.
- Teclado: Tab entra na tabela; setas movem entre linhas e células; Enter/Espaço numa coluna ordenável alterna a ordem. Colunas ordenadas expõem `aria-sort`.
- Do consumidor: `aria-label` quando não há título visível; marcar uma coluna com `isRowHeader`.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `columns` | `{ id, title, isRowHeader?, allowsSorting? }[]` | Colunas, na ordem de exibição. `allowsSorting` torna o cabeçalho clicável para ordenar. |
| `rows` | `{ id, [columnId]: ReactNode }[]` | Uma entrada por linha; cada chave com o `id` de uma coluna é o conteúdo da célula. |
| `size` | `sm` \| `md` \| `lg` (`lg`) | Altura das linhas: `sm` para tabelas densas, `lg` para leitura confortável. |
| `sortDescriptor` / `onSortChange` | `{ column, direction }` | Ordenação controlada: a tabela só informa a mudança; quem usa ordena `rows` e devolve o descritor. |
| `aria-label` | string | Nome acessível da tabela. |

Demais props: as do RAC `Table` (ex.: `selectionMode`, `onRowAction`); `className` vai para o contêiner raiz.

## Composição

- Células aceitam qualquer nó: `BLBadge` para status, `BLIconButton` ou `BLDropdown` para ações da linha.
- A tabela rola na horizontal dentro do próprio contêiner quando não cabe; a largura vem do pai.

## Decisões

- API por dados (`columns`/`rows`), como `BLTabs`, para manter o markup do RAC interno.
- Do Carbon, ficaram só tamanhos e ordenação. Seleção por checkbox, linhas expansíveis, zebra, toolbar, busca e paginação ficaram de fora; `selectionMode` do RAC funciona por clique, mas sem checkbox.
- Ordenação não ordena os dados sozinha: a regra de ordem (texto, número, data) é do consumidor.

## Exemplo

```tsx
import { BLTable } from '@bloco/ui';

<BLTable
  aria-label="Team members"
  columns={[
    { id: 'name', title: 'Name', isRowHeader: true },
    { id: 'role', title: 'Role' },
  ]}
  rows={[
    { id: '1', name: 'Ana Souza', role: 'Designer' },
    { id: '2', name: 'Bruno Lima', role: 'Engineer' },
  ]}
/>
```
