import { cva, type VariantProps } from 'class-variance-authority';

export const fileTreeStyles = cva('max-w-104 font-mono text-code-02 outline-none');

// --tree-item-level comes from RAC (1 = root); each level indents 1.5rem
export const fileTreeItemStyles = cva(
  [
    'group flex min-h-control-xs items-center gap-3 px-2 ps-[calc((var(--tree-item-level)-1)*1.5rem+0.5rem)]',
    'cursor-default text-secondary outline-none data-hovered:bg-background-hover',
    'data-has-child-items:cursor-pointer data-has-child-items:text-primary',
    'data-focus-visible:-outline-offset-2 data-focus-visible:outline-2 data-focus-visible:outline-focus',
  ],
  {
    variants: {
      muted: { true: 'italic', false: '' },
      interactive: { true: 'cursor-pointer', false: '' },
      selected: { true: 'bg-background-selected text-primary data-hovered:bg-background-selected', false: '' },
    },
    defaultVariants: { muted: false, interactive: false, selected: false },
  },
);

export const fileTreeChevronButtonStyles = cva('flex flex-none cursor-pointer items-center outline-none');

export const fileTreeIconStyles = cva('size-4 flex-none text-icon-secondary', {
  variants: {
    kind: {
      chevron: 'size-3.5 group-data-expanded:rotate-90 motion-safe:transition-transform motion-safe:duration-150',
      folder: 'group-data-expanded:text-accent',
      file: '',
    },
  },
});

export type FileTreeItemStyleProps = VariantProps<typeof fileTreeItemStyles>;
