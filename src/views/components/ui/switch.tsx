"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

// Switch variants
const switchVariants = cva(
  "peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-200 bg-[color:var(--form-border)] outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-[0_0_0_2px_rgb(167_139_250_/_0.2)]",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-brand-primary",
        outline:
          "border-brand-primary/20 data-[state=unchecked]:bg-transparent data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary",
        filled:
          "data-[state=unchecked]:bg-gradient-to-r data-[state=unchecked]:from-muted/80 data-[state=unchecked]:to-brand-primary/5 data-[state=checked]:bg-brand-primary",
        ghost: "data-[state=unchecked]:bg-transparent data-[state=checked]:bg-brand-primary",
        success: "data-[state=checked]:bg-brand-success",
        error: "data-[state=checked]:bg-brand-error",
        warning: "data-[state=checked]:bg-brand-warning",
      },
      size: {
        sm: "h-4 w-7",
        default: "h-[1.15rem] w-8",
        lg: "h-5 w-9",
        xl: "h-6 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Switch thumb variants
const switchThumbVariants = cva("pointer-events-none block rounded-full bg-white shadow-sm transition-all duration-200 ring-0", {
  variants: {
    size: {
      sm: "size-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
      default: "size-4 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
      lg: "size-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5",
      xl: "size-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root>, VariantProps<typeof switchVariants> {}

function Switch({ className, variant = "default", size = "default", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root data-slot="switch" className={cn(switchVariants({ variant, size }), className)} {...props}>
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={cn(switchThumbVariants({ size }))} />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
export type { SwitchProps };
