import {
  ChartBarIcon,
  DotsThreeIcon,
  FileDashedIcon,
  FolderIcon,
  GearIcon,
  GlobeIcon,
  HouseIcon,
  InfoIcon,
  ListIcon,
  PlusIcon,
  UsersIcon,
} from '@phosphor-icons/react';
import { useState, type ReactNode } from 'react';
import {
  BLAppShell,
  BLAccordion,
  BLBadge,
  BLButton,
  BLButtonGroup,
  BLCard,
  BLCheckbox,
  BLCluster,
  BLDropdown,
  BLForm,
  BLGrid,
  BLIconButton,
  BLInput,
  BLNavigationTree,
  BLNavigationTreeItem,
  BLModal,
  BLSelect,
  BLSidebar,
  BLStack,
  BLSwitch,
  BLTable,
  BLTabs,
  BLToast,
  BLTooltip,
  BLTypography,
  blToastQueue,
  useBLAppShell,
  type BLDropdownItem,
  type BLTableRow,
} from '@bloco/ui';
import { HeaderExample } from '../../../../../../packages/ui/patterns/header/Header.example';
import type { Demo } from '../types/demo';

const levels = ['solid', 'outline', 'subtle'] as const;
const colors = ['primary', 'accent'] as const;
const sizes = ['sm', 'md', 'lg'] as const;
const tabsItems = [
  { title: 'Overview', content: 'A summary of the project and its status.' },
  { title: 'Activity', content: 'Recent changes made by the team.' },
  { title: 'Settings', content: 'Name, visibility and members.' },
];
const tableColumns = [
  { id: 'name', title: 'Name', isRowHeader: true, allowsSorting: true },
  { id: 'role', title: 'Role', allowsSorting: true },
  { id: 'status', title: 'Status' },
];
const tableRows: BLTableRow[] = [
  {
    id: '1',
    name: 'Ana Souza',
    role: 'Designer',
    status: <BLBadge status="success">Active</BLBadge>,
  },
  {
    id: '2',
    name: 'Bruno Lima',
    role: 'Engineer',
    status: <BLBadge status="warning">Invited</BLBadge>,
  },
  {
    id: '3',
    name: 'Carla Dias',
    role: 'Product manager',
    status: <BLBadge>Inactive</BLBadge>,
  },
];

function SortableTable() {
  const [sort, setSort] = useState<{
    column: string | number;
    direction: 'ascending' | 'descending';
  }>({
    column: 'name',
    direction: 'ascending',
  });
  const rows = [...tableRows].sort((a, b) => {
    const order = String(a[sort.column]).localeCompare(String(b[sort.column]));
    return sort.direction === 'ascending' ? order : -order;
  });
  return (
    <BLTable
      className="max-w-reading"
      aria-label="Team members"
      columns={tableColumns}
      rows={rows}
      sortDescriptor={sort}
      onSortChange={setSort}
    />
  );
}

const kinds = ['info', 'success', 'warning', 'error'] as const;
const badgeStatuses = ['neutral', ...kinds] as const;
const typeSet = [
  'heading-07',
  'heading-06',
  'heading-05',
  'heading-04',
  'heading-03',
  'heading-02',
  'heading-01',
  'heading-compact-02',
  'heading-compact-01',
  'body-02',
  'body-01',
  'body-compact-02',
  'body-compact-01',
  'label-02',
  'label-01',
  'helper-text-01',
  'code-02',
  'code-01',
] as const;

// Classes literais para o Tailwind detectar.
const colorGroups: [string, string[]][] = [
  [
    'background',
    [
      'bg-background',
      'bg-background-hover',
      'bg-background-selected',
      'bg-background-inverse',
    ],
  ],
  [
    'layer',
    [
      'bg-layer-01',
      'bg-layer-hover-01',
      'bg-layer-selected-01',
      'bg-layer-02',
      'bg-layer-hover-02',
      'bg-layer-selected-02',
      'bg-layer-03',
      'bg-layer-hover-03',
      'bg-layer-selected-03',
    ],
  ],
  [
    'field',
    ['bg-field-01', 'bg-field-hover-01', 'bg-field-02', 'bg-field-hover-02'],
  ],
  [
    'interactive',
    ['bg-interactive', 'bg-interactive-hover', 'bg-interactive-active'],
  ],
  [
    'accent',
    [
      'bg-accent',
      'bg-accent-hover',
      'bg-accent-subtle',
      'bg-accent-subtle-hover',
    ],
  ],
  [
    'support',
    [
      'bg-support-error',
      'bg-support-success',
      'bg-support-warning',
      'bg-support-info',
      'bg-support-error-subtle',
      'bg-support-success-subtle',
      'bg-support-warning-subtle',
      'bg-support-info-subtle',
    ],
  ],
  [
    'border',
    [
      'border-subtle',
      'border-strong',
      'border-interactive',
      'border-accent',
      'border-disabled',
    ],
  ],
];
const textColors = [
  'text-primary',
  'text-secondary',
  'text-placeholder',
  'text-helper',
  'text-disabled',
  'text-error',
  'text-accent',
  'text-link-primary',
  'text-icon-primary',
  'text-icon-secondary',
];
const spacingScale = [
  ['01', 'w-0.5'],
  ['02', 'w-1'],
  ['03', 'w-2'],
  ['04', 'w-3'],
  ['05', 'w-4'],
  ['06', 'w-6'],
  ['07', 'w-8'],
  ['08', 'w-10'],
  ['09', 'w-12'],
  ['10', 'w-16'],
  ['11', 'w-20'],
  ['12', 'w-24'],
  ['13', 'w-40'],
];
const controlSizes = [
  ['xs', 'h-control-xs'],
  ['sm', 'h-control-sm'],
  ['md', 'h-control-md'],
  ['lg', 'h-control-lg'],
  ['xl', 'h-control-xl'],
];

const containers = [
  ['prose', 'max-w-prose'],
  ['reading', 'max-w-reading'],
  ['page', 'max-w-page'],
];
// Linhas de composição do grid de 16 colunas (lg+); abaixo de lg cada célula ocupa a linha toda.
const gridRows = [
  ['lg:col-span-8', 'lg:col-span-8'],
  ['lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'],
  ['lg:col-span-12', 'lg:col-span-4'],
];

function Cell({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex h-control-lg items-center justify-center bg-layer-01 ${className}`}
    >
      <BLTypography variant="code-01" font="mono">
        {children}
      </BLTypography>
    </div>
  );
}

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

const dropdownGroups: BLDropdownItem[][] = [
  [
    { label: 'Rename', href: '#' },
    { label: 'Duplicate', href: '#' },
    { label: 'Archive', href: '#' },
  ],
  [{ label: 'Delete', href: '#' }],
];

// AppShell: só os componentes de dentro decidem o conteúdo; o toggle usa o hook do lado que controla.
function ShellToggle({ side }: { side: 'left' | 'right' }) {
  const { toggleSidebar, state } = useBLAppShell(side);
  return (
    <BLIconButton
      level="subtle"
      aria-label={`${state === 'expanded' ? 'Collapse' : 'Expand'} ${side} sidebar`}
      onPress={toggleSidebar}
    >
      {side === 'left' ? <ListIcon /> : <InfoIcon />}
    </BLIconButton>
  );
}

function ShellHeader({
  left = false,
  right = false,
}: {
  left?: boolean;
  right?: boolean;
}) {
  return (
    <BLCluster gap="3" className="w-full flex-nowrap">
      {left && <ShellToggle side="left" />}
      <BLTypography variant="heading-compact-02" className={left ? '' : 'pl-4'}>
        Acme
      </BLTypography>
      {right && (
        <BLCluster className="ml-auto">
          <ShellToggle side="right" />
        </BLCluster>
      )}
    </BLCluster>
  );
}

const shellNav = (
  <BLNavigationTree aria-label="Main" className="py-2">
    <BLNavigationTreeItem title="Overview" href="#overview" />
    <BLNavigationTreeItem title="Projects" href="#projects" />
    <BLNavigationTreeItem title="Settings" href="#settings" />
  </BLNavigationTree>
);

const shellDetails = (
  <BLStack gap="2" className="p-6">
    <BLTypography variant="heading-compact-01">Details</BLTypography>
    <BLTypography variant="body-compact-01">Owner: Ana Souza</BLTypography>
    <BLTypography variant="body-compact-01">Updated 2 hours ago</BLTypography>
  </BLStack>
);

const shellContent = (
  <BLStack gap="4" className="p-6">
    <BLTypography variant="heading-03">Projects</BLTypography>
    <BLTypography variant="body-01">
      The content area takes whatever space the sidebars leave.
    </BLTypography>
  </BLStack>
);

const railItems = [
  { label: 'Home', icon: <HouseIcon /> },
  { label: 'Reports', icon: <ChartBarIcon /> },
  { label: 'Settings', icon: <GearIcon /> },
];

// Rail: recolhida mostra só ícones; expandida, ícone + rótulo.
function ShellRail() {
  const { state } = useBLAppShell('left');
  return (
    <nav aria-label="Main">
      <BLStack gap="1">
        {railItems.map(({ label, icon }) =>
          state === 'collapsed' ? (
            <BLIconButton key={label} level="subtle" aria-label={label}>
              {icon}
            </BLIconButton>
          ) : (
            <BLButton key={label} level="subtle" className="justify-start">
              {icon}
              {label}
            </BLButton>
          ),
        )}
      </BLStack>
    </nav>
  );
}

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
                    <div
                      className={`h-control-xl border ${cls.startsWith('border') ? `border-2 ${cls}` : `border-subtle ${cls}`}`}
                    />
                    <BLTypography variant="code-01" font="mono">
                      {cls}
                    </BLTypography>
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
              <div
                key={size}
                className={`flex w-16 items-center justify-center bg-layer-01 ${height}`}
              >
                <BLTypography variant="code-01" font="mono">
                  {size}
                </BLTypography>
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
              <BLTypography variant="code-01" font="mono">
                {cls}
              </BLTypography>
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
            <Cell key={i} className={`col-span-full ${cls}`}>
              {cls}
            </Cell>
          ))}
        </BLGrid>
      ),
    },
    {
      id: 'responsive.tsx',
      render: () => (
        <BLGrid className="bg-layer-02">
          {Array.from({ length: 4 }, (_, i) => (
            <Cell key={i} className="col-span-4 h-control-xl">
              card {i + 1}
            </Cell>
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
              <BLTypography variant="code-01" font="mono">
                gap-{gap}
              </BLTypography>
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
          {[
            'Rename',
            'Duplicate',
            'Archive',
            'Move',
            'Share',
            'Export',
            'Delete',
          ].map((label) => (
            <BLButton key={label} level="outline">
              {label}
            </BLButton>
          ))}
        </BLCluster>
      ),
    },
  ],
  sidebar: [
    {
      id: 'default.tsx',
      render: () => (
        <BLSidebar
          side={<Cell className="h-control-xl">side · w-sidebar</Cell>}
        >
          <Cell className="h-control-xl">content · flex-1</Cell>
        </BLSidebar>
      ),
    },
  ],
  'app-shell': [
    {
      id: 'default.tsx',
      render: () => (
        <BLAppShell
          className="h-96!"
          header={<ShellHeader left right />}
          sidebarLeft={shellNav}
          sidebarRight={shellDetails}
        >
          {shellContent}
        </BLAppShell>
      ),
    },
    {
      id: 'header-only.tsx',
      render: () => (
        <BLAppShell className="h-96!" header={<ShellHeader />}>
          {shellContent}
        </BLAppShell>
      ),
    },
    {
      id: 'icon.tsx',
      render: () => (
        <BLAppShell
          className="h-96!"
          header={<ShellHeader left />}
          sidebarLeft={<ShellRail />}
          leftCollapsible="icon"
          defaultLeftOpen={false}
        >
          {shellContent}
        </BLAppShell>
      ),
    },
    {
      id: 'right-only.tsx',
      render: () => (
        <BLAppShell
          className="h-96!"
          header={<ShellHeader right />}
          sidebarRight={shellDetails}
        >
          {shellContent}
        </BLAppShell>
      ),
    },
  ],
  accordion: [
    {
      id: 'default.tsx',
      render: () => <BLAccordion className="w-96" items={accordionItems} />,
    },
    {
      id: 'multiple.tsx',
      render: () => (
        <BLAccordion
          className="w-96"
          allowsMultipleExpanded
          items={accordionItems}
        />
      ),
    },
  ],
  'navigation-tree': [
    {
      id: 'default.tsx',
      render: () => (
        <BLNavigationTree aria-label="Components" className="w-sidebar">
          <BLNavigationTreeItem title="Inputs" id="inputs">
            <BLNavigationTreeItem
              title="Button"
              href="/components/button/default.tsx"
            />
            <BLNavigationTreeItem
              title="Checkbox"
              href="/components/checkbox/default.tsx"
            />
          </BLNavigationTreeItem>
          <BLNavigationTreeItem title="Layout" id="layout">
            <BLNavigationTreeItem
              title="Grid"
              href="/components/grid/default.tsx"
            />
          </BLNavigationTreeItem>
          <BLNavigationTreeItem
            title="Table"
            href="/components/table/default.tsx"
          />
        </BLNavigationTree>
      ),
    },
    {
      id: 'current.tsx',
      render: () => (
        <BLNavigationTree
          aria-label="Components"
          className="w-sidebar"
          selectedRoute="/components/button/default.tsx"
          defaultExpandedKeys={['inputs']}
        >
          <BLNavigationTreeItem title="Inputs" id="inputs">
            <BLNavigationTreeItem
              title="Button"
              href="/components/button/default.tsx"
            />
            <BLNavigationTreeItem
              title="Checkbox"
              href="/components/checkbox/default.tsx"
            />
          </BLNavigationTreeItem>
          <BLNavigationTreeItem
            title="Table"
            href="/components/table/default.tsx"
          />
        </BLNavigationTree>
      ),
    },
    {
      id: 'icons.tsx',
      render: () => (
        <BLNavigationTree
          aria-label="Components"
          className="w-sidebar"
          defaultExpandedKeys={['inputs']}
        >
          <BLNavigationTreeItem
            title="Inputs"
            id="inputs"
            icon={<FolderIcon />}
          >
            <BLNavigationTreeItem
              title="Button"
              href="/components/button/default.tsx"
              icon={<FileDashedIcon />}
            />
          </BLNavigationTreeItem>
        </BLNavigationTree>
      ),
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
  dropdown: [
    {
      id: 'default.tsx',
      render: () => (
        <BLDropdown
          trigger={<BLButton level="outline">Share</BLButton>}
          groups={dropdownGroups}
        />
      ),
    },
  ],
  input: [
    {
      id: 'default.tsx',
      render: () => (
        <BLInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
        />
      ),
    },
    {
      id: 'states.tsx',
      render: () => (
        <BLCluster gap="6" className="items-start">
          <BLInput label="Helper" helperText="Your full name" />
          <BLInput label="Required" isRequired />
          <BLInput
            label="Error"
            isInvalid
            defaultValue="x"
            errorMessage="Invalid value"
          />
          <BLInput
            label="Success"
            defaultValue="Jane"
            successMessage="Looks good"
          />
          <BLInput
            label="Disabled"
            isDisabled
            placeholder="Not available"
            helperText="Locked"
          />
        </BLCluster>
      ),
    },
  ],
  checkbox: [
    {
      id: 'default.tsx',
      render: () => (
        <BLCheckbox label="Accept terms and conditions" name="terms" />
      ),
    },
    {
      id: 'states.tsx',
      render: () => (
        <BLCluster gap="6" className="items-start">
          <BLCheckbox label="Helper" helperText="Weekly email" />
          <BLCheckbox label="Required" isRequired />
          <BLCheckbox label="Indeterminate" isIndeterminate />
          <BLCheckbox label="Error" isInvalid errorMessage="You must accept" />
          <BLCheckbox
            label="Success"
            defaultSelected
            successMessage="Looks good"
          />
          <BLCheckbox label="Disabled" isDisabled helperText="Locked" />
          <BLCheckbox label="Disabled checked" isDisabled defaultSelected />
        </BLCluster>
      ),
    },
    {
      id: 'composition.tsx',
      render: () => (
        <BLStack gap="3">
          <BLCheckbox label="Email me product updates" defaultSelected />
          <BLCheckbox label="Email me billing alerts" />
          <BLCheckbox label="Send a weekly summary" />
        </BLStack>
      ),
    },
  ],
  switch: [
    {
      id: 'default.tsx',
      render: () => <BLSwitch label="Notifications" name="notifications" />,
    },
    {
      id: 'states.tsx',
      render: () => (
        <BLCluster gap="6" className="items-start">
          <BLSwitch label="Helper" helperText="Weekly email" />
          <BLSwitch label="Required" isRequired />
          <BLSwitch label="Error" isInvalid errorMessage="You must enable" />
          <BLSwitch label="Success" defaultSelected successMessage="Looks good" />
          <BLSwitch label="Disabled" isDisabled helperText="Locked" />
          <BLSwitch label="Disabled on" isDisabled defaultSelected />
        </BLCluster>
      ),
    },
    {
      id: 'composition.tsx',
      render: () => (
        <BLStack gap="3">
          <BLSwitch label="Email me product updates" defaultSelected />
          <BLSwitch label="Email me billing alerts" />
          <BLSwitch label="Send a weekly summary" />
        </BLStack>
      ),
    },
  ],
  form: [
    {
      id: 'default.tsx',
      render: () => (
        <BLForm
          aria-label="Profile"
          className="max-w-prose"
          onSubmit={(e) => e.preventDefault()}
        >
          <BLInput className="w-full!" label="Name" name="name" isRequired />
          <BLInput
            className="w-full!"
            label="Email"
            name="email"
            type="email"
            isRequired
          />
          <BLCheckbox
            className="w-full!"
            label="Email me product updates"
            name="updates"
          />
          <BLButtonGroup
            aria-label="Form actions"
            role="group"
            items={[
              {
                cols: 2,
                element: (
                  <BLButton type="reset" level="outline">
                    Reset
                  </BLButton>
                ),
              },
              { cols: 2, element: <BLButton type="submit">Save</BLButton> },
            ]}
          />
        </BLForm>
      ),
    },
    {
      id: 'validation.tsx',
      render: () => (
        <BLForm
          aria-label="Sign up"
          className="max-w-prose"
          validationErrors={{ email: 'This email is already registered' }}
        >
          <BLInput
            className="w-full!"
            label="Email"
            name="email"
            type="email"
            defaultValue="ana@example.com"
          />
          <BLButtonGroup
            aria-label="Form actions"
            role="group"
            items={[
              {
                cols: 4,
                element: <BLButton type="submit">Create account</BLButton>,
              },
            ]}
          />
        </BLForm>
      ),
    },
    {
      id: 'composition.tsx',
      render: () => (
        <BLForm
          aria-label="Account"
          gap="8"
          onSubmit={(e) => e.preventDefault()}
        >
          <BLGrid>
            <BLInput
              label="First name"
              name="first"
              isRequired
              className="w-full! min-w-0! col-span-4 lg:col-span-8"
            />
            <BLInput
              label="Last name"
              name="last"
              isRequired
              className="w-full! min-w-0! col-span-4 lg:col-span-8"
            />
            <BLInput
              label="Email"
              name="email"
              type="email"
              isRequired
              className="w-full! min-w-0! col-span-4 md:col-span-8 lg:col-span-10"
            />
            <BLSelect
              label="Country"
              name="country"
              className="w-full! min-w-0! col-span-4 md:col-span-8 lg:col-span-6"
              options={[
                { value: 'br', label: 'Brazil' },
                { value: 'pt', label: 'Portugal' },
              ]}
            />
            <BLCheckbox
              label="Email me product updates"
              name="updates"
              className="w-full! min-w-0! col-span-full"
            />
            <BLButtonGroup
              className="col-span-4 md:col-span-4 md:col-start-5 lg:col-span-6 lg:col-start-11"
              aria-label="Form actions"
              role="group"
              items={[
                {
                  cols: 2,
                  element: (
                    <BLButton type="reset" level="outline">
                      Reset
                    </BLButton>
                  ),
                },
                { cols: 2, element: <BLButton type="submit">Save</BLButton> },
              ]}
            />
          </BLGrid>
        </BLForm>
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
            <BLSelect
              label="Helper"
              placeholder="Choose"
              helperText="Pick one option"
              options={options}
            />
            <BLSelect
              label="Error"
              isInvalid
              errorMessage="This field is required"
              options={options}
            />
            <BLSelect
              label="Success"
              defaultSelectedKey="a"
              successMessage="Looks good"
              options={options}
            />
            <BLSelect
              label="Disabled"
              isDisabled
              placeholder="Choose"
              helperText="Not available"
              options={options}
            />
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
            {
              value: 'draft',
              label: 'Draft',
              description: 'Only visible to you',
              icon: <FileDashedIcon />,
            },
            {
              value: 'review',
              label: 'In review',
              description: 'Shared with your team',
              icon: <UsersIcon />,
            },
            {
              value: 'published',
              label: 'Published',
              description: 'Live on the site',
              icon: <GlobeIcon />,
            },
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
            {
              cols: 2,
              element: (
                <BLButton level="outline" slot="close" autoFocus>
                  Keep editing
                </BLButton>
              ),
            },
            { cols: 2, element: <BLButton slot="close">Discard</BLButton> },
          ]}
        />
      ),
    },
  ],
  tabs: [
    {
      id: 'default.tsx',
      render: () => (
        <BLTabs className="w-96" aria-label="Project" items={tabsItems} />
      ),
    },
    {
      id: 'states.tsx',
      render: () => (
        <BLTabs
          className="w-fulld"
          aria-label="Project with a disabled tab"
          items={[
            ...tabsItems,
            { title: 'Billing', content: 'Not available.', isDisabled: true },
          ]}
        />
      ),
    },
    {
      id: 'vertical.tsx',
      render: () => (
        <BLTabs
          className="max-w-prose"
          aria-label="Project"
          orientation="vertical"
          items={tabsItems}
        />
      ),
    },
    {
      id: 'controlled.tsx',
      render: () => (
        <BLTabs
          className="w-96"
          aria-label="Project"
          defaultSelectedKey="1"
          items={tabsItems}
        />
      ),
    },
  ],
  badge: [
    {
      id: 'default.tsx',
      render: () => <BLBadge>Draft</BLBadge>,
    },
    {
      id: 'statuses.tsx',
      render: () => (
        <BLCluster gap="3">
          {badgeStatuses.map((status) => (
            <BLBadge key={status} status={status}>
              {status}
            </BLBadge>
          ))}
        </BLCluster>
      ),
    },
  ],
  card: [
    {
      id: 'default.tsx',
      render: () => (
        <BLCard
          className="max-w-reading"
          heading="Design tokens"
          description="Semantic colors, type set and spacing shared by every component."
        />
      ),
    },
    {
      id: 'paddings.tsx',
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
      id: 'rich.tsx',
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
      id: 'image.tsx',
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
      id: 'section.tsx',
      render: () => (
        <BLCard as="section" headingLevel={2} className="max-w-reading" heading="Usage this month">
          <BLTypography>1,240 of 2,000 build minutes used.</BLTypography>
        </BLCard>
      ),
    },
    {
      id: 'list.tsx',
      render: () => (
        <BLStack gap="4" role="list" className="max-w-reading">
          {['Billing dashboard', 'Marketing site', 'Mobile app'].map((name) => (
            <BLCard key={name} role="listitem" padding="sm" description={name} metadata="Updated today" />
          ))}
        </BLStack>
      ),
    },
  ],
  toast: [
    {
      id: 'default.tsx',
      render: () => (
        <>
          <BLToast />
          <BLButton
            level="outline"
            onPress={() =>
              blToastQueue.add(
                {
                  title: 'Draft saved',
                  description: 'Your changes are stored.',
                },
                { timeout: 5000 },
              )
            }
          >
            Show toast
          </BLButton>
        </>
      ),
    },
    {
      id: 'kinds.tsx',
      render: () => (
        <>
          <BLToast />
          <BLCluster gap="3">
            {kinds.map((kind) => (
              <BLButton
                key={kind}
                level="outline"
                onPress={() =>
                  blToastQueue.add(
                    {
                      title: `${kind[0].toUpperCase()}${kind.slice(1)} toast`,
                      kind,
                    },
                    { timeout: 5000 },
                  )
                }
              >
                {kind}
              </BLButton>
            ))}
          </BLCluster>
        </>
      ),
    },
  ],
  tooltip: [
    {
      id: 'default.tsx',
      render: () => (
        <BLTooltip content="Add a new member">
          <BLIconButton aria-label="Add member" level="outline">
            <PlusIcon />
          </BLIconButton>
        </BLTooltip>
      ),
    },
    {
      id: 'placements.tsx',
      render: () => (
        <BLCluster gap="3">
          {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
            <BLTooltip
              key={placement}
              content={`Tooltip ${placement}`}
              placement={placement}
            >
              <BLButton level="outline">{placement}</BLButton>
            </BLTooltip>
          ))}
        </BLCluster>
      ),
    },
  ],
  table: [
    {
      id: 'default.tsx',
      render: () => (
        <BLTable
          className="max-w-reading"
          aria-label="Team members"
          columns={tableColumns}
          rows={tableRows}
        />
      ),
    },
    {
      id: 'sizes.tsx',
      render: () => (
        <BLStack gap="6">
          {sizes.map((size) => (
            <BLStack key={size} gap="2">
              <BLTypography variant="code-01" font="mono">
                {size}
              </BLTypography>
              <BLTable
                className="max-w-reading"
                aria-label={`Team members, ${size}`}
                size={size}
                columns={tableColumns}
                rows={tableRows}
              />
            </BLStack>
          ))}
        </BLStack>
      ),
    },
    {
      id: 'sortable.tsx',
      render: () => <SortableTable />,
    },
  ],
  typography: [
    {
      id: 'variants.tsx',
      render: () =>
        typeSet.map((variant) => (
          <BLTypography
            key={variant}
            variant={variant}
            font={variant.startsWith('code') ? 'mono' : 'sans'}
          >
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
  patterns: [{ id: 'header.tsx', render: () => <HeaderExample /> }],
};
