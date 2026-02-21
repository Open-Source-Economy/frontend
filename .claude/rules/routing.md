# Routing

## Rule

**Never hardcode route paths as strings.** Always use TanStack Router's type-safe APIs to build routes and URLs.

## File-Based Routes

Routes are defined by file structure in `src/routes/`. The Vite plugin auto-generates `src/routeTree.gen.ts`.

```
src/routes/
├── __root.tsx                          # Root layout (providers, ScrollRestoration)
├── _authenticated.tsx                  # Pathless layout for auth-protected routes
├── _authenticated/developer-onboarding.tsx
├── admin.tsx                           # Layout route with SuperAdmin guard
├── admin/index.tsx
├── auth/identify.tsx
├── project/$ownerParam/index.tsx       # /project/:ownerParam
├── project/$ownerParam/$repoParam.tsx  # /project/:ownerParam/:repoParam
├── index.tsx                           # Home page
└── ...
```

## Search Params

Define `validateSearch` on the route file, then use `getRouteApi` in the component:

```typescript
// Route file: src/routes/auth/identify.tsx
export const Route = createFileRoute("/auth/identify")({
  component: IdentificationStep,
  validateSearch: (search: Record<string, unknown>) => ({
    repository_token: (search.repository_token as string) || undefined,
    company_token: (search.company_token as string) || undefined,
    email: (search.email as string) || undefined,
  }),
});

// Component file
import { getRouteApi } from "@tanstack/react-router";
const routeApi = getRouteApi("/auth/identify");

export function IdentificationStep() {
  const searchParams = routeApi.useSearch();
  // searchParams.email, searchParams.repository_token, etc.
}
```

## Type-Safe Navigation

### Link Component

```typescript
import { Link } from "@tanstack/react-router";

// CORRECT - type-safe, validated against route tree
<Link to="/project/$ownerParam/$repoParam" params={{ ownerParam: owner, repoParam: repo }}>
  View Project
</Link>

// CORRECT - with search params
<Link to="/contact" search={{ reason: "request-project" }}>
  Contact Us
</Link>

// WRONG - hardcoded string with query params
<Link to={`/contact?reason=request-project`}>Contact Us</Link>

// WRONG - using <a> for internal routes
<a href={`/project/${owner}/${repo}`}>View Project</a>
```

### useNavigate

```typescript
import { useNavigate } from "@tanstack/react-router";

const navigate = useNavigate();

// CORRECT - type-safe
navigate({ to: "/auth/identify", search: { email: "user@example.com" } });

// WRONG - hardcoded string
navigate({ to: `/auth/identify?email=${email}` });
```

### External URLs

Use `<a>` tags for external URLs, never `<Link>`:

```typescript
// CORRECT
<a href="https://cal.com/open-source-economy" target="_blank" rel="noopener noreferrer">
  Book a meeting
</a>

// WRONG - external URL in Link
<Link to="https://cal.com/open-source-economy">Book a meeting</Link>
```

### Building URLs (e.g., for clipboard, sharing)

```typescript
import { useRouter } from "@tanstack/react-router";

const router = useRouter();

// CORRECT - type-safe URL construction
const url = `${window.location.origin}${router.buildLocation({ to: "/project/$ownerParam", params: { ownerParam: owner } }).href}`;
```

## Rules

- Use `<Link to="..." />` for internal navigation links
- Use `useNavigate()` for programmatic navigation
- Use `<a href="...">` for external URLs only
- Use `useRouter().buildLocation()` for constructing full URLs
- Never concatenate route paths with query strings
- Use `search` prop on `<Link>` for query parameters
- Use `validateSearch` on route files for type-safe search params
- Use `getRouteApi("/path").useSearch()` in components (avoids circular imports)
