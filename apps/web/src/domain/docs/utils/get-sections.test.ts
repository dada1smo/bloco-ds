import { describe, expect, it } from 'vitest';
import { getSections } from './get-sections';

const md = `# BLButton

Dispara uma ação.

## Quando usar

- Ação na tela.

## API

| Prop | Valores |

## Decisões

Texto com ## no meio.

## Exemplo

\`\`\`tsx
<BLButton />
\`\`\`
`;

describe('getSections', () => {
  it('splits intro and sections, dropping the title, API and Exemplo', () => {
    expect(getSections(md)).toEqual({
      intro: 'Dispara uma ação.',
      sections: [
        { title: 'Quando usar', body: '- Ação na tela.' },
        { title: 'Decisões', body: 'Texto com ## no meio.' },
      ],
    });
  });

  it('handles a markdown without sections', () => {
    expect(getSections('# X\n\nSó intro.')).toEqual({ intro: 'Só intro.', sections: [] });
  });
});
