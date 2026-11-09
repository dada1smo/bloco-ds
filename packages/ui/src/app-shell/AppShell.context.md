# BLAppShell

Casco de tela cheia da aplicação. Reserva quatro áreas (header no topo, sidebar à esquerda, content no centro e sidebar à direita) e decide quanto espaço cada uma ocupa, mas não o que vai dentro delas. Todas as áreas, exceto o content, são opcionais, e as sidebars expandem e recolhem.

## Quando usar

- A estrutura de primeiro nível de uma aplicação: marca e ações globais no header, navegação na esquerda, conteúdo da página no centro.
- Telas com um painel secundário à direita (detalhes, propriedades, comentários) que pode ser aberto e fechado.

## Quando não usar

- Navegação ao lado do conteúdo dentro de uma página, sem ocupar a tela → `BLSidebar`.
- Colunas proporcionais ou estrutura de página → `BLGrid`.
- Conteúdo que bloqueia a interação até ser resolvido → `BLModal`.

## Semântica e acessibilidade

- O header é um `<header>` (landmark banner) e o content é um `<main>`; use um único `BLAppShell` por página.
- As sidebars não têm landmark próprio. O consumidor define o seu: `<nav aria-label>` para navegação, `<aside aria-label>` para um painel complementar.
- Uma sidebar recolhida em modo `offcanvas` fica `inert` e `aria-hidden`: some da árvore de acessibilidade e do Tab. No modo `icon` ela continua acessível, então o conteúdo recolhido precisa de nomes acessíveis (por exemplo, `aria-label` em botões só com ícone).
- O AppShell não cria botão de alternar. O consumidor monta o botão com o hook `useBLAppShell` e dá a ele um `aria-label` que diga a ação.
- A animação de abrir e fechar respeita `prefers-reduced-motion`.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `header` | ReactNode | Área do topo, em toda a largura. Sem ela, não há header. |
| `sidebarLeft` | ReactNode | Sidebar principal. Sai do grid e vira overlay abaixo de `lg`. |
| `sidebarRight` | ReactNode | Sidebar secundária. Por ter menos hierarquia, vira overlay antes, abaixo de `xl`. |
| `children` | ReactNode | O content; ocupa o espaço que as sidebars deixam e rola por conta própria. |
| `leftCollapsible` / `rightCollapsible` | `offcanvas` \| `icon` \| `none` (`offcanvas`) | Recolhida, a sidebar some (`offcanvas`), vira um trilho estreito para ícones (`icon`) ou nunca recolhe (`none`). |
| `leftOpen` / `rightOpen` | boolean | Estado controlado da sidebar enquanto ela está no grid. |
| `defaultLeftOpen` / `defaultRightOpen` | boolean (`true`) | Estado inicial, não controlado. |
| `onLeftOpenChange` / `onRightOpenChange` | `(open) => void` | Chamado quando a sidebar abre ou fecha no grid. |

Demais props: as de `<div>`; `className` é repassado por último à raiz.

### `useBLAppShell(side)`

Hook para qualquer componente dentro do `BLAppShell`, como um botão no header ou itens dentro da própria sidebar. Recebe `'left'` ou `'right'` e devolve o estado daquele lado, no modelo do `useSidebar` do shadcn:

| Campo | Significado |
|---|---|
| `state` | `'expanded'` ou `'collapsed'`: o que a pessoa está vendo agora. |
| `open` / `setOpen` | Aberta quando o lado está no grid; reflete as props `*Open`. |
| `openMobile` / `setOpenMobile` | Aberta quando o lado está em overlay; começa fechada e é sempre interna. |
| `isMobile` | O lado está em overlay agora (abaixo do breakpoint dele). |
| `toggleSidebar` | Alterna `openMobile` ou `open`, conforme `isMobile`. |

Fora de um `BLAppShell`, o hook lança erro. O painel de cada sidebar também expõe `data-side`, `data-state` e `data-collapsible`, para o conteúdo dela se adaptar.

## Composição

- No header: a marca, `BLIconButton` com `useBLAppShell` para alternar as sidebars e as ações globais, organizados com `BLCluster`.
- Na esquerda: `BLNavigationTree` dentro de um `<nav>`. No modo `icon`, o conteúdo lê `state` do hook e mostra só `BLIconButton` quando recolhido.
- No content: `BLGrid` ou `BLStack` com a página. As áreas não têm padding próprio; quem as preenche define o espaço interno.
- As duas sidebars são independentes: cada uma tem o seu estado, as suas props e o seu modo de recolher.

## Decisões

- O AppShell só reserva espaço e não impõe componentes (nem o botão de alternar), para servir a qualquer aplicação. A API das sidebars segue o `SidebarProvider`/`useSidebar` do shadcn, adaptada a dois lados.
- A sidebar direita é secundária: sai do grid em `xl`, antes da esquerda (`lg`), mas continua controlável pelo hook enquanto está em overlay.
- O estado no grid e o estado em overlay são separados. Assim a sidebar começa aberta no desktop e fechada em telas menores, sem depender da largura da tela no primeiro render.
- A largura anima ao abrir e fechar. Por isso o modo `offcanvas` recolhido usa largura zero com `inert`, e não `display: none`. O conteúdo mantém a largura final durante a transição para não quebrar linhas no meio dela.
- Ficam de fora: fechar o overlay com Esc ou clique fora, atalho de teclado, persistência do estado e as variantes `floating`/`inset` do shadcn. O [ADR 0008](../../../../docs/decisions/0008-grid-e-layout.md) tinha deixado a sidebar à direita para depois; ela chega aqui, no casco da aplicação.

## Exemplo

```tsx
import { BLAppShell, BLIconButton, BLNavigationTree, BLNavigationTreeItem, useBLAppShell } from '@bloco/ui';
import { ListIcon } from '@phosphor-icons/react';

function MenuToggle() {
  const { toggleSidebar } = useBLAppShell('left');
  return <BLIconButton level="subtle" aria-label="Toggle navigation" onPress={toggleSidebar}><ListIcon /></BLIconButton>;
}

<BLAppShell
  header={<MenuToggle />}
  sidebarLeft={
    <BLNavigationTree aria-label="Main">
      <BLNavigationTreeItem title="Projects" href="/projects" />
    </BLNavigationTree>
  }
>
  {page}
</BLAppShell>
```
