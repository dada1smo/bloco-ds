import { useState } from 'react';
import { BLBadge, BLStack, BLTable, BLTypography, type BLTableRow } from '@bloco/ui';
import type { Doc } from '../../types/doc';
import { sizes } from '../shared';

const tableColumns = [
  { id: 'name', title: 'Name', isRowHeader: true, allowsSorting: true },
  { id: 'role', title: 'Role', allowsSorting: true },
  { id: 'status', title: 'Status' },
];

const tableRows: BLTableRow[] = [
  {
    id: '1',
    name: 'Ana Souza',
    role: 'Designer',
    status: <BLBadge status="success">Active</BLBadge>,
  },
  {
    id: '2',
    name: 'Bruno Lima',
    role: 'Engineer',
    status: <BLBadge status="warning">Invited</BLBadge>,
  },
  {
    id: '3',
    name: 'Carla Dias',
    role: 'Product manager',
    status: <BLBadge>Inactive</BLBadge>,
  },
];

function SortableTable() {
  const [sort, setSort] = useState<{
    column: string | number;
    direction: 'ascending' | 'descending';
  }>({
    column: 'name',
    direction: 'ascending',
  });
  const rows = [...tableRows].sort((a, b) => {
    const order = String(a[sort.column]).localeCompare(String(b[sort.column]));
    return sort.direction === 'ascending' ? order : -order;
  });
  return (
    <BLTable
      className="max-w-reading"
      aria-label="Team members"
      columns={tableColumns}
      rows={rows}
      sortDescriptor={sort}
      onSortChange={setSort}
    />
  );
}

export const tableDoc: Doc = {
  slug: 'table',
  title: 'Table',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLTable
          className="max-w-reading"
          aria-label="Team members"
          columns={tableColumns}
          rows={tableRows}
        />
      ),
    },
    {
      title: 'Sizes',
      render: () => (
        <BLStack gap="6">
          {sizes.map((size) => (
            <BLStack key={size} gap="2">
              <BLTypography variant="code-01" font="mono">
                {size}
              </BLTypography>
              <BLTable
                className="max-w-reading"
                aria-label={`Team members, ${size}`}
                size={size}
                columns={tableColumns}
                rows={tableRows}
              />
            </BLStack>
          ))}
        </BLStack>
      ),
    },
    {
      title: 'Sortable',
      render: () => <SortableTable />,
    },
  ],
};
