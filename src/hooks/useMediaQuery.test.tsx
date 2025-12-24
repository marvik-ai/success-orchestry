import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useMediaQuery } from './useMediaQuery';

const createMatchMedia = (matches: boolean) => {
  const addEventListener = vi.fn();
  const removeEventListener = vi.fn();

  return {
    matches,
    addEventListener,
    removeEventListener,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };
};

const createLegacyMatchMedia = (matches: boolean) => {
  const addListener = vi.fn();
  const removeListener = vi.fn();

  return {
    matches,
    addEventListener: undefined,
    removeEventListener: undefined,
    addListener,
    removeListener,
  };
};

describe('useMediaQuery', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('returns the initial match state', () => {
    window.matchMedia = vi.fn().mockImplementation(() => createMatchMedia(true));

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(true);
  });

  it('subscribes to changes with addEventListener', () => {
    const mql = createMatchMedia(false);
    window.matchMedia = vi.fn().mockReturnValue(mql);

    const { result, unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    const handler = mql.addEventListener.mock.calls[0]?.[1];
    act(() => {
      mql.matches = true;
      handler?.({ matches: true });
    });

    expect(result.current).toBe(true);

    unmount();
    expect(mql.removeEventListener).toHaveBeenCalled();
  });

  it('falls back to addListener when addEventListener is not available', () => {
    const mql = createLegacyMatchMedia(false);
    window.matchMedia = vi.fn().mockReturnValue(mql);

    const { result, unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    const handler = mql.addListener.mock.calls[0]?.[0];
    act(() => {
      mql.matches = true;
      handler?.({ matches: true });
    });

    expect(result.current).toBe(true);

    unmount();
    expect(mql.removeListener).toHaveBeenCalled();
  });
});
