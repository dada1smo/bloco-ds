import { Outlet, createFileRoute, useLocation, useNavigate, useParams } from '@tanstack/react-router';
import { BLRouterProvider } from '@bloco/ui';
import { DocsNavigation } from '@/domain/docs/components/docs-navigation';
import { findDoc } from '@/domain/docs/utils/find-doc';
import { getOutline } from '@/domain/docs/utils/get-outline';
import { AppLayout } from '@/ui/components/app-layout';
import { TableOfContents } from '@/ui/components/table-of-contents';

// Layout pathless (ADR 0015): envolve as páginas sem entrar na URL.
export const Route = createFileRoute('/_pages')({ component: PagesLayout });

function PagesLayout() {
  const pathname = useLocation({ select: (l) => l.pathname });
  const navigate = useNavigate();
  const { layer, slug } = useParams({ strict: false });
  const doc = layer && slug ? findDoc(layer, slug) : undefined;

  return (
    <BLRouterProvider navigate={(to) => navigate({ to })}>
      <AppLayout
        title="bloco-ds"
        sidebar={<DocsNavigation pathname={pathname} />}
        aside={doc && <TableOfContents items={getOutline(doc).toc} />}
      >
        <Outlet />
      </AppLayout>
    </BLRouterProvider>
  );
}
