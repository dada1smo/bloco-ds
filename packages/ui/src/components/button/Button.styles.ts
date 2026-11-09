import { cva, type VariantProps } from 'class-variance-authority';

const displayStyles = 'inline-flex items-center justify-center gap-4';
const typographyStyles = 'font-sans text-body-compact-01 whitespace-nowrap';
const shapeStyles = 'border';
const interactionStyles =
  'cursor-pointer transition-colors data-disabled:cursor-not-allowed';
const focusStyles =
  'outline-none data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-focus';

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
        solid: 'border-transparent',
        outline: 'bg-transparent',
        subtle: 'border-transparent',
      },
      color: { primary: '', accent: '' },
      size: {
        sm: 'h-control-sm',
        md: 'h-control-md',
        lg: 'h-control-lg',
      },
      square: { true: '', false: '' },
    },
    compoundVariants: [
      { square: false, size: 'sm', class: 'px-4' },
      { square: false, size: 'md', class: 'px-6' },
      { square: false, size: 'lg', class: 'px-8' },
      { square: true, size: 'sm', class: 'w-control-sm [&>svg]:size-5' },
      { square: true, size: 'md', class: 'w-control-md [&>svg]:size-6' },
      { square: true, size: 'lg', class: 'w-control-lg [&>svg]:size-8' },
      {
        level: 'solid',
        color: 'primary',
        class: 'bg-interactive text-on-color data-hovered:bg-interactive-hover data-pressed:bg-interactive-active data-disabled:bg-disabled data-disabled:text-disabled',
      },
      {
        level: 'solid',
        color: 'accent',
        class: 'bg-accent text-on-accent data-hovered:bg-accent-hover data-disabled:bg-disabled data-disabled:text-disabled',
      },
      {
        level: 'outline',
        color: 'primary',
        class: 'border-interactive text-primary data-hovered:bg-background-hover data-disabled:border-disabled data-disabled:text-disabled',
      },
      {
        level: 'outline',
        color: 'accent',
        class: 'border-accent text-accent data-hovered:bg-accent-subtle data-disabled:border-disabled data-disabled:text-disabled',
      },
      {
        level: 'subtle',
        color: 'primary',
        class: 'bg-layer-01 text-primary data-hovered:bg-layer-hover-01 data-disabled:bg-disabled data-disabled:text-disabled',
      },
      {
        level: 'subtle',
        color: 'accent',
        class: 'bg-accent-subtle text-accent data-hovered:bg-accent-subtle-hover data-disabled:bg-disabled data-disabled:text-disabled',
      },
    ],
    defaultVariants: { level: 'solid', color: 'primary', size: 'md', square: false },
  },
);

export type ButtonStyleProps = VariantProps<typeof buttonStyles>;
