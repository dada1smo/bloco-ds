import { cva } from 'class-variance-authority';

export const inputFieldStyles = cva('group grid w-fit min-w-72 gap-2 font-sans');

// Campo no estilo Carbon: fundo `field`, só a borda de baixo
export const inputStyles = cva([
  'min-h-control-md w-full border-b border-strong bg-field-01 px-6',
  'text-body-compact-01 text-primary outline-none placeholder:text-placeholder',
  'data-hovered:bg-field-hover-01 group-data-invalid:border-support-error',
  'data-disabled:cursor-not-allowed data-disabled:border-disabled data-disabled:bg-field-01 data-disabled:text-disabled data-disabled:placeholder:text-disabled',
  'data-focus-visible:-outline-offset-2 data-focus-visible:outline-2 data-focus-visible:outline-focus',
]);
