# BLModal

Diálogo modal: interrompe a tela para uma confirmação ou mensagem curta, com título, descrição e ações. Bloqueia o resto da interface até ser fechado.

## Quando usar

- Confirmar uma ação destrutiva ou irreversível ("Excluir arquivo").
- Uma decisão curta que precisa de resposta antes de continuar.

## Quando não usar

- Conteúdo extenso ou formulário longo → uma página ou painel próprio.
- Aviso que não exige resposta → um componente de notificação (ainda não existe no DS).
- Lista de ações a partir de um botão → `BLDropdown`.

## Semântica e acessibilidade

- Elementos: RAC `ModalOverlay` + `Modal` + `Dialog`; role `dialog`, nomeado pelo `title` e descrito pela `description`.
- Foco fica preso dentro do diálogo e volta ao gatilho ao fechar.
- Fecha com Escape, clique fora (desligável com `isDismissable={false}`) e o botão "Close" do cabeçalho.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `title` | string | Título e nome acessível do diálogo. |
| `description` | ReactNode | Texto principal; vira a descrição acessível. |
| `trigger` | elemento pressionável | Abre o modal (ex.: `BLButton`). Sem ele, controle por `isOpen`/`onOpenChange`. |
| `actions` | `{ cols, element }[]` | Botões do rodapé, no formato do `BLButtonGroup`. Um botão com `slot="close"` fecha o modal. |
| `size` | `sm` \| `md` \| `lg` (`md`) | Largura do diálogo conforme a quantidade de conteúdo. |
| `isDismissable` | boolean (`true`) | Se clique fora fecha. |

Demais props: as do RAC `ModalOverlay` (`isOpen`, `onOpenChange`, `isKeyboardDismissDisabled`); `className` vai para o painel do modal.

## Composição

- Reusa `BLIconButton` (fechar) e `BLButtonGroup` (ações) internamente.
- Ação de cancelar: `<BLButton slot="close">`; ação de confirmar: `onPress` próprio, fechando pelo `onOpenChange` se o modal for controlado.

## Decisões

- O `aria-describedby` é ligado manualmente porque o `Dialog` do RAC não liga a descrição sozinho.

## Exemplo

```tsx
import { BLButton, BLModal } from '@bloco/ui';

<BLModal
  trigger={<BLButton color="accent">Excluir</BLButton>}
  title="Excluir arquivo"
  description="Esta ação não pode ser desfeita."
  actions={[
    { cols: 2, element: <BLButton slot="close" level="outline">Cancelar</BLButton> },
    { cols: 2, element: <BLButton onPress={remove}>Excluir</BLButton> },
  ]}
/>
```
