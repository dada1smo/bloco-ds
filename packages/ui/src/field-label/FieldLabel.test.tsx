import { render, screen } from '@testing-library/react';
import { Input, TextField } from 'react-aria-components';
import { describe, expect, it } from 'vitest';
import { FieldLabel } from './FieldLabel';

describe('FieldLabel', () => {
  it('names the control of the field it is in', () => {
    render(
      <TextField>
        <FieldLabel className="consumer">Email</FieldLabel>
        <Input />
      </TextField>,
    );
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByText('Email')).toHaveClass('consumer');
  });
});
