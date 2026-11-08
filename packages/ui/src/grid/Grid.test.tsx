import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders its children and forwards attributes and className', () => {
    render(
      <Grid role="region" aria-label="Dashboard" className="consumer">
        <p>Cell</p>
      </Grid>,
    );
    const grid = screen.getByRole('region', { name: 'Dashboard' });
    expect(grid).toContainElement(screen.getByText('Cell'));
    expect(grid).toHaveClass('consumer');
  });
});
