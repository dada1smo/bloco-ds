import { render, screen } from '@testing-library/react';
import { Input, TextField } from 'react-aria-components';
import { describe, expect, it } from 'vitest';
import { FieldFeedback } from './FieldFeedback';

describe('FieldFeedback', () => {
  it('shows the error only while the field is invalid, as its description', () => {
    const { rerender } = render(
      <TextField aria-label="Email" isInvalid>
        <Input />
        <FieldFeedback status="error" className="consumer">Invalid email</FieldFeedback>
      </TextField>,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Invalid email');
    expect(screen.getByText('Invalid email').closest('.consumer')).not.toBeNull();
    rerender(
      <TextField aria-label="Email">
        <Input />
        <FieldFeedback status="error">Invalid email</FieldFeedback>
      </TextField>,
    );
    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
  });

  it('shows success as the description of a valid field', () => {
    render(
      <TextField aria-label="Email">
        <Input />
        <FieldFeedback status="success">Email available</FieldFeedback>
      </TextField>,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Email available');
  });
});
