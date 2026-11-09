import { PlusIcon } from '@phosphor-icons/react';
import { BLIconButton } from '@bloco/ui';
import type { Doc } from '../../types/doc';
import { levels, sizes } from '../shared';

export const iconButtonDoc: Doc = {
  slug: 'icon-button',
  title: 'IconButton',
  layer: 'components',
  examples: [
    {
      title: 'Variants',
      render: () =>
        sizes.map((size) => (
          <div key={size} className="flex items-center gap-2">
            {levels.map((level) => (
              <BLIconButton
                key={level}
                size={size}
                level={level}
                aria-label={`${size} ${level}`}
              >
                <PlusIcon />
              </BLIconButton>
            ))}
          </div>
        )),
    },
  ],
};
