import { cva } from 'class-variance-authority';

export const accordionStyles = cva(
  'overflow-clip border border-subtle bg-background font-sans text-body-01 text-primary',
);

export const accordionItemStyles = cva('group border-t border-subtle first:border-t-0');

export const accordionHeadingStyles = cva('m-0');

export const accordionTriggerStyles = cva([
  'flex min-h-control-lg w-full items-center justify-between gap-4 px-4 py-3 text-left text-body-01',
  'cursor-pointer outline-none data-hovered:bg-background-hover motion-safe:transition-colors',
  'data-focus-visible:-outline-offset-2 data-focus-visible:outline-2 data-focus-visible:outline-focus',
]);

export const accordionChevronStyles = cva(
  'size-4 flex-none text-icon-secondary group-data-expanded:rotate-180 motion-safe:transition-transform motion-safe:duration-200',
);

// RAC sets --disclosure-panel-height in px while toggling, so height can transition
export const accordionPanelStyles = cva(
  'h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height] motion-safe:duration-200',
);

export const accordionContentStyles = cva('px-4 pb-4 text-secondary');
