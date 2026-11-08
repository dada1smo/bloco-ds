import { FileDashedIcon, GlobeIcon, PlusIcon, UsersIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import {
  BLAccordion, BLButton, BLButtonGroup, BLCluster, BLDropdown, BLGrid, BLIconButton, BLInput, BLModal, BLSelect, BLSidebar, BLStack,
  BLTypography, type BLDropdownItem,
} from '@bloco/ui';

const levels = ['solid', 'outline', 'subtle'] as const;
const colors = ['primary', 'accent'] as const;
const sizes = ['sm', 'md', 'lg'] as const;
const typeSet = [
  'heading-07', 'heading-06', 'heading-05', 'heading-04', 'heading-03', 'heading-02', 'heading-01',
  'heading-compact-02', 'heading-compact-01', 'body-02', 'body-01', 'body-compact-02', 'body-compact-01',
  'label-02', 'label-01', 'helper-text-01', 'code-02', 'code-01',
] as const;

// Classes literais para o Tailwind detectar.
const colorGroups: [string, string[]][] = [
  ['background', ['bg-background', 'bg-background-hover', 'bg-background-selected', 'bg-background-inverse']],
  ['layer', ['bg-layer-01', 'bg-layer-hover-01', 'bg-layer-selected-01', 'bg-layer-02', 'bg-layer-hover-02', 'bg-layer-selected-02', 'bg-layer-03', 'bg-layer-hover-03', 'bg-layer-selected-03']],
  ['field', ['bg-field-01', 'bg-field-hover-01', 'bg-field-02', 'bg-field-hover-02']],
  ['interactive', ['bg-interactive', 'bg-interactive-hover', 'bg-interactive-active']],
  ['accent', ['bg-accent', 'bg-accent-hover', 'bg-accent-subtle', 'bg-accent-subtle-hover']],
  ['support', ['bg-support-error', 'bg-support-success', 'bg-support-warning', 'bg-support-info', 'bg-support-error-subtle', 'bg-support-success-subtle', 'bg-support-warning-subtle', 'bg-support-info-subtle']],
  ['border', ['border-subtle', 'border-strong', 'border-interactive', 'border-accent', 'border-disabled']],
];
const textColors = [
  'text-primary', 'text-secondary', 'text-placeholder', 'text-helper', 'text-disabled', 'text-error',
  'text-accent', 'text-link-primary', 'text-icon-primary', 'text-icon-secondary',
];
const spacingScale = [
  ['01', 'w-0.5'], ['02', 'w-1'], ['03', 'w-2'], ['04', 'w-3'], ['05', 'w-4'], ['06', 'w-6'], ['07', 'w-8'],
  ['08', 'w-10'], ['09', 'w-12'], ['10', 'w-16'], ['11', 'w-20'], ['12', 'w-24'], ['13', 'w-40'],
];
const controlSizes = [
  ['xs', 'h-control-xs'], ['sm', 'h-control-sm'], ['md', 'h-control-md'], ['lg', 'h-control-lg'], ['xl', 'h-control-xl'],
];

const containers = [['prose', 'max-w-prose'], ['reading', 'max-w-reading'], ['page', 'max-w-page']];
// Linhas de composição do grid de 16 colunas (lg+); abaixo de lg cada célula ocupa a linha toda.
const gridRows = [
  ['lg:col-span-8', 'lg:col-span-8'],
  ['lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'],
  ['lg:col-span-12', 'lg:col-span-4'],
];

function Cell({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`flex h-control-lg items-center justify-center bg-layer-01 ${className}`}>
      <BLTypography variant="code-01" font="mono">{children}</BLTypography>
    </div>
  );
}

const accordionItems = [
  { title: 'Install', content: 'Clone the repository and run pnpm install.', open: true },
  { title: 'Run locally', content: 'Start the dev server with pnpm dev.' },
  { title: 'Build', content: 'pnpm build type-checks and writes a static site to dist.' },
];

const dropdownGroups: BLDropdownItem[][] = [
  [
    { label: 'Rename', href: '#' },
    { label: 'Duplicate', href: '#' },
    { label: 'Archive', href: '#' },
  ],
  [{ label: 'Delete', href: '#' }],
];

export type Demo = { id: string; render: () => ReactNode };

// Pasta -> arquivos: cada arquivo é uma demo exibida no painel.
export const demos: Record<string, Demo[]> = {
  foundations: [
    {
      id: 'color.tsx',
      render: () => (
        <>
          {colorGroups.map(([group, classes]) => (
            <div key={group} className="grid gap-2">
              <BLTypography variant="heading-02">{group}</BLTypography>
              <div className="flex flex-wrap gap-4">
                {classes.map((cls) => (
                  <div key={cls} className="grid w-40 gap-2">
                    <div className={`h-control-xl border ${cls.startsWith('border') ? `border-2 ${cls}` : `border-subtle ${cls}`}`} />
                    <BLTypography variant="code-01" font="mono">{cls}</BLTypography>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <BLTypography variant="heading-02">text</BLTypography>
          <div className="flex flex-wrap gap-4">
            {textColors.map((cls) => (
              <BLTypography key={cls} variant="body-01" className={cls}>
                {cls}
              </BLTypography>
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'spacing.tsx',
      render: () => (
        <>
          <BLTypography variant="heading-02">spacing 01–13</BLTypography>
          {spacingScale.map(([step, width]) => (
            <div key={step} className="flex items-center gap-4">
              <BLTypography variant="code-01" font="mono" className="w-24">
                {step} · {width.slice(2)}
              </BLTypography>
              <div className={`h-4 bg-interactive ${width}`} />
            </div>
          ))}
          <BLTypography variant="heading-02">control</BLTypography>
          <div className="flex items-end gap-4">
            {controlSizes.map(([size, height]) => (
              <div key={size} className={`flex w-16 items-center justify-center bg-layer-01 ${height}`}>
                <BLTypography variant="code-01" font="mono">{size}</BLTypography>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'layout.tsx',
      render: () => (
        <>
          <BLTypography variant="heading-02">container</BLTypography>
          {containers.map(([name, cls]) => (
            <div key={name} className={`h-control-sm bg-layer-01 px-4 ${cls}`}>
              <BLTypography variant="code-01" font="mono">{cls}</BLTypography>
            </div>
          ))}
        </>
      ),
    },
  ],
  grid: [
    {
      id: 'columns.tsx',
      render: () => (
        <BLGrid className="bg-layer-02">
          {Array.from({ length: 16 }, (_, i) => (
            <Cell key={i}>{i + 1}</Cell>
          ))}
          {gridRows.flat().map((cls, i) => (
            <Cell key={i} className={`col-span-full ${cls}`}>{cls}</Cell>
          ))}
        </BLGrid>
      ),
    },
    {
      id: 'responsive.tsx',
      render: () => (
        <BLGrid className="bg-layer-02">
          {Array.from({ length: 4 }, (_, i) => (
            <Cell key={i} className="col-span-4 h-control-xl">card {i + 1}</Cell>
          ))}
        </BLGrid>
      ),
    },
  ],
  stack: [
    {
      id: 'default.tsx',
      render: () => (
        <BLCluster gap="10" className="items-start">
          {(['1', '2', '3', '6', '10'] as const).map((gap) => (
            <BLStack key={gap} gap={gap} className="w-40">
              <BLTypography variant="code-01" font="mono">gap-{gap}</BLTypography>
              <Cell>a</Cell>
              <Cell>b</Cell>
              <Cell>c</Cell>
            </BLStack>
          ))}
        </BLCluster>
      ),
    },
  ],
  cluster: [
    {
      id: 'default.tsx',
      render: () => (
        <BLCluster className="max-w-reading">
          {['Rename', 'Duplicate', 'Archive', 'Move', 'Share', 'Export', 'Delete'].map((label) => (
            <BLButton key={label} level="outline">{label}</BLButton>
          ))}
        </BLCluster>
      ),
    },
  ],
  sidebar: [
    {
      id: 'default.tsx',
      render: () => (
        <BLSidebar side={<Cell className="h-control-xl">side · w-sidebar</Cell>}>
          <Cell className="h-control-xl">content · flex-1</Cell>
        </BLSidebar>
      ),
    },
  ],
  accordion: [
    { id: 'default.tsx', render: () => <BLAccordion className="w-96" items={accordionItems} /> },
    {
      id: 'multiple.tsx',
      render: () => <BLAccordion className="w-96" allowsMultipleExpanded items={accordionItems} />,
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
  'button-group': [
    {
      id: 'default.tsx',
      render: () => (
        <BLButtonGroup
          className="w-96"
          items={[
            { cols: 2, element: <BLButton>Cancel</BLButton> },
            { cols: 2, element: <BLButton>Save</BLButton> },
            { cols: 1, element: <BLButton level="outline">1</BLButton> },
            { cols: 3, element: <BLButton level="subtle">3</BLButton> },
          ]}
        />
      ),
    },
  ],
  'icon-button': [
    {
      id: 'variants.tsx',
      render: () =>
        sizes.map((size) => (
          <div key={size} className="flex items-center gap-2">
            {levels.map((level) => (
              <BLIconButton key={level} size={size} level={level} aria-label={`${size} ${level}`}>
                <PlusIcon />
              </BLIconButton>
            ))}
          </div>
        )),
    },
  ],
  dropdown: [
    {
      id: 'default.tsx',
      render: () => (
        <BLDropdown trigger={<BLButton level="outline">Share</BLButton>} groups={dropdownGroups} />
      ),
    },
  ],
  input: [
    {
      id: 'default.tsx',
      render: () => <BLInput label="Email" name="email" type="email" placeholder="you@example.com" />,
    },
    {
      id: 'states.tsx',
      render: () => (
        <BLCluster gap="6" className="items-start">
          <BLInput label="Helper" helperText="Your full name" />
          <BLInput label="Required" isRequired />
          <BLInput label="Error" isInvalid defaultValue="x" errorMessage="Invalid value" />
          <BLInput label="Success" defaultValue="Jane" successMessage="Looks good" />
          <BLInput label="Disabled" isDisabled placeholder="Not available" helperText="Locked" />
        </BLCluster>
      ),
    },
  ],
  select: [
    {
      id: 'default.tsx',
      render: () => (
        <BLSelect
          label="Country"
          name="country"
          defaultSelectedKey="br"
          options={[
            { value: 'br', label: 'Brazil' },
            { value: 'pt', label: 'Portugal' },
            { value: 'ar', label: 'Argentina' },
            { value: 'cl', label: 'Chile' },
          ]}
        />
      ),
    },
    {
      id: 'placeholder.tsx',
      render: () => (
        <BLSelect
          label="Sort by"
          placeholder="Choose an order"
          options={[
            { value: 'recent', label: 'Most recent' },
            { value: 'oldest', label: 'Oldest' },
            { value: 'name', label: 'Name' },
          ]}
        />
      ),
    },
    {
      id: 'disabled.tsx',
      render: () => (
        <div className="flex items-end gap-4">
          <BLSelect
            label="Plan"
            isDisabled
            defaultSelectedKey="free"
            options={[
              { value: 'free', label: 'Free' },
              { value: 'pro', label: 'Pro' },
            ]}
          />
          <BLSelect
            label="Size"
            defaultSelectedKey="m"
            disabledKeys={['xl']}
            options={[
              { value: 's', label: 'Small' },
              { value: 'm', label: 'Medium' },
              { value: 'l', label: 'Large' },
              { value: 'xl', label: 'Extra large (sold out)' },
            ]}
          />
        </div>
      ),
    },
    {
      id: 'feedback.tsx',
      render: () => {
        const options = [
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B', isDisabled: true },
        ];
        return (
          <div className="flex flex-wrap items-start gap-4">
            <BLSelect label="Helper" placeholder="Choose" helperText="Pick one option" options={options} />
            <BLSelect label="Error" isInvalid errorMessage="This field is required" options={options} />
            <BLSelect label="Success" defaultSelectedKey="a" successMessage="Looks good" options={options} />
            <BLSelect label="Disabled" isDisabled placeholder="Choose" helperText="Not available" options={options} />
          </div>
        );
      },
    },
    {
      id: 'rich.tsx',
      render: () => (
        <BLSelect
          label="Status"
          name="status"
          defaultSelectedKey="review"
          options={[
            { value: 'draft', label: 'Draft', description: 'Only visible to you', icon: <FileDashedIcon /> },
            { value: 'review', label: 'In review', description: 'Shared with your team', icon: <UsersIcon /> },
            { value: 'published', label: 'Published', description: 'Live on the site', icon: <GlobeIcon /> },
          ]}
        />
      ),
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
          actions={[
            { cols: 2, element: <BLButton level="outline" slot="close" autoFocus>Keep editing</BLButton> },
            { cols: 2, element: <BLButton slot="close">Discard</BLButton> },
          ]}
        />
      ),
    },
  ],
  typography: [
    {
      id: 'variants.tsx',
      render: () =>
        typeSet.map((variant) => (
          <BLTypography key={variant} variant={variant} font={variant.startsWith('code') ? 'mono' : 'sans'}>
            {variant}
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
