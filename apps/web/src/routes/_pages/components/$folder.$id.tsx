import { createFileRoute, redirect } from '@tanstack/react-router';
import { findDemo } from '@/domain/demo/utils/find-demo';

export const Route = createFileRoute('/_pages/components/$folder/$id')({
  // demo inexistente volta para a home
  beforeLoad: ({ params }) => {
    if (!findDemo(params.folder, params.id)) throw redirect({ to: '/' });
  },
  component: () => {
    const { folder, id } = Route.useParams();
    return findDemo(folder, id)?.render();
  },
});
