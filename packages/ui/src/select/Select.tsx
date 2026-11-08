import type { ReactNode } from 'react';
import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react';
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select as RACSelect,
  SelectValue,
  Text,
  type SelectProps as RACSelectProps,
} from 'react-aria-components';
import { FieldFeedback } from '../field-feedback/FieldFeedback';
import { FieldHelperText } from '../field-helper-text/FieldHelperText';
import { FieldLabel } from '../field-label/FieldLabel';
import {
  selectCaretStyles,
  selectCheckStyles,
  selectFieldStyles,
  selectListBoxStyles,
  selectOptionBodyStyles,
  selectOptionDescStyles,
  selectOptionIconStyles,
  selectOptionStyles,
  selectPopoverStyles,
  selectStyles,
  selectValueStyles,
} from './Select.styles';

export type SelectOption = {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  isDisabled?: boolean;
};

export type SelectProps = Omit<RACSelectProps<SelectOption>, 'children' | 'className'> & {
  label?: string;
  helperText?: string;
  /** Shown instead of the helper text while the field is invalid (`isInvalid` or native validation). */
  errorMessage?: string;
  /** Shown instead of the helper text while the field is valid. */
  successMessage?: string;
  options: SelectOption[];
  className?: string;
};

/** RAC `Select` + `ListBox`. The closed button shows the icon and label, not the description. */
export function Select({
  label,
  helperText,
  errorMessage,
  successMessage,
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <RACSelect {...props} className={selectFieldStyles({ className })}>
      {({ isInvalid, isDisabled }) => (
        <>
          {label && <FieldLabel>{label}</FieldLabel>}
          <Button className={selectStyles()}>
            <SelectValue<SelectOption> className={selectValueStyles()}>
              {({ selectedItem, defaultChildren }) =>
                selectedItem ? (
                  <>
                    {selectedItem.icon && (
                      <span className={selectOptionIconStyles()} aria-hidden>
                        {selectedItem.icon}
                      </span>
                    )}
                    {selectedItem.label}
                  </>
                ) : (
                  defaultChildren
                )
              }
            </SelectValue>
            <CaretDownIcon className={selectCaretStyles()} aria-hidden />
          </Button>
          <Popover offset={6} className={selectPopoverStyles()}>
            <ListBox items={options} className={selectListBoxStyles()}>
              {(option) => (
                <ListBoxItem
                  id={option.value}
                  textValue={option.label}
                  isDisabled={option.isDisabled}
                  className={selectOptionStyles()}>
                  <CheckIcon className={selectCheckStyles()} weight="bold" aria-hidden />
                  {option.icon && (
                    <span className={selectOptionIconStyles()} aria-hidden>
                      {option.icon}
                    </span>
                  )}
                  <span className={selectOptionBodyStyles()}>
                    <Text slot="label">{option.label}</Text>
                    {option.description && (
                      <Text slot="description" className={selectOptionDescStyles()}>
                        {option.description}
                      </Text>
                    )}
                  </span>
                </ListBoxItem>
              )}
            </ListBox>
          </Popover>
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
    </RACSelect>
  );
}
