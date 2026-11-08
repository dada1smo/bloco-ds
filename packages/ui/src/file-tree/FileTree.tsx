import { CaretRightIcon, FileIcon, FolderIcon } from '@phosphor-icons/react';
import {
  Button,
  Tree,
  TreeItem,
  TreeItemContent,
  type Key,
  type TreeProps,
} from 'react-aria-components';
import {
  fileTreeChevronButtonStyles,
  fileTreeIconStyles,
  fileTreeItemStyles,
  fileTreeStyles,
} from './FileTree.styles';

export type FileTreeItem =
  | { type: 'folder'; label: string; open?: boolean; items: FileTreeItem[] }
  | { type: 'file'; id?: string; label: string; muted?: boolean };

export type FileTreeProps = Omit<
  TreeProps<FileTreeItem>,
  'children' | 'items' | 'className' | 'onSelect'
> & {
  items: FileTreeItem[];
  className?: string;
  /** Id of the selected file (files with `id`). */
  selectedId?: string;
  /** Makes files with an `id` activatable (click, Enter). */
  onSelect?: (id: string) => void;
};

// Folder keys are their label path, so they never collide with file ids.
const folderKey = (path: string) => `folder:${path}`;

function openFolders(list: FileTreeItem[], parent = ''): Key[] {
  return list.flatMap((item) => {
    if (item.type !== 'folder') return [];
    const path = `${parent}/${item.label}`;
    return [...(item.open ? [folderKey(path)] : []), ...openFolders(item.items, path)];
  });
}

/** RAC `Tree`: arrow keys move and expand/collapse; pressing a folder row toggles it. */
export function FileTree({
  items,
  selectedId,
  onSelect,
  className,
  defaultExpandedKeys,
  'aria-label': ariaLabel = 'Files',
  ...props
}: FileTreeProps) {
  const render = (list: FileTreeItem[], parent = '') =>
    list.map((item, i) => {
      if (item.type === 'folder') {
        const path = `${parent}/${item.label}`;
        return (
          <TreeItem
            key={path}
            id={folderKey(path)}
            textValue={item.label}
            className={fileTreeItemStyles()}
          >
            <TreeItemContent>
              <Button slot="chevron" className={fileTreeChevronButtonStyles()}>
                <CaretRightIcon className={fileTreeIconStyles({ kind: 'chevron' })} aria-hidden />
              </Button>
              <FolderIcon weight="duotone" className={fileTreeIconStyles({ kind: 'folder' })} aria-hidden />
              {item.label}
            </TreeItemContent>
            {render(item.items, path)}
          </TreeItem>
        );
      }
      const { id, muted } = item;
      const interactive = !!onSelect && id !== undefined;
      return (
        <TreeItem
          key={id ?? `${parent}/${i}`}
          id={id ?? `${parent}/${i}`}
          textValue={item.label}
          onAction={interactive ? () => onSelect(id) : undefined}
          className={fileTreeItemStyles({ muted, interactive, selected: interactive && id === selectedId })}
        >
          <TreeItemContent>
            {!muted && <FileIcon className={fileTreeIconStyles({ kind: 'file' })} aria-hidden />}
            {item.label}
          </TreeItemContent>
        </TreeItem>
      );
    });

  return (
    <Tree
      {...props}
      aria-label={ariaLabel}
      defaultExpandedKeys={defaultExpandedKeys ?? openFolders(items)}
      className={fileTreeStyles({ className })}
    >
      {render(items)}
    </Tree>
  );
}
