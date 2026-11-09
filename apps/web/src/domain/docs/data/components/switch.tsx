import { BLCluster, BLStack, BLSwitch } from '@bloco/ui';
import type { Doc } from '../../types/doc';

export const switchDoc: Doc = {
  slug: 'switch',
  title: 'Switch',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => <BLSwitch label="Notifications" name="notifications" />,
    },
    {
      title: 'States',
      render: () => (
        <BLCluster gap="6" className="items-start">
          <BLSwitch label="Helper" helperText="Weekly email" />
          <BLSwitch label="Required" isRequired />
          <BLSwitch label="Error" isInvalid errorMessage="You must enable" />
          <BLSwitch label="Success" defaultSelected successMessage="Looks good" />
          <BLSwitch label="Disabled" isDisabled helperText="Locked" />
          <BLSwitch label="Disabled on" isDisabled defaultSelected />
        </BLCluster>
      ),
    },
    {
      title: 'Composition',
      render: () => (
        <BLStack gap="3">
          <BLSwitch label="Email me product updates" defaultSelected />
          <BLSwitch label="Email me billing alerts" />
          <BLSwitch label="Send a weekly summary" />
        </BLStack>
      ),
    },
  ],
};
