---
name: create-component-context
description: Cria ou atualiza o {ComponentName}.context.md de um componente do design system (packages/ui) — documento semântico e funcional (propósito, quando usar, acessibilidade, props, composição, decisões) para IA e pessoas. Use ao pedir "context do componente", "documentar componente para IA", "atualizar context", ou ao final da skill create-component.
---

# Criar o contexto de um componente

Decisão: [ADR 0009](../../../docs/decisions/0009-documento-de-contexto-por-componente.md). Todo componente em `packages/ui/src/components/{component-name}/` tem `{ComponentName}.context.md` ao lado de `{ComponentName}.tsx`.

## Para quem

O leitor principal é uma IA que precisa **escolher** o componente certo e **compor** uma tela com ele, sem abrir o código. O texto também precisa ser agradável para uma pessoa que abre o arquivo: frases completas, prosa curta, sem instruções no estilo de prompt ("você deve…", "SEMPRE"). Títulos fixos para que a IA ache cada seção.

## Antes de escrever

Leia, nesta ordem:

1. `{ComponentName}.tsx` — elemento base, componente RAC usado, props e defaults.
2. `{ComponentName}.styles.ts` — nomes e valores dos variants (só para saber o que existe; o context não descreve aparência).
3. `{ComponentName}.test.tsx` — o comportamento que está garantido.
4. A página do componente em `apps/web/src/domain/docs/data/components/{component-name}.tsx` — como ele é usado de fato. O context aparece nessa página (ADR 0016): o parágrafo depois do `# título` é a descrição dela, e as seções `##` são exibidas, exceto `API` e `Exemplo`.
5. Os ADRs que o afetam (`docs/decisions/`) e componentes parecidos do DS, para escrever "quando não usar".

Se já existe um context, atualize-o: mantenha o que continua verdadeiro e corrija o que o código mudou.

## Regras

- Só escreva o que o código ou o teste confirma. Se uma intenção não estiver clara, pergunte em vez de inventar.
- Sem nomes de classes, tokens, cores ou medidas. Descreva o **papel** de um variant ("ação principal da tela"), não o visual ("fundo escuro").
- Nomes públicos com o prefixo `BL` (`BLButton`, `BLSelect`), importados de `@bloco/ui`.
- Props herdadas do RAC ou do HTML não são listadas uma a uma; cite só as que mudam o uso (`onPress`, `isDisabled`, `aria-label`…) e aponte para o RAC.
- pt-BR, curto. Uma tela de leitura por componente é o alvo; componentes compostos podem passar disso.

## Template

````md
# BL{ComponentName}

{1–2 frases: o que é e qual papel semântico cumpre na interface.}

## Quando usar

- {situação concreta}

## Quando não usar

- {situação} → use `BL{Outro}`.

## Semântica e acessibilidade

- Elemento/role: {ex.: `button` nativo via RAC `Button`}.
- Teclado e foco: {o que o RAC ou o componente garante}.
- Do consumidor: {o que quem usa precisa fornecer, ex.: `aria-label` quando não há texto visível}.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `{prop}` | `a` \| `b` (`a`) | {função de cada valor} |

Demais props: as do {RAC `X` | elemento `<x>`}; `className` é repassado por último e pode sobrescrever estilos.

## Composição

- {com quais componentes do DS ele combina e como}
- {quem controla o espaçamento em volta — o pai, pelo `gap` (ADR 0008)}

## Decisões

- {escolha não óbvia e o porquê} ([ADR NNNN](../../../../../docs/decisions/NNNN-....md))

## Exemplo

```tsx
import { BL{ComponentName} } from '@bloco/ui';

{uso mínimo e realista}
```
````

Seções sem conteúdo real (ex.: "Decisões" num componente trivial) podem ser omitidas; as demais ficam na ordem acima.

## Verificação

- Toda prop e variant citada existe no `.tsx`/`.styles.ts`, com o mesmo nome e default.
- Todo componente citado em "Quando não usar" ou "Composição" existe em `packages/ui/src/index.ts`.
- Os links relativos para ADRs abrem (o arquivo está em `packages/ui/src/components/{component-name}/`, então `../../../../../docs/decisions/`).
