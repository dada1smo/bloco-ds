---
name: create-pattern
description: Cria ou atualiza um pattern do design system (packages/ui/patterns) — documento de composição entre componentes ({nome}.pattern.md) com exemplo tipado ({Nome}.example.tsx) e demo no catálogo, para IA e pessoas. Use ao pedir "criar pattern", "novo pattern", "documentar composição", "como combinar componentes", "atualizar pattern".
---

# Criar um pattern

Decisões: [ADR 0011](../../../docs/decisions/0011-tres-camadas-do-design-system.md) (o que é um pattern) e [ADR 0012](../../../docs/decisions/0012-estrutura-da-camada-de-patterns.md) (onde e como fica). Um pattern mostra como compor componentes do DS de forma padronizada. Não é componente: não tem API, props, estilo nem token próprios.

## Para quem

O leitor principal é uma IA que precisa **montar uma tela** combinando componentes, sem abrir o código de cada um. O texto também precisa ser agradável para uma pessoa: frases completas, prosa curta, sem instruções no estilo de prompt ("você deve…", "SEMPRE"). Títulos fixos para que a IA ache cada seção.

## Antes de escrever

1. Leia `packages/ui/patterns/README.md` (se existir). Se o pattern já existe ou se sobrepõe a outro, atualize-o em vez de criar um novo.
2. Leia o `X.context.md` e o `X.tsx` de cada componente envolvido, e as páginas deles em `apps/web/src/domain/docs/data/components/`.
3. Leia os ADRs que afetam a composição: [0008](../../../docs/decisions/0008-grid-e-layout.md) (layout e espaçamento), [0010](../../../docs/decisions/0010-padrao-de-form-fields.md) (campos) e outros que se apliquem.

Se a composição só funciona com uma prop, variant ou estilo novo, pare: isso é mudança de componente (`/create-component`), não pattern. Se uma intenção não estiver clara, pergunte em vez de inventar.

## Passos

1. Pasta `packages/ui/patterns/{pattern-name}/` (kebab-case, nome do problema: `form-actions`, `page-header`).
2. `{PatternName}.example.tsx`: exporta `{PatternName}Example`, um componente sem props que monta a composição de referência. Importa só de `@bloco/ui`; layout só por `BLGrid`, `BLStack`, `BLCluster` e `BLSidebar`; `className` apenas para posicionar no grid, como no `Form.context.md`. Conteúdo realista e curto, em inglês, como nas demos.
3. `{pattern-name}.pattern.md` pelo template abaixo.
4. Uma linha em `packages/ui/patterns/README.md` (crie o arquivo se não existir, com um título e uma frase apontando para o ADR 0012): `- [{Nome}]({pattern-name}/{pattern-name}.pattern.md) — {problema que resolve}`.
5. Só no primeiro pattern: adicione `"patterns"` ao `include` de `packages/ui/tsconfig.json` e `@source "../../../../../packages/ui/patterns";` em `apps/web/src/ui/styles/index.css`, ao lado do `@source` de `src`.
6. Página de docs: `apps/web/src/domain/docs/data/patterns/{pattern-name}.tsx` com `layer: 'patterns'`, o `pattern.md` em `context` e o exemplo `Default` renderizando `<{PatternName}Example />`, seguindo a skill `create-component-docs` ([SKILL.md](../create-component-docs/SKILL.md)). Variações relevantes podem virar exemplos extras.

## Regras

- Sem nomes de classes, tokens, cores ou medidas no `.pattern.md`. Descreva papéis ("ação principal à direita"), não visual.
- Nomes públicos com o prefixo `BL`, importados de `@bloco/ui`.
- Não repita o que o `X.context.md` de cada componente já diz; aponte para ele. O pattern fala do que acontece **entre** os componentes.
- pt-BR, curto. Uma tela de leitura por pattern é o alvo.

## Template

````md
# {Nome do pattern}

{1–2 frases: o problema de interface que esta composição resolve.}

## Quando usar

- {situação concreta}

## Quando não usar

- {situação} → {outro pattern ou componente}.

## Estrutura

```
BL{Pai}
├─ BL{Filho} — {papel}
└─ BL{Filho} — {papel}
```

## Regras

- {ordem, hierarquia, alinhamento}
- {quem controla o espaço: o pai, pelo `gap` (ADR 0008)}
- {acessibilidade entre componentes: rótulo de grupo, landmark, ordem de foco}

## Variações

- {contexto}: {como a mesma composição se adapta, sem props novas}

## Erros comuns

- {o que costuma sair errado} → {o certo}.

## Componentes

- [`BL{Componente}`](../../src/{component-name}/{ComponentName}.context.md) — {papel aqui}

## Exemplo

Referência completa: [`{PatternName}.example.tsx`]({PatternName}.example.tsx).

```tsx
{trecho mínimo da composição}
```
````

Seções sem conteúdo real (ex.: "Variações") podem ser omitidas; as demais ficam na ordem acima.

## Verificação

- Todo `BL*` citado existe em `packages/ui/src/index.ts`, e toda prop citada existe no `.tsx` do componente.
- Os links para `X.context.md` e ADRs abrem (o arquivo está em `packages/ui/patterns/{pattern-name}/`, então `../../src/` e `../../../../docs/decisions/`).
- O trecho do `.pattern.md` bate com o `.example.tsx`.
- `pnpm --filter ./packages/ui exec tsc --noEmit` e `pnpm build` passam.
- A página aparece em `/patterns/{pattern-name}` no `pnpm dev`, com o código do `.example.tsx` abaixo do preview (`code` = o `.example.tsx` com `?raw`, ver `/create-component-docs`).
