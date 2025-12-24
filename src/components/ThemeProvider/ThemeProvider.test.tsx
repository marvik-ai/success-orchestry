import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import * as themePlugin from '@/plugins/theme';

import { ThemeProvider } from './index';
import { useTheme } from './useTheme';

const TestConsumer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span>Theme: {theme}</span>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
    </div>
  );
};

const createMatchMedia = (matches: boolean) => {
  const mql = {
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };

  return {
    mql,
    fn: vi.fn().mockReturnValue(mql),
  };
};

const createLegacyMatchMedia = (matches: boolean) => {
  const mql = {
    matches,
    addEventListener: undefined,
    removeEventListener: undefined,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };

  return {
    mql,
    fn: vi.fn().mockReturnValue(mql),
  };
};

describe('ThemeProvider', () => {
  it('applies system theme based on matchMedia', () => {
    const { fn } = createMatchMedia(true);
    window.matchMedia = fn;

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('updates theme and localStorage when setTheme is called', async () => {
    const { fn } = createMatchMedia(false);
    window.matchMedia = fn;
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem');
    const user = userEvent.setup();

    render(
      <ThemeProvider storageKey="ui-theme-test">
        <TestConsumer />
      </ThemeProvider>,
    );

    await user.click(screen.getByText('Set Dark'));

    expect(setItemSpy).toHaveBeenCalledWith('ui-theme-test', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('uses legacy matchMedia listeners when addEventListener is unavailable', () => {
    const setThemeSpy = vi.spyOn(themePlugin, 'setThemeClass');
    const { fn, mql } = createLegacyMatchMedia(false);
    window.matchMedia = fn;

    const { unmount } = render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    const handler = mql.addListener.mock.calls[0]?.[0];
    handler?.({ matches: true });

    expect(setThemeSpy).toHaveBeenCalledWith('dark');

    unmount();
    expect(mql.removeListener).toHaveBeenCalled();
  });

  it('renders safely when window is undefined (server)', () => {
    const originalWindow = global.window;
    const originalDocument = global.document;

    // @ts-expect-error simulate server environment
    delete global.window;
    // @ts-expect-error simulate server environment
    delete global.document;

    expect(() =>
      renderToString(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>,
      ),
    ).not.toThrow();

    global.window = originalWindow;
    global.document = originalDocument;
  });
});
