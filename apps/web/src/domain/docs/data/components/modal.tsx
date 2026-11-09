import { BLButton, BLModal } from '@bloco/ui';
import type { Doc } from '../../types/doc';

export const modalDoc: Doc = {
  slug: 'modal',
  title: 'Modal',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLModal
          trigger={<BLButton level="outline">Discard changes</BLButton>}
          title="Discard unsaved changes?"
          description="Your edits to this draft will be lost. This can't be undone."
          actions={[
            {
              cols: 2,
              element: (
                <BLButton level="outline" slot="close" autoFocus>
                  Keep editing
                </BLButton>
              ),
            },
            { cols: 2, element: <BLButton slot="close">Discard</BLButton> },
          ]}
        />
      ),
    },
  ],
};
