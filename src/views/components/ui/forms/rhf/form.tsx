import React from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface FormProps<T extends FieldValues> extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
}

export function Form<T extends FieldValues>({ form, onSubmit, children, ...rest }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
}
