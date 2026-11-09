import { BLButton, BLCluster, BLStack } from '@bloco/ui';

export function ButtonLevels() {
  return (
    <BLStack gap="4">
      <BLCluster gap="2">
        <BLButton level="solid">Save</BLButton>
        <BLButton level="outline">Cancel</BLButton>
        <BLButton level="subtle">Skip</BLButton>
      </BLCluster>
      <BLCluster gap="2">
        <BLButton level="solid" color="accent">Upgrade</BLButton>
        <BLButton level="outline" color="accent">Compare plans</BLButton>
        <BLButton level="subtle" color="accent">Learn more</BLButton>
      </BLCluster>
    </BLStack>
  );
}
