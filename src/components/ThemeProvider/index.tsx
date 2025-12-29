import { useEffect, useMemo, useState } from 'react';

import { Theme, ThemeContext, ThemeContextValue } from '@/components/ThemeProvider/useTheme';
import { setThemeClass } from '@/plugins/theme';

type ThemeProviderProps = {
  children: React.ReactNode;
  storageKey?: string;
};

export const ThemeProvider = ({ children, storageKey = 'ui-theme' }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'system';
    }

    const stored = localStorage.getItem(storageKey) as Theme | null;
    return stored ?? 'system';
  });

  useEffect(() => {
    const applyTheme = (nextTheme: Theme) => {
      if (nextTheme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setThemeClass(prefersDark ? 'dark' : 'light');
        return;
      }

      setThemeClass(nextTheme);
    };

    applyTheme(theme);

    if (theme !== 'system') {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (event: MediaQueryListEvent) => {
      setThemeClass(event.matches ? 'dark' : 'light');
    };

    if (media.addEventListener) {
      media.addEventListener('change', handler);
    } else {
      media.addListener(handler);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', handler);
      } else {
        media.removeListener(handler);
      }
    };
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (nextTheme: Theme) => {
        localStorage.setItem(storageKey, nextTheme);
        setThemeState(nextTheme);
      },
    }),
    [theme, storageKey],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
