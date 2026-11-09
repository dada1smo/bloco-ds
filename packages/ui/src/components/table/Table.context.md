# BLTable

Tabela estática: apresenta conteúdo tabular só para leitura, em linhas e colunas, com o `<table>` nativo.

## Quando usar

- Referência e documentação: tabela de props, tokens, atalhos, comparativos.
- Conteúdo vindo de markdown ou de outra fonte que já chega como linhas e células.
- Qualquer tabela em que o usuário só lê; não ordena, não seleciona e não age sobre linhas.

## Quando não usar

- Ordenar, selecionar linhas ou navegar célula a célula pelo teclado → `BLRichTable`.
- Itens com um único atributo → uma lista simples ou `BLStack`.
- Alinhar blocos de layout em colunas → `BLGrid`.

## Semântica e acessibilidade

- Elementos nativos: `BLTable` → `<table>` (role `table`), `BLTableHead` → `<thead>`, `BLTableBody` → `<tbody>`, `BLTableRow` → `<tr>`, `BLTableHeader` → `<th>`, `BLTableCell` → `<td>`.
- Não é interativa: não entra na ordem de Tab; leitores de tela navegam com os comandos de tabela deles.
- Do consumidor: `aria-label` ou `<caption>` quando não há título visível; `BLTableHeader` com `scope="row"` na célula que nomeia a linha.

## API

Composição por partes, uma para cada elemento nativo; cada parte aceita os atributos do elemento correspondente e `className`.

| Parte | Significado |
|---|---|
| `BLTable` | Raiz. `className` vai para o contêiner que rola na horizontal; demais props vão para o `<table>`. |
| `BLTableHead` / `BLTableBody` | Grupo de cabeçalho e grupo de dados. |
| `BLTableRow` | Uma linha. |
| `BLTableHeader` | Célula de cabeçalho: de coluna dentro de `BLTableHead`, de linha com `scope="row"`. |
| `BLTableCell` | Célula de dado. |

## Composição

- Células aceitam qualquer nó (`BLBadge`, código, links).
- A tabela rola na horizontal dentro do próprio contêiner quando não cabe; a largura vem do pai.
- Mapeia um para um com o markdown GFM (`table`, `thead`, `tbody`, `tr`, `th`, `td`).

## Decisões

- Separada de `BLRichTable` porque tabela de leitura não deve ser um `grid` interativo: vira parada de teclado e muda o que o leitor de tela anuncia.
- API por composição, e não por dados, para receber conteúdo que já chega como elementos (markdown) e manter o HTML nativo.
- É a base visual das tabelas do DS: `BLRichTable` reaproveita estes estilos e só soma os estados interativos.
- Sem tamanhos por enquanto: usa a altura de linha padrão (a maior), pensada para leitura.

## Exemplo

```tsx
import { BLTable, BLTableBody, BLTableCell, BLTableHead, BLTableHeader, BLTableRow } from '@bloco/ui';

<BLTable aria-label="Team members">
  <BLTableHead>
    <BLTableRow>
      <BLTableHeader>Name</BLTableHeader>
      <BLTableHeader>Role</BLTableHeader>
    </BLTableRow>
  </BLTableHead>
  <BLTableBody>
    <BLTableRow>
      <BLTableHeader scope="row">Ana Souza</BLTableHeader>
      <BLTableCell>Designer</BLTableCell>
    </BLTableRow>
  </BLTableBody>
</BLTable>
```
