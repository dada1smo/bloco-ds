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

export function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
              aria-label="Components"
              selectedRoute={pathname}
              defaultExpandedKeys={['components', pathname.split('/')[2] ?? 'button']}
            >
              <BLNavigationTreeItem title="components" id="components">
                {Object.entries(demos).map(([folder, files]) => (
                  <BLNavigationTreeItem key={folder} title={folder} id={folder}>
                    {files.map(({ id }) => (
                      <BLNavigationTreeItem key={id} title={id} href={`${base}/${folder}/${id}`} />
                    ))}
                  </BLNavigationTreeItem>
                ))}
              </BLNavigationTreeItem>
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
