import { cva } from 'class-variance-authority';

const surfaceStyles =
  'min-w-52 rounded-none border border-primary/20 bg-background p-1.5 font-sans text-body text-foreground shadow-lg';
// Without anchor positioning the popover keeps the UA default (centered in the viewport)
const positionStyles = [
  'supports-[anchor-name:--a]:inset-auto supports-[anchor-name:--a]:my-1.5',
  'supports-[anchor-name:--a]:[position-area:block-end_span-inline-end]',
  'supports-[anchor-name:--a]:[position-try-fallbacks:flip-block,flip-inline,flip-block_flip-inline]',
];
const motionStyles = [
  'opacity-0 -translate-y-1 [&:popover-open]:translate-y-0 [&:popover-open]:opacity-100',
  'starting:[&:popover-open]:-translate-y-1 starting:[&:popover-open]:opacity-0',
  'motion-safe:transition-[opacity,translate,display,overlay] motion-safe:duration-150',
  'motion-safe:[transition-behavior:allow-discrete]',
];

export const dropdownStyles = cva('inline-block');

export const dropdownMenuStyles = cva([surfaceStyles, positionStyles, motionStyles]);

export const dropdownTriggerStyles = cva('', {
  variants: { openOn: { click: '', hover: '[interest-delay:150ms_300ms]' } },
  defaultVariants: { openOn: 'click' },
});

export const dropdownGroupStyles = cva(
  'm-0 list-none p-0 [&+&]:mt-1.5 [&+&]:border-t [&+&]:border-primary/20 [&+&]:pt-1.5',
);

export const dropdownItemStyles = cva([
  'flex min-h-9 w-full cursor-pointer items-center gap-2.5 rounded-none px-2.5 text-left',
  'hover:bg-primary/10',
  'focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary',
]);

export const dropdownIconStyles = cva('size-4 flex-none text-primary/70');
