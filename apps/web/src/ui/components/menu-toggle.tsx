import { ListIcon } from '@phosphor-icons/react';
import { BLIconButton, useBLAppShell } from '@bloco/ui';

// Abre e fecha a sidebar esquerda do AppShell.
export function MenuToggle() {
  const { toggleSidebar } = useBLAppShell('left');
  return (
    <BLIconButton level="subtle" aria-label="Toggle navigation" onPress={toggleSidebar}>
      <ListIcon />
    </BLIconButton>
  );
}
