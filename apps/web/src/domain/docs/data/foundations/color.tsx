import { BLTypography } from '@bloco/ui';
import type { Doc } from '../../types/doc';

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

export const colorDoc: Doc = {
  slug: 'color',
  title: 'Color',
  layer: 'foundations',
  examples: [
    {
      title: 'Default',
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
  ],
};
