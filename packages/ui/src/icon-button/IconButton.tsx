import { Button, type ButtonProps } from '../button/Button';

export type IconButtonProps = ButtonProps & { 'aria-label': string };

export function IconButton(props: IconButtonProps) {
  return <Button {...props} square />;
}
