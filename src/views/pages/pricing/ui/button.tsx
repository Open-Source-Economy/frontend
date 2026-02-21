import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-300 ease-in-out cursor-pointer outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 active:scale-[0.98] active:transition-transform active:duration-75 group relative overflow-hidden",
  {
    variants: {
      variant: {
        // Brand Accent - Primary action (Purple focus for interactive elements)
        default:
          "bg-brand-accent text-white shadow-lg shadow-brand-accent/25 hover:bg-brand-accent-dark hover:shadow-xl hover:shadow-brand-accent/30 hover:scale-105 border-0 focus-visible:ring-brand-accent/30",

        // Enhanced primary variant using brand colors
        primary:
          "bg-brand-primary text-white border border-brand-primary hover:bg-brand-primary-dark hover:border-brand-primary-dark hover:shadow-md focus-visible:ring-brand-primary/30 active:bg-brand-primary-dark active:shadow-sm",

        // Brand Outline - Sophisticated subtle effects
        outline:
          "border-2 border-brand-primary/20 text-foreground bg-transparent hover:border-brand-accent/40 hover:bg-gradient-to-r hover:from-brand-primary/5 hover:via-brand-accent/5 hover:to-brand-highlight/5 hover:shadow-lg backdrop-blur-sm focus-visible:ring-brand-accent/30",

        // Enhanced secondary variant using brand colors
        secondary:
          "bg-brand-secondary text-foreground border border-brand-secondary hover:bg-brand-secondary-dark hover:border-brand-secondary-dark hover:shadow-md focus-visible:ring-brand-secondary/30 active:bg-brand-secondary-dark active:shadow-sm",

        // Enhanced accent variant
        accent:
          "bg-brand-accent text-white border border-brand-accent hover:bg-brand-accent-dark hover:border-brand-accent-dark hover:shadow-md focus-visible:ring-brand-accent/30 active:bg-brand-accent-dark active:shadow-sm",

        // Enhanced destructive variant
        destructive:
          "bg-brand-error text-white border border-brand-error hover:bg-brand-error/90 hover:border-brand-error/90 hover:shadow-md focus-visible:ring-brand-error/30 active:bg-brand-error/80 active:shadow-sm",

        // Enhanced ghost variant with brand colors
        ghost:
          "text-foreground hover:bg-gradient-to-r hover:from-brand-primary/10 hover:via-brand-accent/10 hover:to-brand-highlight/10 hover:text-brand-primary hover:shadow-sm focus-visible:ring-brand-accent/30 active:bg-brand-accent/20",

        // Enhanced link variant
        link: "text-brand-primary underline-offset-4 hover:underline hover:text-brand-accent focus-visible:ring-brand-primary/30 active:text-brand-accent p-0 h-auto transition-colors duration-300",

        // Success variant with gradient enhancement
        success:
          "bg-gradient-to-r from-brand-success to-brand-success-light text-white border-0 hover:shadow-lg hover:shadow-brand-success/25 hover:scale-105 focus-visible:ring-brand-success/30 active:shadow-sm",

        // Warning variant with gradient enhancement
        warning:
          "bg-gradient-to-r from-brand-warning to-brand-warning-light text-white border-0 hover:shadow-lg hover:shadow-brand-warning/25 hover:scale-105 focus-visible:ring-brand-warning/30 active:shadow-sm",

        // Brand Gradient - Full brand journey (for special occasions)
        gradient:
          "bg-gradient-to-r from-brand-primary via-brand-accent to-brand-highlight text-white shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-accent/30 hover:scale-105 border-0 focus-visible:ring-brand-accent/30",

        // Brand Secondary - Subtle but professional
        brand:
          "bg-gradient-to-r from-brand-primary/10 via-brand-accent/10 to-brand-highlight/10 text-brand-primary border border-brand-primary/20 hover:bg-gradient-to-r hover:from-brand-primary/20 hover:via-brand-accent/20 hover:to-brand-highlight/20 hover:border-brand-accent/30 hover:shadow-md backdrop-blur-sm focus-visible:ring-brand-accent/30",
      },
      size: {
        xs: "h-7 px-2 py-1 text-xs gap-1 has-[>svg]:px-1.5 rounded-md",
        sm: "h-8 px-3 py-1.5 text-sm gap-1.5 has-[>svg]:px-2.5 rounded-md",
        default: "h-9 px-4 py-2 text-sm gap-2 has-[>svg]:px-3 rounded-md",
        lg: "h-11 px-8 py-6 text-base gap-2 has-[>svg]:px-6 rounded-lg",
        xl: "h-14 px-10 py-8 text-lg gap-3 has-[>svg]:px-8 rounded-xl",
        icon: "size-9 p-0 rounded-md",
        "icon-sm": "size-8 p-0 rounded-md",
        "icon-lg": "size-10 p-0 rounded-md",
        "icon-xl": "size-12 p-0 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
  rightIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
  loading?: boolean;
  loadingText?: string;
  icon?: boolean; // For animated icon support
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      loading = false,
      loadingText,
      children,
      disabled,
      icon = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    // Loading icon
    const LoadingIcon = () => (
      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    return (
      <Comp ref={ref} data-slot="button" className={cn(buttonVariants({ variant, size, className }))} disabled={isDisabled} {...props}>
        {loading ? (
          <>
            <LoadingIcon />
            {loadingText || children}
          </>
        ) : (
          <>
            {LeftIcon && <LeftIcon className="shrink-0" />}
            {children}
            {RightIcon && <RightIcon className={cn("shrink-0", icon && "transition-transform duration-300 group-hover:translate-x-1")} />}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
