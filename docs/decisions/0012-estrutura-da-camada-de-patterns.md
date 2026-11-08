# 0012. Documentar patterns em `packages/ui/patterns/` como markdown com exemplo tipado

- Status: Proposta
- Data: 2026-11-08

## Contexto

O [0011](0011-tres-camadas-do-design-system.md) criou a camada de patterns (composições de components, sempre composable, sem API de produto nem estilo novo), mas deixou local, formato e documentação para depois. A camada é sobretudo documental: o leitor principal é uma IA montando telas, que precisa saber *como combinar* componentes, coisa que o `X.context.md` ([0009](0009-documento-de-contexto-por-componente.md)) não cobre por olhar um componente só. Um documento solto, porém, desatualiza quando a API de um componente muda e ninguém percebe.

## Decisão

Cada pattern é uma pasta `packages/ui/patterns/<nome-kebab>/`, fora de `src/` (não é exportado nem entra no `index.ts`), com dois arquivos:

- `<nome-kebab>.pattern.md` — o documento, fonte da verdade. Seções fixas: **Problema**, **Quando usar**, **Quando não usar**, **Estrutura** (árvore de componentes `BL*` e sua ordem), **Regras** (quem controla o espaço, hierarquia, acessibilidade entre componentes: rótulos de grupo, landmarks, ordem de foco), **Variações** (como a mesma composição se adapta, sem props novas), **Erros comuns**, **Componentes** (links para os `X.context.md`) e **Exemplo**. Como o context, não descreve aparência (classes, tokens, cores).
- `<NomePascal>.example.tsx` — a composição de referência, importando só de `@bloco/ui` como um consumidor faria e com layout pelas primitivas do [0008](0008-grid-e-layout.md). É verificada pelo `tsc` e renderizada no catálogo.

`packages/ui/patterns/README.md` é o índice: uma linha por pattern (nome e problema que resolve), para o agente escolher sem abrir todos. Patterns são criados e atualizados pela skill `create-pattern`.

## Alternativas consideradas

- **`docs/patterns/`** — longe dos componentes que o pattern compõe e do caminho que um agente lendo `@bloco/ui` percorre.
- **Só markdown, com o código em blocos** — o código desatualiza sem que nada quebre.
- **Patterns em `src/`, exportados** — viram componentes fechados, o que o 0011 rejeitou.
- **Storybook/MDX** — dependência nova e foco visual, como já descartado no 0009.

## Consequências

- `packages/ui/tsconfig.json` inclui `patterns` e o CSS do app ganha `@source` para a pasta, junto com o primeiro pattern.
- O catálogo ganha a pasta `patterns` em `apps/web/src/demos.tsx`, com uma demo por pattern renderizando o exemplo.
- Pattern não tem teste próprio: não tem comportamento novo, e o dos componentes já é testado. Mudar a API de um componente usado num pattern quebra o `tsc` do exemplo e exige atualizar o `.pattern.md` no mesmo commit.
- Candidatos a primeiros patterns: ações de formulário (hoje descritas no `Form.context.md`) e a estrutura de form fields do [0010](0010-padrao-de-form-fields.md).
