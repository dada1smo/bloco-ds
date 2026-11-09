import { cva, type VariantProps } from 'class-variance-authority';
import { gapVariants } from '../stack/Stack.styles';

export const clusterStyles = cva('flex flex-wrap items-center', {
  variants: { gap: gapVariants },
  defaultVariants: { gap: '3' },
});

export type ClusterStyleProps = VariantProps<typeof clusterStyles>;
