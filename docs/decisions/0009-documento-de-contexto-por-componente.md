# 0009. Manter um documento de contexto por componente

- Status: Aceita
- Data: 2026-11-08

## Contexto

Código, teste e demo mostram *como* um componente funciona, mas não *quando* usá-lo nem *por que* ele é como é. Quem consome o `@bloco/ui` — cada vez mais uma IA gerando telas — escolhe componente pelo nome e erra a semântica: `BLDropdown` onde cabia `BLSelect`, `BLStack` onde cabia `BLCluster`, margem própria onde o pai deveria controlar o `gap`. As decisões que evitam esses erros estão espalhadas por ADRs, testes e conversas.

## Decisão

Todo componente tem um `X.context.md` na própria pasta, ao lado de `X.tsx`. O público principal é uma IA que vai escolher e compor o componente, mas o texto é escrito para ser lido por pessoas também: prosa curta, títulos previsíveis, sem instruções no estilo de prompt. O conteúdo é semântico e funcional — propósito, quando usar e quando não usar, acessibilidade, significado das props, composição e decisões — e não repete aparência (classes, tokens, cores), que fica em `X.styles.ts` e em [theming.md](../architecture/theming.md). O documento é gerado e atualizado pela skill `create-component-context`, que a `create-component` chama.

## Alternativas consideradas

- **JSDoc no TSX**: fica espalhado por props e não tem lugar natural para "quando não usar" nem para comparar com outros componentes.
- **Storybook/MDX**: dependência nova e foco visual; a IA precisaria rodar ou parsear outra ferramenta para ler a intenção.
- **Um documento único em `docs/`**: longe do código, desatualiza sem ninguém notar e cresce sem limite.

## Consequências

- Componente novo entra com `X.context.md`, como já entra com `X.test.tsx`.
- Mudar a API ou a semântica de um componente inclui atualizar o context no mesmo commit.
- Os componentes existentes recebem o documento de uma vez (backfill).
- Ainda não há teste que exija o arquivo; se o hábito falhar, vira uma guarda como a de `tokens.test.ts`.
