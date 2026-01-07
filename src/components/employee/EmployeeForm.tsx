import { FC } from 'react';
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
  initialData?: Partial<EmployeeFormValues>;
  onSubmit: (values: EmployeeFormValues) => Promise<void>; 
  onCancel?: () => void;
}

export const EmployeeForm: FC<EmployeeFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const formik = useFormik<EmployeeFormValues>({
    initialValues: {
      ...initialEditEmployeeValues,
      ...initialData,
      salary: initialData?.salary ? Number(initialData.salary) : initialEditEmployeeValues.salary,
    },
    validationSchema: editEmployeeSimpleSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
        const isConfirmed = window.confirm('Are you sure you want to save?');
        if (!isConfirmed) return;

        try {
            await onSubmit(values);
        } catch (error) {
            console.error(error);
        }
    },
  });

  const renderField = (
    fieldName: keyof EmployeeFormValues,
    label: string,
    type: string = 'text',
    placeholder?: string,
  ) => (
    <div className="space-y-2">
      <Label htmlFor={fieldName}>
        {label} <span className="text-destructive">*</span>
      </Label>
      <Input
        id={fieldName}
        name={fieldName}
        type={type}
        placeholder={placeholder}
        value={formik.values[fieldName] as string | number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.isSubmitting}
        className={formik.touched[fieldName] && formik.errors[fieldName] ? 'border-red-500' : ''}
      />
      {formik.touched[fieldName] && formik.errors[fieldName] && (
        <p className="mt-1 text-sm text-destructive">{formik.errors[fieldName]}</p>
      )}
    </div>
  );

  const renderSelect = (
    fieldName: keyof EmployeeFormValues,
    label: string,
    options: { value: string; label: string }[],
  ) => (
    <div className="space-y-2">
      <Label htmlFor={fieldName}>
        {label} <span className="text-destructive">*</span>
      </Label>
      <select
        id={fieldName}
        name={fieldName}
        value={formik.values[fieldName] as string}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.isSubmitting}
        className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
          formik.touched[fieldName] && formik.errors[fieldName] ? 'border-red-500' : 'border-input'
        }`}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {formik.touched[fieldName] && formik.errors[fieldName] && (
        <p className="mt-1 text-sm text-destructive">{formik.errors[fieldName]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {renderField('first_name', 'First Name')}
        {renderField('last_name', 'Last Name')}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {renderField('salary', 'Salary', 'number')}
        {renderField('tax_id', 'Tax ID')}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {renderField('seniority', 'Seniority')}
        {renderField('status', 'Status')}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {renderSelect('gender', 'Gender', [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ])}
        {renderField('education_level', 'Education Level')}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {renderField('personal_email', 'Personal Email', 'email')}
        {renderField('document_number', 'Document Number')}
      </div>

      <div className="space-y-2">{renderField('phone', 'Phone', 'tel')}</div>

      <div className="grid grid-cols-2 gap-4">
        {renderField('city', 'City')}
        {renderField('country_id', 'Country ID')}
      </div>

      <div className="space-y-2">{renderField('address', 'Address')}</div>

      <div className="space-y-2">
        <Label htmlFor="photo">Photo URL</Label>
        <Input
          id="photo"
          name="photo"
          type="url"
          placeholder="https://example.com/photo.jpg"
          value={formik.values.photo || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          className={formik.touched.photo && formik.errors.photo ? 'border-red-500' : ''}
        />
        {formik.touched.photo && formik.errors.photo && (
          <p className="mt-1 text-sm text-destructive">{formik.errors.photo}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Saving...' : 'Save Employee'}
        </Button>
      </div>
    </form>
  );
};
