export interface EmployeeCreation {
  id: string;
  first_name: string;
  last_name: string;
  document_number: string;
  tax_id: string;
  gender: string;
  education_level: string;
  personal_email: string;
  phone: string;
  photo: string | null;
  city: string;
  country_id: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeUpdate {
  readonly id: string;
  first_name: string;
  last_name: string;
  document_number: string;
  tax_id: string;
  gender: string;
  education_level: string;
  personal_email: string;
  phone: string;
  photo: string | null;
  city: string;
  country_id: string;
  address: string;
  readonly created_at: string;
  updated_at: string;
}

/*Possible extras
- marital_status
- children_count
- birth_date
- termination_date
*/
