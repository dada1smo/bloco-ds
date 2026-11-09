import { BLButton, BLButtonGroup } from '@bloco/ui';
import type { Doc } from '../../types/doc';

export const buttonGroupDoc: Doc = {
  slug: 'button-group',
  title: 'ButtonGroup',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLButtonGroup
          className="w-96"
          items={[
            { cols: 2, element: <BLButton>Cancel</BLButton> },
            { cols: 2, element: <BLButton>Save</BLButton> },
            { cols: 1, element: <BLButton level="outline">1</BLButton> },
            { cols: 3, element: <BLButton level="subtle">3</BLButton> },
          ]}
        />
      ),
    },
  ],
};
