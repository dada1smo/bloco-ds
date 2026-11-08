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
