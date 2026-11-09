# Decisões de arquitetura (ADRs)

Uma decisão por arquivo: `NNNN-titulo-em-kebab.md`, numeração sequencial, nunca renumerar.
Para criar: copie [template.md](template.md).

Status: `Proposta` → `Aceita` → (`Substituída por NNNN` | `Rejeitada`). Um ADR aceito não é editado; mudou a decisão, escreva um novo e marque o antigo como substituído.

## Índice

| # | Decisão | Status |
|---|---|---|
| [0001](0001-registrar-decisoes-de-arquitetura.md) | Registrar decisões de arquitetura | Aceita |
| [0002](0002-tokens-semanticos-sobre-tailwind.md) | Usar tokens semânticos sobre a paleta do Tailwind | Aceita (camadas revisadas pelo 0005; nomes substituídos pelo 0006) |
| [0003](0003-react-aria-components-como-base.md) | Usar react-aria-components como base dos componentes | Aceita |
| [0004](0004-testes-com-vitest.md) | Testar componentes com Vitest, só comportamento | Aceita |
| [0005](0005-tres-camadas-de-tokens.md) | Organizar os tokens em três camadas: primitiva, semântica e componente | Aceita (`palette.css` removido pelo 0006) |
| [0006](0006-foundations-carbon.md) | Definir as foundations pelo modelo do Carbon sobre as primitivas do Tailwind | Aceita (tipografia e sizing substituídos pelo 0007) |
| [0007](0007-densidade-aberta.md) | Usar densidade aberta, com corpo de 20px | Aceita |
| [0008](0008-grid-e-layout.md) | Usar grid 4/8/16 com gutter responsivo e quatro primitivas de layout | Aceita |
| [0009](0009-documento-de-contexto-por-componente.md) | Manter um documento de contexto por componente | Aceita |
| [0010](0010-padrao-de-form-fields.md) | Padronizar form fields com FieldLabel, FieldHelperText e FieldFeedback | Aceita |
| [0011](0011-tres-camadas-do-design-system.md) | Organizar o design system em três camadas: foundations, components e patterns | Aceita |
| [0012](0012-estrutura-da-camada-de-patterns.md) | Documentar patterns em `packages/ui/patterns/` como markdown com exemplo tipado | Proposta |
| [0013](0013-espacamento-mais-aberto.md) | Subir um passo de espaçamento nos papéis de densidade | Aceita |
| [0014](0014-tanstack-start-no-app.md) | Usar TanStack Start (SPA mode) como base do app de catálogo e starter | Proposta |
| [0015](0015-camadas-do-app-web.md) | Organizar o app web em quatro camadas: routes, domain, ui e global | Proposta |
| [0016](0016-catalogo-como-site-de-docs.md) | Organizar o catálogo como site de docs, com uma página por item do DS | Proposta |
