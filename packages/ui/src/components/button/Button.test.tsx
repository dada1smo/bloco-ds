import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('calls onPress on click and keyboard', async () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    await userEvent.tab();
    expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await userEvent.click(button);
    expect(onPress).toHaveBeenCalledTimes(2);
  });

  it('blocks interaction when disabled', async () => {
    const onPress = vi.fn();
    render(<Button isDisabled onPress={onPress}>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    await userEvent.click(button);
    expect(button).toBeDisabled();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders a link with href when as="a"', () => {
    render(<Button as="a" href="/docs">Docs</Button>);
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
  });

  it('passes the consumer className to the root', () => {
    render(
      <>
        <Button className="consumer-btn">A</Button>
        <Button as="a" href="/x" className="consumer-link">B</Button>
      </>,
    );
    expect(screen.getByRole('button')).toHaveClass('consumer-btn');
    expect(screen.getByRole('link')).toHaveClass('consumer-link');
  });
});
