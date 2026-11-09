import { BLAppShell } from '@bloco/ui';
import { ShellContent } from './shell-content';
import { ShellDetails } from './shell-details';
import { ShellHeader } from './shell-header';

export function AppShellRightOnly() {
  return (
    <BLAppShell className="h-96!" header={<ShellHeader right />} sidebarRight={<ShellDetails />}>
      <ShellContent />
    </BLAppShell>
  );
}
