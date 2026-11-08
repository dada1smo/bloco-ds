import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import {
  Cell,
  Column,
  Row,
  Table as RACTable,
  TableBody,
  TableHeader,
  type TableProps as RACTableProps,
} from 'react-aria-components';
import {
  tableCellStyles,
  tableColumnContentStyles,
  tableColumnStyles,
  tableContainerStyles,
  tableHeaderStyles,
  tableRowStyles,
  tableSortIconStyles,
  tableStyles,
  type TableStyleProps,
} from './Table.styles';

export type TableColumn = {
  id: string;
  title: ReactNode;
  /** Marks the column whose cell names the row for screen readers; one per table. */
  isRowHeader?: boolean;
  allowsSorting?: boolean;
};

export type TableRow = { id: string } & Record<string, ReactNode>;

export type TableProps = Omit<RACTableProps, 'children' | 'className'> &
  TableStyleProps & {
    columns: TableColumn[];
    rows: TableRow[];
    /** Accessible name of the table; required when no visible caption labels it. */
    'aria-label'?: string;
    className?: string;
  };

/**
 * RAC `Table`. Sorting is controlled: the table only reports `onSortChange`;
 * the consumer sorts `rows` and passes `sortDescriptor` back.
 */
export function Table({ columns, rows, size, className, ...props }: TableProps) {
  return (
    <div className={tableContainerStyles({ className })}>
      <RACTable {...props} className={tableStyles()}>
        <TableHeader columns={columns} className={tableHeaderStyles()}>
          {({ id, title, isRowHeader, allowsSorting }) => (
            <Column
              id={id}
              isRowHeader={isRowHeader}
              allowsSorting={allowsSorting}
              className={tableColumnStyles({ size })}
            >
              {({ sortDirection }) => (
                <span className={tableColumnContentStyles()}>
                  {title}
                  {sortDirection === 'ascending' && <CaretUpIcon aria-hidden className={tableSortIconStyles()} />}
                  {sortDirection === 'descending' && <CaretDownIcon aria-hidden className={tableSortIconStyles()} />}
                </span>
              )}
            </Column>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(row) => (
            <Row id={row.id} columns={columns} className={tableRowStyles()}>
              {(column) => <Cell className={tableCellStyles({ size })}>{row[column.id]}</Cell>}
            </Row>
          )}
        </TableBody>
      </RACTable>
    </div>
  );
}
