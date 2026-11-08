import { cva, type VariantProps } from 'class-variance-authority';
import { gapVariants } from '../stack/Stack.styles';

export const formStyles = cva('flex flex-col', {
  variants: { gap: gapVariants },
  defaultVariants: { gap: '6' },
});

export type FormStyleProps = VariantProps<typeof formStyles>;
