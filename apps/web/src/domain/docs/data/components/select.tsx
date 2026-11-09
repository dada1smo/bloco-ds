import { FileDashedIcon, GlobeIcon, UsersIcon } from '@phosphor-icons/react';
import { BLSelect } from '@bloco/ui';
import type { Doc } from '../../types/doc';

export const selectDoc: Doc = {
  slug: 'select',
  title: 'Select',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLSelect
          label="Country"
          name="country"
          defaultSelectedKey="br"
          options={[
            { value: 'br', label: 'Brazil' },
            { value: 'pt', label: 'Portugal' },
            { value: 'ar', label: 'Argentina' },
            { value: 'cl', label: 'Chile' },
          ]}
        />
      ),
    },
    {
      title: 'Placeholder',
      render: () => (
        <BLSelect
          label="Sort by"
          placeholder="Choose an order"
          options={[
            { value: 'recent', label: 'Most recent' },
            { value: 'oldest', label: 'Oldest' },
            { value: 'name', label: 'Name' },
          ]}
        />
      ),
    },
    {
      title: 'Disabled',
      render: () => (
        <div className="flex items-end gap-4">
          <BLSelect
            label="Plan"
            isDisabled
            defaultSelectedKey="free"
            options={[
              { value: 'free', label: 'Free' },
              { value: 'pro', label: 'Pro' },
            ]}
          />
          <BLSelect
            label="Size"
            defaultSelectedKey="m"
            disabledKeys={['xl']}
            options={[
              { value: 's', label: 'Small' },
              { value: 'm', label: 'Medium' },
              { value: 'l', label: 'Large' },
              { value: 'xl', label: 'Extra large (sold out)' },
            ]}
          />
        </div>
      ),
    },
    {
      title: 'Feedback',
      render: () => {
        const options = [
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B', isDisabled: true },
        ];
        return (
          <div className="flex flex-wrap items-start gap-4">
            <BLSelect
              label="Helper"
              placeholder="Choose"
              helperText="Pick one option"
              options={options}
            />
            <BLSelect
              label="Error"
              isInvalid
              errorMessage="This field is required"
              options={options}
            />
            <BLSelect
              label="Success"
              defaultSelectedKey="a"
              successMessage="Looks good"
              options={options}
            />
            <BLSelect
              label="Disabled"
              isDisabled
              placeholder="Choose"
              helperText="Not available"
              options={options}
            />
          </div>
        );
      },
    },
    {
      title: 'Rich',
      render: () => (
        <BLSelect
          label="Status"
          name="status"
          defaultSelectedKey="review"
          options={[
            {
              value: 'draft',
              label: 'Draft',
              description: 'Only visible to you',
              icon: <FileDashedIcon />,
            },
            {
              value: 'review',
              label: 'In review',
              description: 'Shared with your team',
              icon: <UsersIcon />,
            },
            {
              value: 'published',
              label: 'Published',
              description: 'Live on the site',
              icon: <GlobeIcon />,
            },
          ]}
        />
      ),
    },
  ],
};
