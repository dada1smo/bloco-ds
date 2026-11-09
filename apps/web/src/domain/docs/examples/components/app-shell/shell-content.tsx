import { BLStack, BLTypography } from '@bloco/ui';

export function ShellContent() {
  return (
    <BLStack gap="4" className="p-6">
      <BLTypography variant="heading-03">Projects</BLTypography>
      <BLTypography variant="body-01">The content area takes whatever space the sidebars leave.</BLTypography>
    </BLStack>
  );
}
