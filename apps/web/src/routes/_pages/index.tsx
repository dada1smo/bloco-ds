import { createFileRoute } from '@tanstack/react-router';
import { BLStack, BLTypography } from '@bloco/ui';

export const Route = createFileRoute('/_pages/')({
  component: () => (
    <BLStack gap="4" className="max-w-prose">
      <BLTypography as="h1" variant="heading-05">
        bloco-ds
      </BLTypography>
      <BLTypography as="p" variant="body-02">
        Catálogo do design system e starter de projetos que consomem @bloco/ui.
      </BLTypography>
      <BLTypography as="p">
        Navegue pela barra lateral para ver foundations, componentes e patterns.
      </BLTypography>
    </BLStack>
  ),
});
