# BLCard

Superfície que agrupa conteúdo relacionado sobre um mesmo assunto (um projeto, um resumo, um item de catálogo). Por padrão não tem semântica própria; vira região da página só quando pedido.

## Quando usar

- Resumir uma entidade com título, descrição curta e metadados, em grade ou lista.
- Destacar um bloco independente da página (ex.: "Uso deste mês") como região nomeada.

## Quando não usar

- O card inteiro leva a outra página, sem ações internas → `BLAnchorCard`.
- Conteúdo que expande e recolhe → `BLAccordion`.
- Diálogo ou confirmação → `BLModal`.
- Dados tabulares comparáveis entre linhas → `BLTable`.
- Só para dar espaçamento ou colunas → `BLStack`, `BLCluster`, `BLGrid`.

## Semântica e acessibilidade

- Elemento: `div` sem role. Com `as="section"` vira landmark `region`, nomeado automaticamente pelo `heading` (ou por `aria-label`, que tem prioridade). Uma região precisa de nome.
- O título é um heading HTML de nível `headingLevel` (padrão `3`); escolha pelo esboço da página, sem pular níveis.
- `icon` é decorativo e fica oculto para tecnologia assistiva. `image` tem `alt` vazio por padrão; passe um `alt` só se a imagem acrescentar informação.
- O card em si não é interativo nem focável; hover e foco ficam nos controles internos. A `action` vem logo após o título no DOM, para o foco seguir a ordem de leitura.
- Do consumidor: o nome acessível da `action` identifica o card ("Mais opções de Projeto Alpha", não só "Mais opções"). Em coleções, use `role="list"` no pai e `role="listitem"` em cada card (ou `ul`/`li`), mantenha o card como `div` e use `description` como texto principal, sem headings.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `as` | `div` \| `section` (`div`) | `section` para card isolado que é conteúdo relevante da página; `div` dentro de listas. |
| `heading` | nó | Rótulo principal do card. |
| `headingLevel` | `2`–`6` (`3`) | Nível do heading no esboço da página. |
| `description` | nó | Texto de apoio, em parágrafo. |
| `icon` | nó | Ícone decorativo no topo. |
| `image` | `{ src, alt? }` | Imagem no topo; decorativa sem `alt`. |
| `action` | nó | Um único controle no canto superior direito (ex.: `BLIconButton` de menu). |
| `metadata` | nó | Informação complementar no rodapé: data, autor, `BLBadge`. |
| `padding` | `md` \| `sm` \| `none` (`md`) | Espaço interno: padrão, compacto (listas densas) ou nenhum (conteúdo próprio que ocupa a borda). |
| `children` | nó | Conteúdo livre, entre a descrição e os metadados. |

Demais props: as do elemento HTML; `className` é repassado por último e pode sobrescrever estilos.

## Composição

- `action` com `BLIconButton` (`level="subtle"`, `size="sm"`) ou `BLDropdown`; `metadata` com `BLBadge` e texto curto.
- Vários cards: `BLStack` ou `BLGrid` no pai, que define o `gap`; o card não tem margem externa (ADR 0008).
- O card está na camada logo acima da página; conteúdo dentro dele usa a camada seguinte.

## Decisões

- Referência: Primer Card, adaptado. API por props (como `BLModal`) em vez de subcomponentes (`Card.Heading`, `Card.Description`…), para manter a ordem e a semântica dos slots fixas.
- Profundidade por camada, sem borda nem sombra, e cantos retos ([ADR 0006](../../../../docs/decisions/0006-foundations-carbon.md)); por isso `borderRadius` do Primer ficou de fora.
- `padding` usa os nomes de tamanho do DS (`md`/`sm`/`none`) em vez de `normal`/`condensed`; `md` segue o padding de container da densidade aberta ([ADR 0007](../../../../docs/decisions/0007-densidade-aberta.md)).
- Fora do escopo: `layout="compact"` do Primer. Card inteiro como link é o `BLAnchorCard`, que reusa os mesmos slots.

## Exemplo

```tsx
import { BLBadge, BLCard, BLIconButton } from '@bloco/ui';
import { DotsThreeIcon, FolderIcon } from '@phosphor-icons/react';

<BLCard
  icon={<FolderIcon />}
  heading="Project Alpha"
  description="Internal dashboard for the billing team."
  action={
    <BLIconButton level="subtle" size="sm" aria-label="More options for Project Alpha">
      <DotsThreeIcon />
    </BLIconButton>
  }
  metadata={<BLBadge status="success">Active</BLBadge>}
/>
```
