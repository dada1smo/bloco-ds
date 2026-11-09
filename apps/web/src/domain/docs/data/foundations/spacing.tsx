import { BLTypography } from '@bloco/ui';
import type { Doc } from '../../types/doc';

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

export const spacingDoc: Doc = {
  slug: 'spacing',
  title: 'Spacing',
  layer: 'foundations',
  examples: [
    {
      title: 'Default',
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
  ],
};
