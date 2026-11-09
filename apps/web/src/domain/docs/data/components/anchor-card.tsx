import { FolderIcon } from '@phosphor-icons/react';
import { BLBadge, BLAnchorCard, BLGrid } from '@bloco/ui';
import type { Doc } from '../../types/doc';

export const anchorCardDoc: Doc = {
  slug: 'anchor-card',
  title: 'AnchorCard',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLAnchorCard
          className="max-w-reading"
          href="#"
          heading="Getting started"
          description="Install the package and import the theme."
        />
      ),
    },
    {
      title: 'Rich',
      render: () => (
        <BLAnchorCard
          className="max-w-reading"
          href="#"
          icon={<FolderIcon />}
          heading="Project Alpha"
          description="Internal dashboard for the billing team."
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
      title: 'Grid',
      render: () => (
        <BLGrid role="list">
          {['Billing dashboard', 'Marketing site', 'Mobile app', 'Design system'].map((name) => (
            <div key={name} role="listitem" className="col-span-4">
              <BLAnchorCard href="#" heading={name} headingLevel={2} description="Updated today" />
            </div>
          ))}
        </BLGrid>
      ),
    },
  ],
};
