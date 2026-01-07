import { FC, useState } from 'react';

import { useFormik } from 'formik';

import {
  editEmployeeSimpleSchema,
  EmployeeFormValues,
  initialEditEmployeeValues,
} from '@/components/employee/edit/EmployeeForm.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmployeeFormProps {
  employeeId?: string;
  initialData?: Partial<EmployeeFormValues>;
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik<EmployeeFormValues>({
    initialValues: {
      ...initialEditEmployeeValues,
      ...initialData,
      salary: initialData?.salary ? Number(initialData.salary) : initialEditEmployeeValues.salary,
    },
    // Connecting Yup Schema here
    validationSchema: editEmployeeSimpleSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      const action = isEditMode ? 'update' : 'create';
      const isConfirmed = window.confirm(`Are you sure you want to ${action} this employee?`);

      if (!isConfirmed) return;

      setIsSubmitting(true);

      try {
        console.log('Submitting Formik + Yup Data:', values);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        onSuccess?.();
      } catch (error) {
        console.error('Failed to save employee:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const showError = (field: keyof EmployeeFormValues) =>
    formik.touched[field] && formik.errors[field] ? (
      <p className="mt-1 text-sm text-destructive">{formik.errors[field]}</p>
    ) : null;

  const getInputClass = (field: keyof EmployeeFormValues) =>
    formik.touched[field] && formik.errors[field] ? 'border-red-500' : '';

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="first_name"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className={getInputClass('first_name')}
          />
          {showError('first_name')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="last_name"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className={getInputClass('last_name')}
          />
          {showError('last_name')}
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
            type="number"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className={getInputClass('salary')}
          />
          {showError('salary')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tax_id">
            Tax ID <span className="text-destructive">*</span>
          </Label>
          <Input
            id="tax_id"
            name="tax_id"
            value={formik.values.tax_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className={getInputClass('tax_id')}
          />
          {showError('tax_id')}
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
            value={formik.values.seniority}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className={getInputClass('seniority')}
          />
          {showError('seniority')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">
            Status <span className="text-destructive">*</span>
          </Label>
          <Input
            id="status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className={getInputClass('status')}
          />
          {showError('status')}
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
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
              formik.touched.gender && formik.errors.gender ? 'border-red-500' : 'border-input'
            }`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {showError('gender')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="education_level">
            Education Level <span className="text-destructive">*</span>
          </Label>
          <Input
            id="education_level"
            name="education_level"
            value={formik.values.education_level}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className={getInputClass('education_level')}
          />
          {showError('education_level')}
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
            value={formik.values.personal_email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className={getInputClass('personal_email')}
          />
          {showError('personal_email')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="document_number">
            Document Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="document_number"
            name="document_number"
            value={formik.values.document_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className={getInputClass('document_number')}
          />
          {showError('document_number')}
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
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isSubmitting}
          className={getInputClass('phone')}
        />
        {showError('phone')}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">
            City <span className="text-destructive">*</span>
          </Label>
          <Input
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className={getInputClass('city')}
          />
          {showError('city')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country_id">
            Country ID <span className="text-destructive">*</span>
          </Label>
          <Input
            id="country_id"
            name="country_id"
            value={formik.values.country_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className={getInputClass('country_id')}
          />
          {showError('country_id')}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">
          Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isSubmitting}
          className={getInputClass('address')}
        />
        {showError('address')}
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo">Photo URL</Label>
        <Input
          id="photo"
          name="photo"
          type="url"
          value={formik.values.photo || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isSubmitting}
          placeholder="https://example.com/photo.jpg"
          className={getInputClass('photo')}
        />
        {showError('photo')}
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
