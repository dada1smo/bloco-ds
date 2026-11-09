import { describe, expect, it } from 'vitest';
import type { Doc } from '../types/doc';
import { getOutline } from './get-outline';
import { toId } from './get-sections';

const context = `# BLX

Intro.

## Quando usar

Sim.

## Quando não usar

Não.

## Semântica e acessibilidade

A11y.
`;

const doc: Doc = { slug: 'x', title: 'X', layer: 'components', context, examples: [{ title: 'Default', render: () => null }] };

describe('getOutline', () => {
  it('groups usage sections and lists the page anchors in order', () => {
    const outline = getOutline({ ...doc, props: [] });
    expect(outline.usage.map((s) => s.title)).toEqual(['Quando usar', 'Quando não usar']);
    expect(outline.rest.map((s) => s.title)).toEqual(['Semântica e acessibilidade']);
    expect(outline.toc.map((i) => i.id)).toEqual(['exemplos', 'uso', 'semantica-e-acessibilidade', 'props']);
  });

  it('skips anchors without content', () => {
    expect(getOutline({ ...doc, context: undefined, examples: [] }).toc).toEqual([]);
  });
});

describe('toId', () => {
  it('strips accents and punctuation', () => {
    expect(toId(' Quando não usar ')).toBe('quando-nao-usar');
  });
});
