import type { HTMLAttributes, ReactNode } from 'react';
import {
  buttonGroupItemStyles,
  buttonGroupStyles,
  cellStyles,
  type ButtonGroupStyleProps,
} from './ButtonGroup.styles';

export type ButtonGroupItem = {
  cols: keyof typeof buttonGroupItemStyles;
  element: ReactNode;
};

export type ButtonGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  ButtonGroupStyleProps & { items: ButtonGroupItem[] };

export function ButtonGroup({ items, position, className, ...props }: ButtonGroupProps) {
  return (
    <div {...props} className={buttonGroupStyles({ position, className })}>
      {items.map(({ cols, element }, index) => (
        <div key={index} className={`${buttonGroupItemStyles[cols]} ${cellStyles}`}>
          {element}
        </div>
      ))}
    </div>
  );
}
