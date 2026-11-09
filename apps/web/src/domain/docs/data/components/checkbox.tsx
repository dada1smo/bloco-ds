import { BLCheckbox, BLCluster, BLStack } from '@bloco/ui';
import type { Doc } from '../../types/doc';

export const checkboxDoc: Doc = {
  slug: 'checkbox',
  title: 'Checkbox',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLCheckbox label="Accept terms and conditions" name="terms" />
      ),
    },
    {
      title: 'States',
      render: () => (
        <BLCluster gap="6" className="items-start">
          <BLCheckbox label="Helper" helperText="Weekly email" />
          <BLCheckbox label="Required" isRequired />
          <BLCheckbox label="Indeterminate" isIndeterminate />
          <BLCheckbox label="Error" isInvalid errorMessage="You must accept" />
          <BLCheckbox
            label="Success"
            defaultSelected
            successMessage="Looks good"
          />
          <BLCheckbox label="Disabled" isDisabled helperText="Locked" />
          <BLCheckbox label="Disabled checked" isDisabled defaultSelected />
        </BLCluster>
      ),
    },
    {
      title: 'Composition',
      render: () => (
        <BLStack gap="3">
          <BLCheckbox label="Email me product updates" defaultSelected />
          <BLCheckbox label="Email me billing alerts" />
          <BLCheckbox label="Send a weekly summary" />
        </BLStack>
      ),
    },
  ],
};
