"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "src/views/components/utils";

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "filled" | "ghost" | "success" | "error" | "warning";
}) {
  const variantStyles = {
    default:
      "border-[color:var(--form-border)] bg-[color:var(--form-background)] hover:border-[color:var(--form-border-hover)] hover:bg-[color:var(--form-background-hover)] hover:shadow-[var(--form-elevation-hover)] hover:-translate-y-0.5 focus:border-[color:var(--form-border-focus)] focus:bg-[color:var(--form-background-focus)] focus:shadow-[var(--form-elevation-focus)] focus:-translate-y-1 focus:ring-2 focus:ring-[color:var(--form-ring-color)]/15",
    outline:
      "border-2 border-brand-primary/20 bg-transparent hover:border-brand-accent/40 hover:shadow-[var(--form-elevation-hover)] focus:border-brand-accent focus:shadow-[var(--form-elevation-focus)] focus:ring-2 focus:ring-brand-accent/15",
    filled:
      "border-transparent bg-gradient-to-r from-muted/80 to-brand-primary/5 hover:from-muted hover:to-brand-primary/10 hover:shadow-[var(--form-elevation-hover)] focus:border-brand-accent focus:from-background focus:to-brand-accent/10 focus:shadow-[var(--form-elevation-focus)]",
    ghost:
      "border-transparent bg-transparent hover:bg-gradient-to-r hover:from-brand-primary/5 hover:to-brand-accent/5 hover:shadow-[var(--form-elevation-hover)] focus:border-brand-accent/50 focus:bg-gradient-to-r focus:from-brand-primary/10 focus:to-brand-accent/10 focus:shadow-[var(--form-elevation-focus)]",
    success:
      "border-brand-success hover:border-brand-success focus:border-brand-success focus:shadow-[var(--form-elevation-success)] focus:ring-brand-success/15",
    error: "border-brand-error hover:border-brand-error focus:border-brand-error focus:shadow-[var(--form-elevation-error)] focus:ring-brand-error/15",
    warning:
      "border-brand-warning/50 hover:border-brand-warning/70 focus:border-brand-warning focus:shadow-[var(--form-elevation-focus)] focus:ring-brand-warning/15",
  };

  const sizeStyles = {
    sm: "h-[var(--form-height-sm)] px-[var(--space-form-padding-x-sm)] py-[var(--space-form-padding-y-sm)] text-xs rounded-[var(--form-border-radius-sm)]",
    default: "h-[var(--form-height)] px-[var(--space-form-padding-x)] py-[var(--space-form-padding-y)] text-sm rounded-[var(--form-border-radius)]",
    lg: "h-[var(--form-height-lg)] px-[var(--space-form-padding-x-lg)] py-[var(--space-form-padding-y-lg)] text-base rounded-[var(--form-border-radius-lg)]",
  };

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "group relative flex w-full items-center justify-between gap-2 border whitespace-nowrap transition-[var(--form-transition)] shadow-[var(--form-elevation-rest)] text-[color:var(--form-text)] outline-none backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-60 data-[placeholder]:text-[color:var(--form-text-placeholder)] [&_svg:not([class*='text-'])]:text-[color:var(--form-text-placeholder)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 selection:bg-brand-primary selection:text-white",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50 transition-transform duration-300 data-[state=open]:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ className, children, position = "popper", ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-border/50 bg-popover/95 backdrop-blur-sm text-popover-foreground shadow-xl shadow-brand-primary/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn("p-2", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1")}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label data-slot="select-label" className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)} {...props} />;
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-md py-2 pr-8 pl-3 text-sm outline-hidden select-none transition-all duration-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gradient-to-r hover:from-brand-primary/10 hover:to-brand-accent/10 focus:bg-gradient-to-r focus:from-brand-primary/15 focus:to-brand-accent/15 focus:text-brand-primary data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-brand-primary/15 data-[highlighted]:to-brand-accent/15 data-[highlighted]:text-brand-primary [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4 text-brand-accent" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator data-slot="select-separator" className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)} {...props} />;
}

function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
