import type { ReactNode } from 'react';
import { BLTypography } from '@bloco/ui';

export const levels = ['solid', 'outline', 'subtle'] as const;

export const colors = ['primary', 'accent'] as const;

export const sizes = ['sm', 'md', 'lg'] as const;

export function Cell({
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

export const kinds = ['info', 'success', 'warning', 'error'] as const;
