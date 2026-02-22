# TanStack Migration Plan

Adopt TanStack Query (for server-state / data fetching) and TanStack Router (for type-safe routing) in the OSE frontend, following the same patterns as lonio.

---

## Current State

| Concern       | Current                                                                            | Target                                                    |
| ------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Routing       | `react-router-dom@6.16` + `paths.ts` string constants                              | TanStack Router (file-based, type-safe)                   |
| Data fetching | `axios` + class-based services + `handleApiCall` + `useState`/`useEffect` per page | TanStack Query hooks wrapping services                    |
| Server state  | Manual `useState` + `useEffect` + `isLoading`/`apiError` in every hook             | `useQuery` / `useMutation` (auto caching, loading, error) |
| Forms         | `react-hook-form` + Joi validation                                                 | Keep react-hook-form (no change in this migration)        |
| Mocks         | Class-based `BackendAPIMock` implementing `BackendAPI` interface                   | Keep same pattern, just align service interfaces          |

---

## Lonio Rules — TanStack-Related Only

Only the lonio rules directly related to TanStack (Query + Router) are adopted:

| Lonio Rule      | Phase       | What it covers                                                                       |
| --------------- | ----------- | ------------------------------------------------------------------------------------ |
| `services.md`   | **Phase 2** | Services must throw errors (not return `ApiError`), so TanStack Query can catch them |
| `mocks.md`      | **Phase 2** | Mocks implement the same throw-based service interface                               |
| `hooks.md`      | **Phase 3** | TanStack Query hooks: `useQuery` / `useMutation` wrapping services                   |
| `components.md` | **Phase 4** | How components consume TanStack Query hooks (rename `data`, no intermediate vars)    |
| `routing.md`    | **Phase 6** | TanStack Router: type-safe `<Link>`, `useNavigate()`, `buildLocation()`              |

---

## Phase 1 — Install TanStack Query + QueryClientProvider

**Goal:** Add TanStack Query to the project and wrap the app with `QueryClientProvider`, without changing any existing code. Zero behavior change — just plumbing.

**Lonio rules to adopt:** None yet — pure infrastructure.

**Changes:**

1. `npm install @tanstack/react-query @tanstack/react-query-devtools`
2. Create `src/api/queryClient.ts` — export a `QueryClient` with default options
3. Wrap `<App />` (or inside `<BrowserRouter>`) with `<QueryClientProvider>`
4. Optionally add `<ReactQueryDevtools />` in dev mode

**Ship & verify:** App works exactly as before. DevTools panel visible in dev.

---

## Phase 2 — Refactor services: interface-first pattern

**Goal:** Restructure the service layer to match the lonio pattern — separate interface from implementation, move to `src/api/services/`. Keep the same axios-based HTTP calls, just reorganize.

**Lonio rules to adopt:**

- **`services.md`** — Interface + implementation pattern, throw errors instead of returning them, export interface for mocks. Adapted: we keep axios (not ts-rest), keep `ApiError` class (not plain `Error`).
- **`mocks.md`** — Mocks implement the same service interface, throw `ApiError` for errors, use `_params` for unused args, keep mock data realistic.

**New rule file to create:** `.claude/rules/services.md`

**Changes:**

1. Create `src/api/` directory structure:
   ```
   src/api/
   ├── services/
   │   ├── index.ts          # barrel — exports real or mock based on config
   │   ├── project.service.ts
   │   ├── auth.service.ts
   │   ├── onboarding.service.ts
   │   ├── admin.service.ts
   │   └── stripe.service.ts
   ├── mock/
   │   ├── project.mock.ts
   │   ├── auth.mock.ts
   │   ├── onboarding.mock.ts
   │   └── admin.mock.ts
   ├── hooks/                 # (empty for now — Phase 3)
   ├── queryClient.ts         # from Phase 1
   └── index.ts               # barrel: re-exports services + hooks
   ```
2. Extract each service interface + implementation from the current monolithic files (`BackendAPI.ts`, `AuthBackendAPI.ts`, `OnboardingBackendAPI.ts`, `AdminBackendAPI.ts`)
3. Move mocks from `src/__mocks__/` to `src/api/mock/`
4. Service selection in `src/api/services/index.ts` (same `config.api.useMock` pattern)
5. Update all existing imports — components still call services directly for now
6. **Critical:** Return types change from `Promise<T | ApiError>` to `Promise<T>` (throw on error instead of returning `ApiError`). This aligns with TanStack Query's error handling model where errors are thrown, not returned.

**Ship & verify:** All pages work. API calls succeed. Mock mode still works.

---

## Phase 3 — Create TanStack Query hooks

**Goal:** For each service, create a hooks file that wraps service methods with `useQuery` / `useMutation`. Components will migrate to these hooks one-by-one.

**Lonio rules to adopt:**

- **`hooks.md`** — Interface pattern with all hooks, query keys, `useQuery`/`useMutation` wrapping services. Mutations use `{ params, query, body }` object. Invalidate queries on mutation success.

**New rule file to create:** `.claude/rules/hooks.md`

**Changes:**

1. Create hook files in `src/api/hooks/`:
   ```
   src/api/hooks/
   ├── project.hooks.ts
   ├── auth.hooks.ts
   ├── onboarding.hooks.ts
   ├── admin.hooks.ts
   └── stripe.hooks.ts
   ```
2. Each file follows the lonio pattern:

   ```typescript
   import * as dto from "@open-source-economy/api-types";
   import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
   import { projectService } from "src/api/services";

   const PROJECT_QUERY_KEY = ["project"] as const;

   export const projectHooks = {
     useProjectDetailsQuery(params: dto.GetProjectDetailsParams, query: dto.GetProjectDetailsQuery) {
       return useQuery({
         queryKey: [...PROJECT_QUERY_KEY, "details", params, query],
         queryFn: () => projectService.getProjectDetails(params, query),
         enabled: !!params.owner,
       });
     },
     // ... more hooks
   };
   ```

3. Export all hooks from `src/api/index.ts` barrel

**Ship & verify:** Hooks exist but aren't used yet. No behavior change.

---

## Phase 4 — Migrate components to TanStack Query hooks

**Goal:** Replace all manual `useState`/`useEffect` data-fetching patterns with TanStack Query hooks, one page at a time.

**Lonio rules to adopt:**

- **`components.md`** — Data flow: components -> hooks -> services (never import services directly). Explicit type annotations for params and query. Rename `data` to response type name (`data: getProjectDetailsResponse`). Never create redundant intermediate variables.

**New rule file to create:** `.claude/rules/components.md`

**Migration order** (by risk — start with simpler pages):

1. `ProjectsPage` (simple list query)
2. `ProjectDetailPage` + `useProjectDetails` hook
3. `PricingPage` (plans query)
4. `FAQPage`, `ContactPage` (simple or no queries)
5. `HomePage` sections (sponsors, etc.)
6. `SponsorshipPage`
7. `OnboardingFlow` (multiple mutations)
8. Auth pages (login, register mutations)
9. Admin pages

**Pattern for each page:**

- Delete the custom `use*` hook (e.g., `useProjectDetails.ts`)
- Replace with TanStack Query hook call in the component
- Remove `useState` for `isLoading`, `apiError`, `data` — use query result directly
- Rename `data` to response type name per lonio convention: `data: getProjectDetailsResponse`

**Ship & verify after each page or small batch.**

---

## Phase 5 — Migrate mutations

**Goal:** Convert all POST/PUT/DELETE operations to `useMutation`. (Follows same rules as Phase 3+4.)

**Lonio rules reinforced:** `hooks.md` (mutation pattern), `components.md` (usage pattern).

**Key areas:**

1. Checkout flow (`checkout`)
2. Newsletter subscription
3. Contact form submission
4. Currency preference
5. Onboarding form submissions (create profile, update contact, set preferences, etc.)
6. Auth operations (login, register, forgot/reset password)
7. Admin operations (sync, create entities)

**Pattern:**

```typescript
const checkout = stripeHooks.useCheckoutMutation();

// In handler:
const params: dto.CheckoutParams = {};
const query: dto.CheckoutQuery = {};
const body: dto.CheckoutBody = { ... };

await checkout.mutateAsync({ params, query, body });
```

**Ship & verify.**

---

## Phase 6 — Install TanStack Router + codemods

**Goal:** Replace `react-router-dom` with TanStack Router for type-safe routing.

**Lonio rules to adopt:**

- **`routing.md`** — Never hardcode route paths as strings. Use `<Link to="...">` for navigation. Use `useNavigate()` for programmatic navigation. Use `useRouter().buildLocation()` for constructing full URLs.

**New rule file to create:** `.claude/rules/routing.md`

**Changes:**

1. `npm install @tanstack/react-router @tanstack/router-devtools @tanstack/router-plugin`
2. Create route tree in `src/routes/` (file-based routing):
   ```
   src/routes/
   ├── __root.tsx              # root layout (AuthProvider, CurrencyProvider, etc.)
   ├── index.tsx               # HomePage
   ├── projects.tsx
   ├── project/
   │   ├── $ownerParam.tsx
   │   └── $ownerParam.$repoParam.tsx
   ├── pricing.tsx
   ├── faq.tsx
   ├── contact.tsx
   ├── sponsorship.tsx
   ├── auth/
   │   ├── identify.tsx
   │   ├── github.tsx
   │   ├── password.tsx
   │   ├── forgot-password.tsx
   │   └── reset-password.tsx
   ├── admin/
   │   ├── index.tsx
   │   ├── maintainers.tsx
   │   ├── organizations/sync.tsx
   │   └── ...
   ├── developer.tsx
   ├── developer-onboarding.tsx
   └── ...
   ```
3. Replace `<BrowserRouter>` + `<Routes>` in `App.tsx` with TanStack Router
4. Replace all `useNavigate()` from react-router with TanStack's `useNavigate()`
5. Replace all `<Link to="...">` with TanStack's `<Link to="...">`
6. Replace all `useParams()` with TanStack's type-safe route params
7. Delete `paths.ts` — routes are now type-checked by the route tree

**Ship & verify:** All navigation works, all pages load, route params are type-safe.

---

## Phase 7 — Delete `handleApiCall` and legacy patterns

**Goal:** Clean up old infrastructure that's no longer needed.

**Lonio rules reinforced:** All rules from earlier phases — this phase just removes the code those rules replaced.

**Delete:**

- `src/ultils/handleApiCall.ts`
- `src/services/` directory (replaced by `src/api/services/`)
- `src/__mocks__/` directory (replaced by `src/api/mock/`)
- Any remaining `getBackendAPI()` / `getAuthBackendAPI()` / `getOnboardingBackendAPI()` factory functions
- All custom `use*` hooks that were replaced by TanStack Query hooks (e.g., `useProjectDetails.ts`)
- `react-router-dom` from `package.json`

**Ship & verify:** Clean build, no dead code.

---

## Phase 8 — Add Claude rules

**Goal:** Document all new conventions for future development. Create rule files adapted from lonio but using OSE conventions.

**Rule files to create (all TanStack-related):**

| Rule file                     | Based on lonio rule        | Key adaptations for OSE                                                          |
| ----------------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| `.claude/rules/services.md`   | `services.md` + `mocks.md` | Use axios (not ts-rest), `ApiError` class (not plain `Error`), `import * as dto` |
| `.claude/rules/hooks.md`      | `hooks.md`                 | Same pattern, adapted imports for `@open-source-economy/api-types`               |
| `.claude/rules/routing.md`    | `routing.md`               | Same pattern — TanStack Router type-safe navigation                              |
| `.claude/rules/components.md` | `components.md`            | Same data flow rules. Keep `import * as dto` convention.                         |

---

## Lonio Rules NOT Adopted (and why)

| Lonio Rule         | Why not                                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| `forms.md`         | OSE uses react-hook-form + Joi, not useZodForm + Zod. Could be a separate future migration.                     |
| `tables.md`        | Lonio-specific — `SmartDataTable`, `TableDefinition`, Kanban views. OSE has no equivalent table infrastructure. |
| `view-mode.md`     | Lonio-specific — Draft vs Production mode switching. OSE's mock mode is config-only, not user-facing.           |
| `process-types.md` | Lonio-specific — HR workflow building blocks (VerificationCheck, Reminder, DataRequest). Not applicable to OSE. |

---

## Dependencies to install

```bash
# Phase 1
npm install @tanstack/react-query @tanstack/react-query-devtools

# Phase 6
npm install @tanstack/react-router @tanstack/router-devtools @tanstack/router-plugin
```

## Dependencies to remove (Phase 7)

```bash
npm uninstall react-router-dom
```

---

## Key Differences from Lonio

| Aspect            | Lonio                      | OSE (adaptation)                                                        |
| ----------------- | -------------------------- | ----------------------------------------------------------------------- |
| API types package | `@lonio-ch/api-contracts`  | `@open-source-economy/api-types`                                        |
| API types import  | `import * as Api from ...` | `import * as dto from ...` (keep existing convention)                   |
| API client        | ts-rest (`apiClient`)      | axios (keep existing)                                                   |
| Service unwrap    | `unwrap<T>(response)`      | Direct axios response handling (keep existing)                          |
| Forms             | `useZodForm` + Zod schemas | `react-hook-form` + Joi (keep existing — separate migration if desired) |
| Error type        | `Error`                    | `ApiError` (keep existing class, but throw instead of return)           |
