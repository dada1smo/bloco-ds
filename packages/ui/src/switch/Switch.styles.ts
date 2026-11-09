import { cva } from 'class-variance-authority';

export const switchFieldStyles = cva('group grid w-fit gap-3 font-sans');

export const switchStyles = cva('group/box flex cursor-pointer items-center gap-4 group-data-disabled:cursor-not-allowed');

// Track 56x28: border-strong, filled with interactive when selected; thumb 20px sits at the end when selected
export const switchTrackStyles = cva([
  'flex h-7 w-14 flex-none items-center rounded-full border border-strong bg-field-01 p-1',
  'group-data-hovered/box:bg-field-hover-01',
  'group-data-selected/box:justify-end group-data-selected/box:border-interactive group-data-selected/box:bg-interactive',
  'group-data-invalid/box:border-support-error',
  'group-data-disabled/box:border-disabled group-data-disabled/box:bg-field-01',
  'group-data-disabled/box:group-data-selected/box:bg-disabled',
  'group-data-focus-visible/box:outline-2 group-data-focus-visible/box:outline-offset-2 group-data-focus-visible/box:outline-focus',
]);

export const switchThumbStyles = cva([
  'size-5 rounded-full bg-interactive',
  'group-data-selected/box:bg-background',
  'group-data-disabled/box:bg-disabled',
]);

// Label is part of the control, so it takes the control text (body-compact, text-primary) like Checkbox
export const switchLabelStyles = cva('text-body-compact-01 text-primary group-data-disabled:text-disabled');
