import * as Yup from 'yup';

// Cambiamos el nombre aquí para que coincida con el import del Modal
export const createEmployeeSimpleSchema = Yup.object({
  employee_code: Yup.string().required('El código es obligatorio'),
  status: Yup.string().oneOf(['active', 'inactive']).default('active'),
  first_name: Yup.string().required('Nombre requerido'),
  last_name: Yup.string().required('Apellido requerido'),
  personal_email: Yup.string().email('Email inválido').required('Email requerido'),
  country_id: Yup.string().required('Seleccione un país'),
  document_number: Yup.string().optional(),
  phone: Yup.string().optional(),
});

// Extraemos el tipo de datos directamente del schema correcto
export type EmployeeFormValues = Yup.InferType<typeof createEmployeeSimpleSchema>;

// Definimos los valores iniciales
export const initialEmployeeValues: EmployeeFormValues = {
  employee_code: '',
  first_name: '',
  last_name: '',
  personal_email: '',
  phone: '',
  document_number: '',
  country_id: '',
  status: 'active',
};
