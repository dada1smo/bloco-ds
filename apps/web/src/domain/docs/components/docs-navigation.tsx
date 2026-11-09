import { BLNavigationTree, BLNavigationTreeItem } from '@bloco/ui';
import { docs } from '../data/docs';
import type { DocLayer } from '../types/doc';

const layers: { id: DocLayer; title: string }[] = [
  { id: 'foundations', title: 'Foundations' },
  { id: 'components', title: 'Components' },
  { id: 'patterns', title: 'Patterns' },
];

// As três camadas do DS, uma página por item: /<layer>/<slug>.
export function DocsNavigation({ pathname }: { pathname: string }) {
  const layer = pathname.split('/')[1] || 'components';

  return (
    <BLNavigationTree aria-label="Design system" selectedRoute={pathname} defaultExpandedKeys={[layer]}>
      {layers.map(({ id, title }) => (
        <BLNavigationTreeItem key={id} title={title} id={id}>
          {docs
            .filter((doc) => doc.layer === id)
            .map((doc) => (
              <BLNavigationTreeItem key={doc.slug} title={doc.title} href={`/${doc.layer}/${doc.slug}`} />
            ))}
        </BLNavigationTreeItem>
      ))}
    </BLNavigationTree>
  );
}
