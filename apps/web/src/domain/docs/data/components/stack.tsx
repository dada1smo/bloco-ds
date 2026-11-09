import { BLCluster, BLStack, BLTypography } from '@bloco/ui';
import type { Doc } from '../../types/doc';
import { Cell } from '../shared';

export const stackDoc: Doc = {
  slug: 'stack',
  title: 'Stack',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLCluster gap="10" className="items-start">
          {(['1', '2', '3', '6', '10'] as const).map((gap) => (
            <BLStack key={gap} gap={gap} className="w-40">
              <BLTypography variant="code-01" font="mono">
                gap-{gap}
              </BLTypography>
              <Cell>a</Cell>
              <Cell>b</Cell>
              <Cell>c</Cell>
            </BLStack>
          ))}
        </BLCluster>
      ),
    },
  ],
};
