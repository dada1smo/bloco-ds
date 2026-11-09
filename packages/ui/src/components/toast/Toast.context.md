# BLToast

Notificação temporária e não bloqueante: informa o resultado de uma ação ou um evento ("Arquivo salvo", "Falha ao enviar") sem interromper o fluxo.

## Quando usar

- Confirmar uma ação concluída ou avisar de um evento em segundo plano.
- Mensagens curtas que podem sumir sozinhas.

## Quando não usar

- Decisão ou confirmação que exige resposta → `BLModal`.
- Erro de um campo → `errorMessage` do próprio field (ADR 0010).
- Informação que precisa ficar sempre visível na página → texto na própria tela.

## Semântica e acessibilidade

- Elementos: RAC `ToastRegion` (landmark `region`) + `Toast` (role `alertdialog`, nomeado pelo título e descrito pela descrição). O RAC anuncia o toast novo para leitores de tela.
- O timer pausa com hover e foco; F6 leva o foco à região; o botão "Close" fecha cada toast.
- Toasts com `timeout` somem sozinhos; mensagens importantes (erro) devem persistir (sem `timeout`) para dar tempo de ler.

## API

Duas peças: o componente `BLToast` e a fila global `blToastQueue`.

| Item | Valores (default) | Significado |
|---|---|---|
| `<BLToast />` | — | Região que exibe a fila. Renderize **uma vez** na raiz do app. `className` vai para a região. |
| `blToastQueue.add(data, options)` | — | Mostra um toast; retorna a key para `close(key)`. Pode ser chamado de qualquer lugar. |
| `data.title` | string | Texto principal. |
| `data.description` | string (opcional) | Detalhe secundário. |
| `data.kind` | `info` \| `success` \| `warning` \| `error` (`info`) | Significado e ícone/cor do toast. |
| `options.timeout` | ms (sem timeout) | Fecha sozinho depois do tempo. Mínimo recomendado: 5000. |

Até 5 toasts visíveis; os demais esperam na fila.

## Composição

- Reusa `BLIconButton` para o botão de fechar.
- Sem ações no toast: o que exige ação é `BLModal`.

## Decisões

- A fila é global (módulo) em vez de context/hook: permite disparar toast fora de componentes React (handlers, serviços).
- Usa a API `UNSTABLE_Toast*` do RAC, ainda instável: pode mudar numa atualização do `react-aria-components`.
- Fora do Carbon por ora: variante de baixo contraste, ações dentro do toast e animação de entrada/saída.

## Exemplo

```tsx
import { BLToast, blToastQueue } from '@bloco/ui';

// uma vez, na raiz
<BLToast />

// em qualquer lugar
blToastQueue.add({ title: 'Saved', description: 'Draft stored', kind: 'success' }, { timeout: 5000 });
```
