import { HeaderExample } from '../../../../../../../packages/ui/src/patterns/header/Header.example';
import code from '../../../../../../../packages/ui/src/patterns/header/Header.example.tsx?raw';
import type { Doc } from '../../types/doc';

export const headerDoc: Doc = {
  slug: 'header',
  title: 'Header',
  layer: 'patterns',
  examples: [
    {
      title: 'Default',
      render: () => <HeaderExample />,
      code,
    },
  ],
};
