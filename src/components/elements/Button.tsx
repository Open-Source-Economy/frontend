import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AUDIENCE_COLORS = {
  ALL: {
    primary:
      "bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] text-white to-[#66319B] min-w-[210px] after:absolute after:w-[98%] after:top-1/2 after:left-1/2 after:bg-secondary after:h-[93%] after:-z-10 relative z-20 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:opacity-0 after:duration-300 rounded-md",
    secondary:
      "bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] text-white after:absolute after:w-[98%] after:top-1/2 after:left-1/2 after:bg-secondary after:-z-10 relative z-20 after:h-[93%] after:-z-10 relative z-20 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md  after:opacity-100 after:duration-300 rounded-md",
    hoverPrimary: "after:hover:opacity-100 hover:bg-transparent",
    hoverSecondary: "group-hover:after:opacity-0 group-hover:after:bg-transparent after:hover:opacity-0 hover:bg-transparent",
  },
  USER: {
    primary: "bg-primary-user border-primary-user border-2",
    secondary: "border-primary-user border-2",
    hoverPrimary: "hover:bg-transparent ease-in-out transition-all",
    hoverSecondary: "hover:bg-primary-user",
  },
  DEVELOPER: {
    primary: "bg-primary-developer border-primary-developer border-2",
    secondary: "border-primary-developer border-2",
    hoverPrimary: "hover:bg-transparent  ease-in-out transition-all",
    hoverSecondary: "hover:bg-primary-developer  ease-in-out transition-all",
  },
  STAKEHOLDER: {
    primary: "bg-primary-stakeholder border-primary-stakeholder border-2",
    secondary: "border-primary-stakeholder border-2",
    hoverPrimary: "hover:bg-transparent transition-all ease-in-out transition-all",
    hoverSecondary: "hover:bg-primary-stakeholder transition-all ease-in-out transition-all",
  },
} as const;

const buttonVariants = cva(
  "flex items-center w-fit uppercase  font-mich text-white relative justify-center rounded-md duration-300 disabled:opacity-75 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        SMALL: "h-[40px] px-[19px]",
        MEDIUM: "h-[55px] px-[19px] text-[13px]",
        LARGE: "h-[61px] px-[19px] min-w-[210px]",
      },
      level: {
        PRIMARY: "",
        SECONDARY: "",
      },
      audience: {
        ALL: "",
        USER: "",
        DEVELOPER: "",
        STAKEHOLDER: "",
      },
    },
    compoundVariants: [
      // ALL audience variants
      {
        audience: "ALL",
        level: "PRIMARY",
        className: cn(AUDIENCE_COLORS.ALL.primary, AUDIENCE_COLORS.ALL.hoverPrimary),
      },
      {
        audience: "ALL",
        level: "SECONDARY",
        className: cn(AUDIENCE_COLORS.ALL.secondary, AUDIENCE_COLORS.ALL.hoverSecondary),
      },
      // USER variants
      {
        audience: "USER",
        level: "PRIMARY",
        className: cn(AUDIENCE_COLORS.USER.primary, AUDIENCE_COLORS.USER.hoverPrimary),
      },
      {
        audience: "USER",
        level: "SECONDARY",
        className: cn(AUDIENCE_COLORS.USER.secondary, AUDIENCE_COLORS.USER.hoverSecondary),
      },
      // DEVELOPER variants
      {
        audience: "DEVELOPER",
        level: "PRIMARY",
        className: cn(AUDIENCE_COLORS.DEVELOPER.primary, AUDIENCE_COLORS.DEVELOPER.hoverPrimary),
      },
      {
        audience: "DEVELOPER",
        level: "SECONDARY",
        className: cn(AUDIENCE_COLORS.DEVELOPER.secondary, AUDIENCE_COLORS.DEVELOPER.hoverSecondary),
      },
      // STAKEHOLDER variants
      {
        audience: "STAKEHOLDER",
        level: "PRIMARY",
        className: cn(AUDIENCE_COLORS.STAKEHOLDER.primary, AUDIENCE_COLORS.STAKEHOLDER.hoverPrimary),
      },
      {
        audience: "STAKEHOLDER",
        level: "SECONDARY",
        className: cn(AUDIENCE_COLORS.STAKEHOLDER.secondary, AUDIENCE_COLORS.STAKEHOLDER.hoverSecondary),
      },
    ],
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  parentClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, audience, level, size, asChild = false, parentClassName, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <div className={cn("relative", parentClassName)}>
        <Comp
          className={cn(
            buttonVariants({ audience, level, size, className }),
            disabled && "pointer-events-none opacity-50" // Ensure proper disabled styling
          )}
          ref={ref}
          disabled={disabled} // Pass disabled attribute to the button
          {...props}
        />
      </div>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
