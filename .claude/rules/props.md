# Props Convention

## Rule

**Use `props.` prefix instead of destructuring props in function signatures.** This makes it immediately clear when a value comes from props vs. local state.

## Correct Pattern

```tsx
// CORRECT - use props. prefix
export function MyComponent(props: MyComponentProps) {
  const size = props.size ?? "md";
  return <div className={size} onClick={props.onClick}>{props.name}</div>;
}
```

## Wrong Pattern

```tsx
// WRONG - destructured props
export function MyComponent({ name, onClick, size = "md" }: MyComponentProps) {
  return <div className={size} onClick={onClick}>{name}</div>;
}
```

## Default Values

Move default values from destructuring to the function body using `??`:

```tsx
// CORRECT
export function Badge(props: BadgeProps) {
  const variant = props.variant ?? "default";
  const size = props.size ?? "md";
  return <span className={cn(variant, size)}>{props.label}</span>;
}
```

## React.FC Conversion

Also convert `React.FC` arrow functions to regular functions:

```tsx
// WRONG
export const MyComponent: React.FC<Props> = ({ name }) => { ... }

// CORRECT
export function MyComponent(props: Props) { ... }
```

## Exceptions

Keep destructuring when using rest spread or `forwardRef`:

```tsx
// OK - rest spread needs destructuring
function Button({ className, variant, ...rest }: ButtonProps) {
  return <button className={cn(variant, className)} {...rest} />;
}

// OK - forwardRef needs destructuring
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input className={className} ref={ref} {...props} />;
});
```

## Rules

- **Always use `props.`** — never destructure in the function signature
- **Default values** — use `const x = props.x ?? "default"` in the function body
- **Exceptions** — `...rest` spread and `forwardRef` patterns keep destructuring
- **React.FC** — convert to regular function declarations
