import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Button } from '../button/Button';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('shows on keyboard focus, describes the trigger and hides on blur', async () => {
    render(
      <Tooltip content="Save changes" delay={0} className="custom">
        <Button>Save</Button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await userEvent.tab();
    const tip = await screen.findByRole('tooltip');
    expect(tip).toHaveTextContent('Save changes');
    expect(tip).toHaveClass('custom');
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAccessibleDescription('Save changes');
    await userEvent.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    render(
      <Tooltip content="Hint" delay={0} isDisabled>
        <Button>Save</Button>
      </Tooltip>,
    );
    await userEvent.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
