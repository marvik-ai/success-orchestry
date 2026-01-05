import { FC } from 'react';

import { Button } from '@/components/ui/button';

export const EmployeesPage: FC = () => (
  <div className="grid-cols-2 space-y-2">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Employees</h1>
      <p className="text-sm text-muted-foreground">Track teams, roles, and assignments.</p>
    </div>
    <Button className="justify-self-end">Edit Employee [PH]</Button>
  </div>
);
