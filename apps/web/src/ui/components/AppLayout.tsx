import type { ReactNode } from 'react';
import { ListIcon } from '@phosphor-icons/react';
import { BLAppShell, BLCluster, BLIconButton, BLThemeSwitch, BLTypography, useBLAppShell } from '@bloco/ui';

function MenuToggle() {
  const { toggleSidebar } = useBLAppShell('left');
  return (
    <BLIconButton level="subtle" aria-label="Toggle navigation" onPress={toggleSidebar}>
      <ListIcon />
    </BLIconButton>
  );
}

export type AppLayoutProps = { title: string; sidebar: ReactNode; children: ReactNode };

// Shell do app: header (menu, título, tema), sidebar recebida pronta e a área de conteúdo.
export function AppLayout({ title, sidebar, children }: AppLayoutProps) {
  return (
    <BLAppShell
      header={
        <BLCluster gap="3" className="w-full flex-nowrap px-4">
          <MenuToggle />
          <BLTypography as="span" variant="heading-compact-02">
            {title}
          </BLTypography>
          <BLThemeSwitch className="ml-auto" />
        </BLCluster>
      }
      sidebarLeft={sidebar}
    >
      <div className="p-6">{children}</div>
    </BLAppShell>
  );
}
