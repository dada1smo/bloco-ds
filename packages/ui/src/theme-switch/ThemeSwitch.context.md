# BLThemeSwitch

Botão de ícone que alterna entre tema claro e escuro da aplicação inteira e lembra a escolha.

## Quando usar

- Um controle global de tema, normalmente no cabeçalho do app. Uma instância por aplicação.

## Quando não usar

- Alternar qualquer outro estado → `BLIconButton` com estado próprio.

## Semântica e acessibilidade

- Elemento: `<button>` via `BLIconButton`.
- O ícone mostra o tema atual (sol = claro, lua = escuro); o `aria-label` descreve a ação ("Mudar para tema escuro"), em português, fixo.

## Comportamento

- Tema inicial: o salvo em `localStorage` (chave `theme`); sem ele, a preferência do sistema.
- Ao alternar, aplica a classe `light` ou `dark` no `<html>` e salva a escolha.

## API

Props do `BLButton` (exceto `as` e `children`). `onPress` é chamado antes da troca de tema. O padrão é `level="subtle"` e `color="accent"`.

## Exemplo

```tsx
import { BLThemeSwitch } from '@bloco/ui';

<header>
  <BLThemeSwitch />
</header>
```
