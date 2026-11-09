import { BLButton, BLButtonGroup, BLCheckbox, BLForm, BLGrid, BLInput, BLSelect } from '@bloco/ui';
import type { Doc } from '../../types/doc';

export const formDoc: Doc = {
  slug: 'form',
  title: 'Form',
  layer: 'components',
  examples: [
    {
      title: 'Default',
      render: () => (
        <BLForm
          aria-label="Profile"
          className="max-w-prose"
          onSubmit={(e) => e.preventDefault()}
        >
          <BLInput className="w-full!" label="Name" name="name" isRequired />
          <BLInput
            className="w-full!"
            label="Email"
            name="email"
            type="email"
            isRequired
          />
          <BLCheckbox
            className="w-full!"
            label="Email me product updates"
            name="updates"
          />
          <BLButtonGroup
            aria-label="Form actions"
            role="group"
            items={[
              {
                cols: 2,
                element: (
                  <BLButton type="reset" level="outline">
                    Reset
                  </BLButton>
                ),
              },
              { cols: 2, element: <BLButton type="submit">Save</BLButton> },
            ]}
          />
        </BLForm>
      ),
    },
    {
      title: 'Validation',
      render: () => (
        <BLForm
          aria-label="Sign up"
          className="max-w-prose"
          validationErrors={{ email: 'This email is already registered' }}
        >
          <BLInput
            className="w-full!"
            label="Email"
            name="email"
            type="email"
            defaultValue="ana@example.com"
          />
          <BLButtonGroup
            aria-label="Form actions"
            role="group"
            items={[
              {
                cols: 4,
                element: <BLButton type="submit">Create account</BLButton>,
              },
            ]}
          />
        </BLForm>
      ),
    },
    {
      title: 'Composition',
      render: () => (
        <BLForm
          aria-label="Account"
          gap="8"
          onSubmit={(e) => e.preventDefault()}
        >
          <BLGrid>
            <BLInput
              label="First name"
              name="first"
              isRequired
              className="w-full! min-w-0! col-span-4 lg:col-span-8"
            />
            <BLInput
              label="Last name"
              name="last"
              isRequired
              className="w-full! min-w-0! col-span-4 lg:col-span-8"
            />
            <BLInput
              label="Email"
              name="email"
              type="email"
              isRequired
              className="w-full! min-w-0! col-span-4 md:col-span-8 lg:col-span-10"
            />
            <BLSelect
              label="Country"
              name="country"
              className="w-full! min-w-0! col-span-4 md:col-span-8 lg:col-span-6"
              options={[
                { value: 'br', label: 'Brazil' },
                { value: 'pt', label: 'Portugal' },
              ]}
            />
            <BLCheckbox
              label="Email me product updates"
              name="updates"
              className="w-full! min-w-0! col-span-full"
            />
            <BLButtonGroup
              className="col-span-4 md:col-span-4 md:col-start-5 lg:col-span-6 lg:col-start-11"
              aria-label="Form actions"
              role="group"
              items={[
                {
                  cols: 2,
                  element: (
                    <BLButton type="reset" level="outline">
                      Reset
                    </BLButton>
                  ),
                },
                { cols: 2, element: <BLButton type="submit">Save</BLButton> },
              ]}
            />
          </BLGrid>
        </BLForm>
      ),
    },
  ],
};
