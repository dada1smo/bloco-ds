import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';

function Team({ className }: { className?: string }) {
  return (
    <Table aria-label="Team" className={className}>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Role</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableHeader scope="row">Ana</TableHeader>
          <TableCell>Designer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe('Table', () => {
  it('renders a static native table', () => {
    render(<Team />);
    const table = screen.getByRole('table', { name: 'Team' });
    expect(within(table).getAllByRole('columnheader').map((c) => c.textContent)).toEqual(['Name', 'Role']);
    expect(within(table).getByRole('rowheader', { name: 'Ana' })).toBeInTheDocument();
    expect(within(table).getByRole('cell', { name: 'Designer' })).toBeInTheDocument();
  });

  it('is not a keyboard stop', () => {
    render(<Team />);
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    expect(screen.getByRole('table')).not.toHaveAttribute('tabindex');
  });

  it('passes className to the root', () => {
    render(<Team className="consumer" />);
    expect(screen.getByRole('table').parentElement).toHaveClass('consumer');
  });
});
