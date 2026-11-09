import type { ReactNode } from 'react';

export type DocLayer = 'foundations' | 'components' | 'patterns';

export type DocExample = { title: string; description?: string; render: () => ReactNode };

export type DocProp = { name: string; type: string; default?: string; description: string };

// Uma página do catálogo (ADR 0016). `context` é o X.context.md / pattern.md importado com `?raw`.
export type Doc = {
  slug: string;
  title: string;
  layer: DocLayer;
  context?: string;
  props?: DocProp[];
  examples: DocExample[];
};
