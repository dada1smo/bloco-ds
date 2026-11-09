import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button/Button';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('renders every item and keeps them interactive', async () => {
    const onConfirm = vi.fn();
    render(
      <ButtonGroup
        role="group"
        aria-label="Actions"
        className="consumer"
        items={[
          { cols: 1, element: <Button>Cancel</Button> },
          { cols: 1, element: <Button onPress={onConfirm}>Confirm</Button> },
        ]}
      />,
    );
    const group = screen.getByRole('group', { name: 'Actions' });
    expect(group).toHaveClass('consumer');
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });
});
