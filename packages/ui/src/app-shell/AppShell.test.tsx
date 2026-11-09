import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppShell, useAppShell } from './AppShell';

function Toggle({ side }: { side: 'left' | 'right' }) {
  const { toggleSidebar, state, isMobile } = useAppShell(side);
  return (
    <button type="button" onClick={toggleSidebar}>
      {`${side} ${state}${isMobile ? ' mobile' : ''}`}
    </button>
  );
}

const nav = <nav aria-label="Main">Menu</nav>;
const details = <aside aria-label="Details">Info</aside>;

describe('AppShell', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('renders only the areas it receives and forwards attributes and className', () => {
    render(
      <AppShell data-testid="shell" className="consumer">
        <p>Content</p>
      </AppShell>,
    );
    expect(screen.getByRole('main')).toHaveTextContent('Content');
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    expect(screen.getByTestId('shell')).toHaveClass('consumer');
  });

  it('renders header and both sidebars around the content', () => {
    render(
      <AppShell header="Brand" sidebarLeft={nav} sidebarRight={details}>
        Content
      </AppShell>,
    );
    expect(screen.getByRole('banner')).toHaveTextContent('Brand');
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Details' })).toBeInTheDocument();
  });

  it('hides an offcanvas sidebar when toggled, without touching the other side', async () => {
    render(
      <AppShell header={<><Toggle side="left" /><Toggle side="right" /></>} sidebarLeft={nav} sidebarRight={details}>
        Content
      </AppShell>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'left expanded' }));
    expect(screen.queryByRole('navigation', { name: 'Main' })).not.toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Details' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'right expanded' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'left collapsed' }));
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
  });

  it('keeps an icon sidebar reachable when collapsed and never collapses a "none" sidebar', async () => {
    render(
      <AppShell
        header={<><Toggle side="left" /><Toggle side="right" /></>}
        sidebarLeft={nav}
        leftCollapsible="icon"
        sidebarRight={details}
        rightCollapsible="none"
      >
        Content
      </AppShell>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'left expanded' }));
    expect(screen.getByRole('button', { name: 'left collapsed' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'right expanded' }));
    expect(screen.getByRole('button', { name: 'right expanded' })).toBeInTheDocument();
  });

  it('only reports the change when controlled', async () => {
    const onLeftOpenChange = vi.fn();
    render(
      <AppShell header={<Toggle side="left" />} sidebarLeft={nav} leftOpen onLeftOpenChange={onLeftOpenChange}>
        Content
      </AppShell>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'left expanded' }));
    expect(onLeftOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole('button', { name: 'left expanded' })).toBeInTheDocument();
  });

  it('collapses the secondary right sidebar into an overlay first, still controllable', async () => {
    // Between lg and xl: only the right side's query matches.
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query.includes('81.99'),
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    const onRightOpenChange = vi.fn();
    render(
      <AppShell
        header={<><Toggle side="left" /><Toggle side="right" /></>}
        sidebarLeft={nav}
        sidebarRight={details}
        onRightOpenChange={onRightOpenChange}
      >
        Content
      </AppShell>,
    );
    expect(screen.getByRole('button', { name: 'left expanded' })).toBeInTheDocument();
    expect(screen.queryByRole('complementary', { name: 'Details' })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'right collapsed mobile' }));
    expect(screen.getByRole('complementary', { name: 'Details' })).toBeInTheDocument();
    expect(onRightOpenChange).not.toHaveBeenCalled();
  });

  it('throws when the hook is used outside AppShell', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useAppShell('left'))).toThrow('inside AppShell');
  });
});
