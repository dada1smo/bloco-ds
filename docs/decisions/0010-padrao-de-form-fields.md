# 0010. Padronizar form fields com FieldLabel, FieldHelperText e FieldFeedback

- Status: Aceita
- Data: 2026-11-08

## Contexto

O `Select` define o próprio rótulo e não tem ajuda nem validação. Com input, textarea e checkbox a caminho, cada campo reinventaria rótulo, ajuda, erro, placeholder e estado desabilitado, com estilos e ligações de acessibilidade (`aria-labelledby`, `aria-describedby`) diferentes. O desabilitado por `opacity-50` ainda dá contraste imprevisível e foge dos tokens (ADR 0006).

## Decisão

Todo form field é um campo do `react-aria-components` (`Select`, `TextField`, `Checkbox`…) que compõe três componentes auxiliares, sem estilizar rótulo, ajuda ou erro por conta própria:

- `FieldLabel` (RAC `Label`): rótulo visível.
- `FieldHelperText` (RAC `Text` no slot de descrição): ajuda.
- `FieldFeedback` (`status="error" | "success"`): erro via RAC `FieldError`, sucesso via `Text` de descrição; sempre ícone e texto.

Estrutura fixa: rótulo, controle, depois ajuda **ou** feedback (o feedback ocupa o lugar da ajuda; erro vence sucesso; campo desabilitado não mostra feedback). API comum: `label`, `helperText`, `errorMessage`, `successMessage`, `isInvalid`, `isRequired`, `isDisabled`; sem `label`, exige `aria-label`. Os auxiliares são exportados para composições próprias, mas só funcionam dentro de um campo RAC.

Obrigatório é marcado por um asterisco no rótulo. Placeholder usa `text-placeholder` e nunca substitui o rótulo. Desabilitado usa os tokens `text-disabled`, `border-disabled` e `text-icon-disabled`, nunca `opacity-*`; vale também para opções de lista. Detalhes visuais em [theming.md](../architecture/theming.md#estados-de-campo-placeholder-e-disabled).

## Alternativas consideradas

- **Só props, sem componentes** — duplica estilo e ligação de a11y em cada campo.
- **Wrapper `FormField` único** — esconde a estrutura e briga com os slots do RAC.
- **Sucesso também via `FieldError`** — o RAC não tem o conceito de sucesso.

## Consequências

- Campo novo ganha rótulo, ajuda e validação consistentes e acessíveis de graça.
- O `Select` migra: perde `selectLabelStyles`, ganha as props de ajuda e feedback e opções com `isDisabled`.
- `Dropdown` e `Button` passam a usar tokens de desabilitado (novo `bg-disabled`); `tokens.test.ts` barra `data-disabled:opacity-*`.
- Campo obrigatório mostra asterisco no `FieldLabel` (`isRequired`); não há marcador de "opcional".
