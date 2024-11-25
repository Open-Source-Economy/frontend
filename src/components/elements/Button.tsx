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
    primary: "bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]",
    secondary: "bg-transparent border-[#FF7E4B]",
    hoverPrimary:
      "",
    hoverSecondary:
      "",
  },
  USER: {
    primary: "bg-primary-user border-primary-user",
    secondary: "bg-transparent border-primary-user",
    hoverPrimary: "",
    hoverSecondary: "",
  },
  DEVELOPER: {
    primary: "bg-primary-developer border-primary-developer",
    secondary: "bg-transparent border-primary-developer",
    hoverPrimary: "",
    hoverSecondary: "",
  },
  STAKEHOLDER: {
    primary: "bg-primary-stakeholder border-primary-stakeholder",
    secondary: "bg-transparent border-primary-stakeholder",
    hoverPrimary: "",
    hoverSecondary: "",
  },
} as const;

const buttonVariants = cva("flex items-center w-fit uppercase font-mich text-white relative justify-center rounded-md border-[2px] duration-300", {
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
      className: cn(AUDIENCE_COLORS.DEVELOPER.primary, AUDIENCE_COLORS.DEVELOPER.hoverSecondary),
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
      className: cn(AUDIENCE_COLORS.STAKEHOLDER.primary, AUDIENCE_COLORS.STAKEHOLDER.hoverSecondary),
    },
    {
      audience: "STAKEHOLDER",
      level: "SECONDARY",
      className: cn(AUDIENCE_COLORS.STAKEHOLDER.secondary, AUDIENCE_COLORS.STAKEHOLDER.hoverSecondary),
    },
  ],
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  parentClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, audience, level, size, asChild = false, parentClassName, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <div className={cn("relative", parentClassName)}>
      <Comp className={cn(buttonVariants({ audience, level, size, className }))} ref={ref} {...props} />
    </div>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
