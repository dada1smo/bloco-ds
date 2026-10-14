import { cva, type VariantProps } from 'class-variance-authority';

const gridStyles = 'grid grid-cols-4';

export const buttonGroupStyles = cva(gridStyles, {
  variants: {
    position: {
      default: '',
      bottom: 'absolute bottom-0 left-0 w-full',
    },
  },
  defaultVariants: { position: 'default' },
});

// Classes literais para o Tailwind detectar; a célula força o filho a ocupar a coluna.
export const buttonGroupItemStyles = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
} as const;

export const cellStyles = '[&>*]:w-full [&>*]:rounded-none';

export type ButtonGroupStyleProps = VariantProps<typeof buttonGroupStyles>;
