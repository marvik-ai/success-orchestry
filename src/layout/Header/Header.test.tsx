import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

let setThemeMock = vi.fn();

vi.mock('@/components/ThemeProvider/useTheme', () => ({
  useTheme: () => ({ theme: 'light', setTheme: setThemeMock }),
}));

import { Header } from './index';

describe('Header', () => {
  it('shows the active navigation label', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Header
          isCollapsed={false}
          onToggleCollapse={() => undefined}
          onToggleMobileMenu={() => undefined}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('calls handlers for menu and collapse', async () => {
    const user = userEvent.setup();
    const onToggleCollapse = vi.fn();
    const onToggleMobileMenu = vi.fn();

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Header
          isCollapsed={true}
          onToggleCollapse={onToggleCollapse}
          onToggleMobileMenu={onToggleMobileMenu}
        />
      </MemoryRouter>,
    );

    await user.click(screen.getByLabelText('Toggle menu'));
    await user.click(screen.getByLabelText('Toggle sidebar'));

    expect(onToggleMobileMenu).toHaveBeenCalledTimes(1);
    expect(onToggleCollapse).toHaveBeenCalledTimes(1);
  });

  it('collapses on hover when expanded', async () => {
    const onToggleCollapse = vi.fn();

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Header
          isCollapsed={false}
          onToggleCollapse={onToggleCollapse}
          onToggleMobileMenu={() => undefined}
        />
      </MemoryRouter>,
    );

    await userEvent.hover(screen.getByLabelText('Toggle sidebar'));

    expect(onToggleCollapse).toHaveBeenCalledTimes(1);
  });

  it('does not collapse on hover when already collapsed', async () => {
    const onToggleCollapse = vi.fn();

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Header
          isCollapsed={true}
          onToggleCollapse={onToggleCollapse}
          onToggleMobileMenu={() => undefined}
        />
      </MemoryRouter>,
    );

    await userEvent.hover(screen.getByLabelText('Toggle sidebar'));

    expect(onToggleCollapse).not.toHaveBeenCalled();
  });

  it('toggles theme from the menu switch', async () => {
    setThemeMock = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Header
          isCollapsed={true}
          onToggleCollapse={() => undefined}
          onToggleMobileMenu={() => undefined}
        />
      </MemoryRouter>,
    );

    await user.click(screen.getByLabelText('User menu'));
    const toggle = screen.getByRole('switch', { name: 'Dark mode' });
    await user.click(toggle);

    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });
});
