# Barrel Exports (index.ts)

## Rule

Create barrels only for public API boundaries, not every folder.

## When to Create

Create `index.ts` when:

- Hiding internal implementation
- Defining a clear public API
- Allowing internal refactoring without breaking imports

## When NOT to Create

- Small folders (1-2 files)
- Feature folders where you import specific files

## Guidelines by Folder

| Folder                     | Has index? | Reason                           |
| -------------------------- | ---------- | -------------------------------- |
| `src/services/`            | Yes        | Public API boundary              |
| `src/utils/companions/`    | Yes        | Hides individual companion files |
| `src/utils/`               | Yes        | Public utility boundary          |
| `src/views/components/ui/` | No         | Import specific components       |
| `src/views/pages/*/`       | No         | Import specific pages            |

## Example Barrel

```typescript
// src/utils/companions/index.ts

// Public - companions for components
export { DeveloperRoleTypeCompanion } from "./DeveloperRoleType.companion";
export { MergeRightsTypeCompanion } from "./MergeRightsType.companion";
export { FullDeveloperProfileCompanion } from "./FullDeveloperProfile.companion";
// ...
```

## Import from Barrels

```typescript
// CORRECT - import from barrel
import { DeveloperRoleTypeCompanion, MergeRightsTypeCompanion } from "src/utils/companions";

// WRONG - direct file import bypasses public API
import { DeveloperRoleTypeCompanion } from "src/utils/companions/DeveloperRoleType.companion";
```

## Rules

- Create barrels for public API boundaries only
- Don't export internal implementation details
- Import from barrels, not internal files
