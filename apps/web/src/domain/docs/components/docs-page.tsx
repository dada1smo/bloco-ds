import { BLStack, BLTable, BLTypography } from '@bloco/ui';
import { Markdown } from '@/ui/components/markdown';
import { Preview } from '@/ui/components/preview';
import type { Doc } from '../types/doc';
import { getSections } from '../utils/get-sections';

const propColumns = [
  { id: 'name', title: 'Prop', isRowHeader: true },
  { id: 'type', title: 'Tipo' },
  { id: 'default', title: 'Default' },
  { id: 'description', title: 'Descrição' },
];

const code = (text?: string) =>
  text && (
    <BLTypography as="code" variant="code-01" font="mono">
      {text}
    </BLTypography>
  );

// Template da página (ADR 0016): título, intro, exemplos, props e as seções do .md. Partes sem dados não aparecem.
export function DocsPage({ doc }: { doc: Doc }) {
  const { intro, sections } = getSections(doc.context ?? '');

  return (
    <BLStack gap="12" className="max-w-page">
      <BLStack gap="4" className="max-w-reading">
        <BLTypography as="h1" variant="heading-06">
          {doc.title}
        </BLTypography>
        {intro && <Markdown>{intro}</Markdown>}
      </BLStack>

      <BLStack gap="8">
        <BLTypography as="h2" variant="heading-04">
          Exemplos
        </BLTypography>
        {doc.examples.map((example) => (
          <BLStack key={example.title} gap="3">
            <BLTypography as="h3" variant="heading-02">
              {example.title}
            </BLTypography>
            {example.description && <BLTypography>{example.description}</BLTypography>}
            <Preview>{example.render()}</Preview>
          </BLStack>
        ))}
      </BLStack>

      {doc.props && (
        <BLStack gap="4">
          <BLTypography as="h2" variant="heading-04">
            Props
          </BLTypography>
          <BLTable
            aria-label={`Props de ${doc.title}`}
            columns={propColumns}
            rows={doc.props.map((p) => ({
              id: p.name,
              name: code(p.name),
              type: code(p.type),
              default: code(p.default) ?? '—',
              description: p.description,
            }))}
          />
        </BLStack>
      )}

      {sections.map((section) => (
        <BLStack key={section.title} gap="4" className="max-w-reading">
          <BLTypography as="h2" variant="heading-04">
            {section.title}
          </BLTypography>
          <Markdown>{section.body}</Markdown>
        </BLStack>
      ))}
    </BLStack>
  );
}
