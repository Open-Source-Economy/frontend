import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils";

const textareaVariants = cva(
  "w-full bg-form-background border border-form-border rounded-lg px-4 py-3 text-brand-neutral-900 placeholder:text-form-text-placeholder focus:border-brand-accent focus:outline-none transition-colors resize-y",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2 border-brand-primary/20 hover:border-brand-accent/40 focus:border-brand-accent",
        filled:
          "border-transparent bg-gradient-to-r from-muted/80 to-brand-primary/5 hover:from-muted hover:to-brand-primary/10 focus:border-brand-accent focus:from-background focus:to-brand-accent/10",
        ghost:
          "border-transparent bg-transparent hover:bg-gradient-to-r hover:from-brand-primary/5 hover:to-brand-accent/5 focus:border-brand-accent/50 focus:bg-gradient-to-r focus:from-brand-primary/10 focus:to-brand-accent/10",
        success: "border-brand-success focus:border-brand-success",
        error: "border-brand-error focus:border-brand-error",
        warning: "border-brand-warning/50 focus:border-brand-warning",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        default: "px-4 py-3",
        lg: "px-5 py-4 text-base",
        xl: "px-6 py-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface TextareaProps extends React.ComponentProps<"textarea">, VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, variant, size, ...props }, ref) => {
  return <textarea className={cn(textareaVariants({ variant, size }), className)} ref={ref} {...props} />;
});

Textarea.displayName = "Textarea";

export { Textarea };
