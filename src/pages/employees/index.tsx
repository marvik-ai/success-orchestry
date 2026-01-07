import { FC } from 'react';

import { EmployeeModal } from '@/components/employee/edit/EditEmployeeModal'; // Import the new modal
import { Button } from '@/components/ui/button';

export const EmployeesPage: FC = () => {
  // Temporary placeholder ID for testing
  const placeholderEmployeeId = 'temp-id-123';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Employees</h1>
          <p className="text-sm text-muted-foreground">Track teams, roles, and assignments.</p>
        </div>

        {/* Al agregar el ID se usa la version edit de la modal */}
        <EmployeeModal
          employeeId={placeholderEmployeeId}
          trigger={<Button>Edit Employee [PH]</Button>}
        />
      </div>
    </div>
  );
};
