# BLTypography

Texto com um estilo do type set do sistema, separando o estilo visual (`variant`) do elemento semântico (`as`).

## Quando usar

- Qualquer texto que precisa de um nível do type set: títulos, corpo, rótulos, legendas, código.

## Quando não usar

- Texto dentro de componentes do DS (botões, campos, modal): eles já aplicam a tipografia certa.

## Semântica e acessibilidade

- `as` define o elemento (padrão `<p>`). Escolha pela estrutura do documento — `h1`–`h6` seguindo a hierarquia da página — e o `variant` pela aparência. Um `h2` pode usar `heading-05`.

## API

| Prop | Valores (default) | Significado |
|---|---|---|
| `as` | `h1`–`h6`, `p`, `span`, `strong`, `em`, `small`, `label`, `blockquote`, `code`, `div` (`p`) | Elemento HTML. |
| `variant` | `body-01` (padrão), `body-02`, `body-compact-01/02`, `heading-01`–`07`, `heading-compact-01/02`, `label-01/02`, `helper-text-01`, `code-01/02` | Papel tipográfico: `body` para leitura, `body-compact` em controles e listas, `heading` para títulos (maior número = mais destaque), `label` para rótulos, `helper-text` para textos de apoio, `code` para código. |
| `weight` | `light` \| `normal` \| `semibold` | Sobrescreve o peso do variant; use só quando o papel pede ênfase diferente. |
| `font` | `sans` \| `mono` (`sans`) | Família; `mono` para dados e código fora do variant `code`. |

Demais props: atributos HTML; `className` é repassado por último.

## Decisões

- Os variants seguem o type set do Carbon e já trazem tamanho, entrelinha e peso ([ADR 0006](../../../../docs/decisions/0006-foundations-carbon.md), [ADR 0007](../../../../docs/decisions/0007-densidade-aberta.md)).

## Exemplo

```tsx
import { BLTypography } from '@bloco/ui';

<BLTypography as="h2" variant="heading-05">Configurações</BLTypography>
<BLTypography variant="body-01">Ajuste as preferências da conta.</BLTypography>
```
