import { PrimitiveButton, type PrimitiveButtonProps } from '../primitive-button';
import { buttonStyles, type ButtonStyleProps } from './Button.styles';

export type ButtonProps = PrimitiveButtonProps & Omit<ButtonStyleProps, 'square'>;

export function Button({ level, color, size, className, ...props }: ButtonProps) {
  return <PrimitiveButton {...props} className={buttonStyles({ level, color, size, className })} />;
}
