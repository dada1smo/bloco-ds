import type { ReactNode } from 'react';

// Moldura do exemplo renderizado numa página de docs.
export function Preview({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto border border-subtle p-6">{children}</div>;
}
