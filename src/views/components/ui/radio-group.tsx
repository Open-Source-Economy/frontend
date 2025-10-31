"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface RadioGroupProps extends React.ComponentProps<typeof RadioGroupPrimitive.Root> {}

interface RadioGroupItemProps extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {}

const RadioGroupContext = React.createContext<{}>({});

function RadioGroup({ className, children, ...props }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{}}>
      <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-3", className)} {...props}>
        {children}
      </RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>
  );
}

function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-brand-neutral-400 text-brand-accent ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="relative flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-brand-accent text-brand-accent" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
export type { RadioGroupProps, RadioGroupItemProps };
