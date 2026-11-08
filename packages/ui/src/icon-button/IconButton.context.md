# BLIconButton

Botão quadrado que mostra só um ícone. É um `BLButton` com proporção fixa e nome acessível obrigatório.

## Quando usar

- Ações recorrentes e reconhecíveis pelo ícone: fechar, editar, excluir, mais opções.
- Barras de ferramentas e cabeçalhos onde o texto não cabe.

## Quando não usar

- Ação cujo ícone não é óbvio sozinho → `BLButton` com texto (pode ter ícone ao lado).
- Gatilho de `BLDropdown` → o `BLDropdown` exige um `BLButton`; o `BLIconButton` é recusado.

## Semântica e acessibilidade

- Elemento: `<button>` via `BLButton` (RAC `Button`); `as="a"` também funciona.
- `aria-label` é obrigatório no tipo: é o único nome do botão para leitores de tela.
- O ícone filho deve ter `aria-hidden`.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `aria-label` | string (obrigatória) | Nome da ação ("Fechar", "Excluir arquivo"). |
| `level`, `color`, `size` | iguais ao `BLButton` | Mesma hierarquia e tamanhos; o tamanho do ícone acompanha o `size`. |

Demais props: as do `BLButton`.

## Composição

- O `BLModal` usa um `BLIconButton` `subtle` como botão de fechar.
- Em barras, agrupe com `BLCluster`.

## Exemplo

```tsx
import { BLIconButton } from '@bloco/ui';
import { TrashIcon } from '@phosphor-icons/react';

<BLIconButton aria-label="Excluir arquivo" level="subtle" onPress={remove}>
  <TrashIcon aria-hidden />
</BLIconButton>
```
