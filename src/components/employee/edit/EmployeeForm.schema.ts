import * as yup from 'yup';

export const editEmployeeSimpleSchema = yup.object({
  first_name: yup.string().required('Missing First Name'),
  last_name: yup.string().required('Missing Last Name'),
  document_number: yup.string().required('Missing ID'),
  salary: yup.number().required('Missing Salary'),
  tax_id: yup.string().required('Missing Tax ID'),
  seniority: yup.string().required('Missing Seniority'),
  status: yup.string().required('Missing Status'),
  gender: yup.string().required('Please select an option').oneOf(['male', 'female', 'other']),
  education_level: yup.string().required('Missing Education Level'),
  personal_email: yup.string().required('Missing Personal Email'),
  phone: yup
    .string()
    .required('Missing Phone Number')
    .matches(/^\+?[\d\s-]{10,}$/),
  photo: yup.string().nullable(),
  city: yup.string().required('Missing City'),
  country_id: yup.string().required('Missing Country'),
  address: yup.string().required('Missing Address'),
});

export type EmployeeFormValues = yup.InferType<typeof editEmployeeSimpleSchema>;

// Used for testing
export const initialEditEmployeeValues: EmployeeFormValues = {
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
  phone: '+1 (555) 012-3456',
  photo: '',
  city: 'New York',
  country_id: 'US',
  address: '123 Maple Avenue, Suite 400',
};
