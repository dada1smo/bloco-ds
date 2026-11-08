# BLDropdown

Menu de ações que abre a partir de um `BLButton`. Cada item executa uma ação ou navega; o menu fecha em seguida.

## Quando usar

- Várias ações relacionadas que não cabem como botões visíveis ("Ações", "Mais").
- Ações agrupadas por tema, separadas por divisores (`groups`).

## Quando não usar

- O usuário escolhe um **valor** que fica selecionado → `BLSelect`.
- Uma ou duas ações → `BLButton` direto.

## Semântica e acessibilidade

- Elementos: RAC `MenuTrigger` + `Menu` dentro de um `Popover`; o gatilho expõe `aria-expanded` e os itens têm role `menuitem`.
- Teclado: Enter ou Espaço abre com foco no primeiro item; setas navegam; Enter aciona; Escape fecha.
- O nome do menu vem do texto do gatilho quando ele é uma string; com outro conteúdo, o menu fica sem nome.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `trigger` | elemento `BLButton` | Botão que abre o menu. Qualquer outro elemento (inclusive `BLIconButton`) lança erro. A seta de abertura é adicionada pelo componente. |
| `groups` | `DropdownItem[][]` | Cada array interno é um grupo; grupos são separados por divisor. |
| item `label` | string | Texto e identificador do item; deve ser único no menu. |
| item `icon` | ReactNode | Ícone opcional antes do texto. |
| item `onAction` / `href` | função / URL | O que o item faz: executar uma ação ou navegar. |
| item `isDisabled` | boolean | Item visível, mas indisponível. |

Demais props: as do RAC `MenuTrigger` (`isOpen`, `onOpenChange`, `defaultOpen`); `className` vai para o popover.

## Composição

- O gatilho aceita todas as variantes do `BLButton` (`level`, `color`, `size`).
- O popover se posiciona sozinho abaixo do gatilho; não precisa de container posicionado.

## Decisões

- O gatilho é restrito ao `BLButton` para garantir um rótulo de texto, que também nomeia o menu.
- Itens recebem dados, não JSX, para manter estrutura, separadores e acessibilidade sob controle do DS.

## Exemplo

```tsx
import { BLButton, BLDropdown } from '@bloco/ui';

<BLDropdown
  trigger={<BLButton level="outline">Ações</BLButton>}
  groups={[
    [{ label: 'Editar', onAction: edit }, { label: 'Duplicar', onAction: duplicate }],
    [{ label: 'Excluir', onAction: remove }],
  ]}
/>
```
