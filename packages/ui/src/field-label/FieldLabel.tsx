import { Label, type LabelProps } from 'react-aria-components';
import { fieldLabelStyles } from './FieldLabel.styles';

export type FieldLabelProps = Omit<LabelProps, 'className'> & { className?: string };

/** Visible label of a form field. Must be rendered inside a RAC field, which wires it to the control. */
export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return <Label {...props} className={fieldLabelStyles({ className })} />;
}
