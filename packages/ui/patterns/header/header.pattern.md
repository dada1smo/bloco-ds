# Header

Barra de topo da aplicação: identifica o site à esquerda e reúne as ações globais à direita, na mesma linha.

## Quando usar

- O topo de uma aplicação ou site, presente em todas as telas.
- Marca, controle de tema e ações da conta num só lugar.

## Quando não usar

- Título e ações de uma página específica → `BLTypography` + `BLCluster` dentro do content.
- Navegação principal com muitos itens → `BLNavigationTree` na sidebar.

## Estrutura

```
BLAppShell (slot header)
└─ BLCluster — linha única
   ├─ BLIconButton — alterna a sidebar (via useBLAppShell)
   ├─ ícone grande — placeholder da logo
   ├─ BLTypography — título do site
   └─ BLCluster — ações globais, empurradas para a direita
      ├─ BLDropdown — menu da conta (opcional)
      └─ BLThemeSwitch — tema claro/escuro
```

## Regras

- O header vive no slot `header` do `BLAppShell`, que já fornece o `<header>` (landmark banner); não crie outro.
- Marca à esquerda, ações à direita; o grupo de ações é empurrado ao fim da linha.
- A logo é um ícone grande e decorativo (`aria-hidden`): o nome do site é o título ao lado, não a imagem. Troque o ícone pela logo real sem mudar a estrutura.
- O título do site é texto simples, não um `h1`: o `h1` pertence ao content da página.
- Um único `BLThemeSwitch` por aplicação, sempre no header.
- Botões só com ícone levam `aria-label`.
- Quem monta o header define o espaço interno e o `gap`; o shell não tem padding próprio ([ADR 0008](../../../../docs/decisions/0008-grid-e-layout.md)).
- A ordem do DOM é a ordem do foco: toggle, marca, ações.

## Variações

- Sem sidebar: omita o botão de alternar.
- Telas estreitas: mantenha só o essencial (toggle, logo, tema); o resto vai para o `BLDropdown`.

## Erros comuns

- Colocar o `BLThemeSwitch` em mais de um lugar → uma instância, no header.
- Usar a logo como único nome do site → manter o título em texto.
- Mover o botão de alternar para a sidebar → ele fica no header, que está sempre visível.

## Componentes

- [`BLAppShell`](../../src/app-shell/AppShell.context.md) — fornece o slot e o hook do toggle
- [`BLCluster`](../../src/cluster/Cluster.context.md) — organiza a linha e o grupo de ações
- [`BLTypography`](../../src/typography/Typography.context.md) — título do site
- [`BLIconButton`](../../src/icon-button/IconButton.context.md) — alterna a sidebar
- [`BLDropdown`](../../src/dropdown/Dropdown.context.md) — menu da conta
- [`BLThemeSwitch`](../../src/theme-switch/ThemeSwitch.context.md) — tema

## Exemplo

Referência completa: [`Header.example.tsx`](Header.example.tsx).

```tsx
<BLCluster gap="3" className="w-full flex-nowrap px-4">
  <MenuToggle />
  <MountainsIcon size={32} aria-hidden />
  <BLTypography as="span" variant="heading-compact-02">Acme</BLTypography>
  <BLCluster gap="2" className="ml-auto flex-nowrap">
    <BLThemeSwitch />
  </BLCluster>
</BLCluster>
```
