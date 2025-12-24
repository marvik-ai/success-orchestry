import { useMediaQuery } from '@/hooks/useMediaQuery';

const breakpoints = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof breakpoints;
type Direction = 'up' | 'down';

export const useResponsive = (direction: Direction, breakpoint: Breakpoint) => {
  const width = breakpoints[breakpoint];
  const query = direction === 'up' ? `(min-width: ${width}px)` : `(max-width: ${width - 1}px)`;

  return useMediaQuery(query);
};
