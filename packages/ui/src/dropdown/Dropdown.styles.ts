import { cva } from 'class-variance-authority';

// RAC keeps data-entering/data-exiting until the transition ends
const motionStyles =
  'motion-safe:transition-[opacity,translate] motion-safe:duration-150 data-entering:-translate-y-1 data-entering:opacity-0 data-exiting:-translate-y-1 data-exiting:opacity-0';

export const dropdownPopoverStyles = cva([
  'min-w-64 bg-layer-01 font-sans text-body-compact-01 text-primary shadow-floating outline-none',
  motionStyles,
]);

export const dropdownMenuStyles = cva('outline-none');

export const dropdownSectionStyles = cva('[&+&]:border-t [&+&]:border-subtle');

export const dropdownItemStyles = cva([
  'group flex min-h-control-md w-full cursor-pointer items-center gap-3 px-6 text-left outline-none',
  'data-focused:bg-layer-hover-01 data-disabled:cursor-not-allowed data-disabled:text-disabled',
]);

export const dropdownIconStyles = cva('size-5 flex-none text-icon-secondary group-data-disabled:text-icon-disabled');
