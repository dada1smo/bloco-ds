import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders its children in order and forwards attributes and className', () => {
    render(
      <Stack role="group" aria-label="Fields" gap="2" className="consumer">
        <p>First</p>
        <p>Second</p>
      </Stack>,
    );
    const stack = screen.getByRole('group', { name: 'Fields' });
    expect(stack.textContent).toBe('FirstSecond');
    expect(stack).toHaveClass('consumer');
  });
});
