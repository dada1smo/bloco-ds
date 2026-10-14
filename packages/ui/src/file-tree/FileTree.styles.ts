import { cva, type VariantProps } from 'class-variance-authority';

const rowStyles =
  'flex min-h-[26px] items-center gap-1.5 rounded-md px-1 hover:bg-primary/10';

export const fileTreeStyles = cva('max-w-88 font-mono text-[13px]');

// shortcut: ::details-content animation needs browser support, falls back to instant toggle
export const fileTreeFolderStyles = cva([
  '[interpolate-size:allow-keywords]',
  'motion-safe:[&::details-content]:h-0 motion-safe:[&::details-content]:overflow-clip',
  'motion-safe:[&::details-content]:opacity-0',
  'motion-safe:[&::details-content]:transition-[height,opacity] motion-safe:[&::details-content]:duration-150',
  'open:[&::details-content]:h-auto open:[&::details-content]:opacity-100',
  'open:[&>summary>svg:first-child]:rotate-90',
  'open:[&>summary>svg:nth-child(2)]:text-accent-text',
]);

export const fileTreeSummaryStyles = cva([
  rowStyles,
  'cursor-pointer list-none [&::-webkit-details-marker]:hidden',
  'focus-visible:outline-2 focus-visible:outline-primary',
]);

export const fileTreeGroupStyles = cva(
  'ms-2.5 border-s border-primary/20 ps-3',
);

export const fileTreeFileStyles = cva([rowStyles, 'text-primary/70'], {
  variants: {
    muted: { true: 'italic opacity-70', false: '' },
    interactive: {
      true: 'cursor-pointer focus-visible:outline-2 focus-visible:outline-primary',
      false: '',
    },
    selected: { true: 'bg-primary/10 text-foreground', false: '' },
  },
  defaultVariants: { muted: false, interactive: false, selected: false },
});

export const fileTreeIconStyles = cva('size-3.5 flex-none text-primary/70', {
  variants: {
    kind: {
      chevron:
        'size-3 motion-safe:transition-transform motion-safe:duration-150',
      folder: '',
      file: '',
    },
  },
});

export type FileTreeFileStyleProps = VariantProps<typeof fileTreeFileStyles>;
