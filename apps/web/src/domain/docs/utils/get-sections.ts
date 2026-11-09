// Seções do .md que a página substitui: API vira a tabela de props, Exemplo vira os exemplos.
const replaced = ['API', 'Exemplo'];

// Título -> id de âncora: "Semântica e acessibilidade" -> "semantica-e-acessibilidade".
export const toId = (title: string) =>
  title
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// Divide o markdown em intro (texto entre o `# título` e o primeiro `##`) e seções `##`.
export function getSections(markdown: string) {
  const [head, ...parts] = markdown.split(/^## /m);
  const intro = head.replace(/^# .*$/m, '').trim();
  const sections = parts
    .map((part) => {
      const [title, ...body] = part.split('\n');
      return { id: toId(title), title: title.trim(), body: body.join('\n').trim() };
    })
    .filter((s) => !replaced.includes(s.title));
  return { intro, sections };
}
