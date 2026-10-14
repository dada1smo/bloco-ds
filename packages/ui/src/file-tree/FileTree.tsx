import type { HTMLAttributes } from 'react';
import { CaretRightIcon, FileIcon, FolderIcon } from '@phosphor-icons/react';
import {
  fileTreeFileStyles,
  fileTreeFolderStyles,
  fileTreeGroupStyles,
  fileTreeIconStyles,
  fileTreeStyles,
  fileTreeSummaryStyles,
} from './FileTree.styles';

export type FileTreeItem =
  | { type: 'folder'; label: string; open?: boolean; items: FileTreeItem[] }
  | { type: 'file'; id?: string; label: string; muted?: boolean };

// Disclosure widget, not an ARIA tree: Tab/Enter/Space only, no arrow-key navigation.
export type FileTreeProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'> & {
  items: FileTreeItem[];
  /** Id of the selected file (files with `id`). */
  selectedId?: string;
  /** Makes files with an `id` clickable/keyboard-activatable. */
  onSelect?: (id: string) => void;
};

export function FileTree({
  items,
  selectedId,
  onSelect,
  className,
  ...props
}: FileTreeProps) {
  const render = (list: FileTreeItem[]) =>
    list.map((item, i) => {
      if (item.type === 'folder') {
        return (
          <details key={i} open={item.open} className={fileTreeFolderStyles()}>
            <summary className={fileTreeSummaryStyles()}>
              <CaretRightIcon className={fileTreeIconStyles({ kind: 'chevron' })} aria-hidden />
              <FolderIcon weight="duotone" className={fileTreeIconStyles({ kind: 'folder' })} aria-hidden />
              {item.label}
            </summary>
            <div className={fileTreeGroupStyles()}>{render(item.items)}</div>
          </details>
        );
      }
      const { id, muted } = item;
      const interactive = !!onSelect && id !== undefined;
      const selected = interactive && id === selectedId;
      const select = () => interactive && onSelect(id);
      return (
        <div
          key={i}
          className={fileTreeFileStyles({ muted, interactive, selected })}
          {...(interactive && {
            role: 'button',
            tabIndex: 0,
            'aria-current': selected,
            onClick: select,
            onKeyDown: (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                select();
              }
            },
          })}
        >
          {!muted && (
            <FileIcon className={fileTreeIconStyles({ kind: 'file' })} aria-hidden />
          )}
          {item.label}
        </div>
      );
    });

  return (
    <div {...props} className={fileTreeStyles({ className })}>
      {render(items)}
    </div>
  );
}
