import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ThemeContext, useTheme } from './useTheme';

const TestConsumer = () => {
  const { theme } = useTheme();
  return <span>Theme: {theme}</span>;
};

const DefaultSetterConsumer = () => {
  const { setTheme } = useTheme();
  return <button onClick={() => setTheme('light')}>Set Light</button>;
};

describe('useTheme', () => {
  it('returns context value', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: () => undefined }}>
        <TestConsumer />
      </ThemeContext.Provider>,
    );

    expect(screen.getByText('Theme: dark')).toBeInTheDocument();
  });

  it('uses the default context value when no provider is present', () => {
    render(<TestConsumer />);

    expect(screen.getByText('Theme: system')).toBeInTheDocument();
  });

  it('does not throw when calling default setTheme', async () => {
    const user = userEvent.setup();
    render(<DefaultSetterConsumer />);

    await user.click(screen.getByText('Set Light'));
  });
});
