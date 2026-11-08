import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Toast, toastQueue } from './Toast';

afterEach(() => act(() => toastQueue.clear()));

describe('Toast', () => {
  it('shows a queued toast with title and description and closes it', async () => {
    render(<Toast />);
    act(() => {
      toastQueue.add({ title: 'Saved', description: 'Draft stored', kind: 'success' });
    });
    const toast = screen.getByRole('alertdialog', { name: 'Saved' });
    expect(toast).toHaveAccessibleDescription('Draft stored');
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });

  it('dismisses itself after the timeout', () => {
    vi.useFakeTimers();
    render(<Toast />);
    act(() => {
      toastQueue.add({ title: 'Heads up' }, { timeout: 1000 });
    });
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.queryByText('Heads up')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('passes className to the region', () => {
    render(<Toast className="consumer" />);
    act(() => {
      toastQueue.add({ title: 'Hi' });
    });
    expect(screen.getByRole('region').className).toContain('consumer');
  });
});
