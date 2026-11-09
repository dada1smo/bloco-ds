import { cva, type VariantProps } from 'class-variance-authority';

export const toastRegionStyles = cva(
  'fixed right-4 bottom-4 z-50 flex w-[min(24rem,100%-2rem)] flex-col gap-4 outline-none data-focus-visible:outline-2 data-focus-visible:outline-focus',
);

export const toastStyles = cva(
  'flex items-start gap-4 border-l-4 bg-layer-01 p-6 font-sans text-primary shadow-floating outline-none data-focus-visible:outline-2 data-focus-visible:outline-focus',
  {
    variants: {
      kind: {
        info: 'border-support-info',
        success: 'border-support-success',
        warning: 'border-support-warning',
        error: 'border-support-error',
      },
    },
    defaultVariants: { kind: 'info' },
  },
);

export type ToastStyleProps = VariantProps<typeof toastStyles>;

export const toastIconStyles = cva('mt-0.5 size-5 shrink-0', {
  variants: {
    kind: {
      info: 'text-support-info',
      success: 'text-support-success',
      warning: 'text-support-warning',
      error: 'text-support-error',
    },
  },
  defaultVariants: { kind: 'info' },
});

export const toastContentStyles = cva('flex min-w-0 flex-1 flex-col gap-2');

export const toastTitleStyles = cva('text-heading-compact-01');

export const toastDescriptionStyles = cva('text-body-compact-01 text-secondary');
