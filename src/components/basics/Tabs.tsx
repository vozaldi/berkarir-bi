'use client';

import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import React from 'react';
import styles from '@/styles/css/tabs.module.css';
import clsx from 'clsx';

export type TabNavItem = {
  /**
   * Tab key. The value must be unique
   */
  tab: string;
  label?: string | React.ReactNode;
  content?: React.ReactNode;
  props?: Partial<BaseTabs.Tab.Props>;
};

type Props = React.ComponentProps<typeof BaseTabs.Root> & {
  tabs: Array<TabNavItem>;
  initialTab?: string;
  tabsClassName?: HTMLDivElement['className'];
  tabItemClassName?: HTMLDivElement['className'] | ((active: boolean, index: number) => HTMLDivElement['className']);
  indicatorClassName?: HTMLDivElement['className'];
  contentClassName?: HTMLDivElement['className'];
};

function Tabs({
  tabs,
  className,
  initialTab,
  tabsClassName,
  tabItemClassName,
  indicatorClassName,
  contentClassName,
  ...props
}: Props) {
  return (
    <BaseTabs.Root
      className={clsx([styles.Tabs, className])}
      defaultValue={initialTab}
      {...props}
    >
      <BaseTabs.List className={clsx([styles.List, tabsClassName])}>
        {tabs.map(({ tab, label, props }, index) => {
          const { className, ...tabItemProps } = props || {};

          return (
            <BaseTabs.Tab
              key={tab}
              className={clsx([
                styles.Tab,
                'function' === typeof tabItemClassName
                  ? tabItemClassName(false, index)
                  : tabItemClassName,
                className,
              ])}
              value={tab}
              {...tabItemProps}
            >
              {label}
            </BaseTabs.Tab>
          );  
        })}

        <BaseTabs.Indicator className={clsx([styles.Indicator, indicatorClassName])} />
      </BaseTabs.List>

      {tabs.map((item) => (
        <BaseTabs.Panel
          key={item.tab}
          className={clsx([styles.Panel, contentClassName])}
          value={item.tab}
        >
          {item.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
};

export type TabsProps = Props;

export default Tabs;
