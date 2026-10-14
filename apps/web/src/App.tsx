import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { BLFileTree, BLThemeSwitch, type BLFileTreeItem } from '@bloco/ui';
import { demos } from './demos';

const base = '/components';

const items: BLFileTreeItem[] = [
  {
    type: 'folder',
    label: 'components',
    open: true,
    items: Object.entries(demos).map(([folder, files]) => ({
      type: 'folder',
      label: folder,
      open: folder === 'button',
      items: files.map(({ id }) => ({
        type: 'file',
        id: `${folder}/${id}`,
        label: id,
      })),
    })),
  },
];

export function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background p-6 font-sans text-foreground">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-title font-bold">bloco-ds</h1>
        <BLThemeSwitch />
      </header>
      <div className="flex gap-8">
        <BLFileTree
          className="w-56 shrink-0"
          items={items}
          selectedId={decodeURIComponent(pathname).slice(base.length + 1)}
          onSelect={(id) => navigate(`${base}/${id}`)}
        />
        <section className="flex flex-col gap-3">
          <Routes>
            <Route path="/" element={<Navigate to={`${base}/button/levels.tsx`} replace />} />
            {Object.entries(demos).flatMap(([folder, files]) =>
              files.map(({ id, render }) => (
                <Route key={`${folder}/${id}`} path={`${base}/${folder}/${id}`} element={render()} />
              )),
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </section>
      </div>
    </main>
  );
}
