# 0003. Usar react-aria-components como base dos componentes

- Status: Aceita
- Data: 2026-11-08

## Contexto

Cada componente interativo implementa à mão o próprio comportamento e a própria acessibilidade: teclado, gestão de foco, atributos ARIA, overlays e typeahead. Alguns dependem de recursos de browser que ainda não são estáveis ou de elementos que limitam o estilo, como `appearance: base-select` e `::picker(select)` no Select ou `<details>` no Accordion e no FileTree. Cada componente novo repete esse trabalho, e cada um resolve estados (hover, pressed, selected, focus) de um jeito diferente.

## Decisão

Compor os componentes interativos a partir de [`react-aria-components`](https://react-spectrum.adobe.com/react-aria/components.html) (RAC), sem estilo próprio. A estilização continua com Tailwind e cva, usando os tokens do [ADR 0002](0002-tokens-semanticos-sobre-tailwind.md).

- **Estilo:** as classes continuam em `X.styles.ts`. O estado vem dos data-attributes do RAC (`data-hovered`, `data-pressed`, `data-focus-visible`, `data-selected`, `data-disabled`, `data-open`), usados com as variantes nativas do Tailwind v4, por exemplo `data-hovered:bg-surface-hover`. O plugin `tailwindcss-react-aria-components` não é usado, para evitar mais uma dependência.
- **Foco:** padronizado com `data-focus-visible:` e o token `focus-ring`. Componentes RAC não usam `focus-visible:`.
- **`className`:** continua aceito e passado por último ao cva. Quando a prop do RAC aceita função de render, o componente combina as duas com `composeRenderProps`.
- **Estrutura:** pasta, prefixo `BL` e exports não mudam.
- **Primitivas:** `PrimitiveButton` dá lugar ao `Button` do RAC. O caso `as="a"` passa a ser o `Link` do RAC.
- **Ordem de migração sugerida:** Button e IconButton → ButtonGroup → Modal (`Dialog`/`Modal`) → Dropdown (`Menu`) → Select (`Select`/`ListBox`) → Accordion (`Disclosure`) → FileTree (`Tree`).

## Alternativas consideradas

- **Hooks do `react-aria`**: dão controle total do markup, mas custam muito mais código por componente.
- **Radix ou Headless UI**: cobrem menos (Tree, i18n, data-attributes para todos os estados) e trazem outra API para aprender.
- **Continuar com elementos nativos**: o custo de acessibilidade se repete em cada componente, e alguns recursos ainda não funcionam em todos os browsers.

## Consequências

- Entra uma dependência nova (`react-aria-components`) em `@bloco/ui`. Ela é grande, mas tree-shakeable.
- A API dos componentes passa a seguir o RAC (`onPress` em vez de `onClick`, `isDisabled` em vez de `disabled`). Isso quebra os consumidores, então o demo app é atualizado no mesmo PR de cada migração.
- Os estados ficam iguais em todos os componentes, porque vêm dos mesmos data-attributes.
- Quando o ADR for aceito, `docs/architecture/components.md`, a skill `/create-component` e a seção de composição do CLAUDE.md passam a apontar o RAC como primeira opção de composição.
