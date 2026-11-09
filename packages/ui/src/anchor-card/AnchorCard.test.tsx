import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AnchorCard } from './AnchorCard';

describe('AnchorCard', () => {
  it('renders one link named by its heading and described by its description', () => {
    render(
      <AnchorCard
        href="/projects/alpha"
        heading="Project Alpha"
        description="Billing dashboard"
        metadata="Updated today"
      />,
    );
    const link = screen.getByRole('link', { name: 'Project Alpha' });
    expect(link).toHaveAttribute('href', '/projects/alpha');
    expect(link).toHaveAccessibleDescription('Billing dashboard');
    expect(screen.getByRole('heading', { level: 3, name: 'Project Alpha' })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('prefers an explicit aria-label', () => {
    render(<AnchorCard href="/a" aria-label="Open Project Alpha" heading="Project Alpha" />);
    expect(screen.getByRole('link', { name: 'Open Project Alpha' })).toBeInTheDocument();
  });

  it('is focusable and pressable by keyboard, and forwards className', async () => {
    const onPress = vi.fn();
    render(<AnchorCard onPress={onPress} heading="Project Alpha" className="custom" />);
    await userEvent.tab();
    const link = screen.getByRole('link', { name: 'Project Alpha' });
    expect(link).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(onPress).toHaveBeenCalledOnce();
    expect(link).toHaveClass('custom');
  });

  it('accepts className as a render function', () => {
    render(<AnchorCard href="/a" heading="Alpha" className={() => 'from-fn'} />);
    expect(screen.getByRole('link')).toHaveClass('from-fn');
  });
});
