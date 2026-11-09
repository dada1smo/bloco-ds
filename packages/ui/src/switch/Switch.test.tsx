import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('is labelled, toggles on click and passes className to the field container', async () => {
    const onChange = vi.fn();
    render(<Switch label="Notifications" onChange={onChange} className="consumer" />);
    const sw = screen.getByRole('switch', { name: 'Notifications' });
    expect(sw.closest('.consumer')).not.toBeNull();
    await userEvent.click(sw);
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(sw).toBeChecked();
  });

  it('toggles with the keyboard', async () => {
    render(<Switch label="Notifications" />);
    await userEvent.tab();
    expect(screen.getByRole('switch')).toHaveFocus();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('supports controlled state', () => {
    const { rerender } = render(<Switch label="Wi-Fi" isSelected={false} onChange={() => {}} />);
    expect(screen.getByRole('switch')).not.toBeChecked();
    rerender(<Switch label="Wi-Fi" isSelected onChange={() => {}} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('describes the switch with the helper text', () => {
    render(<Switch label="News" helperText="Weekly email" />);
    expect(screen.getByRole('switch')).toHaveAccessibleDescription('Weekly email');
  });

  it('shows the error instead of the helper text when invalid', () => {
    render(<Switch label="Terms" isInvalid helperText="Help" errorMessage="Required" successMessage="Ok" />);
    const sw = screen.getByRole('switch');
    expect(sw).toBeInvalid();
    expect(sw).toHaveAccessibleDescription('Required');
  });

  it('shows the success message when valid', () => {
    render(<Switch label="Terms" helperText="Help" successMessage="Looks good" />);
    expect(screen.getByRole('switch')).toHaveAccessibleDescription('Looks good');
  });

  it('marks required and ignores clicks and feedback when disabled', async () => {
    const onChange = vi.fn();
    const { rerender } = render(<Switch label="Terms" isRequired />);
    expect(screen.getByRole('switch')).toBeRequired();
    rerender(<Switch label="Terms" isDisabled isInvalid errorMessage="Required" onChange={onChange} />);
    expect(screen.getByRole('switch')).toBeDisabled();
    expect(screen.queryByText('Required')).not.toBeInTheDocument();
    await userEvent.click(screen.getByText('Terms'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
