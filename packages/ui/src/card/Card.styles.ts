import { cva, type VariantProps } from 'class-variance-authority';

// Superfície sobre `background`: profundidade por camada, sem borda nem sombra.
export const cardStyles = cva('relative flex flex-col gap-6 bg-layer-01 font-sans text-body-01 text-primary', {
  variants: {
    padding: {
      none: '',
      sm: 'p-6',
      md: 'p-10',
    },
  },
  defaultVariants: { padding: 'md' },
});

export type CardStyleProps = VariantProps<typeof cardStyles>;

export const cardIconStyles = cva('flex text-icon-secondary [&>svg]:size-8');

export const cardImageStyles = cva('block w-full object-cover');

// Cabeçalho reserva espaço à direita para a ação no canto.
export const cardHeaderStyles = cva('flex flex-col gap-2', {
  variants: { withAction: { true: 'pr-16', false: '' } },
  defaultVariants: { withAction: false },
});

export const cardHeadingStyles = cva('m-0 text-heading-02 text-primary');

export const cardDescriptionStyles = cva('m-0 text-body-01 text-secondary');

export const cardActionStyles = cva('absolute top-4 right-4');

export const cardMetadataStyles = cva('flex flex-wrap items-center gap-4 text-label-01 text-secondary');
