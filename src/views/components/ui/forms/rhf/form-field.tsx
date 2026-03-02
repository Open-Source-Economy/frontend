import React from "react";
import { Controller, ControllerRenderProps, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { FormField, FormFieldLink } from "src/views/components/ui/forms/form-field";
import { ValidationError } from "src/views/components/ui/forms/validation-requirements";

interface RhfFormFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  hint?: string;
  link?: FormFieldLink;
  className?: string;
  transformError?: (value: unknown, errorMessage: string | undefined) => ValidationError | undefined;
  children: (field: ControllerRenderProps<T, FieldPath<T>>) => React.ReactNode;
}

export function RhfFormField<T extends FieldValues>({
  name,
  label,
  required,
  hint,
  link,
  className,
  transformError,
  children,
}: RhfFormFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        let error: ValidationError | undefined;

        if (fieldState.error) {
          if (transformError) {
            error = transformError(field.value, fieldState.error.message);
          } else {
            error = { error: fieldState.error.message };
          }
        } else if (transformError && fieldState.isDirty) {
          // After first submit + revalidation, show live requirements even when Zod says valid
          // (all requirements met = transformError returns undefined = no indicator shown)
          error = transformError(field.value, undefined);
        }

        return (
          <FormField label={label} required={required} hint={hint} link={link} error={error} className={className}>
            {children(field)}
          </FormField>
        );
      }}
    />
  );
}
