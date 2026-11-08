# BLBadge

Rótulo curto e não interativo que comunica o estado de um item (ex.: "Pago", "Falhou").

## Quando usar

- Mostrar o status de uma entidade ao lado de seu nome, em listas, tabelas e cabeçalhos.

## Quando não usar

- Ação ou filtro clicável → `BLButton`.
- Mensagem temporária ao usuário → `BLToast`.
- Erro de campo de formulário → `BLFieldFeedback`.

## Semântica e acessibilidade

- Renderiza um `span` sem role. O significado nunca depende só da cor: o texto deve dizer o status.
- Em contextos ambíguos, dê `aria-label` ou texto auxiliar que explicite o status.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `status` | `neutral` \| `info` \| `success` \| `warning` \| `error` (`neutral`) | Significado do estado: sem destaque, informativo, positivo, atenção, falha. |

Demais props: as de `span`; `className` vai por último.

## Composição

- Combine com `BLCluster` para agrupar vários badges; o pai define o `gap`.

## Decisões

- Status explícitos, sem prop de cor livre, para que cor sempre carregue significado.
- Cantos retos e borda de 1px na cor do status; fonte mono por padrão, para ler como código/identificador de estado.
- Só o estilo subtle; tamanhos, ícones e badge removível ficaram de fora.
