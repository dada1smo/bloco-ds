import { BLTypography } from '@bloco/ui';
import type { Doc } from '../../types/doc';

const typeSet = [
  'heading-07',
  'heading-06',
  'heading-05',
  'heading-04',
  'heading-03',
  'heading-02',
  'heading-01',
  'heading-compact-02',
  'heading-compact-01',
  'body-02',
  'body-01',
  'body-compact-02',
  'body-compact-01',
  'label-02',
  'label-01',
  'helper-text-01',
  'code-02',
  'code-01',
] as const;

export const typographyDoc: Doc = {
  slug: 'typography',
  title: 'Typography',
  layer: 'components',
  examples: [
    {
      title: 'Variants',
      render: () =>
        typeSet.map((variant) => (
          <BLTypography
            key={variant}
            variant={variant}
            font={variant.startsWith('code') ? 'mono' : 'sans'}
          >
            {variant}
          </BLTypography>
        )),
    },
    {
      title: 'Fonts',
      render: () => (
        <>
          <BLTypography font="sans">sans</BLTypography>
          <BLTypography font="mono">mono</BLTypography>
        </>
      ),
    },
  ],
};
