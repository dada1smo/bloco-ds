import { BLButton, BLCluster } from '@bloco/ui';
import type { Doc } from '../../types/doc';

export const clusterDoc: Doc = {
  slug: 'cluster',
  title: 'Cluster',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLCluster className="max-w-reading">
          {[
            'Rename',
            'Duplicate',
            'Archive',
            'Move',
            'Share',
            'Export',
            'Delete',
          ].map((label) => (
            <BLButton key={label} level="outline">
              {label}
            </BLButton>
          ))}
        </BLCluster>
      ),
    },
  ],
};
