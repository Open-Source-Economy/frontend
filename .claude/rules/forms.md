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

## Schema Matching

**The form schema must validate the same shape the backend endpoint expects.** Check the API types to find the correct schema.

```typescript
// API types define the body shape for the endpoint
// The form schema must enforce the same constraints

// CORRECT — schema matches what the endpoint requires
export const profileFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  bio: z.string().optional(),
});

// WRONG — lenient schema, frontend won't flag missing required fields
export const profileFormSchema = z.object({
  name: z.string().optional(), // backend requires this!
  email: z.string().optional(), // backend requires this!
  bio: z.string().optional(),
});
```

## Nested Fields

Match schema structure with dot notation:

```typescript
// Schema: z.object({ projects: z.array(z.object({ url, role })) })
// Access nested fields:
form.watch("projects");
form.setValue("projects", [...current, { url: "", role: "" }]);
```

## Default Values

Pass from props when editing existing data. For new forms, use empty strings for text fields, `false` for booleans, and arrays with one empty item:

```typescript
// New form — minimal defaults
const form = useZodForm(contactFormSchema, {
  defaultValues: {
    name: "",
    email: "",
    requestMeeting: false,
    projects: [{ url: "", role: "" }],
  },
});

// Edit form — populate from existing data
const form = useZodForm(profileFormSchema, {
  defaultValues: {
    name: existingProfile.name,
    email: existingProfile.email,
  },
});
```

## Key Patterns

- `mode: "onSubmit"` — errors appear only after first submit attempt
- `reValidateMode: "onChange"` — after first attempt, fields revalidate on change
- Conditional validation uses `.superRefine()` on the schema
- Password fields use `transformError={passwordTransformError}` for requirements checklist
- Checkboxes use `form.setValue("field", checked, { shouldValidate })` (not `register`)
- The `zodResolver(schema as any)` cast is needed for Zod 4 compatibility

## Type Conversions

Handle in the render function, not with custom schemas:

```typescript
// Radio emits string, schema expects boolean
<input
  type="checkbox"
  checked={form.watch("paid")}
  onChange={(e) => form.setValue("paid", e.target.checked)}
/>
```

## Error Handling

Use `ServerErrorAlert` for API/server errors, and `form.formState.errors` for field-level validation:

```typescript
import { ApiError } from "src/ultils/error/ApiError";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";

// Convert mutation errors to ApiError
const apiError = mutation.error
  ? mutation.error instanceof ApiError
    ? mutation.error
    : ApiError.from(mutation.error)
  : null;

// Server error display
{apiError && <ServerErrorAlert error={apiError} variant="compact" showDismiss onDismiss={handleDismiss} />}
```

## Rules

- **Use a schema that matches the backend endpoint constraints** — check the API types
- NEVER use `useState` per field for form state — use RHF `register` or `watch`/`setValue`
- NEVER use `ValidatedInputWithRef` / `InputRef` for new forms — those are legacy (still used in v1)
- NEVER define standalone validators outside Zod schemas for RHF forms — keep validation in schemas
- NEVER use raw `<label>` + `<Input>` in new forms — use `<RhfFormInput>` or `<RhfFormField>`
- Match nested field names to schema structure (dot notation)
- Handle type conversions (string/boolean) in the render function
- Use `ServerErrorAlert` for API errors, `form.formState.errors` for field validation
- Use `.superRefine()` for conditional cross-field validation
- Use `form.clearErrors()` when conditional fields change visibility
