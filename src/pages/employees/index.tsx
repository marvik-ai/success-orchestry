import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export const EmployeesPage: FC = () => {
  const navigate = useNavigate();
  // Temporary placeholder ID for testing - replace with actual employee ID
  const placeholderEmployeeId = 'temp-id';

  const handleEditClick = () => {
    navigate(`/employees/${placeholderEmployeeId}/edit`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 space-y-2">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Employees</h1>
          <p className="text-sm text-muted-foreground">Track teams, roles, and assignments.</p>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleEditClick}>Edit Employee [PH]</Button>
        </div>
      </div>
    </div>
  );
};
