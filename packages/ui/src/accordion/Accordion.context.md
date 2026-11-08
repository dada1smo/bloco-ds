# BLAccordion

Lista de seções com título que expandem e recolhem o próprio conteúdo. Por padrão só uma fica aberta por vez.

## Quando usar

- Conteúdo longo dividido em tópicos que o usuário lê sob demanda: FAQ, detalhes, configurações avançadas.

## Quando não usar

- Hierarquia navegável (pastas, árvore) → `BLFileTree`.
- Conteúdo que todo mundo precisa ver → deixe aberto na página.
- Ações escondidas → `BLDropdown`.

## Semântica e acessibilidade

- Elementos: RAC `DisclosureGroup` + `Disclosure`; cada título é um `button` dentro de um heading, com `aria-expanded`.
- Teclado: Tab passa entre os títulos; Enter ou Espaço abre e fecha.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `items` | `{ title, content, open? }[]` | Seções. `open` marca as que começam abertas. |
| `allowsMultipleExpanded` | boolean (`false`) | Permite várias seções abertas ao mesmo tempo. |
| `expandedKeys` / `defaultExpandedKeys` | chaves `'0'`, `'1'`… | Controle das abertas pelo índice em string; substitui `open` dos itens. |
| `onExpandedChange` | função | Recebe as chaves abertas. |

Demais props: as do RAC `DisclosureGroup`; `className` vai para o container.

## Decisões

- As chaves dos itens são o índice como string, porque o RAC descarta o id numérico `0`.
- Exclusivo por padrão, para manter a leitura focada numa seção.

## Exemplo

```tsx
import { BLAccordion } from '@bloco/ui';

<BLAccordion
  items={[
    { title: 'O que é o bloco-ds?', content: 'Um design system em React.', open: true },
    { title: 'Como instalar?', content: 'Adicione @bloco/ui ao workspace.' },
  ]}
/>
```
