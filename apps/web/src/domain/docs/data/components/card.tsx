import { DotsThreeIcon, FolderIcon } from '@phosphor-icons/react';
import { BLBadge, BLCard, BLIconButton, BLStack, BLTypography } from '@bloco/ui';
import type { Doc } from '../../types/doc';
import { colors } from '../shared';

export const cardDoc: Doc = {
  slug: 'card',
  title: 'Card',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLCard
          className="max-w-reading"
          heading="Design tokens"
          description="Semantic colors, type set and spacing shared by every component."
        />
      ),
    },
    {
      title: 'Paddings',
      render: () => (
        <BLStack gap="6" className="max-w-reading">
          {(['md', 'sm', 'none'] as const).map((padding) => (
            <BLStack key={padding} gap="2">
              <BLTypography variant="code-01" font="mono">
                {padding}
              </BLTypography>
              <BLCard padding={padding} heading="Design tokens" description="Semantic colors and spacing." />
            </BLStack>
          ))}
        </BLStack>
      ),
    },
    {
      title: 'Rich',
      render: () => (
        <BLCard
          className="max-w-reading"
          icon={<FolderIcon />}
          heading="Project Alpha"
          description="Internal dashboard for the billing team."
          action={
            <BLIconButton level="subtle" size="sm" aria-label="More options for Project Alpha">
              <DotsThreeIcon />
            </BLIconButton>
          }
          metadata={
            <>
              <BLBadge status="success">Active</BLBadge>
              <span>Updated 2 days ago</span>
            </>
          }
        />
      ),
    },
    {
      title: 'Image',
      render: () => (
        <BLCard
          className="max-w-reading"
          image={{ src: 'https://picsum.photos/seed/bloco/640/320' }}
          heading="Release 2.0"
          description="New layout primitives and an open-density type set."
        />
      ),
    },
    {
      title: 'Section',
      render: () => (
        <BLCard as="section" headingLevel={2} className="max-w-reading" heading="Usage this month">
          <BLTypography>1,240 of 2,000 build minutes used.</BLTypography>
        </BLCard>
      ),
    },
    {
      title: 'List',
      render: () => (
        <BLStack gap="4" role="list" className="max-w-reading">
          {['Billing dashboard', 'Marketing site', 'Mobile app'].map((name) => (
            <BLCard key={name} role="listitem" padding="sm" description={name} metadata="Updated today" />
          ))}
        </BLStack>
      ),
    },
  ],
};
