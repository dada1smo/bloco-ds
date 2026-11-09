import { BLTypography } from '@bloco/ui';
import type { Doc } from '../../types/doc';

const containers = [
  ['prose', 'max-w-prose'],
  ['reading', 'max-w-reading'],
  ['page', 'max-w-page'],
];

export const layoutDoc: Doc = {
  slug: 'layout',
  title: 'Layout',
  layer: 'foundations',
  examples: [
    {
      title: 'Default',
      render: () => (
        <>
          <BLTypography variant="heading-02">container</BLTypography>
          {containers.map(([name, cls]) => (
            <div key={name} className={`h-control-sm bg-layer-01 px-4 ${cls}`}>
              <BLTypography variant="code-01" font="mono">
                {cls}
              </BLTypography>
            </div>
          ))}
        </>
      ),
    },
  ],
};
