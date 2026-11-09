import { useId } from 'react';
import { Link, composeRenderProps, type LinkProps } from 'react-aria-components';
import { cardStyles, type CardStyleProps } from '../card/Card.styles';
import { CardContent, type CardContentProps } from '../card/Card';
import { anchorCardStyles } from './AnchorCard.styles';

// No `action` nor `children`: the whole card is one link, nothing interactive inside.
export type AnchorCardProps = Omit<LinkProps, 'children'> &
  CardStyleProps &
  Omit<CardContentProps, 'action' | 'children'>;

/** Card rendered as a single link (RAC `Link`, so `href` goes through `BLRouterProvider`). */
export function AnchorCard({
  heading,
  headingLevel,
  description,
  icon,
  image,
  metadata,
  padding,
  className,
  ...props
}: AnchorCardProps) {
  const headingId = useId();
  const descriptionId = useId();
  // Name the link by its heading, not by all of its text.
  const named = heading && !props['aria-label'];

  return (
    <Link
      aria-labelledby={named ? headingId : undefined}
      aria-describedby={named && description ? descriptionId : undefined}
      {...props}
      className={composeRenderProps(className, (className) =>
        cardStyles({ padding, className: anchorCardStyles({ className }) }),
      )}
    >
      <CardContent
        {...{ heading, headingLevel, description, icon, image, metadata, headingId, descriptionId }}
      />
    </Link>
  );
}
