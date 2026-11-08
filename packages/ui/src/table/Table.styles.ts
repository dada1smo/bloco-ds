import { cva, type VariantProps } from 'class-variance-authority';

export const tableContainerStyles = cva('w-full overflow-x-auto');

export const tableStyles = cva(
  'w-full border-collapse bg-layer-01 font-sans text-body-compact-01 text-secondary',
);

export const tableHeaderStyles = cva('bg-layer-02 text-label-01 text-primary');

const cellBase = 'px-4 text-left align-middle outline-none data-focus-visible:-outline-offset-2 data-focus-visible:outline-2 data-focus-visible:outline-focus';

const cellSizes = {
  sm: 'h-control-sm',
  md: 'h-control-md',
  lg: 'h-control-lg',
};

export const tableColumnStyles = cva(
  [cellBase, 'text-heading-compact-01 data-allows-sorting:cursor-pointer data-allows-sorting:data-hovered:bg-layer-hover-02'],
  { variants: { size: cellSizes }, defaultVariants: { size: 'lg' } },
);

export const tableColumnContentStyles = cva('flex items-center gap-3');

export const tableSortIconStyles = cva('size-4 flex-none text-icon-primary');

export const tableRowStyles = cva([
  'border-b border-subtle outline-none motion-safe:transition-colors',
  'data-hovered:bg-layer-hover-01 data-selected:bg-layer-selected-01',
  'data-focus-visible:-outline-offset-2 data-focus-visible:outline-2 data-focus-visible:outline-focus',
]);

export const tableCellStyles = cva(cellBase, {
  variants: { size: cellSizes },
  defaultVariants: { size: 'lg' },
});

export type TableStyleProps = VariantProps<typeof tableCellStyles>;
