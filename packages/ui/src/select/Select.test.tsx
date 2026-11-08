import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Select } from './Select';

const options = [
  { value: 'sm', label: 'Small', description: 'For tight spaces', icon: <svg /> },
  { value: 'lg', label: 'Large' },
];

describe('Select', () => {
  it('opens, selects an option and shows it in the button', async () => {
    const onSelectionChange = vi.fn();
    render(
      <Select
        label="Size"
        options={options}
        onSelectionChange={onSelectionChange}
        className="consumer"
      />,
    );
    const button = screen.getByRole('button', { name: /Size/ });
    expect(button.closest('.consumer')).not.toBeNull();
    await userEvent.click(button);
    expect(screen.getByRole('option', { name: /Small/ })).toHaveAccessibleDescription('For tight spaces');
    await userEvent.click(screen.getByRole('option', { name: 'Large' }));
    expect(onSelectionChange).toHaveBeenCalledWith('lg');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(button).toHaveTextContent('Large');
  });

  it('shows the selected option icon and label, and works by keyboard', async () => {
    render(<Select aria-label="Size" options={options} defaultSelectedKey="lg" />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Large');
    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.keyboard('{ArrowUp}{Enter}');
    expect(button).toHaveTextContent('Small');
    expect(button).not.toHaveTextContent('For tight spaces');
  });

  it('blocks interaction when disabled', async () => {
    render(<Select label="Size" options={options} isDisabled />);
    const button = screen.getByRole('button', { name: /Size/ });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows helper text, and replaces it with the error while invalid', () => {
    const { rerender } = render(
      <Select label="Size" options={options} helperText="Pick one" errorMessage="Required" />,
    );
    const button = screen.getByRole('button', { name: /Size/ });
    expect(button).toHaveAccessibleDescription('Pick one');
    rerender(<Select label="Size" options={options} helperText="Pick one" errorMessage="Required" isInvalid />);
    expect(button).toHaveAccessibleDescription('Required');
    expect(screen.queryByText('Pick one')).not.toBeInTheDocument();
  });

  it('shows success instead of the helper text, but no feedback when disabled', () => {
    const { rerender } = render(
      <Select label="Size" options={options} helperText="Pick one" successMessage="Saved" />,
    );
    expect(screen.getByRole('button', { name: /Size/ })).toHaveAccessibleDescription('Saved');
    rerender(<Select label="Size" options={options} helperText="Pick one" successMessage="Saved" isDisabled />);
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });

  it('does not select a disabled option', async () => {
    const onSelectionChange = vi.fn();
    render(
      <Select
        label="Size"
        options={[...options, { value: 'xl', label: 'Extra large', isDisabled: true }]}
        onSelectionChange={onSelectionChange}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /Size/ }));
    await userEvent.click(screen.getByRole('option', { name: 'Extra large' }));
    expect(onSelectionChange).not.toHaveBeenCalled();
  });
});
