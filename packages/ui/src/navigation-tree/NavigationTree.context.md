# BLNavigationTree

Árvore de links navegável por teclado, para hierarquias de navegação (páginas, seções, documentação). Compõe-se com `BLNavigationTreeItem` aninhados; itens com filhos expandem e recolhem, itens com `href` navegam.

## Quando usar

- Navegação lateral hierárquica, como o catálogo do app de demo (dentro de `BLSidebar`).
- Qualquer lista aninhada de links em que o usuário precisa saber onde está.

## Quando não usar

- Seções de conteúdo que expandem → `BLAccordion`.
- Lista plana de escolha → `BLSelect`; abas de um mesmo contexto → `BLTabs`.
- Árvore de seleção (marcar itens) — a árvore não tem seleção, só links.

## Semântica e acessibilidade

- Elemento: RAC `NavigationTree` (role `treegrid`, linhas `row`; pastas têm `aria-expanded`; cada item é um link).
- O item da rota atual recebe `aria-current="page"`; ancestrais do atual ficam em destaque.
- Teclado: setas sobem e descem; direita e esquerda abrem e fecham; Tab entra nos links; Enter segue o link ou alterna a pasta.
- Nome acessível padrão "Navigation"; passe `aria-label` com o significado real ("Componentes").

## API

`BLNavigationTree`

| Prop | Valores (default) | Significado |
|---|---|---|
| `selectedRoute` | string | Rota atual; o item cujo `href` é igual a ela fica marcado como atual. |
| `defaultExpandedKeys` / `expandedKeys` | chaves | Quais itens com filhos começam (ou estão) abertos. |

`BLNavigationTreeItem`

| Prop | Valores (default) | Significado |
|---|---|---|
| `title` | ReactNode | Rótulo da linha; se for string, também é o texto acessível. |
| `href` | string | Destino do link. Sem `href`, apertar a linha alterna os filhos. |
| `icon` | ReactNode | Ícone decorativo à esquerda. |
| `id` | Key (`href` ou `title`) | Chave do item; informe em pastas cujo `title` não é único. |
| `children` | ReactNode | `BLNavigationTreeItem` aninhados; torna o item expansível. |

Demais props: as do RAC `NavigationTree`/`NavigationTreeItem`; `className` vai para a árvore ou o item.

## Composição

- Vai no `side` do `BLSidebar`, com `selectedRoute` vindo da rota.
- Com roteador de cliente, envolva a aplicação em `BLRouterProvider` (`navigate` do roteador); sem ele, `href` recarrega a página.

## Decisões

- Substitui o antigo `BLFileTree` (API de dados `items`): a composição por itens é mais genérica e não presume arquivos.
- Folhas e pastas usam o mesmo item; ser pasta é ter filhos.

## Exemplo

```tsx
import { BLNavigationTree, BLNavigationTreeItem } from '@bloco/ui';

<BLNavigationTree aria-label="Componentes" selectedRoute={pathname}>
  <BLNavigationTreeItem title="Inputs" id="inputs">
    <BLNavigationTreeItem title="Button" href="/button" />
    <BLNavigationTreeItem title="Checkbox" href="/checkbox" />
  </BLNavigationTreeItem>
  <BLNavigationTreeItem title="Table" href="/table" />
</BLNavigationTree>
```
