import { cva, type VariantProps } from 'class-variance-authority';
import { tableCellStyles } from '../table/Table.styles';

// Base visual vem de ../table/Table.styles; aqui só os estados do grid RAC (foco, hover, seleção, ordenação).

const focusStyles = 'outline-none data-focus-visible:-outline-offset-2 data-focus-visible:outline-2 data-focus-visible:outline-focus';

export const richTableColumnStyles = cva([
  focusStyles,
  'data-allows-sorting:cursor-pointer data-allows-sorting:data-hovered:bg-layer-hover-02',
]);

export const richTableColumnContentStyles = cva('flex items-center gap-4');

export const richTableSortIconStyles = cva('size-4 flex-none text-icon-primary');

export const richTableRowStyles = cva([
  focusStyles,
  'motion-safe:transition-colors data-hovered:bg-layer-hover-01 data-selected:bg-layer-selected-01',
]);

export const richTableCellStyles = cva(focusStyles);

export type RichTableStyleProps = VariantProps<typeof tableCellStyles>;
