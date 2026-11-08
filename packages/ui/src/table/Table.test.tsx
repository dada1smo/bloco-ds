import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Table } from './Table';

const columns = [
  { id: 'name', title: 'Name', isRowHeader: true, allowsSorting: true },
  { id: 'role', title: 'Role' },
];
const rows = [
  { id: 'ana', name: 'Ana', role: 'Designer' },
  { id: 'bruno', name: 'Bruno', role: 'Engineer' },
];

describe('Table', () => {
  it('renders columns, rows and row headers', () => {
    render(<Table aria-label="Team" columns={columns} rows={rows} />);
    expect(screen.getByRole('grid', { name: 'Team' })).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader').map((c) => c.textContent)).toEqual(['Name', 'Role']);
    expect(screen.getByRole('rowheader', { name: 'Ana' })).toBeInTheDocument();
    expect(within(screen.getAllByRole('row')[2]).getByRole('gridcell')).toHaveTextContent('Engineer');
  });

  it('reports sort changes and shows the sort direction', async () => {
    const onSortChange = vi.fn();
    render(
      <Table
        aria-label="Team"
        columns={columns}
        rows={rows}
        sortDescriptor={{ column: 'name', direction: 'ascending' }}
        onSortChange={onSortChange}
      />,
    );
    const name = screen.getByRole('columnheader', { name: 'Name' });
    expect(name).toHaveAttribute('aria-sort', 'ascending');
    await userEvent.click(name);
    expect(onSortChange).toHaveBeenCalledWith({ column: 'name', direction: 'descending' });
  });

  it('moves focus between cells with arrow keys', async () => {
    render(<Table aria-label="Team" columns={columns} rows={rows} />);
    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getAllByRole('row')[2]).toHaveFocus();
  });

  it('passes className to the root', () => {
    render(<Table aria-label="Team" columns={columns} rows={rows} className="consumer" />);
    expect(screen.getByRole('grid').parentElement).toHaveClass('consumer');
  });
});
