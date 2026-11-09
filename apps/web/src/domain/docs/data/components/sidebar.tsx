import { BLSidebar } from '@bloco/ui';
import type { Doc } from '../../types/doc';
import { Cell } from '../shared';

export const sidebarDoc: Doc = {
  slug: 'sidebar',
  title: 'Sidebar',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLSidebar
          side={<Cell className="h-control-xl">side · w-sidebar</Cell>}
        >
          <Cell className="h-control-xl">content · flex-1</Cell>
        </BLSidebar>
      ),
    },
  ],
};
