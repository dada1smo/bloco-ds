import type { ReactNode } from 'react';
import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react';
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as RACSelect,
  SelectValue,
  Text,
  type SelectProps as RACSelectProps,
} from 'react-aria-components';
import {
  selectCaretStyles,
  selectCheckStyles,
  selectFieldStyles,
  selectLabelStyles,
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
};

export type SelectProps = Omit<RACSelectProps<SelectOption>, 'children' | 'className'> & {
  label?: string;
  options: SelectOption[];
  className?: string;
};

/** RAC `Select` + `ListBox`. The closed button shows the icon and label, not the description. */
export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <RACSelect {...props} className={selectFieldStyles({ className })}>
      {label && <Label className={selectLabelStyles()}>{label}</Label>}
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
            <ListBoxItem id={option.value} textValue={option.label} className={selectOptionStyles()}>
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
    </RACSelect>
  );
}
