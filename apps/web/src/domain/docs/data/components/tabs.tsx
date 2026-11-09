import { BLTabs } from '@bloco/ui';
import type { Doc } from '../../types/doc';

const tabsItems = [
  { title: 'Overview', content: 'A summary of the project and its status.' },
  { title: 'Activity', content: 'Recent changes made by the team.' },
  { title: 'Settings', content: 'Name, visibility and members.' },
];

export const tabsDoc: Doc = {
  slug: 'tabs',
  title: 'Tabs',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLTabs className="w-96" aria-label="Project" items={tabsItems} />
      ),
    },
    {
      title: 'States',
      render: () => (
        <BLTabs
          className="w-fulld"
          aria-label="Project with a disabled tab"
          items={[
            ...tabsItems,
            { title: 'Billing', content: 'Not available.', isDisabled: true },
          ]}
        />
      ),
    },
    {
      title: 'Vertical',
      render: () => (
        <BLTabs
          className="max-w-prose"
          aria-label="Project"
          orientation="vertical"
          items={tabsItems}
        />
      ),
    },
    {
      title: 'Controlled',
      render: () => (
        <BLTabs
          className="w-96"
          aria-label="Project"
          defaultSelectedKey="1"
          items={tabsItems}
        />
      ),
    },
  ],
};
