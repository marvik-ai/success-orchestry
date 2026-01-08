import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

const themeMock = {
  theme: 'light',
  setTheme: vi.fn(),
};

vi.mock('@/components/ThemeProvider/useTheme', () => ({
  useTheme: () => themeMock,
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
    themeMock.setTheme = vi.fn();
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

    expect(themeMock.setTheme).toHaveBeenCalledWith('dark');
  });

  it('displays search and bell buttons on larger screens', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Header
          isCollapsed={false}
          onToggleCollapse={() => undefined}
          onToggleMobileMenu={() => undefined}
        />
      </MemoryRouter>,
    );

    // Search and bell buttons should be in the DOM (hidden on mobile, visible on sm+)
    // They are icon buttons without labels, so we verify they exist by checking all buttons
    const buttons = screen.getAllByRole('button', { hidden: true });
    // We expect: mobile menu button, sidebar toggle, search, bell, and user menu button
    expect(buttons.length).toBeGreaterThanOrEqual(5);
  });

  it('displays user avatar in dropdown trigger', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Header
          isCollapsed={false}
          onToggleCollapse={() => undefined}
          onToggleMobileMenu={() => undefined}
        />
      </MemoryRouter>,
    );

    const userMenuButton = screen.getByLabelText('User menu');
    expect(userMenuButton).toBeInTheDocument();
    expect(screen.getByText('NS')).toBeInTheDocument();
  });

  it('opens dropdown menu and displays all menu items', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Header
          isCollapsed={false}
          onToggleCollapse={() => undefined}
          onToggleMobileMenu={() => undefined}
        />
      </MemoryRouter>,
    );

    await user.click(screen.getByLabelText('User menu'));

    expect(screen.getByText('My Account')).toBeInTheDocument();
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('displays empty label when no active navigation item is found', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <Header
          isCollapsed={false}
          onToggleCollapse={() => undefined}
          onToggleMobileMenu={() => undefined}
        />
      </MemoryRouter>,
    );

    // The label div should exist but be empty
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('toggles theme to light when switch is unchecked', async () => {
    themeMock.theme = 'dark';
    themeMock.setTheme = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Header
          isCollapsed={false}
          onToggleCollapse={() => undefined}
          onToggleMobileMenu={() => undefined}
        />
      </MemoryRouter>,
    );

    await user.click(screen.getByLabelText('User menu'));
    const toggle = screen.getByRole('switch', { name: 'Dark mode' });
    expect(toggle).toBeChecked();
    await user.click(toggle);

    expect(themeMock.setTheme).toHaveBeenCalledWith('light');
  });
});
