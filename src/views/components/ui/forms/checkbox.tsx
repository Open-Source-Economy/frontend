"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "../../utils";

interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  variant?: "default" | "outline" | "filled" | "ghost";
  size?: "sm" | "default" | "lg" | "xl";
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      default: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-7 h-7",
    };

    const iconSizes = {
      sm: "size-2.5",
      default: "size-3.5",
      lg: "size-4",
      xl: "size-5",
    };

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        data-slot="checkbox"
        className={cn(
          "shrink-0 rounded border border-form-border bg-form-background cursor-pointer transition-all",
          "hover:scale-110 hover:border-form-border-hover",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-brand-accent data-[state=checked]:border-brand-accent data-[state=checked]:text-white",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current transition-none">
          <Check className={iconSizes[size]} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
