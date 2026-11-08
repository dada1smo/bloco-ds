import { cva } from 'class-variance-authority';

export const tooltipStyles = cva(
  'max-w-64 bg-interactive px-3 py-2 font-sans text-helper-text-01 text-on-color shadow-floating outline-none motion-safe:transition-opacity motion-safe:duration-150 data-entering:opacity-0 data-exiting:opacity-0',
);
