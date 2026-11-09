import { InfoIcon, ListIcon } from '@phosphor-icons/react';
import { BLIconButton, useBLAppShell } from '@bloco/ui';

// O toggle usa o hook do lado que controla.
export function ShellToggle({ side }: { side: 'left' | 'right' }) {
  const { toggleSidebar, state } = useBLAppShell(side);
  return (
    <BLIconButton
      level="subtle"
      aria-label={`${state === 'expanded' ? 'Collapse' : 'Expand'} ${side} sidebar`}
      onPress={toggleSidebar}
    >
      {side === 'left' ? <ListIcon /> : <InfoIcon />}
    </BLIconButton>
  );
}
