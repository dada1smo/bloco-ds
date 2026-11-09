import { BLCluster, BLInput } from '@bloco/ui';
import type { Doc } from '../../types/doc';

export const inputDoc: Doc = {
  slug: 'input',
  title: 'Input',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
        />
      ),
    },
    {
      title: 'States',
      render: () => (
        <BLCluster gap="6" className="items-start">
          <BLInput label="Helper" helperText="Your full name" />
          <BLInput label="Required" isRequired />
          <BLInput
            label="Error"
            isInvalid
            defaultValue="x"
            errorMessage="Invalid value"
          />
          <BLInput
            label="Success"
            defaultValue="Jane"
            successMessage="Looks good"
          />
          <BLInput
            label="Disabled"
            isDisabled
            placeholder="Not available"
            helperText="Locked"
          />
        </BLCluster>
      ),
    },
  ],
};
