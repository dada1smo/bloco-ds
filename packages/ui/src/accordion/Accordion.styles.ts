import { cva } from 'class-variance-authority';

export const accordionStyles = cva(
  'overflow-clip border border-border bg-background font-sans text-body text-foreground',
);

export const accordionItemStyles = cva('group border-t border-border first:border-t-0');

export const accordionHeadingStyles = cva('m-0');

export const accordionTriggerStyles = cva([
  'flex min-h-12 w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-interactive font-medium',
  'cursor-pointer outline-none data-hovered:bg-surface-hover motion-safe:transition-colors',
  'data-focus-visible:-outline-offset-2 data-focus-visible:outline-2 data-focus-visible:outline-focus-ring',
]);

export const accordionChevronStyles = cva(
  'size-4 flex-none text-foreground-muted group-data-expanded:rotate-180 motion-safe:transition-transform motion-safe:duration-200',
);

// RAC sets --disclosure-panel-height in px while toggling, so height can transition
export const accordionPanelStyles = cva(
  'h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height] motion-safe:duration-200',
);

export const accordionContentStyles = cva('px-4 pb-4 text-foreground-muted');
