# 0007. Usar densidade aberta, com corpo de 20px

- Status: Aceita
- Data: 2026-11-08

## Contexto

O [0006](0006-foundations-carbon.md) adotou a densidade produtiva do Carbon: corpo 14/20, rótulos de 12px, controles de 24 a 64px e padding de controle de 16px. O resultado é denso demais para o app, que pede uma leitura mais aberta. O texto padrão do corpo passa a ter 20px, e a tipografia, as alturas de controle e os espaçamentos dos componentes sobem junto para manter a proporção.

## Decisão

Mantêm-se a base de 4px (`--spacing`), os nomes de token e a lista de passos permitidos (`0.5 1 2 3 4 6 8 10 12 16 20 24 40`). Mudam os valores dos tokens e os passos que cada componente usa:

- **Tipografia**: `body-01` = 20/28. O type set inteiro sobe e fica no grid de 4px (tabela em [theming.md](../architecture/theming.md#tipografia)). O menor texto do sistema passa a ser 14px (`code-01`); rótulo e ajuda passam a 16px.
- **Sizing**: `control-xs..xl` = 32/40/48/56/72px.
- **Densidade**: os componentes usam um passo acima do 0006 (0.5→1, 1→2, 2→3, 3→4, 4→6, 6→8, 8→10, 10→12), e os papéis de espaçamento ficam fixados na seção [Densidade](../architecture/theming.md#densidade). Ícone em controle `sm`/`md` = `size-5` (20px, igual ao corpo).

## Alternativas consideradas

- **Trocar a base para 5px**: escalaria todo `p-*`, `gap-*` e controle em 1.25× sem editar componente, mas sai do grid 4/8 do Carbon e deixa valores ímpares (25, 35px).
- **Escalar o `font-size` do `html`**: corpo ainda dependeria do token (14 × 1.25 = 17.5px) e tudo em rem, inclusive breakpoints, mudaria junto.

## Consequências

- Substitui os valores de tipografia e sizing do 0006 e a consequência "visual mais denso"; o resto do 0006 continua valendo.
- Os testes de comportamento e o `tokens.test.ts` não mudam, porque nomes e passos permitidos são os mesmos.
- Componente novo segue a tabela de Densidade em vez de escolher passos a olho.
- Menos conteúdo cabe por tela; tabelas e listas longas, quando existirem, podem precisar de uma variante compacta.
