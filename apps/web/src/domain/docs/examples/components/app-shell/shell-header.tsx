import { BLCluster, BLTypography } from '@bloco/ui';
import { ShellToggle } from './shell-toggle';

export function ShellHeader({ left = false, right = false }: { left?: boolean; right?: boolean }) {
  return (
    <BLCluster gap="3" className="w-full flex-nowrap">
      {left && <ShellToggle side="left" />}
      <BLTypography variant="heading-compact-02" className={left ? '' : 'pl-4'}>
        Acme
      </BLTypography>
      {right && (
        <BLCluster className="ml-auto">
          <ShellToggle side="right" />
        </BLCluster>
      )}
    </BLCluster>
  );
}
