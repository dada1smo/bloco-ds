import type { HTMLAttributes, ReactNode } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import {
  accordionChevronStyles,
  accordionItemStyles,
  accordionPanelStyles,
  accordionStyles,
  accordionSummaryStyles,
} from './Accordion.styles';

export type AccordionItem = {
  title: ReactNode;
  content: ReactNode;
  open?: boolean;
};

export type AccordionProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  items: AccordionItem[];
  /** Exclusive mode: opening one item closes the others (native `<details name>`). */
  name?: string;
};

export function Accordion({ items, name, className, ...props }: AccordionProps) {
  return (
    <div {...props} className={accordionStyles({ className })}>
      {items.map(({ title, content, open }, i) => (
        <details key={i} name={name} open={open} className={accordionItemStyles()}>
          <summary className={accordionSummaryStyles()}>
            {title}
            <CaretDownIcon className={accordionChevronStyles()} aria-hidden />
          </summary>
          <div className={accordionPanelStyles()}>{content}</div>
        </details>
      ))}
    </div>
  );
}
