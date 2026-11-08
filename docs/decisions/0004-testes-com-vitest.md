# 0004. Testar componentes com Vitest, só comportamento

- Status: Proposta
- Data: 2026-11-08

## Contexto

O projeto não tem testes nem linter. A única verificação é `tsc`, que não pega um clique que deixou de funcionar, um `aria-expanded` errado ou um `disabled` ignorado. `@bloco/ui` é consumido como código-fonte, sem etapa de build que valide o pacote.

O [ADR 0003](0003-react-aria-components-como-base.md) propõe trocar a base de todos os componentes interativos. Essa migração precisa de uma rede de segurança que diga se o comportamento continua o mesmo, e só testes de comportamento sobrevivem à troca da implementação.

## Decisão

Todo componente de `@bloco/ui` tem testes com **Vitest**, ao lado do código, com **cobertura mínima de 80%**. Os testes verificam **funcionalidade e interação, nunca aparência**.

### Ferramentas

Vitest em `packages/ui`, reaproveitando o Vite que o projeto já usa, com ambiente `jsdom`, `@testing-library/react`, `@testing-library/user-event` e `@testing-library/jest-dom`.

### Local

`X.test.tsx` dentro de `packages/ui/src/<kebab-name>/`, ao lado de `X.tsx`. Todo componente tem o seu, inclusive os sem estilo próprio (`ThemeSwitch`).

```
button/
├── index.tsx
├── Button.tsx
├── Button.styles.ts
└── Button.test.tsx
```

### Cobertura

Provider `v8`, mínimo de **80%** em linhas, funções, branches e statements, calculado sobre o projeto inteiro. Abaixo disso, o comando falha (`thresholds` do Vitest).

Entram no cálculo os `.tsx` dos componentes. Ficam de fora `*.styles.ts`, `index.tsx` (só re-export), `*.module.css`, `*.test.*` e `apps/web` (demo).

### O que se testa

O que a pessoa usuária ou o código consumidor consegue observar:

- clique e teclado disparam o callback certo;
- o estado muda como esperado (aberto/fechado, selecionado, tema alternado e persistido);
- `disabled` bloqueia a interação;
- props viram atributos funcionais e de acessibilidade (`role`, `aria-expanded`, `disabled`, `href`);
- polimorfismo: `as="a"` renderiza um `<a>`;
- foco e navegação por teclado;
- `className` do consumidor chega ao elemento raiz (contrato da API).

### O que é proibido

Assert de aparência. Não há `toHaveClass('bg-…')`, `toHaveStyle`, snapshot de HTML ou CSS, nem comparação com o que o cva gera. Regras práticas:

1. Buscar por papel e nome acessível (`getByRole`). `data-testid` só quando não houver papel.
2. Interagir com `userEvent`, não com `fireEvent`.
3. Um teste que quebra só porque uma classe Tailwind mudou está errado.
4. `*.styles.ts` não tem teste próprio. É exercitado de forma indireta quando o componente renderiza.
5. A única checagem de classe permitida é a do repasse de `className` do consumidor, verificando a classe que o próprio teste passou, nunca as do DS.

### Comandos

`pnpm test` roda os testes e `pnpm test:coverage` roda com os thresholds. Os scripts ficam na raiz e delegam para `packages/ui`, como os atuais. O `pnpm test:coverage` é a verificação de que este ADR está sendo cumprido. CI ou hook ficam fora até existir um.

## Alternativas consideradas

- **Jest**: outra toolchain, que duplica a configuração do Vite.
- **Playwright ou Storybook com visual regression**: testa aparência, que é justamente o que este ADR proíbe, e é pesado para o tamanho do projeto.
- **`happy-dom`**: mais rápido, mas diverge mais dos browsers em foco e ARIA. Começa-se por `jsdom` e troca-se se ficar lento.
- **Pasta `__tests__/` separada**: afasta o teste do componente que ele cobre.
- **Cobertura mínima por arquivo**: mais rígida do que o necessário. Pode virar um passo futuro.

## Consequências

- Entram devDependencies novas: `vitest`, `@vitest/coverage-v8`, `jsdom`, `@testing-library/react`, `@testing-library/user-event` e `@testing-library/jest-dom`. Cada instalação precisa de aprovação, conforme o CLAUDE.md.
- O primeiro passo depois do aceite é instalar e configurar (`vitest.config.ts` em `packages/ui`, `setupTests.ts` com o jest-dom, tipos no tsconfig) e escrever um teste por componente existente até chegar a 80%.
- O `tsc --noEmit` de `packages/ui` passa a incluir os testes (`include: ["src"]`), o que é desejado.
- Componente novo só entra com o seu teste no mesmo PR.
- Como os testes descrevem comportamento, a migração do [ADR 0003](0003-react-aria-components-como-base.md) os preserva, exceto onde a API muda de propósito (`onClick` → `onPress`, `disabled` → `isDisabled`).
- Quando o ADR for aceito, o CLAUDE.md (comandos e convenção de teste), `docs/architecture/components.md` (anatomia com `X.test.tsx`), `docs/architecture/overview.md` (deixa de dizer que não há testes) e a skill `/create-component` (passo de teste na verificação) passam a citar estas regras.
