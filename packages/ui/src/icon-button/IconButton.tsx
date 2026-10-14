import { buttonStyles, type ButtonStyleProps } from '../button/Button.styles';
import { PrimitiveButton, type PrimitiveButtonProps } from '../primitive-button';

export type IconButtonProps = PrimitiveButtonProps &
  Omit<ButtonStyleProps, 'square'> & { 'aria-label': string };

export function IconButton({ level, color, size, className, ...props }: IconButtonProps) {
  return (
    <PrimitiveButton
      {...props}
      className={buttonStyles({ level, color, size, square: true, className })}
    />
  );
}
