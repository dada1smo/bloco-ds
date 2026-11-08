import { cva, type VariantProps } from 'class-variance-authority';

export const badgeStyles = cva(
  'inline-flex items-center border px-2 py-0.5 font-mono text-label-01 text-primary',
  {
    variants: {
      status: {
        neutral: 'bg-layer-02 border-strong',
        info: 'bg-support-info-subtle border-support-info',
        success: 'bg-support-success-subtle border-support-success',
        warning: 'bg-support-warning-subtle border-support-warning',
        error: 'bg-support-error-subtle border-support-error',
      },
    },
    defaultVariants: { status: 'neutral' },
  },
);

export type BadgeStyleProps = VariantProps<typeof badgeStyles>;
