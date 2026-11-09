import {
  BLBadge,
  BLTable,
  BLTableBody,
  BLTableCell,
  BLTableHead,
  BLTableHeader,
  BLTableRow,
} from '@bloco/ui';
import type { Doc } from '../../types/doc';

const members = [
  { name: 'Ana Souza', role: 'Designer', status: <BLBadge status="success">Active</BLBadge> },
  { name: 'Bruno Lima', role: 'Engineer', status: <BLBadge status="warning">Invited</BLBadge> },
  { name: 'Carla Dias', role: 'Product manager', status: <BLBadge>Inactive</BLBadge> },
];

export const tableDoc: Doc = {
  slug: 'table',
  title: 'Table',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      description: 'Static, read-only table. For sorting or row selection, use RichTable.',
      render: () => (
        <BLTable className="max-w-reading" aria-label="Team members">
          <BLTableHead>
            <BLTableRow>
              <BLTableHeader>Name</BLTableHeader>
              <BLTableHeader>Role</BLTableHeader>
              <BLTableHeader>Status</BLTableHeader>
            </BLTableRow>
          </BLTableHead>
          <BLTableBody>
            {members.map((m) => (
              <BLTableRow key={m.name}>
                <BLTableHeader scope="row">{m.name}</BLTableHeader>
                <BLTableCell>{m.role}</BLTableCell>
                <BLTableCell>{m.status}</BLTableCell>
              </BLTableRow>
            ))}
          </BLTableBody>
        </BLTable>
      ),
    },
  ],
};
