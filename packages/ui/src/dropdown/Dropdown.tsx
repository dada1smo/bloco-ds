import {
  cloneElement,
  isValidElement,
  useId,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import { Button, type ButtonProps } from '../button/Button';
import { PrimitiveButton, type PrimitiveButtonProps } from '../primitive-button';
import {
  dropdownGroupStyles,
  dropdownIconStyles,
  dropdownItemStyles,
  dropdownMenuStyles,
  dropdownStyles,
  dropdownTriggerStyles,
} from './Dropdown.styles';

// Distributes over the `as` union so `href`/`type` stay tied to it.
type ItemOf<P> = P extends unknown
  ? { label: string; icon?: ReactNode } & Omit<P, 'children' | 'className'>
  : never;

export type DropdownItem = ItemOf<PrimitiveButtonProps>;

export type DropdownProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** A single `BLButton`; any other element throws. Dropdown wires the popover props. */
  trigger: ReactElement<Extract<ButtonProps, { as?: 'button' }>>;
  /** Groups of items, separated by a divider. */
  groups: DropdownItem[][];
  /** Hover needs `interestfor`; browsers without it fall back to click. */
  openOn?: 'click' | 'hover';
};

export function Dropdown({ trigger, groups, openOn = 'click', className, ...props }: DropdownProps) {
  const id = useId();
  const anchor = `--bl-dropdown-${id.replace(/\W/g, '')}`;
  const hover = openOn === 'hover';

  if (!isValidElement(trigger) || trigger.type !== Button) {
    throw new Error('Dropdown: `trigger` must be a single <BLButton> element.');
  }
  const { children, className: triggerClassName, style } = trigger.props;

  return (
    <div {...props} className={dropdownStyles({ className })}>
      {cloneElement(
        trigger,
        {
          type: 'button',
          className: dropdownTriggerStyles({ openOn, className: triggerClassName }),
          style: { ...style, anchorName: anchor } as CSSProperties,
          popoverTarget: id,
          popoverTargetAction: hover ? 'show' : undefined,
          ...(hover && { interestfor: id }),
        } as object,
        children,
        <CaretDownIcon className={dropdownIconStyles()} aria-hidden />,
      )}
      <nav
        id={id}
        popover="auto"
        aria-label={typeof children === 'string' ? children : undefined}
        className={dropdownMenuStyles()}
        style={{ positionAnchor: anchor } as React.CSSProperties}
      >
        {groups.map((group, i) => (
          <ul key={i} role="list" className={dropdownGroupStyles()}>
            {group.map(({ label, icon, ...item }) => (
              <li key={label}>
                <PrimitiveButton {...item} className={dropdownItemStyles()}>
                  {icon}
                  {label}
                </PrimitiveButton>
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </div>
  );
}
