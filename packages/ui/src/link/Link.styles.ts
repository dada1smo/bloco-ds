import { cva } from 'class-variance-authority';

export const linkStyles = cva([
  'cursor-pointer text-link-primary underline',
  'data-hovered:text-link-primary-hover data-disabled:cursor-not-allowed data-disabled:text-disabled',
  'outline-none data-focus-visible:outline-2 data-focus-visible:outline-focus',
]);
