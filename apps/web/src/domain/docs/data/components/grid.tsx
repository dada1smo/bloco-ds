import { BLGrid } from '@bloco/ui';
import type { Doc } from '../../types/doc';
import { Cell } from '../shared';

// Linhas de composição do grid de 16 colunas (lg+); abaixo de lg cada célula ocupa a linha toda.
const gridRows = [
  ['lg:col-span-8', 'lg:col-span-8'],
  ['lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'],
  ['lg:col-span-12', 'lg:col-span-4'],
];

export const gridDoc: Doc = {
  slug: 'grid',
  title: 'Grid',
  layer: 'components',
  examples: [
    {
      title: 'Columns',
      render: () => (
        <BLGrid className="bg-layer-02">
          {Array.from({ length: 16 }, (_, i) => (
            <Cell key={i}>{i + 1}</Cell>
          ))}
          {gridRows.flat().map((cls, i) => (
            <Cell key={i} className={`col-span-full ${cls}`}>
              {cls}
            </Cell>
          ))}
        </BLGrid>
      ),
    },
    {
      title: 'Responsive',
      render: () => (
        <BLGrid className="bg-layer-02">
          {Array.from({ length: 4 }, (_, i) => (
            <Cell key={i} className="col-span-4 h-control-xl">
              card {i + 1}
            </Cell>
          ))}
        </BLGrid>
      ),
    },
  ],
};
