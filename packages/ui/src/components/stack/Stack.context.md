# BLStack

Empilha os filhos na vertical com espaçamento uniforme. É a primitiva padrão de fluxo de conteúdo.

## Quando usar

- Blocos de conteúdo um abaixo do outro: seções, campos de formulário, rótulo e campo.

## Quando não usar

- Itens em linha → `BLCluster`.
- Colunas de página → `BLGrid`.
- Navegação lateral + conteúdo → `BLSidebar`.

## Semântica e acessibilidade

- Elemento: `<div>` sem role; a ordem visual é a ordem do DOM. Passe `role`/`aria-label` se o grupo tiver significado.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `gap` | `'1'` \| `'2'` \| `'3'` \| `'4'` \| `'6'` \| `'8'` \| `'10'` \| `'12'` (`'6'`) | Passo de espaço entre filhos, escolhido pelo papel: `'1'` linhas de texto do mesmo item, `'2'` rótulo e campo, `'6'` entre blocos de conteúdo, `'10'` entre seções de página. |

Demais props: as de `<div>`; `className` é repassado por último.

## Composição

- O pai é dono do espaço: filhos não definem margem externa ([ADR 0008](../../../../../docs/decisions/0008-grid-e-layout.md)).
- Aninha livremente com `BLCluster` e dentro de células do `BLGrid`.

## Decisões

- `gap` só aceita passos da escala, ligados aos papéis da tabela de densidade (ADR 0007).

## Exemplo

```tsx
import { BLSelect, BLStack } from '@bloco/ui';

<BLStack gap="6">
  <BLSelect label="País" options={countries} />
  <BLSelect label="Idioma" options={languages} />
</BLStack>
```
