# BLTabs

Abas: alterna entre painéis de conteúdo relacionados no mesmo lugar, mostrando um por vez.

## Quando usar

- Dividir uma área em vistas irmãs do mesmo assunto ("Overview", "Activity", "Settings").
- O usuário alterna com frequência entre as vistas e não precisa compará-las lado a lado.

## Quando não usar

- Etapas sequenciais de um fluxo → um stepper/progresso (ainda não existe no DS).
- Conteúdo que deve ser visto de uma vez, ou muitas seções longas → `BLAccordion` ou seções na página.
- Navegação entre páginas (rotas) → links de navegação.

## Semântica e acessibilidade

- Elementos: RAC `Tabs` + `TabList` + `Tab` + `TabPanel`; roles `tablist`, `tab`, `tabpanel`, ligados por `aria-controls`/`aria-labelledby`.
- Teclado: Tab entra na lista; setas movem entre abas (pulam desabilitadas); Home/End vão à primeira/última. Seleção segue o foco (ativação automática).
- Dê `aria-label` à lista quando não houver título visível que a nomeie.
- Cada painel é focável quando não tem conteúdo focável.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `items` | `{ title, content, isDisabled? }[]` | Uma entrada por aba. `isDisabled` torna a aba inacessível. |
| `aria-label` | string | Nome acessível da lista de abas. |
| `orientation` | `horizontal` \| `vertical` (`horizontal`) | Layout da lista (topo ou lateral) e setas do teclado. |
| `selectedKey` / `defaultSelectedKey` / `onSelectionChange` | string | Aba selecionada (controlada/inicial). A chave é o índice como string (`'0'`, `'1'`…). |

Demais props: as do RAC `Tabs`; `className` vai para a raiz.

## Composição

- O `content` aceita qualquer nó; combine com `BLStack`/`BLGrid` para organizar o painel.

## Decisões

- Só o estilo "line" do Carbon (borda inferior na aba selecionada); contido (contained), ícones, contagem e abas removíveis ficaram de fora.
- Chaves por índice string porque o RAC descarta o id numérico `0`.
- `orientation="vertical"` põe a lista à esquerda (borda lateral na aba selecionada) e troca as setas para cima/baixo.

## Exemplo

```tsx
import { BLTabs } from '@bloco/ui';

<BLTabs
  aria-label="Project"
  items={[
    { title: 'Overview', content: 'Summary of the project.' },
    { title: 'Activity', content: 'Recent changes.' },
    { title: 'Settings', content: 'Not available.', isDisabled: true },
  ]}
/>
```
