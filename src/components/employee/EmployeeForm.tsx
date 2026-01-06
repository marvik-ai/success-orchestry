import { FC, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EmployeeCreation, EmployeeUpdate } from '@/types';

interface EmployeeFormProps {
  employeeId?: string;
  initialData?: Partial<EmployeeCreation | EmployeeUpdate>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const EmployeeForm: FC<EmployeeFormProps> = ({
  employeeId,
  initialData,
  onSuccess,
  onCancel,
}) => {
  const isEditMode = !!employeeId;

  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    document_number: initialData?.document_number || '',
    salary: initialData?.salary || '',
    tax_id: initialData?.tax_id || '',
    seniority: initialData?.seniority || '',
    status: initialData?.status || '',
    gender: initialData?.gender || '',
    education_level: initialData?.education_level || '',
    personal_email: initialData?.personal_email || '',
    phone: initialData?.phone || '',
    photo: initialData?.photo || null,
    city: initialData?.city || '',
    country_id: initialData?.country_id || '',
    address: initialData?.address || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.personal_email)) {
      newErrors.personal_email = 'Invalid email address';
    }

    // Phone
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number (min 10 digits)';
    }

    // Salary
    if (isNaN(Number(formData.salary)) || Number(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    // Photo URL
    if (formData.photo) {
      try {
        new URL(formData.photo);
      } catch {
        newErrors.photo = 'Must be a valid URL';
      }
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? null : value,
    }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const action = isEditMode ? 'update' : 'create';
    const isConfirmed = window.confirm(`Are you sure you want to ${action} this employee?`);

    if (!isConfirmed) return;

    setIsSubmitting(true);

    try {
      // TODO: Connect to API when employeesApi is ready
      console.log('Form data:', formData);
      console.log('Mode:', isEditMode ? 'edit' : 'create');
      console.log('Employee ID:', employeeId);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      onSuccess?.();
    } catch (error) {
      console.error('Failed to save employee:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to render error message
  const renderError = (field: string) =>
    errors[field] && <p className="mt-1 text-sm text-destructive">{errors[field]}</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="salary">
            Salary <span className="text-destructive">*</span>
          </Label>
          <Input
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className={errors.salary ? 'border-red-500' : ''}
          />
          {renderError('salary')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tax_id">
            Tax ID <span className="text-destructive">*</span>
          </Label>
          <Input
            id="tax_id"
            name="tax_id"
            value={formData.tax_id}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="seniority">
            Seniority <span className="text-destructive">*</span>
          </Label>
          <Input
            id="seniority"
            name="seniority"
            value={formData.seniority}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">
            Status <span className="text-destructive">*</span>
          </Label>
          <Input
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender">
            Gender <span className="text-destructive">*</span>
          </Label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
              errors.gender ? 'border-red-500' : 'border-input'
            }`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {renderError('gender')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="education_level">
            Education Level <span className="text-destructive">*</span>
          </Label>
          <Input
            id="education_level"
            name="education_level"
            value={formData.education_level}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="personal_email">
            Personal Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="personal_email"
            name="personal_email"
            type="email"
            value={formData.personal_email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className={errors.personal_email ? 'border-red-500' : ''}
          />
          {renderError('personal_email')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="document_number">
            Document Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="document_number"
            name="document_number"
            value={formData.document_number}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className={errors.phone ? 'border-red-500' : ''}
        />
        {renderError('phone')}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">
            City <span className="text-destructive">*</span>
          </Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country_id">
            Country ID <span className="text-destructive">*</span>
          </Label>
          <Input
            id="country_id"
            name="country_id"
            value={formData.country_id}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">
          Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo">Photo URL</Label>
        <Input
          id="photo"
          name="photo"
          type="url"
          value={formData.photo || ''}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="https://example.com/photo.jpg"
          className={errors.photo ? 'border-red-500' : ''}
        />
        {renderError('photo')}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Employee' : 'Create Employee'}
        </Button>
      </div>
    </form>
  );
};
