import type { ReactNode } from 'react';
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import appCss from '../index.css?url';

// aplica o tema salvo antes do primeiro paint (evita flash)
const themeScript = `try {
  var t = localStorage.getItem('theme');
  if (t === 'light' || t === 'dark') document.documentElement.classList.add(t);
} catch (e) {}`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'bloco-ds' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
  component: Outlet,
});

// Shell: pré-renderizado no build, então nada aqui pode tocar window/localStorage em render.
function RootDocument({ children }: { children: ReactNode }) {
  return (
    // o script de tema altera a classe do <html> antes da hidratação
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
