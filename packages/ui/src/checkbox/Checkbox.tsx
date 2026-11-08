import { CheckIcon, MinusIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import {
  CheckboxButton,
  CheckboxField,
  type CheckboxFieldProps as RACCheckboxProps,
} from 'react-aria-components';
import { FieldFeedback } from '../field-feedback/FieldFeedback';
import { fieldLabelRequiredStyles } from '../field-label/FieldLabel.styles';
import { FieldHelperText } from '../field-helper-text/FieldHelperText';
import {
  checkboxBoxStyles,
  checkboxFieldStyles,
  checkboxIconStyles,
  checkboxLabelStyles,
  checkboxStyles,
} from './Checkbox.styles';

export type CheckboxProps = Omit<RACCheckboxProps, 'children' | 'className'> & {
  label?: ReactNode;
  helperText?: string;
  /** Shown instead of the helper text while the field is invalid (`isInvalid` or native validation). */
  errorMessage?: string;
  /** Shown instead of the helper text while the field is valid. */
  successMessage?: string;
  className?: string;
};

/** RAC `CheckboxField` + `CheckboxButton`: boolean (or indeterminate) choice with a visible label. */
export function Checkbox({
  label,
  helperText,
  errorMessage,
  successMessage,
  className,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxField {...props} className={checkboxFieldStyles({ className })}>
      {({ isInvalid, isDisabled, isRequired, isIndeterminate }) => (
        <>
          <CheckboxButton className={checkboxStyles()}>
            {({ isSelected }) => (
              <>
                <span aria-hidden className={checkboxBoxStyles()}>
                  {isIndeterminate ? (
                    <MinusIcon weight="bold" className={checkboxIconStyles()} />
                  ) : (
                    isSelected && <CheckIcon weight="bold" className={checkboxIconStyles()} />
                  )}
                </span>
                {label && (
                  <span className={checkboxLabelStyles()}>
                    {label}
                    {isRequired && (
                      <span className={fieldLabelRequiredStyles()} aria-hidden>
                        *
                      </span>
                    )}
                  </span>
                )}
              </>
            )}
          </CheckboxButton>
          {!isDisabled && isInvalid && errorMessage ? (
            <FieldFeedback status="error">{errorMessage}</FieldFeedback>
          ) : !isDisabled && !isInvalid && successMessage ? (
            <FieldFeedback status="success">{successMessage}</FieldFeedback>
          ) : (
            helperText && <FieldHelperText>{helperText}</FieldHelperText>
          )}
        </>
      )}
    </CheckboxField>
  );
}
