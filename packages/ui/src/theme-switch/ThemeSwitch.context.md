# BLThemeSwitch

Botão que alterna entre tema claro e escuro da aplicação inteira e lembra a escolha.

## Quando usar

- Um controle global de tema, normalmente no cabeçalho do app. Uma instância por aplicação.

## Quando não usar

- Alternar qualquer outro estado → `BLButton` com estado próprio.

## Semântica e acessibilidade

- Elemento: `<button>` via `BLButton`.
- O texto mostra o tema atual ("Claro"/"Escuro"); o `aria-label` descreve a ação ("Mudar para tema escuro"). Ambos em português, fixos.

## Comportamento

- Tema inicial: o salvo em `localStorage` (chave `theme`); sem ele, a preferência do sistema.
- Ao alternar, aplica a classe `light` ou `dark` no `<html>` e salva a escolha.

## API

Props do `BLButton` (exceto `as`). `onPress` é chamado antes da troca de tema. O `level` padrão é `outline`.

## Exemplo

```tsx
import { BLThemeSwitch } from '@bloco/ui';

<header>
  <BLThemeSwitch />
</header>
```
