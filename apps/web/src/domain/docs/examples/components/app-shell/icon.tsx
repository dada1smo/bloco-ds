import { BLAppShell } from '@bloco/ui';
import { ShellContent } from './shell-content';
import { ShellHeader } from './shell-header';
import { ShellRail } from './shell-rail';

export function AppShellIcon() {
  return (
    <BLAppShell
      className="h-96!"
      header={<ShellHeader left />}
      sidebarLeft={<ShellRail />}
      leftCollapsible="icon"
      defaultLeftOpen={false}
    >
      <ShellContent />
    </BLAppShell>
  );
}
