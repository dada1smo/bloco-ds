# BLAnchorCard

Card que é, por inteiro, um único link: clicar em qualquer ponto navega para o destino. Tem os mesmos slots de conteúdo do `BLCard`, sem nada interativo dentro.

## Quando usar

- Levar a uma página de detalhe a partir de um resumo (projeto, artigo, item de catálogo), onde a única ação é "abrir".
- Grades e listas de navegação (ex.: página inicial com atalhos para seções).

## Quando não usar

- O card precisa de ações próprias (menu, botão, favoritar) → `BLCard` com `action`.
- Ação que não navega (abrir diálogo, salvar) → `BLButton`.
- Link no meio de texto ou item de menu lateral → link inline ou `BLNavigationTree`.

## Semântica e acessibilidade

- Elemento: `a` via RAC `Link`; com `href` navega, e o `BLRouterProvider` liga ao router do app. Sem `href`, vira um `role="link"` acionado por `onPress`.
- Nome acessível: o `heading` nomeia o link e a `description` o descreve, para o leitor de tela não ler o card inteiro como nome. `aria-label` substitui esse nome. Sem `heading`, o nome é todo o texto do card.
- Teclado e foco: um único ponto de tabulação; Enter aciona. Hover, pressionado e foco visível ficam no card inteiro.
- Nada interativo dentro: não há `action` nem `children`. `metadata` aceita só conteúdo estático (texto, `BLBadge`); botões ou links ali geram HTML inválido (interativo dentro de `a`).
- `icon` é decorativo; `image` tem `alt` vazio por padrão, como no `BLCard`.
- Em coleções, use `role="list"` no pai e `role="listitem"` em volta de cada card (ou `ul`/`li`).

## API

Herda os slots de conteúdo e o `padding` do `BLCard`: `heading`, `headingLevel`, `description`, `icon`, `image`, `metadata`, `padding` (mesmos valores e significados). Não tem `as`, `action` nem `children`.

| Prop | Valores (default) | Significado |
|---|---|---|
| `href` | URL | Destino do link. |
| `target`, `rel` | | Como no `a` nativo (ex.: abrir em nova aba). |
| `onPress` | função | Acionado no clique ou Enter; para navegação programática sem `href`. |

Demais props: as do RAC `Link`; `className` (string ou função de render props) é repassado por último e pode sobrescrever estilos.

## Composição

- Vários cards: `BLGrid` (cada item com `col-span-*`) ou `BLStack` no pai, que define o `gap`; o card não tem margem externa (ADR 0008).
- `metadata` com `BLBadge` e texto curto.

## Decisões

- Componente separado do `BLCard`, em vez de uma prop `href`, para que a ausência de ações internas seja garantida pelo tipo.
- Usa o RAC `Link` em vez de `a` puro para herdar estados de hover, pressionado e foco visível e a integração com o router ([ADR 0003](../../../../../docs/decisions/0003-react-aria-components-como-base.md)).
- Fora do escopo: estado desabilitado e indicação visual de link externo.

## Exemplo

```tsx
import { BLAnchorCard, BLBadge } from '@bloco/ui';

<BLAnchorCard
  href="/projects/alpha"
  heading="Project Alpha"
  description="Internal dashboard for the billing team."
  metadata={<BLBadge status="success">Active</BLBadge>}
/>
```
