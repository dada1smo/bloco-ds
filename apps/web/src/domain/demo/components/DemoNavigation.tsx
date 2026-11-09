import { BLNavigationTree, BLNavigationTreeItem } from '@bloco/ui';
import { demos } from '../data/demos';

const base = '/components';

// As três camadas do DS na mesma árvore; toda pasta que não é foundations nem patterns é componente.
const entries = Object.entries(demos);
const layers = [
  { id: 'foundations', folders: entries.filter(([f]) => f === 'foundations') },
  { id: 'components', folders: entries.filter(([f]) => f !== 'foundations' && f !== 'patterns') },
  { id: 'patterns', folders: entries.filter(([f]) => f === 'patterns') },
];
const layerOf = (folder: string) => (folder === 'foundations' || folder === 'patterns' ? folder : 'components');

export function DemoNavigation({ pathname }: { pathname: string }) {
  const folder = pathname.split('/')[2] ?? 'button';

  return (
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
  );
}
