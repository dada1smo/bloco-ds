# 0015. Organizar o app web em quatro camadas: routes, domain, ui e global

- Status: Proposta
- Data: 2026-11-08

## Contexto

`apps/web` é o catálogo do design system e o starter de projetos que consomem `@bloco/ui` ([ADR 0014](0014-tanstack-start-no-app.md)). O TanStack Start define onde ficam as rotas, mas não onde fica o resto: regras de negócio, composições reutilizáveis do app, estilos próprios, auth e clients. Sem essa convenção, as rotas acumulam tudo. Antes desta decisão, `routes/components.tsx` misturava layout, a regra de agrupamento da árvore, o header e o toggle do menu, e `src/demos.tsx` ficava solto na raiz. Um projeto novo herdaria essa falta de fronteira.

## Decisão

`apps/web/src` tem quatro camadas, cada uma com uma responsabilidade:

| Camada | Responsabilidade | Exemplo |
|---|---|---|
| `routes` | Roteamento e renderização final: rotas, hierarquia, layouts compartilhados. O arquivo só tem `createFileRoute`, `beforeLoad`/loader/params/redirect e composição de componentes de `domain` e `ui`. Nenhum componente, hook ou regra é declarado nele. | `routes/_pages.tsx` |
| `domain` | Regras de negócio do app, com uma pasta por domínio: componentes, hooks, types, utils e dados daquele domínio. | `domain/demo/` |
| `ui` | Componentes "burros" e reutilizáveis no app, compostos com componentes do DS, mais os estilos e o tema próprios do app (`ui/styles/`). | `ui/components/app-layout.tsx` |
| `global` | Definições globais: auth, clients, providers. A pasta só é criada no primeiro uso. | `global/auth/` |

**Organização interna.** `routes` segue as rotas por arquivo do TanStack Start. As outras camadas (e cada domínio dentro de `domain`) usam `components/`, `hooks/`, `utils/`, `types/`, além de `data/` e `styles/` quando fizer sentido.

**Nomenclatura.** Os componentes do app não usam o prefixo `BL`. Cada camada tem a sua regra:

| Camada | Componente | Arquivo |
|---|---|---|
| `ui` | Nome de mercado para um componente "burro", pelo papel na tela e sem termo de negócio: `AppSidebar`, `AppLayout`, `PageHeader`. | `components/app-sidebar.tsx` |
| `domain` | `{Domínio}{Classificação, se houver}{O que é}`: `DemoNavigation`, `DemoComponentTable`. | `components/demo-component-table.tsx` |
| `global` | Igual a `domain`, com a área no lugar do domínio: `AuthProvider`, `ApiClient`. | `auth/auth-provider.tsx` |

Todo arquivo de `ui`, `domain` e `global` fica em kebab-case, componente ou não: `app-sidebar.tsx`, `find-demo.ts`, `use-theme.ts`.

Nomes de componentes, funções e consts são curtos e objetivos: verbo + substantivo (`getDemos`, `findDemo`), com no máximo três palavras. O escopo já dá contexto, então o nome não o repete: em `domain/demo/utils/`, use `findDemo` e não `findDemoByFolderAndId`. Hooks usam `use` + substantivo (`useDemos`). Booleans começam com `is`/`has`/`can`.

**Componentização.** Prefira extrair componentes a acumular JSX: um trecho com papel próprio na tela (header, toggle, seção) vira um componente com nome, mesmo que só tenha um uso. Ex.: o header do `AppLayout` é `AppHeader`, não JSX inline na prop `header`.

**Um componente por arquivo.** Cada arquivo de `ui`, `domain` e `global` (inclusive `data/` e `examples/`) declara no máximo um componente, por menor que seja; componentes auxiliares vão para arquivos próprios na mesma pasta (`app-header.tsx`, `menu-toggle.tsx`); nos exemplos de docs, as partes compartilhadas ficam ao lado (`examples/components/app-shell/shell-header.tsx`). Helpers que não são componentes (consts, funções minúsculas) podem ficar no arquivo. Verificado por `apps/web/src/layers.test.ts`.

**Layouts.** Um layout compartilhado é uma rota de layout pathless: `routes/_pages.tsx` envolve `routes/_pages/**` sem entrar na URL.

**Regra de dependência.** A seta significa "pode importar de":

```
routes → domain, ui, global
domain → domain (inclusive outro domínio), ui, global
ui     → ui, @bloco/ui
global → global
```

Um import entre camadas usa o alias `@/<camada>/…`. Import relativo vale só dentro da mesma camada. A regra é verificada por `apps/web/src/layers.test.ts`.

**DS primeiro.** `ui` sempre prefere um componente de `@bloco/ui`. Uma composição de `ui` sobe para o DS (pattern com `/create-pattern` ou componente com `/create-component`) quando um segundo app precisar dela.

Estrutura atual:

```
apps/web/src/
  routes/__root.tsx, _pages.tsx, _pages/index.tsx, _pages/components/$folder.$id.tsx
  domain/demo/{data/demos.tsx, types/demo.ts, utils/find-demo.ts, components/demo-navigation.tsx}
  ui/{components/app-layout.tsx, styles/index.css}
```

## Alternativas consideradas

- **Pastas planas por tipo** (`components/`, `hooks/`, `utils/` na raiz) — mistura regra de negócio com UI genérica e não diz quem pode importar quem.
- **`domain` plano** (`domain/components/…` para todos os domínios) — os arquivos de domínios diferentes se misturam, e remover um domínio exige garimpar.
- **Domínios isolados entre si** — mais rígido do que o app precisa hoje, e forçaria duplicar tipos compartilhados ou movê-los para `global`.
- **Regra só por convenção** — o repo não tem linter, e uma regra sem checagem se perde no primeiro atalho. Um teste no estilo de `tokens.test.ts` custa poucas linhas.
- **Rotas com componentes locais** — é prático, mas faz a rota voltar a acumular UI e regra, que é o problema de partida.

## Consequências

- Caminhos movidos: `src/demos.tsx` → `src/domain/demo/data/demos.tsx`; `src/index.css` → `src/ui/styles/index.css`; `routes/components.tsx` → `routes/_pages.tsx` (layout) + `domain/demo/components/demo-navigation.tsx` + `ui/components/app-layout.tsx`; `routes/components.$folder.$id.tsx` → `routes/_pages/components/$folder.$id.tsx`. As URLs não mudam. As ADRs 0012 e 0014 citam os caminhos antigos; vale o que está aqui.
- Alias `@/*` → `src/*` no `tsconfig.json` do app, lido pelo Vite via `resolve.tsconfigPaths`.
- `apps/web` passa a ter Vitest (`vitest.config.ts` próprio, sem o plugin do Start), e `pnpm test` na raiz roda os testes de todos os pacotes.
- As skills `create-component-demo`, `create-component`, `create-component-context` e `create-pattern` apontam para os novos caminhos.
- Página nova: arquivo em `routes/`, que compõe peças de `domain` e `ui`. Regra nova: `domain/<nome>/`. Peça visual reutilizável: `ui/components/`.
