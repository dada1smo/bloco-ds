import { cva } from 'class-variance-authority';

// RAC keeps data-entering/data-exiting until the transition ends
const motionStyles =
  'motion-safe:transition-[opacity,translate] motion-safe:duration-150 data-entering:-translate-y-1 data-entering:opacity-0 data-exiting:-translate-y-1 data-exiting:opacity-0';

export const selectFieldStyles = cva('group grid w-fit min-w-60 gap-1.5 font-sans');

export const selectLabelStyles = cva('text-caption font-semibold text-foreground');

export const selectStyles = cva([
  'flex min-h-11 w-full cursor-pointer items-center gap-2.5 border border-border bg-background px-3',
  'text-left font-sans text-body text-foreground outline-none',
  'data-hovered:bg-surface-hover data-disabled:cursor-not-allowed data-disabled:opacity-50',
  'data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-focus-ring',
]);

export const selectValueStyles = cva(
  'flex flex-1 items-center gap-2 data-placeholder:text-foreground-muted',
);

export const selectCaretStyles = cva(
  'size-4 flex-none text-foreground-muted group-data-open:rotate-180 motion-safe:transition-transform motion-safe:duration-150',
);

export const selectPopoverStyles = cva([
  'min-w-(--trigger-width) border border-border bg-background p-1.5 font-sans text-body text-foreground shadow-lg outline-none',
  motionStyles,
]);

export const selectListBoxStyles = cva('outline-none');

export const selectOptionStyles = cva([
  'group/option flex min-h-9 w-full cursor-pointer items-center gap-2.5 px-2.5 outline-none',
  'data-focused:bg-surface-hover data-disabled:cursor-not-allowed data-disabled:opacity-50',
]);

export const selectCheckStyles = cva(
  'size-4 flex-none text-accent-text opacity-0 group-data-selected/option:opacity-100',
);

export const selectOptionIconStyles = cva('flex flex-none items-center text-foreground-muted');

export const selectOptionBodyStyles = cva('grid gap-px');

export const selectOptionDescStyles = cva('text-caption font-normal text-foreground-muted');
