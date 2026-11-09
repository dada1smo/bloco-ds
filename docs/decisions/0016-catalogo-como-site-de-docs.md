# 0016. Organizar o catálogo como site de docs, com uma página por item do DS

- Status: Proposta
- Data: 2026-11-09

## Contexto

O catálogo em `apps/web` listava arquivos, não componentes. `domain/demo/data/demos.tsx` (1460 linhas) mapeava `pasta -> [{ id: 'levels.tsx', render }]`. A sidebar mostrava pastas e nomes `.tsx`, e cada demo era uma rota (`/components/button/levels.tsx`). Para entender um componente, a pessoa abria vários arquivos soltos. A página não trazia nada sobre quando usar o componente, quais props ele aceita ou como ele se comporta na acessibilidade, embora isso já esteja escrito no `X.context.md` ([ADR 0009](0009-documento-de-contexto-por-componente.md)) e no `pattern.md` ([ADR 0012](0012-estrutura-da-camada-de-patterns.md)).

A referência é um site de docs de DS como o Primer ([primer.style/product/components/button](https://primer.style/product/components/button/)): uma página por componente, com descrição, exemplos com título, tabela de props e orientações de uso.

## Decisão

O domínio passa a se chamar `docs` (`apps/web/src/domain/docs/`), e cada item do DS (foundation, componente ou pattern) tem **uma página**.

**URL e sidebar.** A página fica em `/<layer>/<slug>`, por exemplo `/components/button-group`, `/foundations/color` e `/patterns/header`. O `slug` é o nome da pasta em kebab-case, e a URL não leva `.tsx`. A sidebar tem três grupos (Foundations, Components e Patterns). Cada folha mostra o `title` em PascalCase (`ButtonGroup`, `Color`, `Header`), sem um subnível de arquivos.

**Modelo.** Cada página é um `Doc` (`domain/docs/types/doc.ts`):

```ts
type Doc = {
  slug: string;
  title: string; // PascalCase, sem BL
  layer: 'foundations' | 'components' | 'patterns';
  context?: string; // X.context.md / pattern.md importado com ?raw
  props?: { name; type; default?; description }[];
  examples: { title; description?; render; code? }[]; // code = ?raw do arquivo do exemplo
};
```

Cada `Doc` fica no seu próprio arquivo, `domain/docs/data/<layer>/<slug>.tsx`. Constantes usadas por mais de uma página vão para `data/shared.tsx`. `data/docs.ts` registra as páginas na ordem da sidebar.

**Anatomia da página** (`DocsPage`, uma página rolável, sem tabs, no formato de React Aria e Primer):

1. Cabeçalho: badge da camada, título, intro (o texto do `.md` entre o `# título` e o primeiro `##`) e, em componentes, o snippet de import com botão de copiar.
2. Exemplos: cada um com título, uma descrição opcional de uma frase, o preview e, quando houver `code`, o código-fonte com botão de copiar. O primeiro é sempre `Default`. Cada exemplo vive no seu arquivo em `domain/docs/examples/<layer>/<slug>/<nome>.tsx`, importado como componente e com `?raw`, então o código mostrado é o que roda.
3. Uso: `Quando usar` e `Quando não usar` do `.md` como dois cartões lado a lado (faça / não faça).
4. As demais seções `##` do `.md` (Semântica e acessibilidade, Composição, Decisões…), na ordem do arquivo. `API` e `Exemplo` ficam de fora, porque a tabela de props e os exemplos ocupam esse lugar.
5. Props: tabela com prop, tipo, default e descrição.

O índice "Nesta página" fica no `sidebarRight` do `BLAppShell`, com âncoras para os `h2`; `getOutline` gera os ids da página e do índice. Abaixo de `xl` ele some, como toda sidebar direita do shell.

Uma parte sem dados não aparece na página.

**Fontes.** O texto vem do `.md`, renderizado direto (`react-markdown` + `remark-gfm` em `ui/components/markdown.tsx`), então não há uma cópia que possa divergir. As props são escritas à mão no `Doc`, pela skill `create-component-docs`, a partir de `X.tsx` e da seção `API` do context. A tabela mostra só a API própria do componente, não as props herdadas do RAC.

## Alternativas consideradas

- **Manter o catálogo por arquivo** — a sidebar cresce com um arquivo por demo, e não sobra lugar para props nem orientação de uso.
- **Tabs como no Primer** (Exemplos / Props / Acessibilidade) — com o volume de conteúdo atual, uma página rolável é mais simples de ler e de buscar com Ctrl+F. Dá para rever isso depois.
- **Transcrever o context em dados tipados** — dispensa a dependência, mas duplica o texto, e as duas cópias divergem na primeira mudança.
- **Gerar a tabela de props dos tipos** (react-docgen-typescript) — mantém a tabela sempre atualizada, mas traz um passo de build e uma dependência. As props herdadas do RAC poluiriam a tabela, e as descrições teriam de morar no JSDoc.
- **Um único `docs.tsx`** — o arquivo de 1460 linhas cresceria ainda mais com props e descrições.

## Consequências

- Caminhos movidos: `domain/demo/` → `domain/docs/`; `data/demos.tsx` → `data/<layer>/<slug>.tsx` + `data/shared.tsx` + `data/docs.ts`; `DemoNavigation` → `DocsNavigation`; `findDemo` → `findDoc`; a rota `routes/_pages/components/$folder.$id.tsx` → `routes/_pages/$layer.$slug.tsx`. As ADRs 0012, 0014 e 0015 citam os caminhos antigos; vale o que está aqui.
- As URLs antigas (`/components/<pasta>/<arquivo>.tsx`) deixam de existir e redirecionam para `/`.
- O app ganha as dependências `react-markdown` e `remark-gfm`.
- A skill `create-component-demo` passa a se chamar `create-component-docs` e cuida da página inteira: exemplos, props e o vínculo com o context.
- As demos foram migradas mecanicamente, e cada arquivo antigo virou um exemplo. A descrição, as props e o context de cada página entram componente a componente, rodando `/create-component-docs`.
- O `X.context.md` passa a aparecer para as pessoas, não só para IA. A intro (primeiro parágrafo) precisa funcionar como descrição da página.
