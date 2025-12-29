import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Switch } from './switch';

const SwitchHarness = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch checked={checked} onCheckedChange={setChecked} aria-label="Theme toggle" />
  );
};

describe('Switch', () => {
  it('toggles checked state', async () => {
    const user = userEvent.setup();
    render(<SwitchHarness />);

    const toggle = screen.getByRole('switch', { name: 'Theme toggle' });
    expect(toggle).toHaveAttribute('data-state', 'unchecked');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('data-state', 'checked');
  });
});
