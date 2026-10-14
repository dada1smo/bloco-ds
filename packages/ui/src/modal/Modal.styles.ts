import { cva, type VariantProps } from 'class-variance-authority';

const surfaceStyles =
  'm-auto rounded-none border border-primary/20 bg-background p-6 font-sans text-body text-foreground shadow-lg';
const backdropStyles = 'backdrop:bg-primary-950/40 backdrop:backdrop-blur-sm';
const motionStyles = [
  'opacity-0 translate-y-2 open:translate-y-0 open:opacity-100',
  'starting:open:translate-y-2 starting:open:opacity-0',
  'motion-safe:transition-[opacity,translate,display,overlay] motion-safe:duration-150',
  'motion-safe:[transition-behavior:allow-discrete]',
  'backdrop:opacity-0 open:backdrop:opacity-100 starting:open:backdrop:opacity-0',
  'motion-safe:backdrop:transition-[opacity,display,overlay] motion-safe:backdrop:duration-150',
  'motion-safe:backdrop:[transition-behavior:allow-discrete]',
];

export const modalStyles = cva([surfaceStyles, backdropStyles, motionStyles], {
  variants: {
    size: {
      sm: 'w-[min(20rem,100%-2rem)]',
      md: 'w-[min(26rem,100%-2rem)]',
      lg: 'w-[min(34rem,100%-2rem)]',
    },
  },
  defaultVariants: { size: 'md' },
});

export type ModalStyleProps = VariantProps<typeof modalStyles>;

export const modalTitleStyles = cva('m-0 text-subtitle font-bold');

export const modalBodyStyles = cva('m-0 mt-1.5 text-primary/70');

export const modalFooterStyles = cva('mt-4 flex flex-wrap justify-end gap-2');
