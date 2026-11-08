import type { HTMLAttributes } from 'react';
import { badgeStyles, type BadgeStyleProps } from './Badge.styles';

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    BadgeStyleProps {}

export function Badge({ status, className, ...props }: BadgeProps) {
  return <span className={badgeStyles({ status, className })} {...props} />;
}
