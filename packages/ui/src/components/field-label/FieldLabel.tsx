import { Label, type LabelProps } from 'react-aria-components';
import { fieldLabelStyles, fieldLabelRequiredStyles } from './FieldLabel.styles';

export type FieldLabelProps = Omit<LabelProps, 'className'> & {
  className?: string;
  /** Visual marker only; the field itself exposes `aria-required` through its own `isRequired`. */
  isRequired?: boolean;
};

/** Visible label of a form field. Must be rendered inside a RAC field, which wires it to the control. */
export function FieldLabel({ className, isRequired, children, ...props }: FieldLabelProps) {
  return (
    <Label {...props} className={fieldLabelStyles({ className })}>
      {children}
      {isRequired && (
        <span className={fieldLabelRequiredStyles()} aria-hidden>
          *
        </span>
      )}
    </Label>
  );
}
