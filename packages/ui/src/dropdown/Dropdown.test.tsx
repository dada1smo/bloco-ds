import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button/Button';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  it('opens the menu, runs the item action and closes', async () => {
    const onEdit = vi.fn();
    render(
      <Dropdown
        trigger={<Button>Actions</Button>}
        className="consumer"
        groups={[[{ label: 'Edit', onAction: onEdit }], [{ label: 'Delete', isDisabled: true }]]}
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByRole('menu', { name: 'Actions' });
    expect(menu.closest('.consumer')).not.toBeNull();
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('navigates with the keyboard', async () => {
    const onDelete = vi.fn();
    render(
      <Dropdown
        trigger={<Button>Actions</Button>}
        groups={[[{ label: 'Edit' }, { label: 'Delete', onAction: onDelete }]]}
      />,
    );
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}{Enter}');
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it('throws when the trigger is not a Button', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(<Dropdown trigger={<button>Actions</button>} groups={[]} />),
    ).toThrow(/must be a single <BLButton>/);
  });
});
