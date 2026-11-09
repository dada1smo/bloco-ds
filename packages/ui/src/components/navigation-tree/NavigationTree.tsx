import type { ReactNode } from 'react';
import { CaretRightIcon } from '@phosphor-icons/react';
import {
  Button,
  Link,
  NavigationTree as RACNavigationTree,
  NavigationTreeItem as RACNavigationTreeItem,
  NavigationTreeItemContent,
  composeRenderProps,
  type NavigationTreeItemProps as RACNavigationTreeItemProps,
  type NavigationTreeProps as RACNavigationTreeProps,
} from 'react-aria-components';
import {
  navigationTreeChevronButtonStyles,
  navigationTreeChevronStyles,
  navigationTreeIconStyles,
  navigationTreeItemStyles,
  navigationTreeLinkStyles,
  navigationTreeStyles,
} from './NavigationTree.styles';

export type NavigationTreeProps<T extends object> = Omit<RACNavigationTreeProps<T>, 'className'> & {
  className?: string;
};

/** RAC `NavigationTree`: a hierarchy of links. `selectedRoute` marks the item whose `href` matches. */
export function NavigationTree<T extends object>({
  className,
  'aria-label': ariaLabel = 'Navigation',
  ...props
}: NavigationTreeProps<T>) {
  return (
    <RACNavigationTree
      {...props}
      aria-label={ariaLabel}
      className={composeRenderProps(className, (cls) => navigationTreeStyles({ className: cls }))}
    />
  );
}

export type NavigationTreeItemProps = Omit<
  RACNavigationTreeItemProps,
  'className' | 'children' | 'textValue'
> & {
  /** Row label. A string is also the accessible text value. */
  title: ReactNode;
  /** Optional leading icon (decorative). */
  icon?: ReactNode;
  /** Nested `NavigationTreeItem`s; makes this item expandable. */
  children?: ReactNode;
  className?: string;
};

/** Link row. With `href` it navigates; without it, pressing the row toggles its children. */
export function NavigationTreeItem({
  title,
  icon,
  children,
  className,
  href,
  id,
  ...props
}: NavigationTreeItemProps) {
  const text = typeof title === 'string' ? title : undefined;
  return (
    <RACNavigationTreeItem
      {...props}
      id={id ?? href ?? text}
      href={href}
      textValue={text ?? ''}
      className={composeRenderProps(className, (cls) => navigationTreeItemStyles({ className: cls }))}
    >
      <NavigationTreeItemContent>
        {({ hasChildItems }) => (
          <>
            {hasChildItems && (
              <Button slot="chevron" className={navigationTreeChevronButtonStyles()}>
                <CaretRightIcon className={navigationTreeChevronStyles()} aria-hidden />
              </Button>
            )}
            <Link className={navigationTreeLinkStyles()}>
              {icon && <span className={navigationTreeIconStyles()} aria-hidden>{icon}</span>}
              {title}
            </Link>
          </>
        )}
      </NavigationTreeItemContent>
      {children}
    </RACNavigationTreeItem>
  );
}
