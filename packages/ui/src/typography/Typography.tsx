import type { HTMLAttributes } from 'react';
import { typographyStyles, type TypographyStyleProps } from './Typography.styles';

export type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'strong'
  | 'em'
  | 'small'
  | 'label'
  | 'blockquote'
  | 'code'
  | 'div';

export type TypographyProps = HTMLAttributes<HTMLElement> &
  TypographyStyleProps & { as?: TypographyElement };

export function Typography({
  as: Component = 'p',
  variant,
  weight,
  font,
  className,
  ...props
}: TypographyProps) {
  return (
    <Component {...props} className={typographyStyles({ variant, weight, font, className })} />
  );
}
