import type { ReactNode } from 'react';
import { Tab, TabList, TabPanel, Tabs as RACTabs, type TabsProps as RACTabsProps } from 'react-aria-components';
import { tabListStyles, tabPanelStyles, tabStyles, tabsStyles } from './Tabs.styles';

export type TabsItem = {
  title: ReactNode;
  content: ReactNode;
  isDisabled?: boolean;
};

export type TabsProps = Omit<RACTabsProps, 'children' | 'className'> & {
  items: TabsItem[];
  /** Accessible name of the tab list; required when no visible heading labels it. */
  'aria-label'?: string;
  className?: string;
};

/**
 * RAC `Tabs`. Tab keys are the index as a string (`'0'`, `'1'`…) — use them in
 * `selectedKey` / `defaultSelectedKey`: RAC drops a numeric `0` id.
 */
export function Tabs({ items, className, 'aria-label': ariaLabel, ...props }: TabsProps) {
  return (
    <RACTabs {...props} className={tabsStyles({ className })}>
      <TabList aria-label={ariaLabel} className={tabListStyles()}>
        {items.map(({ title, isDisabled }, i) => (
          <Tab key={i} id={String(i)} isDisabled={isDisabled} className={tabStyles()}>
            {title}
          </Tab>
        ))}
      </TabList>
      {items.map(({ content }, i) => (
        <TabPanel key={i} id={String(i)} className={tabPanelStyles()}>
          {content}
        </TabPanel>
      ))}
    </RACTabs>
  );
}
