import type { ReactNode } from 'react';
import { BLAccordion, BLButton, BLDropdown, BLModal, BLTypography, type BLDropdownItem } from '@bloco/ui';

const levels = ['solid', 'outline', 'subtle'] as const;
const colors = ['primary', 'accent'] as const;
const sizes = ['sm', 'md', 'lg'] as const;
const typographySizes = ['headline', 'title', 'subtitle', 'body', 'caption'] as const;

const accordionItems = [
  { title: 'Install', content: 'Clone the repository and run pnpm install.', open: true },
  { title: 'Run locally', content: 'Start the dev server with pnpm dev.' },
  { title: 'Build', content: 'pnpm build type-checks and writes a static site to dist.' },
];

const dropdownGroups: BLDropdownItem[][] = [
  [
    { label: 'Rename', as: 'a', href: '#' },
    { label: 'Duplicate', as: 'a', href: '#' },
    { label: 'Archive', as: 'a', href: '#' },
  ],
  [{ label: 'Delete', as: 'a', href: '#' }],
];

export type Demo = { id: string; render: () => ReactNode };

// Pasta -> arquivos: cada arquivo é uma demo exibida no painel.
export const demos: Record<string, Demo[]> = {
  accordion: [
    { id: 'default.tsx', render: () => <BLAccordion className="w-96" items={accordionItems} /> },
    {
      id: 'exclusive.tsx',
      render: () => <BLAccordion className="w-96" name="demo" items={accordionItems} />,
    },
  ],
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
  dropdown: [
    {
      id: 'click.tsx',
      render: () => (
        <BLDropdown trigger={<BLButton level="outline">Share</BLButton>} groups={dropdownGroups} />
      ),
    },
    {
      id: 'hover.tsx',
      render: () => <BLDropdown trigger={<BLButton level="outline">Options</BLButton>} openOn="hover" groups={dropdownGroups} />,
    },
  ],
  modal: [
    {
      id: 'default.tsx',
      render: () => (
        <BLModal
          trigger={<BLButton level="outline">Discard changes</BLButton>}
          title="Discard unsaved changes?"
          description="Your edits to this draft will be lost. This can't be undone."
          actions={
            <>
              <BLButton level="outline" autoFocus>Keep editing</BLButton>
              <BLButton>Discard</BLButton>
            </>
          }
        />
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
