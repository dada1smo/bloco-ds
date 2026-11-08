import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('is labelled, accepts typing and passes className to the field container', async () => {
    const onChange = vi.fn();
    render(<Input label="Name" onChange={onChange} className="consumer" />);
    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input.closest('.consumer')).not.toBeNull();
    await userEvent.type(input, 'ab');
    expect(onChange).toHaveBeenLastCalledWith('ab');
    expect(input).toHaveValue('ab');
  });

  it('describes the input with the helper text', () => {
    render(<Input label="Name" helperText="Your full name" />);
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Your full name');
  });

  it('shows the error instead of the helper text when invalid', () => {
    render(<Input label="Name" isInvalid helperText="Help" errorMessage="Required" successMessage="Ok" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription('Required');
  });

  it('shows the success message when valid', () => {
    render(<Input label="Name" helperText="Help" successMessage="Looks good" />);
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Looks good');
  });

  it('marks required and shows no feedback when disabled', () => {
    const { rerender } = render(<Input label="Name" isRequired />);
    expect(screen.getByRole('textbox')).toBeRequired();
    rerender(<Input label="Name" isDisabled isInvalid errorMessage="Required" />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.queryByText('Required')).not.toBeInTheDocument();
  });

  it('shows the placeholder', () => {
    render(<Input aria-label="Name" placeholder="Jane" />);
    expect(screen.getByPlaceholderText('Jane')).toBeInTheDocument();
  });
});
