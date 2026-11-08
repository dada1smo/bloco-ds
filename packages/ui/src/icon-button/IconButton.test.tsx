import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('is named by aria-label and calls onPress', async () => {
    const onPress = vi.fn();
    render(
      <IconButton aria-label="Close" onPress={onPress} className="consumer">
        <svg aria-hidden />
      </IconButton>,
    );
    const button = screen.getByRole('button', { name: 'Close' });
    await userEvent.click(button);
    expect(onPress).toHaveBeenCalledOnce();
    expect(button).toHaveClass('consumer');
  });
});
