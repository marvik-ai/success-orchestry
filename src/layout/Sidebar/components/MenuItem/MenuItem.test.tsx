import { render, screen } from '@testing-library/react';
import { Home } from 'lucide-react';
import { MemoryRouter } from 'react-router-dom';

import { MenuItem } from './index';

describe('MenuItem', () => {
  it('renders the label', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <MenuItem label="Dashboard" path="/dashboard" icon={Home} isCollapsed={false} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
