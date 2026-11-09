import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BLStack, BLTypography } from '@bloco/ui';

// Elementos do markdown -> tipografia do DS. Tabelas GFM viram tabela nativa com tokens.
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
  table: ({ children }) => <table className="w-full border-collapse text-left text-body-compact-01 text-primary">{children}</table>,
  th: ({ children }) => <th className="border-b border-strong py-2 pr-4 text-heading-compact-01">{children}</th>,
  td: ({ children }) => <td className="border-b border-subtle py-2 pr-4 align-top">{children}</td>,
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
