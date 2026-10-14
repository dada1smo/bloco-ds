import { cva } from 'class-variance-authority';

export const accordionStyles = cva(
  'overflow-clip border border-primary/20 bg-background font-sans text-body text-foreground',
);

// shortcut: ::details-content animation needs browser support, falls back to instant toggle
export const accordionItemStyles = cva([
  'border-t border-primary/20 first:border-t-0',
  '[interpolate-size:allow-keywords]',
  'motion-safe:[&::details-content]:h-0 motion-safe:[&::details-content]:overflow-clip',
  'motion-safe:[&::details-content]:transition-[height,content-visibility] motion-safe:[&::details-content]:duration-200',
  'motion-safe:[&::details-content]:[transition-behavior:allow-discrete]',
  'open:[&::details-content]:h-auto',
  'open:[&>summary>svg]:rotate-180',
]);

export const accordionSummaryStyles = cva([
  'flex min-h-12 items-center justify-between gap-4 px-4 py-2.5 text-interactive font-medium',
  'cursor-pointer list-none [&::-webkit-details-marker]:hidden',
  'hover:bg-primary/10',
  'motion-safe:transition-colors',
  'focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary',
]);

export const accordionChevronStyles = cva(
  'size-4 flex-none text-primary/70 motion-safe:transition-transform motion-safe:duration-200',
);

export const accordionPanelStyles = cva('px-4 pb-4 text-primary/70');
