import { useState } from 'react';

import { Plus, Pencil } from 'lucide-react';

import { EmployeeFormValues } from '@/components/employee/edit/EmployeeForm.schema';
import { EmployeeForm } from '@/components/employee/EmployeeForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface EmployeeModalProps {
  employeeId?: string;
  initialData?: Partial<EmployeeFormValues>;
  trigger?: React.ReactNode;
}

export function EmployeeModal({ employeeId, initialData, trigger }: EmployeeModalProps) {
  const [open, setOpen] = useState(false);
  const isEditMode = !!employeeId;

  // This function now holds the logic that used to be in the Form
  const handleSave = async (values: EmployeeFormValues) => {
    try {
      if (isEditMode) {
        console.log(`Updating employee ${employeeId} with data:`, values);
        // await api.updateEmployee(employeeId, values);
      } else {
        console.log('Creating new employee with data:', values);
        // await api.createEmployee(values);
      }

      // Simulate API delay (delete when api connected)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Close modal and refresh
      setOpen(false);
      console.log('Refetching data...');
    } catch (error) {
      console.error('Error saving employee:', error);
      // You can add toast notifications here on error
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant={isEditMode ? 'ghost' : 'default'} size={isEditMode ? 'icon' : 'default'}>
            {isEditMode ? (
              <Pencil className="size-4" />
            ) : (
              <>
                <Plus className="mr-2 size-4" /> Add Employee
              </>
            )}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] w-full max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Employee' : 'Create New Employee'}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edit employee details with updated information.'
              : 'Fill in the details below to register a new employee.'}
          </DialogDescription>
        </DialogHeader>

        <EmployeeForm
          initialData={initialData}
          onSubmit={handleSave}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
