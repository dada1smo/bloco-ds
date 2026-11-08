import { render, screen } from '@testing-library/react';
import { Input, TextField } from 'react-aria-components';
import { describe, expect, it } from 'vitest';
import { FieldHelperText } from './FieldHelperText';

describe('FieldHelperText', () => {
  it('is the accessible description of the control', () => {
    render(
      <TextField aria-label="Email">
        <Input />
        <FieldHelperText className="consumer">Use your work address</FieldHelperText>
      </TextField>,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Use your work address');
    expect(screen.getByText('Use your work address')).toHaveClass('consumer');
  });
});
