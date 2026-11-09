import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// SPA mode (ADR 0014): só o shell do __root é pré-renderizado; as rotas rodam no cliente.
export default defineConfig({
  // alias @/<camada> vem do paths do tsconfig (ADR 0015)
  resolve: { tsconfigPaths: true },
  plugins: [tanstackStart({ spa: { enabled: true } }), react(), tailwindcss()],
});
