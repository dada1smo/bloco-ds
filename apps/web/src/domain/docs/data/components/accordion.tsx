import { BLAccordion } from '@bloco/ui';
import type { Doc } from '../../types/doc';

const accordionItems = [
  {
    title: 'Install',
    content: 'Clone the repository and run pnpm install.',
    open: true,
  },
  { title: 'Run locally', content: 'Start the dev server with pnpm dev.' },
  {
    title: 'Build',
    content: 'pnpm build type-checks and writes a static site to dist.',
  },
];

export const accordionDoc: Doc = {
  slug: 'accordion',
  title: 'Accordion',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => <BLAccordion className="w-96" items={accordionItems} />,
    },
    {
      title: 'Multiple',
      render: () => (
        <BLAccordion
          className="w-96"
          allowsMultipleExpanded
          items={accordionItems}
        />
      ),
    },
  ],
};
