import { BLStack, BLTypography } from '@bloco/ui';

export function ShellDetails() {
  return (
    <BLStack gap="2" className="p-6">
      <BLTypography variant="heading-compact-01">Details</BLTypography>
      <BLTypography variant="body-compact-01">Owner: Ana Souza</BLTypography>
      <BLTypography variant="body-compact-01">Updated 2 hours ago</BLTypography>
    </BLStack>
  );
}
