---
name: create-component-demo
description: Cria ou atualiza as demos de um componente do design system no catálogo (apps/web/src/demos.tsx) seguindo o conjunto padrão de demos e compondo com os componentes de layout do DS. Use ao pedir "criar demo", "página de demo", "adicionar ao catálogo", ou como passo da skill create-component.
---

# Criar as demos de um componente

O catálogo é `apps/web/src/demos.tsx`: `folder -> Demo[]`, com `Demo = { id, render }`. `App.tsx` monta a árvore lateral por esse mapa e roteia para `/components/<folder>/<id>`. Sem entrada ali o componente não aparece.

## Antes de escrever

1. Leia `{ComponentName}.tsx` (props e variants) e o `{ComponentName}.context.md`, se já existir, para saber quais eixos e estados existem.
2. Leia `demos.tsx`: a chave da pasta é o kebab do componente (`'button-group'`), a posição segue a ordem de `packages/ui/src/index.ts`, e o import vem de `@bloco/ui` com o nome `BL…`.

## Conjunto padrão de demos

Uma demo por **pergunta que o leitor faz**, não por prop. `id` sempre `<nome>.tsx` em minúsculas.

| `id` | Quando criar | Conteúdo |
|---|---|---|
| `default.tsx` | **Sempre**, e é a primeira | O uso típico, com as props mínimas e dados realistas (não "foo/bar"). |
| `<eixo>.tsx` (`levels`, `sizes`, `variants`…) | Um arquivo por variant que muda o papel ou o visual | Todos os valores do eixo lado a lado, cada um rotulado com o seu valor. Se há dois eixos (`level` × `color`), uma linha por valor do segundo eixo. |
| `states.tsx` | Componente com estado visível (disabled, invalid, selected, loading…) | Um exemplo por estado, rotulado. Form field: helper, required, error, success, disabled (ADR 0010). |
| `<recurso>.tsx` (`rich`, `multiple`, `controlled`…) | Capacidade que muda a forma de usar (ícone, descrição, seleção múltipla, controlado) | Só um recurso por arquivo. |
| `composition.tsx` | Componente feito para ser combinado (campos num formulário, ações num modal, botões num grupo) | Um caso real com os componentes vizinhos do DS. |

Regras do conjunto:

- Só crie o que o componente tem: sem eixo de variant não há demo de eixo; sem estados, não há `states.tsx`.
- Não repita o `default.tsx` dentro de outra demo.
- Nada de props que não existem na API pública; a demo é também documentação.
- Cada demo isolada cabe numa tela e não depende de outra.

## Layout das demos

Componha **sempre** com os componentes de layout do DS (ADR 0008), nunca `div` com `flex`/`grid`/`gap-*` à mão:

- Itens em linha que quebram (botões, campos lado a lado, estados) → `BLCluster` (`gap` pelo papel).
- Itens empilhados (rótulo + exemplo, linhas de um eixo) → `BLStack`.
- Colunas ou grade → `BLGrid`; conteúdo + lateral → `BLSidebar`.
- O pai é dono do espaço: a demo define o `gap` no layout e não coloca margem no componente.
- `className` só para largura/contêiner do exemplo (`w-96`, `max-w-reading`, `w-sidebar`) e só com os passos da escala; nunca cor, hex ou `rounded-*`.
- Rótulo de valor (`gap-6`, `sm`, `error`…) com `BLTypography` (`code-01`, `font="mono"`), como em `stack`.
- Várias linhas de um eixo: um `BLStack` externo, um `BLCluster` por linha. Não devolva arrays soltos de `render` quando precisa de espaço entre os itens.

## Dados

- Constantes compartilhadas por mais de uma demo ficam no topo de `demos.tsx` (como `levels`, `sizes`).
- Dados de uma única demo ficam dentro dela.
- Textos em inglês, curtos e realistas (`Country`, `Brazil`), como nas demos existentes.

## Exemplo

```tsx
input: [
  { id: 'default.tsx', render: () => <BLInput label="Email" type="email" placeholder="you@example.com" /> },
  {
    id: 'states.tsx',
    render: () => (
      <BLCluster gap="6" className="items-start">
        <BLInput label="Helper" helperText="Your full name" />
        <BLInput label="Required" isRequired />
        <BLInput label="Error" isInvalid errorMessage="Invalid value" />
        <BLInput label="Success" defaultValue="Jane" successMessage="Looks good" />
        <BLInput label="Disabled" isDisabled placeholder="Not available" />
      </BLCluster>
    ),
  },
],
```

## Verificação

- `pnpm --filter @bloco/web exec tsc --noEmit` sem erro.
- `pnpm dev` e abra cada `/components/<folder>/<id>`: carrega sem erro no console, e o foco e o teclado funcionam nos exemplos interativos.
- Confira que o `{ComponentName}.context.md` cita os mesmos recursos que as demos mostram.
