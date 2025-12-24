import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useResponsive } from './useResponsive';

const createMatchMedia = (matches: boolean) =>
  vi.fn().mockImplementation(() => ({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));

describe('useResponsive', () => {
  it('uses min-width for up breakpoints', () => {
    window.matchMedia = createMatchMedia(true);

    const { result } = renderHook(() => useResponsive('up', 'lg'));

    expect(result.current).toBe(true);
    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 1024px)');
  });

  it('uses max-width for down breakpoints', () => {
    window.matchMedia = createMatchMedia(false);

    const { result } = renderHook(() => useResponsive('down', 'md'));

    expect(result.current).toBe(false);
    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 767px)');
  });
});
