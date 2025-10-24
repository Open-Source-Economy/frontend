import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../utils";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, onCheckedChange, checked, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={handleChange}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded border-2 border-brand-neutral-400 bg-form-background transition-all",
          "focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2",
          "checked:bg-brand-accent checked:border-brand-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "cursor-pointer",
          className,
        )}
        {...props}
      />
      <Check className={cn("pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100")} />
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
