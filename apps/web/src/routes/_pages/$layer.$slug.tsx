import { createFileRoute, redirect } from '@tanstack/react-router';
import { DocsPage } from '@/domain/docs/components/docs-page';
import { findDoc } from '@/domain/docs/utils/find-doc';

export const Route = createFileRoute('/_pages/$layer/$slug')({
  // página inexistente volta para a home
  beforeLoad: ({ params }) => {
    if (!findDoc(params.layer, params.slug)) throw redirect({ to: '/' });
  },
  component: () => {
    const { layer, slug } = Route.useParams();
    const doc = findDoc(layer, slug);
    return doc && <DocsPage key={slug} doc={doc} />;
  },
});
