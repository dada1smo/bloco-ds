import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Cluster } from './Cluster';

describe('Cluster', () => {
  it('renders interactive children and forwards attributes and className', async () => {
    const onClick = vi.fn();
    render(
      <Cluster role="toolbar" aria-label="Actions" className="consumer">
        <button onClick={onClick}>Save</button>
        <button>Cancel</button>
      </Cluster>,
    );
    const toolbar = screen.getByRole('toolbar', { name: 'Actions' });
    expect(toolbar).toHaveClass('consumer');
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
