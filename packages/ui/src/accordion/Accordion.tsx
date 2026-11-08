import type { ReactNode } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import {
  Button,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
  type DisclosureGroupProps,
} from 'react-aria-components';
import {
  accordionChevronStyles,
  accordionContentStyles,
  accordionHeadingStyles,
  accordionItemStyles,
  accordionPanelStyles,
  accordionStyles,
  accordionTriggerStyles,
} from './Accordion.styles';

export type AccordionItem = {
  title: ReactNode;
  content: ReactNode;
  open?: boolean;
};

export type AccordionProps = Omit<DisclosureGroupProps, 'children' | 'className'> & {
  items: AccordionItem[];
  className?: string;
};

/**
 * RAC `DisclosureGroup`. Exclusive by default; `allowsMultipleExpanded` lets several stay open.
 * Item keys are the index as a string (`'0'`, `'1'`…): RAC drops a numeric `0` id.
 */
export function Accordion({ items, className, defaultExpandedKeys, ...props }: AccordionProps) {
  return (
    <DisclosureGroup
      {...props}
      defaultExpandedKeys={defaultExpandedKeys ?? items.flatMap(({ open }, i) => (open ? [String(i)] : []))}
      className={accordionStyles({ className })}
    >
      {items.map(({ title, content }, i) => (
        <Disclosure key={i} id={String(i)} className={accordionItemStyles()}>
          <Heading className={accordionHeadingStyles()}>
            <Button slot="trigger" className={accordionTriggerStyles()}>
              {title}
              <CaretDownIcon className={accordionChevronStyles()} aria-hidden />
            </Button>
          </Heading>
          <DisclosurePanel className={accordionPanelStyles()}>
            <div className={accordionContentStyles()}>{content}</div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
}
