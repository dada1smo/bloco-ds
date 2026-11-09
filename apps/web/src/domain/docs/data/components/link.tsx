import { BLLink, BLTypography } from '@bloco/ui';
import type { Doc } from '../../types/doc';
import context from '../../../../../../../packages/ui/src/link/Link.context.md?raw';

export const linkDoc: Doc = {
  slug: 'link',
  title: 'Link',
  layer: 'components',
  context,
  examples: [
    {
      title: 'Inline',
      render: () => (
        <BLTypography as="p">
          Read the <BLLink href="#">getting started guide</BLLink> before installing.
        </BLTypography>
      ),
    },
    {
      title: 'Disabled',
      render: () => <BLLink isDisabled>Unavailable</BLLink>,
    },
  ],
};
