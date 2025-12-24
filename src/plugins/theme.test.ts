import { describe, expect, it } from 'vitest';

import { setThemeClass } from './theme';

describe('setThemeClass', () => {
  it('adds dark class when theme is dark', () => {
    setThemeClass('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class when theme is light', () => {
    setThemeClass('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
