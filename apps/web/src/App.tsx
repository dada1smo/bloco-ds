import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  BLNavigationTree,
  BLNavigationTreeItem,
  BLRouterProvider,
  BLSidebar,
  BLStack,
  BLThemeSwitch,
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

export function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const folder = pathname.split('/')[2] ?? 'button';

  return (
    <main className="min-h-screen bg-background p-8 font-sans text-primary">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-heading-04">bloco-ds</h1>
        <BLThemeSwitch />
      </header>
      <BLRouterProvider navigate={navigate}>
        <BLSidebar
          side={
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
          <BLStack gap="4">
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
          </BLStack>
        </BLSidebar>
      </BLRouterProvider>
    </main>
  );
}
