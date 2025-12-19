"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-all duration-200 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-brand-neutral-200 hover:text-brand-neutral-600 data-[state=on]:bg-brand-accent-dark data-[state=on]:text-white",
        outline:
          "border border-input bg-transparent hover:bg-brand-accent-dark hover:text-white data-[state=on]:bg-brand-accent-dark data-[state=on]:text-white",
        subtle:
          "bg-brand-neutral-200/50 text-brand-neutral-600 hover:bg-brand-neutral-200/70 data-[state=on]:bg-gradient-to-br data-[state=on]:from-brand-accent/80 data-[state=on]:to-brand-highlight/70 data-[state=on]:text-white data-[state=on]:shadow-md",
        card: "bg-brand-secondary/40 text-brand-neutral-600 hover:bg-brand-secondary/60 hover:text-brand-neutral-500 data-[state=on]:bg-brand-accent/10 data-[state=on]:text-brand-accent data-[state=on]:border data-[state=on]:border-brand-accent/40",
      },
      size: {
        default: "h-9 px-4 min-w-9",
        sm: "h-8 px-3 min-w-8",
        lg: "h-10 px-5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({ className, variant, size, ...props }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive.Root data-slot="toggle" className={cn(toggleVariants({ variant, size, className }))} {...props} />;
}

export { Toggle, toggleVariants };
