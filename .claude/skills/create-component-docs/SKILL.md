---
name: create-component-docs
description: Cria ou atualiza a página de docs de um componente, foundation ou pattern no catálogo (apps/web/src/domain/docs/data/<layer>/<slug>.tsx) — exemplos com título e descrição, tabela de props e o conteúdo do X.context.md / pattern.md, compondo com os componentes de layout do DS. Use ao pedir "criar docs", "página de docs", "criar demo", "adicionar ao catálogo", "refatorar a página do componente", ou como passo das skills create-component e create-pattern.
---

# Criar a página de docs de um item do DS

O catálogo segue a [ADR 0016](../../../docs/decisions/0016-catalogo-como-site-de-docs.md): uma página por item, em `/<layer>/<slug>`, renderizada pelo template `DocsPage`. Cada página é um `Doc` no seu próprio arquivo:

```
apps/web/src/domain/docs/
  types/doc.ts                 Doc, DocExample, DocProp
  data/<layer>/<slug>.tsx      um Doc por arquivo (layer: foundations | components | patterns)
  examples/<layer>/<slug>/<nome>.tsx   um exemplo por arquivo; o código dele aparece na página
  data/shared.tsx              constantes usadas por mais de uma página
  data/docs.ts                 registro: ordem da sidebar
```

O template já monta a página, no formato de React Aria e Primer:

- Cabeçalho: badge da camada, título, intro do `.md` e, em componentes, o snippet `import { BL{title} } from '@bloco/ui'`.
- Exemplos: preview e, abaixo dele, o código-fonte com botão de copiar.
- Uso: `## Quando usar` e `## Quando não usar` do context como cartões faça / não faça. Use esses títulos exatos; outro título vira uma seção comum.
- Demais seções do `.md`, na ordem do arquivo.
- Props por último.
- Índice "Nesta página" no `sidebarRight` do shell.

A skill só escreve o `Doc` e os arquivos de exemplo. Não mexa em `DocsPage` para atender um componente.

## Antes de escrever

1. Leia `{ComponentName}.tsx` (props, defaults e variants) e `{ComponentName}.context.md`. Para um pattern, leia `{pattern-name}.pattern.md` e `{PatternName}.example.tsx`.
2. Se o context não existe ou está desatualizado, rode antes `/create-component-context`. A página mostra o context para as pessoas: o parágrafo depois do `# título` vira a descrição da página.
3. Se a página já existe, leia o arquivo dela e mantenha o que continua certo.

## O arquivo do `Doc`

```tsx
import context from '../../../../../../../packages/ui/src/input/Input.context.md?raw';
import { InputDefault } from '../../examples/components/input/default';
import defaultCode from '../../examples/components/input/default?raw';
import type { Doc } from '../../types/doc';

export const inputDoc: Doc = {
  slug: 'input',          // pasta do componente, kebab-case
  title: 'Input',         // PascalCase, sem BL; é o nome na sidebar e o do snippet de import
  layer: 'components',
  context,
  props: [ /* ver Props */ ],
  examples: [
    { title: 'Default', render: () => <InputDefault />, code: defaultCode },
  ],
};
```

- Nome do export: `{camelSlug}Doc`.
- Página nova: crie o arquivo e registre o `Doc` em `data/docs.ts`, na posição da ordem de `packages/ui/src/index.ts` dentro da camada.
- `context`: import com `?raw` do `.md` do item (pattern: `packages/ui/patterns/{name}/{name}.pattern.md`). As seções `API` e `Exemplo` não aparecem na página, porque `props` e `examples` ocupam esse lugar.
- Pattern: o exemplo `Default` renderiza `<{PatternName}Example />` e usa como `code` o `{PatternName}.example.tsx?raw`, ambos importados por caminho relativo. Não há `props` nem arquivo em `examples/`.

## Props

Uma linha por prop **própria** da API pública, na ordem do context:

```ts
{ name: 'level', type: "'solid' | 'outline' | 'subtle'", default: "'solid'", description: 'Hierarquia da ação.' },
```

- Fontes: a assinatura em `X.tsx` (tipos e defaults) e a tabela `API` do context (significado). Se as duas divergirem, o código vale, e o context é corrigido no mesmo commit.
- `type` como o consumidor escreve: uniões de literais, `boolean`, `ReactNode`, `(value: string) => void`.
- `default` só quando existe; senão omita.
- Props herdadas do RAC ou do elemento HTML não entram uma a uma. Se o componente repassa uma família delas, use uma linha de resumo (`name: '...RAC TextField'`, `description: 'Demais props de TextField (isRequired, onChange…)'`).
- `className` só entra se o componente fizer algo além de repassar.
- Descrição de uma frase, funcional ("Hierarquia da ação"), sem aparência.

## Exemplos

Um exemplo por **pergunta que o leitor faz**, não por prop. Cada um tem `title` curto e, se o título não bastar, `description` de uma frase.

| `title` | Quando criar | Conteúdo |
|---|---|---|
| `Default` | **Sempre**, e é o primeiro | O uso típico, com as props mínimas e dados realistas (não "foo/bar"). |
| Eixo (`Levels`, `Sizes`, `Variants`…) | Um por variant que muda o papel ou o visual | Todos os valores do eixo lado a lado, cada um rotulado. Com dois eixos (`level` × `color`), uma linha por valor do segundo eixo. |
| `States` | Componente com estado visível (disabled, invalid, selected, loading…) | Um exemplo por estado, rotulado. Form field: helper, required, error, success e disabled (ADR 0010). |
| Recurso (`With icon`, `Multiple`, `Controlled`…) | Capacidade que muda a forma de usar | Um recurso por exemplo. |
| `Composition` | Componente feito para ser combinado | Um caso real com os componentes vizinhos do DS. |

Regras:

- Só crie o que o componente tem: sem eixo de variant, não há exemplo de eixo; sem estados, não há `States`.
- Títulos únicos dentro da página. Não repita o `Default` dentro de outro exemplo.
- Só props que existem na API pública; o exemplo também documenta.
- Cada exemplo cabe numa tela e não depende de outro.
- Exemplos migrados do catálogo antigo que fogem destas regras (como `div` com `flex` em Button) são corrigidos ao refazer a página.

## Arquivo do exemplo

Cada exemplo de componente fica em `examples/components/<slug>/<nome>.tsx`, com nome em kebab-case do `title` (`default.tsx`, `levels.tsx`, `with-icon.tsx`). O arquivo é importado duas vezes no `Doc`: como componente, em `render`, e com `?raw`, em `code`. A página mostra o arquivo inteiro, então ele é escrito para ser copiado:

```tsx
import { BLButton, BLCluster } from '@bloco/ui';

export function ButtonSizes() {
  return (
    <BLCluster gap="2">
      <BLButton size="sm">Small</BLButton>
      <BLButton size="md">Medium</BLButton>
      <BLButton size="lg">Large</BLButton>
    </BLCluster>
  );
}
```

- Um export nomeado `{Title}{Exemplo}` (`ButtonSizes`), sem props.
- Autocontido: importa só `@bloco/ui`, `@phosphor-icons/react` e `react`. Não importa `../shared` nem outro exemplo. Por isso, prefira valores literais a `.map` sobre constantes: o código fica mais legível.
- Estado (`useState`) e handlers ficam dentro do componente do exemplo.
- Foundations (tabelas de tokens) podem ficar com `render` inline e sem `code`, porque o código delas não é para copiar.

## Layout dos exemplos

Componha **sempre** com os componentes de layout do DS (ADR 0008). Nunca use `div` com `flex`/`grid`/`gap-*` à mão:

- Itens em linha que quebram (botões, campos lado a lado, estados) → `BLCluster`, com o `gap` escolhido pelo papel.
- Itens empilhados (rótulo + exemplo, linhas de um eixo) → `BLStack`.
- Colunas ou grade → `BLGrid`; conteúdo + lateral → `BLSidebar`.
- O pai é dono do espaço: o exemplo define o `gap` no layout e não põe margem no componente.
- Use `className` só para largura ou contêiner do exemplo (`w-96`, `max-w-reading`, `w-sidebar`), com os passos da escala. Nunca para cor, hex ou `rounded-*`.
- Rótulo de valor (`gap-6`, `sm`, `error`…) com `BLTypography` (`code-01`, `font="mono"`).
- Várias linhas de um eixo: um `BLStack` externo e um `BLCluster` por linha. Não devolva arrays soltos de `render`.

## Dados

- Constantes usadas por mais de uma página de foundations ficam em `data/shared.tsx`. Exemplos de componente não usam `shared`, porque são autocontidos.
- Textos dos exemplos em inglês, curtos e realistas (`Country`, `Brazil`). Títulos e descrições dos exemplos também em inglês. O conteúdo do context continua no idioma dele.

## Verificação

- `pnpm --filter @bloco/web exec tsc --noEmit` e `pnpm test` sem erro (`layers.test.ts` checa nomes e imports).
- `pnpm dev`, abra `/<layer>/<slug>` e confira:
  - a sidebar mostra o `title`;
  - a intro e as seções do context aparecem;
  - a tabela de props bate com `X.tsx`;
  - cada exemplo carrega sem erro no console, e o código mostrado embaixo é o do arquivo;
  - o índice à direita lista as seções, e as âncoras rolam até elas;
  - `Quando usar` / `Quando não usar` aparecem como cartões;
  - foco e teclado funcionam nos exemplos interativos.
- O `{ComponentName}.context.md` e a página citam os mesmos recursos.
