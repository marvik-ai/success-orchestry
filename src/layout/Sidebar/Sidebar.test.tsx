import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { Sidebar } from './index';

describe('Sidebar', () => {
  it('renders navigation items', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Sidebar
          isMobileMenuOpen={false}
          isCollapsed={false}
          onToggleMobileMenu={() => undefined}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Success Orchestry')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('calls handlers on hover and overlay click', async () => {
    const onToggleMobileMenu = vi.fn();
    const onHoverStart = vi.fn();
    const onHoverEnd = vi.fn();

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Sidebar
          isMobileMenuOpen={true}
          isCollapsed={true}
          onToggleMobileMenu={onToggleMobileMenu}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      </MemoryRouter>,
    );

    const sidebar = screen.getByLabelText('Sidebar');
    await userEvent.hover(sidebar);
    await userEvent.unhover(sidebar);

    expect(onHoverStart).toHaveBeenCalledTimes(1);
    expect(onHoverEnd).toHaveBeenCalledTimes(1);

    const overlay = screen.getByTestId('sidebar-overlay');
    await userEvent.click(overlay);

    expect(onToggleMobileMenu).toHaveBeenCalledWith(false);
  });
});
