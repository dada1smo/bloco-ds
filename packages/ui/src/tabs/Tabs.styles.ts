import { cva } from 'class-variance-authority';

export const tabsStyles = cva('group flex flex-col data-[orientation=vertical]:flex-row font-sans text-body-01 text-primary');

export const tabListStyles = cva([
  'flex overflow-x-auto border-b border-subtle',
  'group-data-[orientation=vertical]:w-sidebar group-data-[orientation=vertical]:flex-none group-data-[orientation=vertical]:flex-col',
  'group-data-[orientation=vertical]:overflow-x-visible group-data-[orientation=vertical]:border-r group-data-[orientation=vertical]:border-b-0',
]);

export const tabStyles = cva([
  'flex min-h-control-lg cursor-pointer items-center border-b-2 border-transparent px-8 text-body-compact-01 whitespace-nowrap text-secondary outline-none',
  'group-data-[orientation=vertical]:border-r-2 group-data-[orientation=vertical]:border-b-0 group-data-[orientation=vertical]:py-4',
  'motion-safe:transition-colors data-hovered:bg-background-hover data-hovered:text-primary',
  'data-selected:border-interactive data-selected:text-primary',
  'data-disabled:cursor-not-allowed data-disabled:text-disabled data-disabled:data-hovered:bg-transparent',
  'data-focus-visible:-outline-offset-2 data-focus-visible:outline-2 data-focus-visible:outline-focus',
]);

export const tabPanelStyles = cva(
  'p-8 text-secondary outline-none data-focus-visible:outline-2 data-focus-visible:outline-focus',
);
