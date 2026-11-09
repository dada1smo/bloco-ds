# 0013. Subir um passo de espaçamento nos papéis de densidade

- Status: Aceita
- Data: 2026-11-08

## Contexto

O [0007](0007-densidade-aberta.md) abriu a densidade em um passo, mas os espaços entre elementos ainda ficam compactos ao lado do corpo de 20px e do header de 72px.

## Decisão

Cada papel da tabela [Densidade](../architecture/theming.md#densidade) sobe mais um passo da escala (1→2, 2→3, 3→4, 4→6, 6→8, 8→10, 10→12), e os componentes que os usam acompanham. Base de 4px, nomes de token, lista de passos permitidos e alturas de controle não mudam.

## Consequências

- Complementa o 0007; os papéis valem como na tabela atualizada.
- Menos conteúdo por tela, como no 0007.
- `Grid`, `Stack` e `Sidebar` continuam com `gap` escolhido pelo consumidor; só a recomendação por papel mudou.
