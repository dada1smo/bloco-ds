import { createFileRoute, redirect } from '@tanstack/react-router';
import { demos } from '../demos';

const findDemo = (folder: string, id: string) => demos[folder]?.find((d) => d.id === id);

export const Route = createFileRoute('/components/$folder/$id')({
  // demo inexistente volta para a home
  beforeLoad: ({ params }) => {
    if (!findDemo(params.folder, params.id)) throw redirect({ to: '/' });
  },
  component: DemoPage,
});

function DemoPage() {
  const { folder, id } = Route.useParams();
  return findDemo(folder, id)?.render();
}
