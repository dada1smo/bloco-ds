import { cva, type VariantProps } from 'class-variance-authority';

export const typographyStyles = cva('text-foreground', {
  variants: {
    size: {
      headline: 'text-headline leading-tight',
      title: 'text-title leading-snug',
      subtitle: 'text-subtitle leading-snug',
      body: 'text-body leading-normal',
      interactive: 'text-interactive leading-normal',
      caption: 'text-caption leading-normal',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    font: {
      sans: 'font-sans',
      mono: 'font-mono',
    },
  },
  defaultVariants: { size: 'body', font: 'sans' },
});

// peso padrão de cada size; a prop `weight` sobrescreve
export const defaultWeights = {
  headline: 'bold',
  title: 'semibold',
  subtitle: 'medium',
  body: 'normal',
  interactive: 'medium',
  caption: 'normal',
} as const;

export type TypographyStyleProps = VariantProps<typeof typographyStyles>;
