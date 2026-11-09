import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  BLStack,
  BLTable,
  BLTableBody,
  BLTableCell,
  BLTableHead,
  BLTableHeader,
  BLTableRow,
  BLTypography,
} from '@bloco/ui';

// Elementos do markdown -> tipografia do DS. Tabelas GFM viram BLTable.
const components: Components = {
  h2: ({ children }) => <BLTypography as="h2" variant="heading-04">{children}</BLTypography>,
  h3: ({ children }) => <BLTypography as="h3" variant="heading-02">{children}</BLTypography>,
  p: ({ children }) => <BLTypography as="p">{children}</BLTypography>,
  ul: ({ children }) => <ul className="list-disc space-y-2 pl-6 text-body-01 text-primary">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-2 pl-6 text-body-01 text-primary">{children}</ol>,
  code: ({ children }) => (
    <BLTypography as="code" variant="code-01" font="mono">
      {children}
    </BLTypography>
  ),
  pre: ({ children }) => <pre className="overflow-x-auto bg-layer-01 p-4">{children}</pre>,
  a: ({ children, href }) => (
    <a className="text-link-primary underline" href={href}>
      {children}
    </a>
  ),
  table: ({ children }) => <BLTable>{children}</BLTable>,
  thead: ({ children }) => <BLTableHead>{children}</BLTableHead>,
  tbody: ({ children }) => <BLTableBody>{children}</BLTableBody>,
  tr: ({ children }) => <BLTableRow>{children}</BLTableRow>,
  th: ({ children }) => <BLTableHeader>{children}</BLTableHeader>,
  td: ({ children }) => <BLTableCell>{children}</BLTableCell>,
};

export function Markdown({ children }: { children: string }) {
  return (
    <BLStack gap="4">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </BLStack>
  );
}
