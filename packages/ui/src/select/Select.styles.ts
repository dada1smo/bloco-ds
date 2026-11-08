import { cva } from 'class-variance-authority';

// Customizable select: unsupported declarations/pseudos are ignored, so without `appearance: base-select` support this stays a plain, usable <select>
const pickerSurfaceStyles = [
  '[&::picker(select)]:[appearance:base-select]',
  '[&::picker(select)]:min-w-52 [&::picker(select)]:mt-1.5 [&::picker(select)]:p-1.5',
  '[&::picker(select)]:rounded-none [&::picker(select)]:border [&::picker(select)]:border-primary/20',
  '[&::picker(select)]:bg-background [&::picker(select)]:shadow-lg',
];
const pickerMotionStyles = [
  '[&::picker(select)]:opacity-0 [&::picker(select)]:-translate-y-1',
  '[&:open::picker(select)]:opacity-100 [&:open::picker(select)]:translate-y-0',
  'starting:[&:open::picker(select)]:opacity-0 starting:[&:open::picker(select)]:-translate-y-1',
  'motion-safe:[&::picker(select)]:transition-[opacity,translate,display,overlay]',
  'motion-safe:[&::picker(select)]:duration-150',
  'motion-safe:[&::picker(select)]:[transition-behavior:allow-discrete]',
];

export const selectFieldStyles = cva('grid w-fit min-w-60 gap-1.5 font-sans');

export const selectLabelStyles = cva('text-caption font-semibold text-foreground');

export const selectStyles = cva([
  'w-full min-h-11 cursor-pointer rounded-none border border-primary/20 bg-background px-3',
  'font-sans text-body text-foreground text-left hover:bg-primary/5',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
  'disabled:cursor-not-allowed disabled:opacity-50',
  '[appearance:base-select] flex items-center gap-2.5',
  // The native arrow is replaced by a Phosphor caret inside the <button>
  '[&::picker-icon]:hidden',
  '[&:open_.bl-select-caret]:rotate-180',
  pickerSurfaceStyles,
  pickerMotionStyles,
]);

export const selectCaretStyles = cva(
  'bl-select-caret size-4 flex-none text-primary/70 motion-safe:transition-transform motion-safe:duration-150',
);

export const selectButtonStyles = cva('flex w-full items-center gap-2.5 text-left');

export const selectedContentStyles = cva(
  // The clone in the closed button drops the description and the check
  'flex flex-1 items-center gap-2 [&_.bl-select-desc]:hidden [&_.bl-select-check]:hidden',
);

export const selectOptionStyles = cva([
  'flex min-h-9 w-full items-center gap-2.5 rounded-none px-2.5',
  'cursor-pointer hover:bg-primary/10 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary',
  '[&::checkmark]:hidden [&:checked_.bl-select-check]:opacity-100',
]);

export const selectCheckStyles = cva('bl-select-check size-4 flex-none text-accent-text opacity-0');

export const selectOptionIconStyles = cva('flex flex-none items-center text-primary/70');

export const selectOptionBodyStyles = cva('grid gap-px');

export const selectOptionDescStyles = cva('bl-select-desc text-caption font-normal text-primary/70');
