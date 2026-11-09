import { PlusIcon } from '@phosphor-icons/react';
import { BLButton, BLCluster, BLIconButton, BLTooltip } from '@bloco/ui';
import type { Doc } from '../../types/doc';

export const tooltipDoc: Doc = {
  slug: 'tooltip',
  title: 'Tooltip',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLTooltip content="Add a new member">
          <BLIconButton aria-label="Add member" level="outline">
            <PlusIcon />
          </BLIconButton>
        </BLTooltip>
      ),
    },
    {
      title: 'Placements',
      render: () => (
        <BLCluster gap="3">
          {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
            <BLTooltip
              key={placement}
              content={`Tooltip ${placement}`}
              placement={placement}
            >
              <BLButton level="outline">{placement}</BLButton>
            </BLTooltip>
          ))}
        </BLCluster>
      ),
    },
  ],
};
