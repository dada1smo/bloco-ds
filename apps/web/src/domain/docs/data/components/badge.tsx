import { BLBadge, BLCluster } from '@bloco/ui';
import type { Doc } from '../../types/doc';
import { kinds } from '../shared';

const badgeStatuses = ['neutral', ...kinds] as const;

export const badgeDoc: Doc = {
  slug: 'badge',
  title: 'Badge',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => <BLBadge>Draft</BLBadge>,
    },
    {
      title: 'Statuses',
      render: () => (
        <BLCluster gap="3">
          {badgeStatuses.map((status) => (
            <BLBadge key={status} status={status}>
              {status}
            </BLBadge>
          ))}
        </BLCluster>
      ),
    },
  ],
};
