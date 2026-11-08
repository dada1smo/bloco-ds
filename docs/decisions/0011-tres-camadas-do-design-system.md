# 0011. Organizar o design system em três camadas: foundations, components e patterns

- Status: Aceita
- Data: 2026-11-08

## Contexto

O design system já tem tokens ([0005](0005-tres-camadas-de-tokens.md), [0006](0006-foundations-carbon.md), [0008](0008-grid-e-layout.md)) e componentes ([0003](0003-react-aria-components-como-base.md), [0009](0009-documento-de-contexto-por-componente.md), [0010](0010-padrao-de-form-fields.md)), mas a estrutura em camadas nunca foi nomeada num só lugar. Falta também um lugar para o conhecimento de *como combinar* componentes: o `X.context.md` explica um componente isolado, e quem consome — cada vez mais uma IA gerando telas — monta formulários, cabeçalhos e listas por conta própria, de formas diferentes a cada vez.

Não confundir com as "três camadas de tokens" do 0005 (primitiva, semântica e componente): aquelas ficam todas dentro de foundations.

## Decisão

O design system tem três camadas. A dependência vai só para baixo: patterns usam components, components usam foundations.

- **Foundations**: as camadas de tokens e regras visuais usadas para construir os componentes — cor, tipografia, espaçamento e layout (`theme.css` e `theme/`). Não contêm componentes.
- **Components**: os componentes base do design system, em `packages/ui/src/<nome>/`. Usam apenas tokens semânticos e cada um tem seu `X.context.md`.
- **Patterns**: exemplos de composição dos componentes do design system. São sempre composable: nunca viram componentes "fechados", sem API de produto nem props que decidem o conteúdo. Mostram como compor components (e as primitivas de layout) de forma padronizada e dão a IA e a pessoas um contexto informado para isso. Um pattern não define estilo novo nem token novo.

## Alternativas consideradas

- **Patterns como componentes prontos (`LoginForm`, `PageHeader`)** — rígidos: cada variação pede mais props e o pattern vira API de produto para manter.
- **Só `X.context.md` por componente** — não cobre a composição entre componentes, que é onde o consumidor mais erra.
- **Manter sem camada formal** — a composição continua implícita e diferente a cada tela.

## Consequências

- Patterns não entram no `packages/ui/src/index.ts` como componentes.
- Local, formato e documentação dos patterns ainda não estão decididos; ficam para o próximo ADR.
- Algo que hoje é padrão de composição (como o de form fields do 0010) poderá ser reclassificado como pattern.
