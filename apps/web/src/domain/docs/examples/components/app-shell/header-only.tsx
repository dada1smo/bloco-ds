import { BLAppShell } from '@bloco/ui';
import { ShellContent } from './shell-content';
import { ShellHeader } from './shell-header';

export function AppShellHeaderOnly() {
  return (
    <BLAppShell className="h-96!" header={<ShellHeader />}>
      <ShellContent />
    </BLAppShell>
  );
}
