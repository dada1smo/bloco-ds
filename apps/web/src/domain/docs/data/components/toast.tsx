import { BLButton, BLCluster, BLToast, blToastQueue } from '@bloco/ui';
import type { Doc } from '../../types/doc';
import { kinds } from '../shared';

export const toastDoc: Doc = {
  slug: 'toast',
  title: 'Toast',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <>
          <BLToast />
          <BLButton
            level="outline"
            onPress={() =>
              blToastQueue.add(
                {
                  title: 'Draft saved',
                  description: 'Your changes are stored.',
                },
                { timeout: 5000 },
              )
            }
          >
            Show toast
          </BLButton>
        </>
      ),
    },
    {
      title: 'Kinds',
      render: () => (
        <>
          <BLToast />
          <BLCluster gap="3">
            {kinds.map((kind) => (
              <BLButton
                key={kind}
                level="outline"
                onPress={() =>
                  blToastQueue.add(
                    {
                      title: `${kind[0].toUpperCase()}${kind.slice(1)} toast`,
                      kind,
                    },
                    { timeout: 5000 },
                  )
                }
              >
                {kind}
              </BLButton>
            ))}
          </BLCluster>
        </>
      ),
    },
  ],
};
