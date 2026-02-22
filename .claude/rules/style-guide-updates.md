# Style Guide Updates

## When User Requests Style Guide Change

When the user asks to change a coding convention or style rule:

### 1. Update the Rules

| File                 | Purpose                    |
| -------------------- | -------------------------- |
| `.claude/rules/*.md` | AI-readable, compact rules |
| `.claude/CLAUDE.md`  | Project-level instructions |

### 2. Update Steps

1. **Find the relevant file** in `.claude/rules/`
2. **Add/modify the compact rule** with code patterns
3. **Update CLAUDE.md** if a new rule file was created
4. **Verify consistency** — no contradictions between files

### 3. File Mapping

| Topic        | .claude/rules/ File |
| ------------ | ------------------- |
| Code quality | code-quality.md     |
| Config       | config.md           |
| Enums        | enums.md            |
| Barrels      | barrels.md          |

### 4. Example

User asks: "Add a rule that all companions must have a `label` function"

**Update .claude/rules/enums.md:**

```markdown
## Companion Convention

- All enum companions must export a `label()` function
- All enum companions must export an `options()` function for select fields
```

## Rules

- ALWAYS update rule files when conventions change
- Keep rules compact (patterns and examples, not lengthy explanations)
- Verify no contradictions between rule files
