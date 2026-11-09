# 0017. Organizar `@bloco/ui` em pastas por camada: `src/foundations`, `src/components` e `src/patterns`

- Status: Proposta
- Data: 2026-11-09

## Contexto

O [0011](0011-tres-camadas-do-design-system.md) dividiu o design system em foundations, components e patterns, mas as pastas do pacote não refletiam isso. Os tokens ficavam em `src/theme.css` e `src/theme/`, os 30 componentes soltos em `src/<nome>/` ao lado deles, e os patterns fora de `src`, em `packages/ui/patterns/` ([0012](0012-estrutura-da-camada-de-patterns.md)). Quem lia o pacote, pessoa ou agente, não via as camadas, e "theme" não é o nome de nenhuma delas.

## Decisão

O `src/` do pacote tem uma pasta por camada:

```
packages/ui/src/
  index.ts            exporta só os components (BL*)
  foundations/        index.css (ponto de entrada) + partials por categoria + tokens.test.ts
  components/<nome>/  um componente por pasta, estrutura interna sem mudança
  patterns/<nome>/    .pattern.md + .example.tsx, fora do index.ts
```

O export de CSS passa de `@bloco/ui/theme.css` para `@bloco/ui/foundations.css`. Os patterns entram em `src`, mas continuam fora do `index.ts`, e as regras do 0012 sobre formato e conteúdo continuam valendo. Só o local muda.

## Alternativas consideradas

- **Camadas na raiz do pacote, sem `src`**: foge da convenção `src/` e espalha configuração (tsconfig, vitest, `@source`) por três pastas de topo.
- **Components agrupados por categoria** (`actions/`, `forms/`, `layout/`…): adiciona um nível a todos os caminhos e as categorias são discutíveis (onde fica `Dropdown`?). Pode vir depois, quando houver muitos componentes.
- **Manter o nome `theme.css`**: menos diff, mas o nome continua diferente do da camada.

## Consequências

- Substitui o local de patterns do 0012 (`packages/ui/patterns/` → `packages/ui/src/patterns/`) e o caminho dos tokens citado no 0002, 0005 e 0006. Esses ADRs não são editados.
- O consumidor importa `@bloco/ui/foundations.css`. Um `@source` para `packages/ui/src` cobre as três camadas, e o `tsconfig` volta a incluir só `src`.
- A cobertura exclui `src/patterns/**`, porque pattern não tem teste próprio (0012).
- Links relativos dos `.context.md` e `.pattern.md` ganharam um nível (`../../../../../docs/`), e os patterns apontam para `../../components/`. As skills `create-*` foram atualizadas.
- Um import de um componente para outro continua `../<nome>/<Nome>`, porque estão na mesma profundidade.
