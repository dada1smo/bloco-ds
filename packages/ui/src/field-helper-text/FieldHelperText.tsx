import { Text, type TextProps } from 'react-aria-components';
import { fieldHelperTextStyles } from './FieldHelperText.styles';

export type FieldHelperTextProps = Omit<TextProps, 'className' | 'slot'> & { className?: string };

/** Help text below a form field; exposed as the control's accessible description. */
export function FieldHelperText({ className, ...props }: FieldHelperTextProps) {
  return <Text {...props} slot="description" className={fieldHelperTextStyles({ className })} />;
}
