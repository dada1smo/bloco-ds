import { cva } from 'class-variance-authority';

// RAC keeps data-entering/data-exiting until the transition ends
const motionStyles =
  'motion-safe:transition-[opacity,translate] motion-safe:duration-150 data-entering:-translate-y-1 data-entering:opacity-0 data-exiting:-translate-y-1 data-exiting:opacity-0';

export const selectFieldStyles = cva('group grid w-fit min-w-72 gap-3 font-sans');

// Campo no estilo Carbon: fundo `field`, só a borda de baixo
export const selectStyles = cva([
  'flex min-h-control-md w-full cursor-pointer items-center gap-4 border-b border-strong bg-field-01 px-6',
  'text-left font-sans text-body-compact-01 text-primary outline-none',
  'data-hovered:bg-field-hover-01 group-data-invalid:border-support-error',
  'data-disabled:cursor-not-allowed data-disabled:border-disabled data-disabled:bg-field-01 data-disabled:text-disabled',
  'data-focus-visible:-outline-offset-2 data-focus-visible:outline-2 data-focus-visible:outline-focus',
]);

export const selectValueStyles = cva(
  'flex flex-1 items-center gap-4 data-placeholder:text-placeholder group-data-disabled:text-disabled group-data-disabled:data-placeholder:text-disabled',
);

export const selectCaretStyles = cva(
  'size-5 flex-none text-icon-primary group-data-disabled:text-icon-disabled group-data-open:rotate-180 motion-safe:transition-transform motion-safe:duration-150',
);

export const selectPopoverStyles = cva([
  'min-w-(--trigger-width) bg-layer-01 font-sans text-body-compact-01 text-primary shadow-floating outline-none',
  motionStyles,
]);

export const selectListBoxStyles = cva('outline-none');

export const selectOptionStyles = cva([
  'group/option flex min-h-control-md w-full cursor-pointer items-center gap-4 px-6 py-4 outline-none',
  'data-focused:bg-layer-hover-01 data-disabled:cursor-not-allowed data-disabled:text-disabled',
]);

export const selectCheckStyles = cva(
  'size-5 flex-none text-accent opacity-0 group-data-selected/option:opacity-100 group-data-disabled/option:text-icon-disabled',
);

export const selectOptionIconStyles = cva('flex flex-none items-center text-icon-secondary group-data-disabled/option:text-icon-disabled');

export const selectOptionBodyStyles = cva('grid gap-2');

export const selectOptionDescStyles = cva('text-helper-text-01 text-helper group-data-disabled/option:text-disabled');
