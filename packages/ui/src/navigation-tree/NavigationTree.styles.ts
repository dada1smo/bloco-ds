import { cva } from 'class-variance-authority';

export const navigationTreeStyles = cva('max-w-104 text-body-compact-01 outline-none');

// --tree-item-level comes from RAC (1 = root); each level indents 1.5rem
export const navigationTreeItemStyles = cva([
  'group flex min-h-control-xs items-center gap-4 px-3 ps-[calc((var(--tree-item-level)-1)*1.5rem+0.5rem)]',
  'cursor-default text-secondary outline-none data-hovered:bg-background-hover',
  'data-has-child-items:text-primary data-current-ancestor:text-primary',
  'data-current:bg-background-selected data-current:text-primary',
  'data-focus-visible:-outline-offset-2 data-focus-visible:outline-2 data-focus-visible:outline-focus',
]);

export const navigationTreeLinkStyles = cva(
  'flex min-w-0 flex-1 cursor-pointer items-center gap-4 self-stretch text-inherit no-underline outline-none',
);

export const navigationTreeChevronButtonStyles = cva(
  'flex flex-none cursor-pointer items-center outline-none',
);

export const navigationTreeChevronStyles = cva(
  'size-3.5 flex-none text-icon-secondary group-data-expanded:rotate-90 motion-safe:transition-transform motion-safe:duration-150',
);

export const navigationTreeIconStyles = cva('size-4 flex-none text-icon-secondary');
