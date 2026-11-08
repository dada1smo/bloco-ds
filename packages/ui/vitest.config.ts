import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: false,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.tsx'],
      exclude: ['src/**/index.tsx', 'src/**/*.test.tsx'],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
