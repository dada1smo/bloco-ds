import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from '../input/Input';
import { Form } from './Form';

describe('Form', () => {
  it('submits and forwards aria and className', async () => {
    const onSubmit = vi.fn((e) => e.preventDefault());
    render(
      <Form aria-label="Profile" className="consumer" onSubmit={onSubmit}>
        <Input label="Name" name="name" />
        <button type="submit">Save</button>
      </Form>,
    );
    const form = screen.getByRole('form', { name: 'Profile' });
    expect(form).toHaveClass('consumer');
    await userEvent.type(screen.getByRole('textbox', { name: 'Name' }), 'Ana');
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it('blocks submit and shows native validation for a required field', async () => {
    const onSubmit = vi.fn((e) => e.preventDefault());
    render(
      <Form aria-label="Profile" onSubmit={onSubmit}>
        <Input label="Name" name="name" isRequired />
        <button type="submit">Save</button>
      </Form>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole('textbox', { name: /Name/ })).toBeInvalid();
  });

  it('applies server-side validationErrors to the field', () => {
    render(
      <Form aria-label="Profile" validationErrors={{ name: 'Taken' }}>
        <Input label="Name" name="name" />
      </Form>,
    );
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInvalid();
  });
});
