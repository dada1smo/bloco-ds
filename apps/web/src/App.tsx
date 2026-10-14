import { useState } from 'react';
import { BLFileTree, BLThemeSwitch, type BLFileTreeItem } from '@bloco/ui';
import { demos } from './demos';

// Id do arquivo selecionado: "pasta/arquivo".
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
  const [selected, setSelected] = useState('button/levels.tsx');
  const [folder, file] = selected.split('/');
  const demo = demos[folder].find((d) => d.id === file);

  return (
    <main className="min-h-screen bg-background p-6 font-sans text-foreground">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">bloco-ds</h1>
        <BLThemeSwitch />
      </header>
      <div className="flex gap-8">
        <BLFileTree
          className="w-56 shrink-0"
          items={items}
          selectedId={selected}
          onSelect={setSelected}
        />
        <section className="flex flex-col gap-3">{demo?.render()}</section>
      </div>
    </main>
  );
}
