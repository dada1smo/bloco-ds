import type { ReactNode } from 'react';
import {
  SwitchButton,
  SwitchField,
  type SwitchFieldProps as RACSwitchProps,
} from 'react-aria-components';
import { FieldFeedback } from '../field-feedback/FieldFeedback';
import { fieldLabelRequiredStyles } from '../field-label/FieldLabel.styles';
import { FieldHelperText } from '../field-helper-text/FieldHelperText';
import {
  switchFieldStyles,
  switchLabelStyles,
  switchStyles,
  switchThumbStyles,
  switchTrackStyles,
} from './Switch.styles';

export type SwitchProps = Omit<RACSwitchProps, 'children' | 'className'> & {
  label?: ReactNode;
  helperText?: string;
  /** Shown instead of the helper text while the field is invalid (`isInvalid` or native validation). */
  errorMessage?: string;
  /** Shown instead of the helper text while the field is valid. */
  successMessage?: string;
  className?: string;
};

/** RAC `SwitchField` + `SwitchButton`: on/off setting with a visible label. */
export function Switch({
  label,
  helperText,
  errorMessage,
  successMessage,
  className,
  ...props
}: SwitchProps) {
  return (
    <SwitchField {...props} className={switchFieldStyles({ className })}>
      {({ isInvalid, isDisabled, isRequired }) => (
        <>
          <SwitchButton className={switchStyles()}>
            <span aria-hidden className={switchTrackStyles()}>
              <span className={switchThumbStyles()} />
            </span>
            {label && (
              <span className={switchLabelStyles()}>
                {label}
                {isRequired && (
                  <span className={fieldLabelRequiredStyles()} aria-hidden>
                    *
                  </span>
                )}
              </span>
            )}
          </SwitchButton>
          {!isDisabled && isInvalid && errorMessage ? (
            <FieldFeedback status="error">{errorMessage}</FieldFeedback>
          ) : !isDisabled && !isInvalid && successMessage ? (
            <FieldFeedback status="success">{successMessage}</FieldFeedback>
          ) : (
            helperText && <FieldHelperText>{helperText}</FieldHelperText>
          )}
        </>
      )}
    </SwitchField>
  );
}
