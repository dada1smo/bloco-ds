import { describe, expect, it } from 'vitest';

const files = import.meta.glob<string>('./*/**/*.{ts,tsx}', { query: '?raw', import: 'default', eager: true });

// Regra de dependência (ADR 0015): de quais outras camadas cada camada pode importar.
const allowed: Record<string, string[]> = {
  routes: ['domain', 'ui', 'global'],
  domain: ['ui', 'global'],
  ui: [],
  global: [],
};

const imports = /(?:from|import)\s*['"]([^'"]+)['"]/g;

function violations(file: string, source: string) {
  const layer = file.split('/')[1];
  const found: string[] = [];
  for (const [, spec] of source.matchAll(imports)) {
    if (spec.startsWith('@/')) {
      const target = spec.split('/')[1];
      if (target !== layer && !allowed[layer]?.includes(target)) found.push(`${layer} não importa de ${target}: ${spec}`);
    } else if (spec.startsWith('.')) {
      // relativo só dentro da camada; fora de src (ex.: packages/) não é camada do app
      const path = new URL(spec, `file:///src/${file.slice(2)}`).pathname;
      const target = path.split('/')[2];
      if (path.startsWith('/src/') && target !== layer) found.push(`import relativo entre camadas (use @/${target}): ${spec}`);
    }
  }
  return found;
}

// Nomenclatura (ADR 0015): arquivos de ui, domain e global em kebab-case.
const kebab = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function badName(file: string) {
  const name = file.split('/').at(-1)!.replace(/\.(test\.)?tsx?$/, '');
  return kebab.test(name) ? null : name;
}

describe('camadas do app', () => {
  it('finds the source files', () => {
    expect(Object.keys(files).length).toBeGreaterThan(0);
  });

  it.each(Object.keys(files).filter((f) => f.split('/')[1] in allowed))('%s respeita a regra de dependência', (file) => {
    expect(violations(file, files[file])).toEqual([]);
  });

  it.each(Object.keys(files).filter((f) => ['ui', 'domain', 'global'].includes(f.split('/')[1])))('%s segue a nomenclatura', (file) => {
    expect(badName(file)).toBeNull();
  });

  it('detects bad names', () => {
    expect(badName('./domain/docs/components/DocsNavigation.tsx')).toBe('DocsNavigation');
    expect(badName('./ui/components/AppSidebar.tsx')).toBe('AppSidebar');
    expect(badName('./domain/docs/components/docs-navigation.tsx')).toBeNull();
    expect(badName('./ui/components/app-sidebar.tsx')).toBeNull();
  });

  it('detects violations', () => {
    expect(violations('./ui/components/A.tsx', "import { x } from '@/domain/docs/x';")).toHaveLength(1);
    expect(violations('./domain/docs/a.ts', "import { x } from '../../ui/x';")).toHaveLength(1);
    expect(violations('./domain/docs/a.ts', "import { x } from '@/domain/other/x';")).toEqual([]);
    expect(violations('./routes/a.tsx', "import { x } from '@/domain/docs/x';")).toEqual([]);
  });
});
