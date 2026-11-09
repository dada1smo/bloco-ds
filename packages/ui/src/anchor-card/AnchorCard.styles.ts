import { cva } from 'class-variance-authority';

// O card inteiro é o alvo: hover e foco no próprio card, na camada em que ele está.
export const anchorCardStyles = cva([
  'cursor-pointer no-underline transition-colors',
  'data-hovered:bg-layer-hover-01 data-pressed:bg-layer-selected-01',
  'outline-none data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-focus',
]);
