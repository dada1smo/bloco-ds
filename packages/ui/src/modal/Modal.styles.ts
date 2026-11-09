import { cva, type VariantProps } from 'class-variance-authority';

// RAC keeps data-entering/data-exiting until the transition ends
export const modalOverlayStyles = cva([
  'fixed inset-0 z-50 flex items-center justify-center bg-overlay backdrop-blur-sm',
  'motion-safe:transition-opacity motion-safe:duration-150 data-entering:opacity-0 data-exiting:opacity-0',
]);

export const modalStyles = cva(
  [
    'relative bg-layer-01 p-10 font-sans text-body-01 text-primary outline-none',
    'motion-safe:transition-[opacity,translate] motion-safe:duration-150',
    'data-entering:translate-y-2 data-entering:opacity-0 data-exiting:translate-y-2 data-exiting:opacity-0',
  ],
  {
    variants: {
      size: {
        sm: 'w-[min(24rem,100%-2rem)]',
        md: 'w-[min(32rem,100%-2rem)]',
        lg: 'w-[min(42rem,100%-2rem)]',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type ModalStyleProps = VariantProps<typeof modalStyles>;

export const modalDialogStyles = cva('outline-none', {
  // reserva espaço para o ButtonGroup absoluto no rodapé
  variants: { withFooter: { true: 'pb-16', false: '' } },
  defaultVariants: { withFooter: false },
});

export const modalHeaderStyles = cva('mb-8 flex items-center justify-between');

export const modalTitleStyles = cva('m-0 text-heading-03');

export const modalBodyStyles = cva('m-0 mt-4 text-secondary');
