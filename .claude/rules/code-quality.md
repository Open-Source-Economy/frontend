# Code Quality Principles

## Rule

**Every piece of code you write or modify must be evaluated against these principles.** These are not optional — apply them proactively without being asked.

## 1. DRY — Extract shared patterns

When you see the same shape repeated across files, extract a shared type, interface, or helper.

```typescript
// BAD — same interface repeated in every component
interface MaintainerActions {
  onViewDetail: (profile: dto.FullDeveloperProfile) => void;
}
interface ProjectActions {
  onViewDetail: (project: dto.DeveloperProjectItemEntry) => void;
}

// GOOD — generic interface defined once
interface ViewActions<T> {
  onViewDetail: (item: T) => void;
}
```

## 2. Components own their display

Components handle null, formatting, and placeholders internally. Callers pass raw data — never transform at the call site.

```typescript
// BAD — caller formats and handles null
name: profile.profileEntry?.user?.name ? `${profile.profileEntry.user.name}` : "—";

// GOOD — component accepts raw data, handles everything
name: profile.profileEntry?.user?.name;
```

## 3. Enums over hardcoded strings

Never hardcode a string value that belongs to a known set. Use enum members from `@open-source-economy/api-types`.

```typescript
// BAD — hardcoded strings
return { status: "approved", variant: "success" };

// GOOD — enum values
return { status: dto.VerificationStatus.APPROVED, variant: "success" };
```

## 4. Type-safe references

When strings reference other strings (IDs, keys, config values), use enums or typed constants so renames are caught at compile time.

## 5. Bundle related exports into interfaces

When files always export the same set of things, define an interface that enforces the shape. This is what the companion pattern already does — keep using it consistently.

```typescript
// GOOD — companion namespace bundles related utilities
export namespace DeveloperRoleTypeCompanion {
  export function label(role: dto.DeveloperRoleType): string { ... }
  export function displays(): Record<dto.DeveloperRoleType, string> { ... }
  export function options(): Array<{ value: dto.DeveloperRoleType; label: string }> { ... }
}
```

## 6. Centralize responsibility

Each concern should have exactly one owner. Don't scatter the same logic across multiple call sites.

```typescript
// BAD — every component handles null differently
value: profile.profileEntry?.profile.contactEmail ?? "—";
name: profile.profileEntry?.user?.name ?? "";

// GOOD — companion or component owns null display
value: profile.profileEntry?.profile.contactEmail;
// Let the rendering component handle the fallback
```

## How to apply

Before writing or modifying code, ask yourself:

1. **Am I repeating a pattern?** → Extract a shared type or helper
2. **Am I formatting/handling null at the call site?** → Push it into the component
3. **Am I hardcoding a string from a known set?** → Use an enum
4. **Am I using a string that references something else?** → Use a typed constant
5. **Am I exporting the same shape from multiple files?** → Define an interface for it
6. **Is this logic duplicated across call sites?** → Centralize it in one owner
