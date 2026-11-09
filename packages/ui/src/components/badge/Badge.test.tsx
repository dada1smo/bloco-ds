import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its content and forwards className and ARIA props', () => {
    render(
      <Badge status="success" className="custom" aria-label="Status: paid">
        Paid
      </Badge>,
    );
    const badge = screen.getByLabelText('Status: paid');
    expect(badge).toHaveTextContent('Paid');
    expect(badge).toHaveClass('custom');
  });
});
