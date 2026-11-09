import { cva, type VariantProps } from 'class-variance-authority';

// Base visual de toda tabela do DS; RichTable compõe estas mesmas classes e só soma estados interativos.

export const tableContainerStyles = cva('w-full overflow-x-auto');

export const tableStyles = cva(
  'w-full border-collapse bg-layer-01 font-sans text-body-compact-01 text-secondary',
);

export const tableHeadStyles = cva('bg-layer-02 text-label-01 text-primary');

export const tableRowStyles = cva('border-b border-subtle');

const cellBase = 'px-6 text-left align-middle';

const cellSizes = {
  sm: 'h-control-sm',
  md: 'h-control-md',
  lg: 'h-control-lg',
};

export const tableHeaderStyles = cva([cellBase, 'text-heading-compact-01'], {
  variants: { size: cellSizes },
  defaultVariants: { size: 'lg' },
});

export const tableCellStyles = cva(cellBase, {
  variants: { size: cellSizes },
  defaultVariants: { size: 'lg' },
});

export type TableStyleProps = VariantProps<typeof tableCellStyles>;
