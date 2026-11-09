import { ChartBarIcon, GearIcon, HouseIcon, InfoIcon, ListIcon } from '@phosphor-icons/react';
import {
  BLAppShell,
  BLButton,
  BLCluster,
  BLIconButton,
  BLNavigationTree,
  BLNavigationTreeItem,
  BLStack,
  BLTypography,
  useBLAppShell,
} from '@bloco/ui';
import type { Doc } from '../../types/doc';

// AppShell: só os componentes de dentro decidem o conteúdo; o toggle usa o hook do lado que controla.
function ShellToggle({ side }: { side: 'left' | 'right' }) {
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

function ShellHeader({
  left = false,
  right = false,
}: {
  left?: boolean;
  right?: boolean;
}) {
  return (
    <BLCluster gap="3" className="w-full flex-nowrap">
      {left && <ShellToggle side="left" />}
      <BLTypography variant="heading-compact-02" className={left ? '' : 'pl-4'}>
        Acme
      </BLTypography>
      {right && (
        <BLCluster className="ml-auto">
          <ShellToggle side="right" />
        </BLCluster>
      )}
    </BLCluster>
  );
}

const shellNav = (
  <BLNavigationTree aria-label="Main" className="py-2">
    <BLNavigationTreeItem title="Overview" href="#overview" />
    <BLNavigationTreeItem title="Projects" href="#projects" />
    <BLNavigationTreeItem title="Settings" href="#settings" />
  </BLNavigationTree>
);

const shellDetails = (
  <BLStack gap="2" className="p-6">
    <BLTypography variant="heading-compact-01">Details</BLTypography>
    <BLTypography variant="body-compact-01">Owner: Ana Souza</BLTypography>
    <BLTypography variant="body-compact-01">Updated 2 hours ago</BLTypography>
  </BLStack>
);

const shellContent = (
  <BLStack gap="4" className="p-6">
    <BLTypography variant="heading-03">Projects</BLTypography>
    <BLTypography variant="body-01">
      The content area takes whatever space the sidebars leave.
    </BLTypography>
  </BLStack>
);

const railItems = [
  { label: 'Home', icon: <HouseIcon /> },
  { label: 'Reports', icon: <ChartBarIcon /> },
  { label: 'Settings', icon: <GearIcon /> },
];

// Rail: recolhida mostra só ícones; expandida, ícone + rótulo.
function ShellRail() {
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

export const appShellDoc: Doc = {
  slug: 'app-shell',
  title: 'AppShell',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLAppShell
          className="h-96!"
          header={<ShellHeader left right />}
          sidebarLeft={shellNav}
          sidebarRight={shellDetails}
        >
          {shellContent}
        </BLAppShell>
      ),
    },
    {
      title: 'Header only',
      render: () => (
        <BLAppShell className="h-96!" header={<ShellHeader />}>
          {shellContent}
        </BLAppShell>
      ),
    },
    {
      title: 'Icon',
      render: () => (
        <BLAppShell
          className="h-96!"
          header={<ShellHeader left />}
          sidebarLeft={<ShellRail />}
          leftCollapsible="icon"
          defaultLeftOpen={false}
        >
          {shellContent}
        </BLAppShell>
      ),
    },
    {
      title: 'Right only',
      render: () => (
        <BLAppShell
          className="h-96!"
          header={<ShellHeader right />}
          sidebarRight={shellDetails}
        >
          {shellContent}
        </BLAppShell>
      ),
    },
  ],
};
