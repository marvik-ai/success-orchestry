import { FC } from 'react';

import { Formik, Form } from 'formik';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  createEmployeeSimpleSchema,
  initialEmployeeValues,
  type EmployeeFormValues,
} from './EmployeeForm.schema';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEmployeeModal: FC<Props> = ({ isOpen, onClose }) => {
  const handleSubmit = (values: EmployeeFormValues) => {
    const payload = {
      employee: {
        employee_code: values.employee_code,
        status: values.status,
      },
      personal_info: {
        first_name: values.first_name,
        last_name: values.last_name,
        personal_email: values.personal_email,
        phone: values.phone,
        document_number: values.document_number,
        country_id: values.country_id,
      },
    };
    console.log('Payload estructurado:', payload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl overflow-hidden rounded-xl border-border/60 bg-card p-0 shadow-lg">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-semibold text-foreground">
            Nuevo Registro de Empleado
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Complete la información básica y personal del nuevo integrante.
          </p>
        </DialogHeader>

        <Formik
          initialValues={initialEmployeeValues}
          validationSchema={createEmployeeSimpleSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="flex max-h-[calc(90vh-120px)] flex-col">
              <div className="scrollbar-thin flex-1 space-y-6 overflow-y-auto p-6 pt-2">
                {/* Sección: Identificación Laboral */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                    Identificación Laboral
                  </h4>
                  <div className="space-y-2">
                    <Label htmlFor="employee_code">Código de Empleado</Label>
                    <Input
                      name="employee_code"
                      placeholder="Ej: EMP-001"
                      className="rounded-lg"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.employee_code}
                    />
                    {errors.employee_code && touched.employee_code && (
                      <span className="text-xs text-destructive">{errors.employee_code}</span>
                    )}
                  </div>
                </div>

                <hr className="border-border/40" />

                {/* Sección: Información Personal */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                    Información Personal
                  </h4>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">Nombre</Label>
                      <Input
                        name="first_name"
                        className="rounded-lg"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                      />
                      {errors.first_name && touched.first_name && (
                        <span className="text-xs text-destructive">{errors.first_name}</span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Apellido</Label>
                      <Input
                        name="last_name"
                        className="rounded-lg"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.last_name}
                      />
                      {errors.last_name && touched.last_name && (
                        <span className="text-xs text-destructive">{errors.last_name}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personal_email">Correo Electrónico</Label>
                    <Input
                      name="personal_email"
                      type="email"
                      className="rounded-lg"
                      placeholder="correo@ejemplo.com"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.personal_email}
                    />
                    {errors.personal_email && touched.personal_email && (
                      <span className="text-xs text-destructive">{errors.personal_email}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="document_number">Nro. Documento</Label>
                      <Input
                        name="document_number"
                        className="rounded-lg"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.document_number}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country_id">País</Label>
                      <select
                        name="country_id"
                        className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm outline-none focus:ring-1 focus:ring-primary"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country_id}
                      >
                        <option value="" className="bg-card">
                          Seleccione...
                        </option>
                        <option value="id-argentina" className="bg-card">
                          Argentina
                        </option>
                        <option value="id-mexico" className="bg-card">
                          México
                        </option>
                      </select>
                      {errors.country_id && touched.country_id && (
                        <span className="text-xs text-destructive">{errors.country_id}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 border-t border-border/60 bg-muted/20 p-6">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={onClose}
                  className="rounded-lg text-muted-foreground"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="rounded-lg bg-primary px-8 hover:bg-primary/90">
                  Guardar Empleado
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
