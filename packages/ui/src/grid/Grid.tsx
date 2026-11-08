import type { ComponentProps } from 'react';
import { gridStyles } from './Grid.styles';

export type GridProps = ComponentProps<'div'>;

/** Grid de página: 4/8/16 colunas. Filhos se posicionam com `col-span-*` (`md:`, `lg:`). */
export function Grid({ className, ...props }: GridProps) {
  return <div {...props} className={gridStyles({ className })} />;
}
