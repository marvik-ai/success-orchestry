import { FC, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { EmployeeFormValues } from '@/components/employee/edit/EmployeeForm.schema';
import { EmployeeForm } from '@/components/employee/EmployeeForm';
import { Button } from '@/components/ui/button';

export const EditEmployeePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState<Partial<EmployeeFormValues> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/employees');
      return;
    }

    const fetchEmployee = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        setEmployeeData({
          first_name: 'Jane',
          last_name: 'Doe',
          document_number: 'A-12345678',
          salary: 85000,
          tax_id: 'TX-987654',
          seniority: 'Senior',
          status: 'Active',
          gender: 'female',
          education_level: "Bachelor's Degree",
          personal_email: 'jane.doe@company.com',
          phone: '+1 555-012-3456',
          photo: '',
          city: 'New York',
          country_id: 'US',
          address: '123 Maple Avenue, Suite 400',
        });
      } catch (error) {
        console.error('Failed to fetch employee:', error);
        navigate('/employees');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  const handleCancel = () => {
    navigate('/employees');
  };

  const handleSave = async (values: EmployeeFormValues) => {
    console.log('Updating Employee ID:', id);
    console.log('Data:', values);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate('/employees');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-muted-foreground">Loading employee data...</p>
      </div>
    );
  }

  if (!employeeData) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-destructive">Employee not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Edit Employee</h1>
          <p className="text-sm text-muted-foreground">Update employee information and details.</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          Back to Employees
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <EmployeeForm initialData={employeeData} onSubmit={handleSave} onCancel={handleCancel} />
      </div>
    </div>
  );
};
