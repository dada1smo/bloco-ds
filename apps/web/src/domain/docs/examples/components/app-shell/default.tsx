import { BLAppShell, BLNavigationTree, BLNavigationTreeItem } from '@bloco/ui';
import { ShellContent } from './shell-content';
import { ShellDetails } from './shell-details';
import { ShellHeader } from './shell-header';

export function AppShellDefault() {
  return (
    <BLAppShell
      className="h-96!"
      header={<ShellHeader left right />}
      sidebarLeft={
        <BLNavigationTree aria-label="Main" className="py-2">
          <BLNavigationTreeItem title="Overview" href="#overview" />
          <BLNavigationTreeItem title="Projects" href="#projects" />
          <BLNavigationTreeItem title="Settings" href="#settings" />
        </BLNavigationTree>
      }
      sidebarRight={<ShellDetails />}
    >
      <ShellContent />
    </BLAppShell>
  );
}
