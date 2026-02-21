# API Types Sync

## When to Sync

- New types/endpoints added to api-types
- Types changed in api-types
- Build errors about missing types

## Steps

### 1. Get New Version

Ask user for the new version or check npm:

```bash
npm show @open-source-economy/api-types versions
```

### 2. Update package.json

```json
{
  "dependencies": {
    "@open-source-economy/api-types": "<new-version>"
  }
}
```

### 3. Reinstall

```bash
cd frontend
npm install --legacy-peer-deps
```

Note: `--legacy-peer-deps` is required due to peer dependency conflicts.

### 4. Verify Types

```bash
npx tsc --noEmit
```

## Common Issues

### "has no exported member"

Type was removed or renamed in api-types. Update imports to match new names.

### Build errors after sync

1. Check api-types changelog
2. Update code to match new types
3. Run `npx tsc --noEmit` to verify

## Updating Frontend After API Changes

1. Update service interface to match new endpoint types
2. Update hooks
3. Update mock implementation
4. Update components using the changed types

## Rules

- Always verify build after sync
- Update all layers: service -> hooks -> mock -> components
- Use explicit type annotations to catch mismatches early
