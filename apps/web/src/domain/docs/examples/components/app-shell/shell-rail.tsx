import { ChartBarIcon, GearIcon, HouseIcon } from '@phosphor-icons/react';
import { BLButton, BLIconButton, BLStack, useBLAppShell } from '@bloco/ui';

const railItems = [
  { label: 'Home', icon: <HouseIcon /> },
  { label: 'Reports', icon: <ChartBarIcon /> },
  { label: 'Settings', icon: <GearIcon /> },
];

// Rail: recolhida mostra só ícones; expandida, ícone + rótulo.
export function ShellRail() {
  const { state } = useBLAppShell('left');
  return (
    <nav aria-label="Main">
      <BLStack gap="1">
        {railItems.map(({ label, icon }) =>
          state === 'collapsed' ? (
            <BLIconButton key={label} level="subtle" aria-label={label}>
              {icon}
            </BLIconButton>
          ) : (
            <BLButton key={label} level="subtle" className="justify-start">
              {icon}
              {label}
            </BLButton>
          ),
        )}
      </BLStack>
    </nav>
  );
}
