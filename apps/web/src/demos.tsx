import type { ReactNode } from 'react';
import { BLButton, BLTypography } from '@bloco/ui';

const levels = ['solid', 'outline', 'subtle'] as const;
const colors = ['primary', 'accent'] as const;
const sizes = ['sm', 'md', 'lg'] as const;
const typographySizes = ['headline', 'title', 'subtitle', 'body', 'caption'] as const;

export type Demo = { id: string; render: () => ReactNode };

// Pasta -> arquivos: cada arquivo é uma demo exibida no painel.
export const demos: Record<string, Demo[]> = {
  button: [
    {
      id: 'levels.tsx',
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
      id: 'sizes.tsx',
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
  typography: [
    {
      id: 'sizes.tsx',
      render: () =>
        typographySizes.map((size) => (
          <BLTypography key={size} size={size}>
            {size}
          </BLTypography>
        )),
    },
    {
      id: 'fonts.tsx',
      render: () => (
        <>
          <BLTypography font="sans">sans</BLTypography>
          <BLTypography font="mono">mono</BLTypography>
        </>
      ),
    },
  ],
};
