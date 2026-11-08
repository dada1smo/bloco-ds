# BLTooltip

Dica curta que aparece ao passar o mouse ou focar um elemento e o descreve ("Salvar alterações" num botão só de ícone).

## Quando usar

- Nomear ou explicar um controle compacto, como `BLIconButton`.
- Complemento opcional: a interface deve funcionar sem ler a dica.

## Quando não usar

- Informação essencial, instruções ou erros → texto visível (`BLFieldHelperText`, `BLFieldFeedback`).
- Conteúdo interativo, longo ou formatado → `BLModal` ou popover próprio.
- Feedback de uma ação concluída → `BLToast`.
- Em toque não há hover: não coloque nada vital só no tooltip.

## Semântica e acessibilidade

- Elementos: RAC `TooltipTrigger` + `Tooltip` (role `tooltip`), ligado ao gatilho por `aria-describedby`.
- Abre com hover ou foco de teclado (após o atraso), fecha com blur, mouse fora ou Esc.
- O gatilho precisa ser focável; ele mantém seu próprio nome acessível (o tooltip só descreve). Botão só de ícone ainda precisa de `aria-label`.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `children` | elemento focável | O gatilho (um `BLButton`/`BLIconButton`). |
| `content` | nó | Texto da dica; mantenha curto. |
| `placement` | lados do RAC (`top`) | Lado preferido; inverte se não couber. |
| `offset` | número (`6`) | Distância até o gatilho. |
| `delay` (`300`) / `closeDelay` | ms | Atraso para abrir/fechar. |
| `isDisabled` | boolean | Impede a abertura. |

Demais props: as do RAC `TooltipTrigger`; `className` vai para o tooltip.

## Composição

- Envolva `BLButton` ou `BLIconButton`. Não envolva elementos não focáveis.

## Decisões

- Visual invertido (fundo de ação principal, texto sobre cor) para contrastar com qualquer superfície; sem seta, por ora.
- Só texto: conteúdo interativo no tooltip fica de fora.
