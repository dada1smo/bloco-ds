import {
  Button as RACButton,
  Link,
  composeRenderProps,
  type ButtonProps as RACButtonProps,
  type LinkProps,
} from 'react-aria-components';
import { buttonStyles, type ButtonStyleProps } from './Button.styles';

export type ButtonProps = (({ as?: 'button' } & RACButtonProps) | ({ as: 'a' } & LinkProps)) &
  Omit<ButtonStyleProps, 'square'>;

/** RAC `Button`, or RAC `Link` when `as="a"`, styled with `buttonStyles`. */
export function Button({
  level,
  color,
  size,
  square,
  ...props
}: ButtonProps & Pick<ButtonStyleProps, 'square'>) {
  const styles = { level, color, size, square };
  if (props.as === 'a') {
    const { as: _as, className, ...rest } = props;
    return (
      <Link
        {...rest}
        className={composeRenderProps(className, (className) => buttonStyles({ ...styles, className }))}
      />
    );
  }
  const { as: _as, className, ...rest } = props;
  return (
    <RACButton
      {...rest}
      className={composeRenderProps(className, (className) => buttonStyles({ ...styles, className }))}
    />
  );
}
