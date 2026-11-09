import { BLButton, BLCluster } from '@bloco/ui';

export function ButtonSizes() {
  return (
    <BLCluster gap="2">
      <BLButton size="sm">Small</BLButton>
      <BLButton size="md">Medium</BLButton>
      <BLButton size="lg">Large</BLButton>
    </BLCluster>
  );
}
