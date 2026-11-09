import type { ReactNode } from 'react';
import {
  Tooltip as RACTooltip,
  TooltipTrigger,
  type TooltipProps as RACTooltipProps,
  type TooltipTriggerComponentProps,
} from 'react-aria-components';
import { tooltipStyles } from './Tooltip.styles';

export type TooltipProps = Omit<TooltipTriggerComponentProps, 'children'> &
  Pick<RACTooltipProps, 'placement' | 'offset'> & {
    /** A single focusable element (e.g. `BLButton`, `BLIconButton`). */
    children: ReactNode;
    /** Short text shown on hover/focus. */
    content: ReactNode;
    className?: string;
  };

/** RAC `TooltipTrigger` + `Tooltip`. Describes the trigger; never holds interactive content. */
export function Tooltip({ children, content, placement = 'top', offset = 6, delay = 300, className, ...props }: TooltipProps) {
  return (
    <TooltipTrigger delay={delay} {...props}>
      {children}
      <RACTooltip placement={placement} offset={offset} className={tooltipStyles({ className })}>
        {content}
      </RACTooltip>
    </TooltipTrigger>
  );
}
