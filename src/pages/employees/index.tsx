import { FC, useState } from 'react';

import { Plus } from 'lucide-react';

import { CreateEmployeeModal } from '@/components/employee/create/CreateEmployeeModal';
import { Button } from '@/components/ui/button';

export const EmployeesPage: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Employees</h1>
        <p className="text-sm text-muted-foreground">Track teams, roles, and assignments.</p>
      </div>
      <div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="size-4" />
          Nuevo Empleado
        </Button>
        <CreateEmployeeModal isOpen={isOpen} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};
