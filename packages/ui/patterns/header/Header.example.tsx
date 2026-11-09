import { ListIcon, MountainsIcon } from '@phosphor-icons/react';
import {
  BLAppShell,
  BLCluster,
  BLDropdown,
  BLButton,
  BLIconButton,
  BLThemeSwitch,
  BLTypography,
  useBLAppShell,
} from '@bloco/ui';

function MenuToggle() {
  const { toggleSidebar } = useBLAppShell('left');
  return (
    <BLIconButton level="subtle" aria-label="Toggle navigation" onPress={toggleSidebar}>
      <ListIcon />
    </BLIconButton>
  );
}

function HeaderContent() {
  return (
    <BLCluster gap="3" className="w-full flex-nowrap px-4">
      <MenuToggle />
      <MountainsIcon size={32} aria-hidden />
      <BLTypography as="span" variant="heading-compact-02">
        Acme
      </BLTypography>
      <BLCluster gap="2" className="ml-auto flex-nowrap">
        <BLDropdown
          trigger={<BLButton level="subtle">Account</BLButton>}
          groups={[[{ label: 'Profile', href: '#profile' }], [{ label: 'Sign out', href: '#sign-out' }]]}
        />
        <BLThemeSwitch />
      </BLCluster>
    </BLCluster>
  );
}

export function HeaderExample() {
  return (
    <BLAppShell
      className="h-96!"
      header={<HeaderContent />}
      sidebarLeft={<nav aria-label="Main" />}
    >
      <BLTypography className="p-6">Page content</BLTypography>
    </BLAppShell>
  );
}
