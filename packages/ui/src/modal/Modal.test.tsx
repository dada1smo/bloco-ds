import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button/Button';
import { Modal } from './Modal';

const props = { title: 'Delete file', description: 'This cannot be undone.' };

describe('Modal', () => {
  it('opens from the trigger and closes with the close button', async () => {
    render(<Modal {...props} trigger={<Button>Open</Button>} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog', { name: 'Delete file' });
    expect(dialog).toHaveAccessibleDescription('This cannot be undone.');
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes with Escape', async () => {
    render(<Modal {...props} trigger={<Button>Open</Button>} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('is controllable and closes from actions with slot="close"', async () => {
    const onOpenChange = vi.fn();
    const onConfirm = vi.fn();
    render(
      <Modal
        {...props}
        isOpen
        onOpenChange={onOpenChange}
        className="consumer"
        actions={[
          { cols: 1, element: <Button slot="close">Cancel</Button> },
          { cols: 1, element: <Button onPress={onConfirm}>Delete</Button> },
        ]}
      />,
    );
    expect(screen.getByRole('dialog').closest('.consumer')).not.toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalledOnce();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
