# BLFileTree

Árvore de pastas e arquivos navegável por teclado. Pastas expandem e recolhem; arquivos com `id` podem ser selecionados, o que a torna também uma navegação.

## Quando usar

- Representar uma hierarquia de arquivos ou páginas.
- Navegação lateral em árvore, como o catálogo do app de demo (dentro de `BLSidebar`).

## Quando não usar

- Seções de conteúdo que expandem → `BLAccordion`.
- Lista plana de escolha → `BLSelect`.

## Semântica e acessibilidade

- Elemento: RAC `Tree` (role `treegrid`, linhas `row` com `aria-expanded` nas pastas).
- Teclado: setas sobem e descem; direita e esquerda abrem e fecham pastas; Enter ativa arquivo selecionável.
- Nome acessível padrão "Files"; passe `aria-label` com o significado real ("Projeto", "Componentes").

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `items` | `FileTreeItem[]` | Pasta: `{ type: 'folder', label, open?, items }`. Arquivo: `{ type: 'file', label, id?, muted? }`. |
| pasta `open` | boolean | Começa expandida. |
| arquivo `id` | string | Torna o arquivo selecionável quando há `onSelect`. |
| arquivo `muted` | boolean | Item secundário, sem ícone e com menos ênfase (ex.: arquivo de apoio). |
| `onSelect` | `(id) => void` | Chamado ao clicar ou pressionar Enter num arquivo com `id`. |
| `selectedId` | string | Arquivo marcado como atual (ex.: a rota aberta). |

Demais props: as do RAC `Tree` (`expandedKeys`, `onExpandedChange`…); `className` vai para a árvore.

## Composição

- Como navegação, vai no `side` do `BLSidebar`, com `selectedId` vindo da rota.

## Decisões

- Pastas são identificadas pelo caminho de rótulos, para nunca colidir com o `id` dos arquivos.

## Exemplo

```tsx
import { BLFileTree } from '@bloco/ui';

<BLFileTree
  aria-label="Projeto"
  items={[
    { type: 'folder', label: 'src', open: true, items: [{ type: 'file', id: 'app', label: 'App.tsx' }] },
    { type: 'file', label: 'README.md', muted: true },
  ]}
  selectedId={current}
  onSelect={open}
/>
```
