import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FileTree, type FileTreeItem } from './FileTree';

const items: FileTreeItem[] = [
  {
    type: 'folder',
    label: 'src',
    open: true,
    items: [
      { type: 'file', id: 'app', label: 'App.tsx' },
      { type: 'folder', label: 'lib', items: [{ type: 'file', id: 'util', label: 'util.ts' }] },
    ],
  },
  { type: 'file', label: 'README.md', muted: true },
];

describe('FileTree', () => {
  it('renders a labelled tree with folders open as declared', () => {
    render(<FileTree items={items} className="consumer" />);
    const tree = screen.getByRole('treegrid', { name: 'Files' });
    expect(tree).toHaveClass('consumer');
    expect(screen.getByRole('row', { name: 'src' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('row', { name: 'lib' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('row', { name: 'util.ts' })).not.toBeInTheDocument();
  });

  it('toggles a folder on press', async () => {
    render(<FileTree items={items} />);
    await userEvent.click(screen.getByRole('row', { name: 'lib' }));
    expect(screen.getByRole('row', { name: 'lib' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('row', { name: 'util.ts' })).toBeInTheDocument();
  });

  it('calls onSelect for files with id, by click and keyboard', async () => {
    const onSelect = vi.fn();
    render(<FileTree items={items} onSelect={onSelect} selectedId="app" aria-label="Project" />);
    expect(screen.getByRole('treegrid', { name: 'Project' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('row', { name: 'App.tsx' }));
    expect(onSelect).toHaveBeenCalledWith('app');
    await userEvent.keyboard('{ArrowDown}{ArrowRight}{ArrowDown}{Enter}');
    expect(onSelect).toHaveBeenLastCalledWith('util');
  });
});
