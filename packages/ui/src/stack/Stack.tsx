import type { ComponentProps } from 'react';
import { stackStyles, type StackStyleProps } from './Stack.styles';

export type StackProps = ComponentProps<'div'> & StackStyleProps;

/** Empilha os filhos na vertical com um gap da escala (padrão `6`, entre blocos). */
export function Stack({ gap, className, ...props }: StackProps) {
  return <div {...props} className={stackStyles({ gap, className })} />;
}
