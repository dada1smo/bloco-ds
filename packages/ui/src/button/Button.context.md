# BLButton

Dispara uma ação ou navega. É o controle pressionável base do DS: os outros componentes que precisam de um botão (`BLIconButton`, o gatilho do `BLDropdown`) são construídos sobre ele.

## Quando usar

- Ação na tela atual: salvar, confirmar, abrir um modal ou menu.
- Navegação que deve ter a força visual de uma ação ("Ver documentação"), com `as="a"`.

## Quando não usar

- Botão só com ícone → `BLIconButton` (exige nome acessível).
- Lista de ações escondidas atrás de um botão → `BLDropdown`.
- Escolha de um valor entre opções → `BLSelect`.
- Link dentro de texto corrido → um `<a>` comum; o `BLButton` com `as="a"` é para links que se comportam como chamada de ação.

## Semântica e acessibilidade

- Elemento: `<button>` via RAC `Button`; com `as="a"`, `<a href>` via RAC `Link`.
- Teclado e foco: Enter e Espaço acionam; o foco só aparece na navegação por teclado.
- `isDisabled` bloqueia `onPress` e marca o botão como desabilitado para leitores de tela.
- Do consumidor: um texto visível como rótulo. Sem texto, use `BLIconButton`.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `level` | `solid` \| `outline` \| `subtle` (`solid`) | Hierarquia da ação: `solid` é a ação principal do contexto, `outline` a secundária, `subtle` a terciária ou de baixa ênfase. |
| `color` | `primary` \| `accent` (`primary`) | `primary` para ações comuns; `accent` para destacar a ação mais importante da tela, com parcimônia. |
| `size` | `sm` \| `md` \| `lg` (`md`) | Altura do controle. `md` é o padrão de formulários e barras; `sm` para áreas densas; `lg` para chamadas de destaque. |
| `as` | `'button'` \| `'a'` (`'button'`) | Troca o elemento: `'a'` aceita as props do RAC `Link` (`href`, `target`…). |
| `onPress` | função | Use no lugar de `onClick`; cobre mouse, toque e teclado. |
| `isDisabled` | boolean | Ação indisponível no momento. |

Demais props: as do RAC `Button` (ou `Link`, com `as="a"`); `className` é repassado por último e pode sobrescrever estilos.

## Composição

- Vários botões lado a lado: `BLCluster` (quebra linha) ou `BLButtonGroup` (ocupam colunas de uma grade, como no rodapé do `BLModal`).
- Dentro de `BLModal`, `slot="close"` faz o botão fechar o modal.
- O botão não define margem; o espaço em volta vem do `gap` do pai (ADR 0008).

## Decisões

- Base no RAC para teclado, foco e estados consistentes ([ADR 0003](../../../../docs/decisions/0003-react-aria-components-como-base.md)).
- A API segue o RAC (`onPress`, `isDisabled`), não o DOM (`onClick`, `disabled`).
- Hierarquia (`level`) e cor (`color`) são eixos independentes: qualquer nível existe nas duas cores.

## Exemplo

```tsx
import { BLButton, BLCluster } from '@bloco/ui';

<BLCluster>
  <BLButton level="outline" onPress={cancel}>Cancelar</BLButton>
  <BLButton onPress={save}>Salvar</BLButton>
</BLCluster>
```
