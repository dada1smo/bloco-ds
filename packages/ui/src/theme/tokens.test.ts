import { describe, expect, it } from 'vitest';

// Vite resolve isto em tempo de build; o tipo vem daqui porque o pacote não depende de vite/client.
declare global {
  interface ImportMeta {
    glob(pattern: string, options: { query: '?raw'; import: 'default'; eager: true }): Record<string, string>;
  }
}

const files = import.meta.glob('../**/*.styles.ts', { query: '?raw', import: 'default', eager: true });

// Regras das foundations (ADR 0006): o que não pode aparecer num *.styles.ts.
const forbidden: [string, RegExp][] = [
  ['primitiva de cor do Tailwind', /\b(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d/],
  ['branco/preto direto', /\b(?:bg|text|border|outline|ring|fill|stroke)-(?:white|black)\b/],
  ['cor hex', /#[0-9a-f]{3,8}\b/i],
  ['opacidade em cor', /\b(?:bg|text|border|outline|ring|fill|stroke|divide)-[a-z][a-z0-9-]*\/\d+/],
  ['raio (cantos são retos)', /\brounded(?!-(?:full|none)\b)/],
  ['sombra fora de shadow-floating', /\bshadow(?!-floating\b)/],
  ['peso fora do type set', /\bfont-(?:thin|extralight|medium|bold|extrabold|black)\b/],
];

// Escala de espaçamento do Carbon em passos do Tailwind (spacing-01..13).
const spacingSteps = new Set(['0', '0.5', '1', '2', '3', '4', '6', '8', '10', '12', '16', '20', '24', '40']);
const spacing = /(?:^|[\s'":])-?(?:p[xytrblse]?|m[xytrblse]?|gap(?:-[xy])?|space-[xy])-(\d+(?:\.\d+)?|px)(?=[\s'"]|$)/gm;

function violations(source: string) {
  const found = forbidden.filter(([, re]) => re.test(source)).map(([rule]) => rule);
  for (const [, step] of source.matchAll(spacing)) {
    if (!spacingSteps.has(step)) found.push(`espaçamento fora da escala: ${step}`);
  }
  return found;
}

describe('foundations', () => {
  it('finds the style files', () => {
    expect(Object.keys(files).length).toBeGreaterThan(0);
  });

  it.each(Object.entries(files))('%s uses only semantic tokens and the system scales', (_, source) => {
    expect(violations(source)).toEqual([]);
  });

  it('flags violations', () => {
    expect(violations("'bg-slate-900 rounded-md shadow-lg font-bold gap-2.5 text-primary/70'")).toHaveLength(6);
    expect(violations("'bg-layer-01 rounded-full shadow-floating gap-2 -outline-offset-2 w-1/2'")).toEqual([]);
  });
});
