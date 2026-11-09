import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ListIcon } from '@phosphor-icons/react';
import {
  BLAppShell,
  BLCluster,
  BLIconButton,
  BLNavigationTree,
  BLNavigationTreeItem,
  BLRouterProvider,
  BLThemeSwitch,
  BLTypography,
  useBLAppShell,
} from '@bloco/ui';
import { demos } from './demos';

const base = '/components';

// As três camadas do DS na mesma árvore; toda pasta que não é foundations nem patterns é componente.
const entries = Object.entries(demos);
const layers = [
  { id: 'foundations', folders: entries.filter(([f]) => f === 'foundations') },
  { id: 'components', folders: entries.filter(([f]) => f !== 'foundations' && f !== 'patterns') },
  { id: 'patterns', folders: entries.filter(([f]) => f === 'patterns') },
];
const layerOf = (folder: string) => (folder === 'foundations' || folder === 'patterns' ? folder : 'components');

function MenuToggle() {
  const { toggleSidebar } = useBLAppShell('left');
  return (
    <BLIconButton level="subtle" aria-label="Toggle navigation" onPress={toggleSidebar}>
      <ListIcon />
    </BLIconButton>
  );
}

const header = (
  <BLCluster gap="3" className="w-full flex-nowrap px-4">
    <MenuToggle />
    <BLTypography as="span" variant="heading-compact-02">
      bloco-ds
    </BLTypography>
    <BLThemeSwitch className="ml-auto" />
  </BLCluster>
);

export function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const folder = pathname.split('/')[2] ?? 'button';

  return (
      <BLRouterProvider navigate={navigate}>
        <BLAppShell
          header={header}
          sidebarLeft={
            <BLNavigationTree
              aria-label="Design system"
              selectedRoute={pathname}
              defaultExpandedKeys={[layerOf(folder), folder]}
            >
              {layers.map(({ id, folders }) => (
                <BLNavigationTreeItem key={id} title={id} id={id}>
                  {folders.map(([name, files]) => {
                    const items = files.map(({ id: file }) => (
                      <BLNavigationTreeItem key={file} title={file} href={`${base}/${name}/${file}`} />
                    ));
                    // foundations e patterns listam os arquivos direto; components agrupa por pasta
                    return id === 'components' ? (
                      <BLNavigationTreeItem key={name} title={name} id={name}>
                        {items}
                      </BLNavigationTreeItem>
                    ) : (
                      items
                    );
                  })}
                </BLNavigationTreeItem>
              ))}
            </BLNavigationTree>
          }
        >
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Navigate to={`${base}/button/levels.tsx`} replace />} />
              {Object.entries(demos).flatMap(([folder, files]) =>
                files.map(({ id, render }) => (
                  <Route
                    key={`${folder}/${id}`}
                    path={`${base}/${folder}/${id}`}
                    element={render()}
                  />
                )),
              )}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </BLAppShell>
      </BLRouterProvider>
  );
}
