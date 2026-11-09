import { cva, type VariantProps } from 'class-variance-authority';

// Passos de gap das primitivas de layout; escolha pelo papel na tabela Densidade (theming.md).
export const gapVariants = {
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
};

export const stackStyles = cva('flex flex-col', {
  variants: { gap: gapVariants },
  defaultVariants: { gap: '6' },
});

export type StackStyleProps = VariantProps<typeof stackStyles>;
