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
  tableContainerStyles,
  tableHeadStyles,
  tableHeaderStyles,
  tableRowStyles,
  tableStyles,
} from '../table/Table.styles';
import {
  richTableCellStyles,
  richTableColumnContentStyles,
  richTableColumnStyles,
  richTableRowStyles,
  richTableSortIconStyles,
  type RichTableStyleProps,
} from './RichTable.styles';

export type RichTableColumn = {
  id: string;
  title: ReactNode;
  /** Marks the column whose cell names the row for screen readers; one per table. */
  isRowHeader?: boolean;
  allowsSorting?: boolean;
};

export type RichTableRow = { id: string } & Record<string, ReactNode>;

export type RichTableProps = Omit<RACTableProps, 'children' | 'className'> &
  RichTableStyleProps & {
    columns: RichTableColumn[];
    rows: RichTableRow[];
    /** Accessible name of the table; required when no visible caption labels it. */
    'aria-label'?: string;
    className?: string;
  };

/**
 * RAC `Table` (grid) with the static `Table` look. Sorting is controlled: the table only
 * reports `onSortChange`; the consumer sorts `rows` and passes `sortDescriptor` back.
 */
export function RichTable({ columns, rows, size, className, ...props }: RichTableProps) {
  return (
    <div className={tableContainerStyles({ className })}>
      <RACTable {...props} className={tableStyles()}>
        <TableHeader columns={columns} className={tableHeadStyles()}>
          {({ id, title, isRowHeader, allowsSorting }) => (
            <Column
              id={id}
              isRowHeader={isRowHeader}
              allowsSorting={allowsSorting}
              className={tableHeaderStyles({ size, className: richTableColumnStyles() })}
            >
              {({ sortDirection }) => (
                <span className={richTableColumnContentStyles()}>
                  {title}
                  {sortDirection === 'ascending' && <CaretUpIcon aria-hidden className={richTableSortIconStyles()} />}
                  {sortDirection === 'descending' && <CaretDownIcon aria-hidden className={richTableSortIconStyles()} />}
                </span>
              )}
            </Column>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(row) => (
            <Row id={row.id} columns={columns} className={tableRowStyles({ className: richTableRowStyles() })}>
              {(column) => (
                <Cell className={tableCellStyles({ size, className: richTableCellStyles() })}>{row[column.id]}</Cell>
              )}
            </Row>
          )}
        </TableBody>
      </RACTable>
    </div>
  );
}
