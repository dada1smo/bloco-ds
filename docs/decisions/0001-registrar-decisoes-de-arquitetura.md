# 0001. Registrar decisões de arquitetura

- Status: Aceita
- Data: 2026-11-08

## Contexto

O CLAUDE.md e `docs/architecture/` dizem *como* o projeto é, mas não *por que*. O motivo das escolhas se perde, e quem chega depois (pessoa ou agente) tende a refazer discussões ou desfazer decisões sem saber.

## Decisão

Registrar decisões relevantes como ADRs em `docs/decisions/`, no formato de [template.md](template.md), um arquivo por decisão.

## Alternativas consideradas

- **Só o CLAUDE.md** — mistura regras estáveis com histórico e cresce sem limite.
- **Só mensagens de commit/PR** — difíceis de achar depois.

## Consequências

- Decisões que mudam convenções (ex.: estilos, estrutura de componente, tokens) passam a pedir um ADR.
- O CLAUDE.md pode apontar para os ADRs em vez de explicar o porquê.
