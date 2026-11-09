import { BLButton, BLDropdown, type BLDropdownItem } from '@bloco/ui';
import type { Doc } from '../../types/doc';

const dropdownGroups: BLDropdownItem[][] = [
  [
    { label: 'Rename', href: '#' },
    { label: 'Duplicate', href: '#' },
    { label: 'Archive', href: '#' },
  ],
  [{ label: 'Delete', href: '#' }],
];

export const dropdownDoc: Doc = {
  slug: 'dropdown',
  title: 'Dropdown',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLDropdown
          trigger={<BLButton level="outline">Share</BLButton>}
          groups={dropdownGroups}
        />
      ),
    },
  ],
};
