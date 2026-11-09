import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import {
  Menu,
  MenuItem,
  MenuSection,
  MenuTrigger,
  Popover,
  type MenuItemProps,
  type MenuTriggerProps,
} from 'react-aria-components';
import { Button, type ButtonProps } from '../button/Button';
import {
  dropdownIconStyles,
  dropdownItemStyles,
  dropdownMenuStyles,
  dropdownPopoverStyles,
  dropdownSectionStyles,
} from './Dropdown.styles';

export type DropdownItem = { label: string; icon?: ReactNode } & Omit<
  MenuItemProps,
  'children' | 'className' | 'id' | 'textValue'
>;

export type DropdownProps = Omit<MenuTriggerProps, 'children' | 'trigger'> & {
  /** A single `BLButton`; any other element throws. Dropdown appends the caret. */
  trigger: ReactElement<Extract<ButtonProps, { as?: 'button' }> & { children?: ReactNode }>;
  /** Groups of items, separated by a divider. */
  groups: DropdownItem[][];
  className?: string;
};

/** RAC `MenuTrigger` + `Menu`. Items take `onAction` or `href`. */
export function Dropdown({ trigger, groups, className, ...props }: DropdownProps) {
  if (!isValidElement(trigger) || trigger.type !== Button) {
    throw new Error('Dropdown: `trigger` must be a single <BLButton> element.');
  }
  const { children } = trigger.props;

  return (
    <MenuTrigger {...props}>
      {cloneElement(
        trigger,
        {},
        children,
        <CaretDownIcon className={dropdownIconStyles()} aria-hidden />,
      )}
      <Popover placement="bottom start" offset={6} className={dropdownPopoverStyles({ className })}>
        <Menu
          aria-label={typeof children === 'string' ? children : undefined}
          className={dropdownMenuStyles()}
        >
          {groups.map((group, i) => (
            <MenuSection key={i} className={dropdownSectionStyles()}>
              {group.map(({ label, icon, ...item }) => (
                <MenuItem key={label} id={label} textValue={label} {...item} className={dropdownItemStyles()}>
                  {icon}
                  {label}
                </MenuItem>
              ))}
            </MenuSection>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
