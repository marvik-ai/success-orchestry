import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@radix-ui/react-avatar', async () => {
  const React = await import('react');

  const Root = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ children, ...props }, ref) => (
      <span ref={ref} {...props}>
        {children}
      </span>
    ),
  );
  Root.displayName = 'Root';

  const Image = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
    (props, ref) => <img ref={ref} {...props} />,
  );
  Image.displayName = 'Image';

  const Fallback = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ children, ...props }, ref) => (
      <span ref={ref} {...props}>
        {children}
      </span>
    ),
  );
  Fallback.displayName = 'Fallback';

  return {
    Root,
    Image,
    Fallback,
  };
});

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

describe('Avatar', () => {
  it('renders fallback content', () => {
    render(
      <Avatar>
        <AvatarFallback>NS</AvatarFallback>
      </Avatar>,
    );

    expect(screen.getByText('NS')).toBeInTheDocument();
  });

  it('renders an image when provided', () => {
    render(
      <Avatar>
        <AvatarImage alt="Profile" src="https://example.com/avatar.png" />
      </Avatar>,
    );

    expect(screen.getByAltText('Profile')).toBeInTheDocument();
  });
});
