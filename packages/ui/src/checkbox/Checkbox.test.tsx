import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('is labelled, toggles on click and passes className to the field container', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept terms" onChange={onChange} className="consumer" />);
    const box = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(box.closest('.consumer')).not.toBeNull();
    await userEvent.click(box);
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(box).toBeChecked();
  });

  it('toggles with the keyboard', async () => {
    render(<Checkbox label="Accept terms" />);
    await userEvent.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('supports controlled and indeterminate state', () => {
    const { rerender } = render(<Checkbox label="All" isSelected={false} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    rerender(<Checkbox label="All" isSelected onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
    rerender(<Checkbox label="All" isIndeterminate onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBePartiallyChecked();
  });

  it('describes the checkbox with the helper text', () => {
    render(<Checkbox label="News" helperText="Weekly email" />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Weekly email');
  });

  it('shows the error instead of the helper text when invalid', () => {
    render(<Checkbox label="Terms" isInvalid helperText="Help" errorMessage="Required" successMessage="Ok" />);
    const box = screen.getByRole('checkbox');
    expect(box).toBeInvalid();
    expect(box).toHaveAccessibleDescription('Required');
  });

  it('shows the success message when valid', () => {
    render(<Checkbox label="Terms" helperText="Help" successMessage="Looks good" />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Looks good');
  });

  it('marks required and ignores clicks and feedback when disabled', async () => {
    const onChange = vi.fn();
    const { rerender } = render(<Checkbox label="Terms" isRequired />);
    expect(screen.getByRole('checkbox')).toBeRequired();
    rerender(<Checkbox label="Terms" isDisabled isInvalid errorMessage="Required" onChange={onChange} />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.queryByText('Required')).not.toBeInTheDocument();
    await userEvent.click(screen.getByText('Terms'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
