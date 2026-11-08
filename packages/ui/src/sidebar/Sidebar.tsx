import type { ComponentProps, ReactNode } from 'react';
import { sidebarContentStyles, sidebarSideStyles, sidebarStyles } from './Sidebar.styles';

export type SidebarProps = ComponentProps<'div'> & {
  /** Trilho lateral (navegação). Fica acima do conteúdo abaixo de `md`. */
  side: ReactNode;
};

/** Trilho de largura fixa (`w-sidebar`) ao lado do conteúdo, que ocupa o resto. */
export function Sidebar({ side, children, className, ...props }: SidebarProps) {
  return (
    <div {...props} className={sidebarStyles({ className })}>
      <div className={sidebarSideStyles()}>{side}</div>
      <div className={sidebarContentStyles()}>{children}</div>
    </div>
  );
}
