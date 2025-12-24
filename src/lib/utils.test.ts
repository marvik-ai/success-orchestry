import { describe, expect, it } from 'vitest';

import { cn } from '@/lib/utils';

describe('cn', () => {
  it('merges classnames and ignores falsy values', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c');
  });
});
