import { BLCluster, BLThemeSwitch, BLTypography } from '@bloco/ui';
import { MenuToggle } from './menu-toggle';

// Header do app: menu, título e troca de tema.
export function AppHeader({ title }: { title: string }) {
  return (
    <BLCluster gap="3" className="w-full flex-nowrap px-4">
      <MenuToggle />
      <BLTypography as="span" variant="heading-compact-02">
        {title}
      </BLTypography>
      <BLThemeSwitch className="ml-auto" />
    </BLCluster>
  );
}
