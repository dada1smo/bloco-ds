import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { NavigationTree, NavigationTreeItem } from './NavigationTree';

function Tree(props: { selectedRoute?: string; className?: string; 'aria-label'?: string }) {
  return (
    <NavigationTree {...props}>
      <NavigationTreeItem title="src">
        <NavigationTreeItem title="App.tsx" href="/app" />
        <NavigationTreeItem title="lib">
          <NavigationTreeItem title="util.ts" href="/util" />
        </NavigationTreeItem>
      </NavigationTreeItem>
      <NavigationTreeItem title="README.md" href="/readme" />
    </NavigationTree>
  );
}

describe('NavigationTree', () => {
  it('renders a labelled tree with collapsed folders and className passthrough', () => {
    render(<Tree className="consumer" aria-label="Project" />);
    expect(screen.getByRole('treegrid', { name: 'Project' })).toHaveClass('consumer');
    expect(screen.getByRole('row', { name: 'src' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: 'App.tsx' })).not.toBeInTheDocument();
  });

  it('uses "Navigation" as the default name', () => {
    render(<Tree />);
    expect(screen.getByRole('treegrid', { name: 'Navigation' })).toBeInTheDocument();
  });

  it('toggles a folder by pressing it and by keyboard', async () => {
    render(<Tree />);
    await userEvent.click(screen.getByRole('link', { name: 'src' }));
    expect(screen.getByRole('row', { name: 'src' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'App.tsx' })).toHaveAttribute('href', '/app');
    await userEvent.click(screen.getByRole('link', { name: 'src' }));
    expect(screen.getByRole('row', { name: 'src' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('marks the link of selectedRoute as current page', () => {
    render(<Tree selectedRoute="/readme" />);
    expect(screen.getByRole('link', { name: 'README.md' })).toHaveAttribute('aria-current', 'page');
  });
});
