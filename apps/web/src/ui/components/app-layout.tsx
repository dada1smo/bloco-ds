import type { ReactNode } from 'react';
import { BLAppShell } from '@bloco/ui';
import { AppHeader } from './app-header';

export type AppLayoutProps = { title: string; sidebar: ReactNode; aside?: ReactNode; children: ReactNode };

// Shell do app: header, sidebar recebida pronta, aside opcional à direita e a área de conteúdo.
export function AppLayout({ title, sidebar, aside, children }: AppLayoutProps) {
  return (
    <BLAppShell header={<AppHeader title={title} />} sidebarLeft={sidebar} sidebarRight={aside}>
      <div className="p-6">{children}</div>
    </BLAppShell>
  );
}
