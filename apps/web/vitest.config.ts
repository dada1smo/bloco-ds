import { defineConfig } from 'vitest/config';

// Separado do vite.config.ts para não carregar o plugin do TanStack Start nos testes.
export default defineConfig({ test: { include: ['src/**/*.test.ts'] } });
