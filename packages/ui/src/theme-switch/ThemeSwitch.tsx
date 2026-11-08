import { useEffect, useState } from 'react';
import { Button, type ButtonProps } from '../button/Button';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeSwitch({ onPress, ...props }: Extract<ButtonProps, { as?: 'button' }>) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <Button
      level="outline"
      aria-label={`Mudar para tema ${next === 'dark' ? 'escuro' : 'claro'}`}
      {...props}
      onPress={(e) => {
        onPress?.(e);
        setTheme(next);
      }}
    >
      {theme === 'dark' ? 'Escuro' : 'Claro'}
    </Button>
  );
}
