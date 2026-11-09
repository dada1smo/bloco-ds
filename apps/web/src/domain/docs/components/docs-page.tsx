import type { ReactNode } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react';
import {
  BLBadge,
  BLCard,
  BLStack,
  BLTable,
  BLTableBody,
  BLTableCell,
  BLTableHead,
  BLTableHeader,
  BLTableRow,
  BLTypography,
} from '@bloco/ui';
import { CodeBlock } from '@/ui/components/code-block';
import { Markdown } from '@/ui/components/markdown';
import { Preview } from '@/ui/components/preview';
import type { Doc, DocLayer } from '../types/doc';
import { getOutline } from '../utils/get-outline';
import { DocsSection } from './docs-section';

const layerLabels: Record<DocLayer, string> = {
  foundations: 'Foundation',
  components: 'Component',
  patterns: 'Pattern',
};

const usageIcons: Record<string, ReactNode> = {
  'Quando usar': <CheckCircleIcon className="text-support-success" />,
  'Quando não usar': <XCircleIcon className="text-support-error" />,
};

const code = (text?: string) =>
  text && (
    <BLTypography as="code" variant="code-01" font="mono">
      {text}
    </BLTypography>
  );

// Template da página (ADR 0016): cabeçalho, exemplos, uso (faça / não faça), seções do .md e props.
// Partes sem dados não aparecem. Os ids vêm de getOutline, os mesmos do índice lateral.
export function DocsPage({ doc }: { doc: Doc }) {
  const { intro, usage, rest } = getOutline(doc);

  return (
    <BLStack gap="12" className="max-w-page">
      <BLStack gap="4" className="max-w-reading">
        <BLBadge className="self-start">{layerLabels[doc.layer]}</BLBadge>
        <BLTypography as="h1" variant="heading-06">
          {doc.title}
        </BLTypography>
        {intro && <Markdown>{intro}</Markdown>}
        {doc.layer === 'components' && <CodeBlock code={`import { BL${doc.title} } from '@bloco/ui';`} />}
      </BLStack>

      {doc.examples.length > 0 && (
        <DocsSection id="exemplos" title="Exemplos">
          <BLStack gap="8">
            {doc.examples.map((example) => (
              <BLStack key={example.title} gap="3">
                <BLTypography as="h3" variant="heading-02">
                  {example.title}
                </BLTypography>
                {example.description && <BLTypography>{example.description}</BLTypography>}
                <Preview code={example.code}>{example.render()}</Preview>
              </BLStack>
            ))}
          </BLStack>
        </DocsSection>
      )}

      {usage.length > 0 && (
        <DocsSection id="uso" title="Uso">
          <div className="grid gap-6 md:grid-cols-2">
            {usage.map((s) => (
              <BLCard key={s.id} heading={s.title} icon={usageIcons[s.title]}>
                <Markdown>{s.body}</Markdown>
              </BLCard>
            ))}
          </div>
        </DocsSection>
      )}

      {rest.map((s) => (
        <DocsSection key={s.id} id={s.id} title={s.title} className="max-w-reading">
          <Markdown>{s.body}</Markdown>
        </DocsSection>
      ))}

      {doc.props && (
        <DocsSection id="props" title="Props">
          <BLTable aria-label={`Props de ${doc.title}`}>
            <BLTableHead>
              <BLTableRow>
                <BLTableHeader>Prop</BLTableHeader>
                <BLTableHeader>Tipo</BLTableHeader>
                <BLTableHeader>Default</BLTableHeader>
                <BLTableHeader>Descrição</BLTableHeader>
              </BLTableRow>
            </BLTableHead>
            <BLTableBody>
              {doc.props.map((p) => (
                <BLTableRow key={p.name}>
                  <BLTableHeader scope="row">{code(p.name)}</BLTableHeader>
                  <BLTableCell>{code(p.type)}</BLTableCell>
                  <BLTableCell>{code(p.default) ?? '—'}</BLTableCell>
                  <BLTableCell>{p.description}</BLTableCell>
                </BLTableRow>
              ))}
            </BLTableBody>
          </BLTable>
        </DocsSection>
      )}
    </BLStack>
  );
}
