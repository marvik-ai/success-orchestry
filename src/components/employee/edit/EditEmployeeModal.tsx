import { useState } from 'react';

import { Plus, Pencil } from 'lucide-react'; // Icons

import { EmployeeFormValues } from '@/components/employee/edit/EmployeeForm.schema';
import { EmployeeForm } from '@/components/employee/EmployeeForm'; // Import your existing form
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
  trigger?: React.ReactNode; // Optional: Custom button if you want
}

export function EmployeeModal({ employeeId, initialData, trigger }: EmployeeModalProps) {
  const [open, setOpen] = useState(false);
  const isEditMode = !!employeeId;

  const handleSuccess = () => {
    // 1. Close the modal
    setOpen(false);
    // 2. Ideally trigger a data refresh here (e.g., invalidate queries if using React Query)
    console.log('Refetching data...');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          // Default buttons based on mode
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

      {/* max-h-[90vh] and overflow-y-auto handle scrolling if the form is too tall */}
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
          employeeId={employeeId}
          initialData={initialData}
          onSuccess={handleSuccess}
          onCancel={() => setOpen(false)} // Closes modal when "Cancel" is clicked inside form
        />
      </DialogContent>
    </Dialog>
  );
}
