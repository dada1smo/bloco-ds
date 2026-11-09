import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import {
  tableCellStyles,
  tableContainerStyles,
  tableHeadStyles,
  tableHeaderStyles,
  tableRowStyles,
  tableStyles,
} from './Table.styles';

export type TableProps = TableHTMLAttributes<HTMLTableElement>;

/** Static native `<table>`; `className` goes to the scroll container. */
export function Table({ className, ...props }: TableProps) {
  return (
    <div className={tableContainerStyles({ className })}>
      <table {...props} className={tableStyles()} />
    </div>
  );
}

export type TableHeadProps = HTMLAttributes<HTMLTableSectionElement>;

export function TableHead({ className, ...props }: TableHeadProps) {
  return <thead {...props} className={tableHeadStyles({ className })} />;
}

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export function TableBody(props: TableBodyProps) {
  return <tbody {...props} />;
}

export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;

export function TableRow({ className, ...props }: TableRowProps) {
  return <tr {...props} className={tableRowStyles({ className })} />;
}

export type TableHeaderProps = ThHTMLAttributes<HTMLTableCellElement>;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <th {...props} className={tableHeaderStyles({ className })} />;
}

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

export function TableCell({ className, ...props }: TableCellProps) {
  return <td {...props} className={tableCellStyles({ className })} />;
}
