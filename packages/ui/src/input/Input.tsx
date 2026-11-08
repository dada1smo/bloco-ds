import { Input as RACInput, TextField, type TextFieldProps } from 'react-aria-components';
import { FieldFeedback } from '../field-feedback/FieldFeedback';
import { FieldHelperText } from '../field-helper-text/FieldHelperText';
import { FieldLabel } from '../field-label/FieldLabel';
import { inputFieldStyles, inputStyles } from './Input.styles';

export type InputProps = Omit<TextFieldProps, 'children' | 'className'> & {
  label?: string;
  helperText?: string;
  /** Shown instead of the helper text while the field is invalid (`isInvalid` or native validation). */
  errorMessage?: string;
  /** Shown instead of the helper text while the field is valid. */
  successMessage?: string;
  placeholder?: string;
  className?: string;
};

/** RAC `TextField` + `Input`: single-line text field. */
export function Input({
  label,
  helperText,
  errorMessage,
  successMessage,
  placeholder,
  className,
  ...props
}: InputProps) {
  return (
    <TextField {...props} className={inputFieldStyles({ className })}>
      {({ isInvalid, isDisabled, isRequired }) => (
        <>
          {label && <FieldLabel isRequired={isRequired}>{label}</FieldLabel>}
          <RACInput placeholder={placeholder} className={inputStyles()} />
          {/* Feedback replaces the helper text while visible; error wins over success; none when disabled */}
          {!isDisabled && isInvalid && errorMessage ? (
            <FieldFeedback status="error">{errorMessage}</FieldFeedback>
          ) : !isDisabled && !isInvalid && successMessage ? (
            <FieldFeedback status="success">{successMessage}</FieldFeedback>
          ) : (
            helperText && <FieldHelperText>{helperText}</FieldHelperText>
          )}
        </>
      )}
    </TextField>
  );
}
