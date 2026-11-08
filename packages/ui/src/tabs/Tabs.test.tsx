import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tabs } from './Tabs';

const items = [
  { title: 'Overview', content: 'Overview content' },
  { title: 'Activity', content: 'Activity content' },
  { title: 'Settings', content: 'Settings content', isDisabled: true },
];

describe('Tabs', () => {
  it('shows the first panel and switches on click', async () => {
    render(<Tabs aria-label="Project" items={items} />);
    expect(screen.getByRole('tablist', { name: 'Project' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Overview content');
    await userEvent.click(screen.getByRole('tab', { name: 'Activity' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Activity content');
  });

  it('moves with arrow keys, skipping disabled tabs', async () => {
    render(<Tabs aria-label="Project" items={items} />);
    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('uses up/down arrows when vertical', async () => {
    render(<Tabs aria-label="Project" items={items} orientation="vertical" />);
    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveFocus();
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('is controllable and passes className to the root', async () => {
    const onSelectionChange = vi.fn();
    render(<Tabs aria-label="Project" items={items} selectedKey="1" onSelectionChange={onSelectionChange} className="consumer" />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Activity content');
    expect(screen.getByRole('tablist').parentElement).toHaveClass('consumer');
    await userEvent.click(screen.getByRole('tab', { name: 'Overview' }));
    expect(onSelectionChange).toHaveBeenCalledWith('0');
  });
});
