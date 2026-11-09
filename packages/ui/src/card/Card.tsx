import { useId, type HTMLAttributes, type ReactNode } from 'react';
import {
  cardActionStyles,
  cardDescriptionStyles,
  cardHeaderStyles,
  cardHeadingStyles,
  cardIconStyles,
  cardImageStyles,
  cardMetadataStyles,
  cardStyles,
  type CardStyleProps,
} from './Card.styles';

export type CardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> &
  CardStyleProps & {
    /** `section` makes a standalone card a region landmark, named by `heading` (or `aria-label`). Keep `div` inside lists. */
    as?: 'div' | 'section';
    heading?: ReactNode;
    /** Pick by the page outline, not by size. */
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    description?: ReactNode;
    /** Decorative icon (hidden from assistive tech). */
    icon?: ReactNode;
    /** `alt` defaults to `''` (decorative). */
    image?: { src: string; alt?: string };
    /** A single control in the top-right corner; its label must name this card. */
    action?: ReactNode;
    /** Supplemental info at the bottom (date, author, badges). */
    metadata?: ReactNode;
  };

export function Card({
  as: Component = 'div',
  heading,
  headingLevel = 3,
  description,
  icon,
  image,
  action,
  metadata,
  padding,
  className,
  children,
  ...props
}: CardProps) {
  const headingId = useId();
  const Heading = `h${headingLevel}` as const;
  const labelledBy = Component === 'section' && heading && !props['aria-label'] ? headingId : undefined;

  return (
    <Component aria-labelledby={labelledBy} {...props} className={cardStyles({ padding, className })}>
      {image ? <img src={image.src} alt={image.alt ?? ''} className={cardImageStyles()} /> : null}
      {icon ? (
        <span aria-hidden className={cardIconStyles()}>
          {icon}
        </span>
      ) : null}
      {heading || description ? (
        <div className={cardHeaderStyles({ withAction: !!action })}>
          {heading ? (
            <Heading id={headingId} className={cardHeadingStyles()}>
              {heading}
            </Heading>
          ) : null}
          {description ? <p className={cardDescriptionStyles()}>{description}</p> : null}
        </div>
      ) : null}
      {/* after the heading so focus order follows reading order */}
      {action ? <div className={cardActionStyles()}>{action}</div> : null}
      {children}
      {metadata ? <div className={cardMetadataStyles()}>{metadata}</div> : null}
    </Component>
  );
}
