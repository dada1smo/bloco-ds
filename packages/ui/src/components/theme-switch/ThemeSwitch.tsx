import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import type { ButtonProps } from '../button/Button';
import { IconButton } from '../icon-button/IconButton';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export type ThemeSwitchProps = Omit<Extract<ButtonProps, { as?: 'button' }>, 'children'>;

export function ThemeSwitch({ onPress, ...props }: ThemeSwitchProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';
  const Icon = theme === 'dark' ? MoonIcon : SunIcon;

  return (
    <IconButton
      level="subtle"
      color="accent"
      aria-label={`Mudar para tema ${next === 'dark' ? 'escuro' : 'claro'}`}
      {...props}
      onPress={(e) => {
        onPress?.(e);
        setTheme(next);
      }}
    >
      <Icon aria-hidden />
    </IconButton>
  );
}
