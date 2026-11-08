# 0005. Organizar os tokens em três camadas: primitiva, semântica e componente

- Status: Aceita
- Data: 2026-11-08

## Contexto

O [ADR 0002](0002-tokens-semanticos-sobre-tailwind.md) define três camadas: primitiva (Tailwind), marca (`palette.css`) e semântica. Na prática:

- A camada "marca" só dá outro nome à paleta (`primary-900` → `slate-900`). Ela registra a escolha de cor da marca, mas não descreve intenção. O `color.css` lê `slate-*` direto e não passa por ela.
- Não há lugar previsto para um valor que só um componente usa, como a duração e a curva de uma animação ou a cor de um estado que nenhum outro componente tem. Sem esse lugar, o valor vira arbitrário no `.styles.ts` ou um token semântico que só um componente usa.

Referência: [designsystems.one: Tokens that LLMs can read](https://www.designsystems.one/ai-ready/tokens). O artigo propõe duas camadas obrigatórias, primitiva (nome por aparência) e semântica (nome por intenção). A terceira, de componente (nome por superfície), é opcional e deve ser usada com moderação. Componentes leem a semântica e nunca a primitiva.

## Decisão

Os tokens ficam em **três camadas**. A primitiva e a semântica são obrigatórias. A de componente é opcional e começa vazia. Este ADR complementa o 0002: nomes, regras para componentes e partials continuam como estão. Só o modelo de camadas muda.

### Camadas

| Camada | O que é | Onde | Exemplo | Quem lê |
|---|---|---|---|---|
| Primitiva | paleta e escalas padrão do Tailwind, com nomes de aparência | o próprio Tailwind (não temos arquivo) | `slate-900`, `amber-500`, `text-lg`, `ease-out` | só a camada semântica |
| Semântica | intenção. Inclui a escolha de marca (`palette.css`), cor (`color.css`), tipografia (`typography.css`) e os partials futuros | `packages/ui/src/theme/` | `primary`, `foreground-muted`, `text-body` | componentes |
| Componente (opcional) | valor usado por um único componente | `X.module.css` do componente | `--bl-modal-enter-duration` | só aquele componente |

A resolução vai de cima para baixo: componente → semântica → primitiva, sempre com `var()`.

`palette.css` passa a ser parte da camada semântica, mas as regras do 0002 continuam valendo: `primary-500`, `accent-*` e outras escalas são proibidas em `*.styles.ts`.

### Camada de componente

Hoje não há nenhum token de componente. Um token desses só é criado quando valem as duas condições:

1. nenhum outro componente vai usar o valor;
2. o valor não cabe numa utility do `.styles.ts`. São os casos de animação, keyframes e comportamentos específicos.

Se um segundo componente precisar do mesmo valor, o token é promovido para a camada semântica, no partial da sua categoria.

Regras:

- Nome: `--bl-<componente>-<propriedade>[-<estado>]`, por exemplo `--bl-modal-enter-duration` ou `--bl-accordion-panel-easing`.
- Fica no seletor `bl:<nome>` do `X.module.css`, escopado ao componente. Não entra em `@theme` e não gera utility.
- O valor é um `var()` de token semântico. Para propriedades que não são cor, como duração e easing, também pode ser uma primitiva do Tailwind. Cor sempre passa por um token semântico.
- Só o próprio `X.module.css` usa o token. O `.styles.ts` referencia a classe `bl:<nome>`, como já faz hoje.
- Cada token leva um comentário de uma linha dizendo quando usar, como os semânticos.

```css
.bl\:modal {
  /* Duração da entrada do modal; curta para não atrasar o foco. */
  --bl-modal-enter-duration: var(--default-transition-duration);
  animation: bl-modal-enter var(--bl-modal-enter-duration) var(--ease-out);
}
```

## Alternativas consideradas

- **Tokens de componente num partial `theme/components/<comp>.css` com `@theme`**: geram utilities globais (`bg-button-bg`) que qualquer componente pode usar por engano e ficam longe do componente que os usa.
- **Manter as camadas do 0002 sem a de componente**: valores de animação e de comportamentos específicos viram valores arbitrários nos `.styles.ts` ou tokens semânticos que só um componente usa.
- **`.tokens.json` (formato W3C) com gerador**: já foi rejeitado no 0002 pelo mesmo motivo.

## Consequências

- Não há nada para migrar agora: nenhum componente precisa de token próprio.
- A camada "marca" deixa de existir como camada separada. `palette.css` continua igual, mas agora conta como camada semântica.
- Um valor específico de componente tem lugar definido, com nome previsível e regra clara de quando vira semântico.
- `docs/architecture/theming.md`, `docs/architecture/components.md`, a skill `/create-component` e o CLAUDE.md passam a citar este modelo.
