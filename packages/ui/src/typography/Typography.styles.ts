import { cva, type VariantProps } from 'class-variance-authority';

// Cada variante é um token do type set (theme/typography.css): já traz tamanho, line-height e peso.
export const typographyStyles = cva('text-primary', {
  variants: {
    variant: {
      'code-01': 'text-code-01',
      'code-02': 'text-code-02',
      'label-01': 'text-label-01',
      'label-02': 'text-label-02',
      'helper-text-01': 'text-helper-text-01',
      'body-compact-01': 'text-body-compact-01',
      'body-compact-02': 'text-body-compact-02',
      'body-01': 'text-body-01',
      'body-02': 'text-body-02',
      'heading-compact-01': 'text-heading-compact-01',
      'heading-compact-02': 'text-heading-compact-02',
      'heading-01': 'text-heading-01',
      'heading-02': 'text-heading-02',
      'heading-03': 'text-heading-03',
      'heading-04': 'text-heading-04',
      'heading-05': 'text-heading-05',
      'heading-06': 'text-heading-06',
      'heading-07': 'text-heading-07',
    },
    // sobrescreve o peso do token; só os pesos do sistema
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      semibold: 'font-semibold',
    },
    font: {
      sans: 'font-sans',
      mono: 'font-mono',
    },
  },
  defaultVariants: { variant: 'body-01', font: 'sans' },
});

export type TypographyStyleProps = VariantProps<typeof typographyStyles>;
