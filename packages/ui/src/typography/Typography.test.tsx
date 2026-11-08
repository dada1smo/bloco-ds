import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders a paragraph by default', () => {
    render(<Typography>Body</Typography>);
    expect(screen.getByText('Body').tagName).toBe('P');
  });

  it('renders the element given in `as` and forwards attributes', () => {
    render(
      <Typography as="h2" id="title" className="consumer">
        Title
      </Typography>,
    );
    const heading = screen.getByRole('heading', { level: 2, name: 'Title' });
    expect(heading).toHaveAttribute('id', 'title');
    expect(heading).toHaveClass('consumer');
  });
});
