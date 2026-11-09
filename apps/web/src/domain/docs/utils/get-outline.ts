import type { Doc } from '../types/doc';
import { getSections } from './get-sections';

// Seções que a página junta no bloco "Uso", como cartões faça / não faça.
const usageTitles = ['Quando usar', 'Quando não usar'];

// Estrutura da página de docs; o índice lateral e a página usam os mesmos ids.
export function getOutline(doc: Doc) {
  const { intro, sections } = getSections(doc.context ?? '');
  const usage = sections.filter((s) => usageTitles.includes(s.title));
  const rest = sections.filter((s) => !usageTitles.includes(s.title));
  const toc = [
    ...(doc.examples.length ? [{ id: 'exemplos', title: 'Exemplos' }] : []),
    ...(usage.length ? [{ id: 'uso', title: 'Uso' }] : []),
    ...rest.map(({ id, title }) => ({ id, title })),
    ...(doc.props ? [{ id: 'props', title: 'Props' }] : []),
  ];
  return { intro, usage, rest, toc };
}
