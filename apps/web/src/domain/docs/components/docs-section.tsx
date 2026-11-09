import type { ReactNode } from 'react';
import { BLStack, BLTypography } from '@bloco/ui';

// h2 com id: alvo das âncoras do índice lateral (TableOfContents).
export function DocsSection({ id, title, className, children }: { id: string; title: string; className?: string; children: ReactNode }) {
  return (
    <BLStack gap="4" className={className}>
      <BLTypography as="h2" variant="heading-04" id={id} className="scroll-mt-6">
        {title}
      </BLTypography>
      {children}
    </BLStack>
  );
}
