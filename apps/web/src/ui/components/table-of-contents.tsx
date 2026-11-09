import { BLStack, BLTypography } from '@bloco/ui';

export type TableOfContentsItem = { id: string; title: string };

// Índice "Nesta página": âncoras para os h2 da página. `<a>` simples porque `#id` não passa pelo router.
export function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
  return (
    <nav aria-label="Nesta página" className="p-6">
      <BLStack gap="3">
        <BLTypography as="h2" variant="heading-compact-01">
          Nesta página
        </BLTypography>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-body-compact-01 text-secondary hover:text-primary">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </BLStack>
    </nav>
  );
}
