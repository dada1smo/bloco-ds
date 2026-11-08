import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeSwitch } from './ThemeSwitch';

const prefersDark = (matches: boolean) =>
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches }));

describe('ThemeSwitch', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });
  afterEach(() => vi.unstubAllGlobals());

  it('starts from the system preference when nothing is stored', () => {
    prefersDark(true);
    render(<ThemeSwitch />);
    expect(screen.getByRole('button', { name: 'Mudar para tema claro' })).toHaveTextContent('Escuro');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('prefers the stored theme over the system', () => {
    prefersDark(true);
    localStorage.setItem('theme', 'light');
    render(<ThemeSwitch />);
    expect(screen.getByRole('button')).toHaveTextContent('Claro');
  });

  it('toggles, persists the theme and calls onPress', async () => {
    prefersDark(false);
    const onPress = vi.fn();
    render(<ThemeSwitch onPress={onPress} />);
    await userEvent.click(screen.getByRole('button', { name: 'Mudar para tema escuro' }));
    expect(onPress).toHaveBeenCalledOnce();
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement).not.toHaveClass('light');
    expect(screen.getByRole('button')).toHaveTextContent('Escuro');
  });
});
