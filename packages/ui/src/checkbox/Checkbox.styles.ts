import { cva } from 'class-variance-authority';

export const checkboxFieldStyles = cva('group grid w-fit gap-2 font-sans');

export const checkboxStyles = cva('group/box flex cursor-pointer items-center gap-3 group-data-disabled:cursor-not-allowed');

// Box 20px: border-strong; filled with interactive when selected/indeterminate
export const checkboxBoxStyles = cva([
  'flex size-5 flex-none items-center justify-center border border-strong bg-field-01 text-on-color',
  'group-data-hovered/box:bg-field-hover-01',
  'group-data-selected/box:border-interactive group-data-selected/box:bg-interactive',
  'group-data-indeterminate/box:border-interactive group-data-indeterminate/box:bg-interactive',
  'group-data-invalid/box:border-support-error',
  'group-data-disabled/box:border-disabled group-data-disabled/box:bg-field-01 group-data-disabled/box:text-icon-disabled',
  'group-data-focus-visible/box:outline-2 group-data-focus-visible/box:outline-offset-2 group-data-focus-visible/box:outline-focus',
]);

export const checkboxIconStyles = cva('size-4');

// Label is part of the control, so it takes the control text (body-compact, text-primary) like Input, not FieldLabel's label-01/secondary
export const checkboxLabelStyles = cva('text-body-compact-01 text-primary group-data-disabled:text-disabled');
