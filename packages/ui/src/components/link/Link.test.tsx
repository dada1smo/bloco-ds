import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
  it('renders a link with href', () => {
    render(<Link href="/docs">Docs</Link>);
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
  });

  it('is focusable, pressable by keyboard and forwards className', async () => {
    const onPress = vi.fn();
    render(<Link onPress={onPress} className="custom">Docs</Link>);
    await userEvent.tab();
    const link = screen.getByRole('link', { name: 'Docs' });
    expect(link).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(onPress).toHaveBeenCalledOnce();
    expect(link).toHaveClass('custom');
  });

  it('does not fire when disabled', async () => {
    const onPress = vi.fn();
    render(<Link isDisabled onPress={onPress}>Docs</Link>);
    await userEvent.click(screen.getByText('Docs'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
