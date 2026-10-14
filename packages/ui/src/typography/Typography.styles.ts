import { cva, type VariantProps } from 'class-variance-authority';

export const typographyStyles = cva('text-foreground', {
  variants: {
    size: {
      headline: 'text-4xl font-bold leading-tight',
      title: 'text-2xl font-semibold leading-snug',
      subtitle: 'text-lg font-medium leading-snug',
      body: 'text-base font-normal leading-normal',
      caption: 'text-sm font-normal leading-normal',
    },
    font: {
      sans: 'font-sans',
      mono: 'font-mono',
    },
  },
  defaultVariants: { size: 'body', font: 'sans' },
});

export type TypographyStyleProps = VariantProps<typeof typographyStyles>;
