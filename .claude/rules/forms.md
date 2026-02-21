# Form Conventions

All forms use **React Hook Form (RHF)** with **Zod** validation via `@hookform/resolvers`.

## Infrastructure

- `src/views/components/ui/forms/rhf/` — RHF wrappers (`useZodForm`, `Form`, `RhfFormField`, `RhfFormInput`, `RhfFormTextarea`)
- `src/views/components/ui/forms/schemas/form-schemas.ts` — all Zod schemas and inferred types
- `src/views/components/ui/forms/schemas/password-requirements.ts` — `passwordTransformError` for password checklist

## Creating a new form

1. Define a Zod schema in `form-schemas.ts` and export both the schema and its inferred type
2. Use `useZodForm(schema, { defaultValues })` to create the form
3. For standard forms: wrap with `<Form form={form} onSubmit={handler}>` and use `<RhfFormInput>` / `<RhfFormTextarea>`
4. For wizard steps (no `<form>` submit): use `FormProvider`, sync state via `form.watch()` subscription, validate with `form.trigger()` in `setOnNext`
5. For custom inputs: use `form.watch()` + `form.setValue()` with `{ shouldValidate: form.formState.isSubmitted }`

## Key patterns

- `mode: "onSubmit"` — errors appear only after first submit attempt
- `reValidateMode: "onChange"` — after first attempt, fields revalidate on change
- Conditional validation uses `.superRefine()` on the schema
- Password fields use `transformError={passwordTransformError}` for requirements checklist
- Checkboxes use `form.setValue("field", checked, { shouldValidate })` (not `register`)
- The `zodResolver(schema as any)` cast is needed for Zod 4 compatibility

## Do NOT

- Use `useState` per field for form state — use RHF `register` or `watch`/`setValue`
- Use `ValidatedInputWithRef` / `InputRef` for new forms — those are legacy (still used in v1)
- Define validators outside Zod schemas for RHF forms — keep validation in schemas
