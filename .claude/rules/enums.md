# Enum Usage

## Rule

**Always use enum member values.** Never hardcode enum strings or use `as` casts for enums — whether the enum comes from `@open-source-economy/api-types` or is defined locally.

## Use Member Values

```typescript
// CORRECT - use the enum member
dto.VerificationStatus.APPROVED;
dto.PlanProductType.INDIVIDUAL_PLAN;
dto.DeveloperRoleType.MAINTAINER;
dto.MergeRightsType.FULL_COMMITTER;

// WRONG - hardcoded strings
"approved" as dto.VerificationStatus;
"maintainer";
"full_committer" as dto.MergeRightsType;
```

## Use Companion Utilities for Display

```typescript
// CORRECT - use companion for display labels
DeveloperRoleTypeCompanion.label(role);
MergeRightsTypeCompanion.label(mergeRights);
VerificationStatusCompanion.label(status);

// WRONG - hardcode display strings
role === dto.DeveloperRoleType.MAINTAINER ? "Maintainer" : "Other";
```

## Rules

- **Always use enum member values** - never hardcode the underlying string
- **Never use `as` casts for enums** - use the enum value directly
- **Use enum values in comparisons** - never compare with raw strings
- **Use companion utilities for display** - never inline label mappings
