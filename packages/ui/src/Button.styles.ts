import { cva, type VariantProps } from 'class-variance-authority';

const displayStyles = 'inline-flex items-center justify-center gap-2';
const typographyStyles = 'font-sans font-medium whitespace-nowrap';
const shapeStyles = 'border';
const interactionStyles =
  'cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50';
const focusStyles =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export const buttonStyles = cva(
  [
    displayStyles,
    typographyStyles,
    shapeStyles,
    interactionStyles,
    focusStyles,
  ],
  {
    variants: {
      level: {
        solid: '',
        outline: 'bg-transparent',
        subtle: 'border-transparent',
      },
      color: { primary: '', accent: '' },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    compoundVariants: [
      {
        level: 'solid',
        color: 'primary',
        class:
          'border-transparent bg-primary text-on-primary hover:bg-primary/90',
      },
      {
        level: 'solid',
        color: 'accent',
        class: 'border-transparent bg-accent text-on-accent hover:bg-accent/90',
      },
      {
        level: 'outline',
        color: 'primary',
        class: 'border-primary text-primary hover:bg-primary/10',
      },
      {
        level: 'outline',
        color: 'accent',
        class: 'border-accent text-accent-text hover:bg-accent/10',
      },
      {
        level: 'subtle',
        color: 'primary',
        class: 'bg-primary/10 text-primary hover:bg-primary/20',
      },
      {
        level: 'subtle',
        color: 'accent',
        class: 'bg-accent/15 text-accent-text hover:bg-accent/25',
      },
    ],
    defaultVariants: { level: 'solid', color: 'primary', size: 'md' },
  },
);

export type ButtonStyleProps = VariantProps<typeof buttonStyles>;
