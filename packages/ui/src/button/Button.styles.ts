import { cva, type VariantProps } from 'class-variance-authority';

const displayStyles = 'inline-flex items-center justify-center gap-2';
const typographyStyles = 'font-sans font-medium whitespace-nowrap';
const shapeStyles = 'border';
const interactionStyles =
  'cursor-pointer transition-colors data-disabled:cursor-not-allowed data-disabled:opacity-50';
const focusStyles =
  'outline-none data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-focus-ring';

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
        subtle: '',
      },
      color: { primary: '', accent: '' },
      size: {
        sm: 'h-8 text-caption',
        md: 'h-10 text-body',
        lg: 'h-12 text-interactive',
      },
      square: { true: '', false: '' },
    },
    compoundVariants: [
      { square: false, size: 'sm', class: 'px-3' },
      { square: false, size: 'md', class: 'px-4' },
      { square: false, size: 'lg', class: 'px-6' },
      { square: true, size: 'sm', class: 'w-8 [&>svg]:size-4' },
      { square: true, size: 'md', class: 'w-10 [&>svg]:size-5' },
      { square: true, size: 'lg', class: 'w-12 [&>svg]:size-6' },
      {
        level: 'solid',
        color: 'primary',
        class: 'border-primary bg-primary text-on-primary data-hovered:bg-primary-hover data-hovered:border-primary-hover',
      },
      {
        level: 'solid',
        color: 'accent',
        class: 'border-accent bg-accent text-on-accent data-hovered:bg-accent-hover data-hovered:border-accent-hover',
      },
      {
        level: 'outline',
        color: 'primary',
        class: 'border-primary text-primary data-hovered:bg-surface-hover',
      },
      {
        level: 'outline',
        color: 'accent',
        class: 'border-accent text-accent-text data-hovered:bg-accent-soft',
      },
      {
        level: 'subtle',
        color: 'primary',
        class:
          'bg-surface-hover border-surface-hover text-primary data-hovered:bg-surface-selected data-hovered:border-surface-selected',
      },
      {
        level: 'subtle',
        color: 'accent',
        class:
          'bg-accent-soft border-accent-soft text-accent-text data-hovered:bg-accent-soft-hover data-hovered:border-accent-soft-hover',
      },
    ],
    defaultVariants: { level: 'solid', color: 'primary', size: 'md', square: false },
  },
);

export type ButtonStyleProps = VariantProps<typeof buttonStyles>;
