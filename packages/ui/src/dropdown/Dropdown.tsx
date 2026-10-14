import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import { Button } from '../button/Button';
import {
  dropdownGroupStyles,
  dropdownIconStyles,
  dropdownItemStyles,
  dropdownMenuStyles,
  dropdownStyles,
  dropdownTriggerStyles,
} from './Dropdown.styles';

export type DropdownItem = {
  label: string;
  icon?: ReactNode;
  /** Renders a link; without it, a button that uses `onClick`. */
  href?: string;
  onClick?: () => void;
};

export type DropdownProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Trigger content. */
  label: ReactNode;
  /** Groups of items, separated by a divider. */
  groups: DropdownItem[][];
  /** Hover needs `interestfor`; browsers without it fall back to click. */
  openOn?: 'click' | 'hover';
};

export function Dropdown({ label, groups, openOn = 'click', className, ...props }: DropdownProps) {
  const id = useId();
  const anchor = `--bl-dropdown-${id.replace(/\W/g, '')}`;
  const hover = openOn === 'hover';

  return (
    <div {...props} className={dropdownStyles({ className })}>
      <Button
        type="button"
        level="outline"
        className={dropdownTriggerStyles({ openOn })}
        style={{ anchorName: anchor } as React.CSSProperties}
        popoverTarget={id}
        popoverTargetAction={hover ? 'show' : undefined}
        {...(hover && { interestfor: id })}
      >
        {label}
        <CaretDownIcon className={dropdownIconStyles()} aria-hidden />
      </Button>
      <nav
        id={id}
        popover="auto"
        aria-label={typeof label === 'string' ? label : undefined}
        className={dropdownMenuStyles()}
        style={{ positionAnchor: anchor } as React.CSSProperties}
      >
        {groups.map((group, i) => (
          <ul key={i} role="list" className={dropdownGroupStyles()}>
            {group.map(({ label, icon, href, onClick }) => (
              <li key={label}>
                {href !== undefined ? (
                  <a href={href} onClick={onClick} className={dropdownItemStyles()}>
                    {icon}
                    {label}
                  </a>
                ) : (
                  <button type="button" onClick={onClick} className={dropdownItemStyles()}>
                    {icon}
                    {label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </div>
  );
}
