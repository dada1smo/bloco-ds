import type { ReactNode } from 'react';
import { CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react';
import { FieldError, Text } from 'react-aria-components';
import { fieldFeedbackIconStyles, fieldFeedbackStyles } from './FieldFeedback.styles';

export type FieldFeedbackProps = {
  status: 'error' | 'success';
  children?: ReactNode;
  className?: string;
};

/**
 * Validation message below a form field. Must be rendered inside a RAC field.
 * `error` shows only while the field is invalid; `success` is always shown.
 */
export function FieldFeedback({ status, children, className }: FieldFeedbackProps) {
  const Icon = status === 'error' ? WarningCircleIcon : CheckCircleIcon;
  const content = (
    <>
      <Icon className={fieldFeedbackIconStyles({ status })} weight="fill" aria-hidden />
      <span>{children}</span>
    </>
  );
  const classes = fieldFeedbackStyles({ status, className });
  return status === 'error' ? (
    <FieldError className={classes}>{content}</FieldError>
  ) : (
    <Text slot="description" className={classes}>
      {content}
    </Text>
  );
}
