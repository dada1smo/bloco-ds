import { FileDashedIcon, FolderIcon } from '@phosphor-icons/react';
import { BLNavigationTree, BLNavigationTreeItem } from '@bloco/ui';
import type { Doc } from '../../types/doc';

export const navigationTreeDoc: Doc = {
  slug: 'navigation-tree',
  title: 'NavigationTree',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLNavigationTree aria-label="Components" className="w-sidebar">
          <BLNavigationTreeItem title="Inputs" id="inputs">
            <BLNavigationTreeItem
              title="Button"
              href="/components/button"
            />
            <BLNavigationTreeItem
              title="Checkbox"
              href="/components/checkbox"
            />
          </BLNavigationTreeItem>
          <BLNavigationTreeItem title="Layout" id="layout">
            <BLNavigationTreeItem
              title="Grid"
              href="/components/grid"
            />
          </BLNavigationTreeItem>
          <BLNavigationTreeItem
            title="Table"
            href="/components/table"
          />
        </BLNavigationTree>
      ),
    },
    {
      title: 'Current',
      render: () => (
        <BLNavigationTree
          aria-label="Components"
          className="w-sidebar"
          selectedRoute="/components/button"
          defaultExpandedKeys={['inputs']}
        >
          <BLNavigationTreeItem title="Inputs" id="inputs">
            <BLNavigationTreeItem
              title="Button"
              href="/components/button"
            />
            <BLNavigationTreeItem
              title="Checkbox"
              href="/components/checkbox"
            />
          </BLNavigationTreeItem>
          <BLNavigationTreeItem
            title="Table"
            href="/components/table"
          />
        </BLNavigationTree>
      ),
    },
    {
      title: 'Icons',
      render: () => (
        <BLNavigationTree
          aria-label="Components"
          className="w-sidebar"
          defaultExpandedKeys={['inputs']}
        >
          <BLNavigationTreeItem
            title="Inputs"
            id="inputs"
            icon={<FolderIcon />}
          >
            <BLNavigationTreeItem
              title="Button"
              href="/components/button"
              icon={<FileDashedIcon />}
            />
          </BLNavigationTreeItem>
        </BLNavigationTree>
      ),
    },
  ],
};
