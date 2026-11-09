import { BLButton } from '@bloco/ui';
import type { Doc } from '../../types/doc';
import { levels, colors, sizes } from '../shared';

export const buttonDoc: Doc = {
  slug: 'button',
  title: 'Button',
  layer: 'components',
  examples: [
    {
      title: 'Levels',
      render: () =>
        colors.map((color) => (
          <div key={color} className="flex items-center gap-2">
            {levels.map((level) => (
              <BLButton key={level} level={level} color={color}>
                {color} {level}
              </BLButton>
            ))}
          </div>
        )),
    },
    {
      title: 'Sizes',
      render: () => (
        <div className="flex items-center gap-2">
          {sizes.map((size) => (
            <BLButton key={size} size={size}>
              {size}
            </BLButton>
          ))}
        </div>
      ),
    },
  ],
};
