import { Link as RACLink, composeRenderProps, type LinkProps as RACLinkProps } from 'react-aria-components';
import { linkStyles } from './Link.styles';

export type LinkProps = RACLinkProps;

/** Inline text link (RAC `Link`, so `href` goes through `BLRouterProvider`). */
export function Link({ className, ...props }: LinkProps) {
  return (
    <RACLink
      {...props}
      className={composeRenderProps(className, (className) => linkStyles({ className }))}
    />
  );
}
