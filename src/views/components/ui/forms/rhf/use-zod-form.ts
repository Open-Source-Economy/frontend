import { FieldValues, useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export interface UseZodFormReturn<TData extends FieldValues> extends UseFormReturn<TData> {
  schema: z.ZodType<TData>;
}

export function useZodForm<TData extends FieldValues>(
  schema: z.ZodType<TData>,
  options?: Omit<UseFormProps<TData>, "resolver">,
): UseZodFormReturn<TData> {
  const form = useForm<TData>({
    resolver: zodResolver(schema as any),
    mode: "onSubmit",
    reValidateMode: "onChange",
    ...options,
  });
  return { ...form, schema };
}
