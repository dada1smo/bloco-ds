import { Outlet, createFileRoute, useLocation, useNavigate } from '@tanstack/react-router';
import { BLRouterProvider } from '@bloco/ui';
import { DemoNavigation } from '@/domain/demo/components/demo-navigation';
import { AppLayout } from '@/ui/components/app-layout';

// Layout pathless (ADR 0015): envolve as páginas sem entrar na URL.
export const Route = createFileRoute('/_pages')({ component: PagesLayout });

function PagesLayout() {
  const pathname = useLocation({ select: (l) => l.pathname });
  const navigate = useNavigate();

  return (
    <BLRouterProvider navigate={(to) => navigate({ to })}>
      <AppLayout title="bloco-ds" sidebar={<DemoNavigation pathname={pathname} />}>
        <Outlet />
      </AppLayout>
    </BLRouterProvider>
  );
}
