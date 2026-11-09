import type { ReactNode } from 'react';
import { CodeBlock } from './code-block';

// Moldura do exemplo renderizado numa página de docs, com o código-fonte embaixo quando houver.
export function Preview({ children, code }: { children: ReactNode; code?: string }) {
  return (
    <div>
      <div className="overflow-x-auto border border-subtle p-6">{children}</div>
      {code && <CodeBlock code={code.trim()} />}
    </div>
  );
}
