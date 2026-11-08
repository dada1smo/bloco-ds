import { cva } from 'class-variance-authority';

// RAC keeps data-entering/data-exiting until the transition ends
const motionStyles =
  'motion-safe:transition-[opacity,translate] motion-safe:duration-150 data-entering:-translate-y-1 data-entering:opacity-0 data-exiting:-translate-y-1 data-exiting:opacity-0';

export const dropdownPopoverStyles = cva([
  'min-w-52 border border-border bg-background p-1.5 font-sans text-body text-foreground shadow-lg outline-none',
  motionStyles,
]);

export const dropdownMenuStyles = cva('outline-none');

export const dropdownSectionStyles = cva(
  '[&+&]:mt-1.5 [&+&]:border-t [&+&]:border-border [&+&]:pt-1.5',
);

export const dropdownItemStyles = cva([
  'flex min-h-9 w-full cursor-pointer items-center gap-2.5 px-2.5 text-left outline-none',
  'data-focused:bg-surface-hover data-disabled:cursor-not-allowed data-disabled:opacity-50',
]);

export const dropdownIconStyles = cva('size-4 flex-none text-foreground-muted');
