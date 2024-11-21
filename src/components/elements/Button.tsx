import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva("flex items-center w-fit uppercase font-mich relative justify-center", {
  variants: {
    audience: {
      ALL: "",
      USER: "",
      DEVELOPER: "",
      INVESTOR: "",
    },
    level: {
      PRIMARY:
        "bg-gradient-to-r from-[#FF7E4B]  via-[#FF518C] to-[#66319B] h-[61px] min-w-[210px] hover:bg-transparent after:absolute after:w-[98%] after:top-1/2 after:left-1/2 after:bg-secondary after:h-[93%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:opacity-0 after:hover:opacity-100 after:duration-300 rounded-md",
      PRIMARY_DEVELOPER: "!bg-primary-developer  rounded-md  duration-300 border-[2px] !border-primary-developer hover:!bg-transparent",
      PRIMARY_USER:
        "!bg-primary-user   border-[2px] flex justify-center items-center !border-primary-user font-mich  rounded-md hover:!bg-transparent duration-300",
      SECONDARY:
        "bg-gradient-to-r from-[#FF7E4B]  via-[#FF518C] text-white to-[#66319B]  hover:bg-transparent after:absolute after:w-[98%] after:top-1/2 after:left-1/2 after:bg-secondary after:h-[93%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:hover:opacity-0 after:opacity-100 after:duration-300 rounded-md",
      SECONDARY_DEVELOPER: "hover:!bg-primary-developer  rounded-md  duration-300 border-[2px] !border-primary-developer bg-transparent",
      SECONDARY_USER:
        "hover:!bg-primary-user   border-[2px] flex justify-center items-center !border-primary-user font-mich  rounded-md bg-transparent duration-300",
      SECONDARY_INVESTOR:
        "hover:!bg-primary-stakeholder  border-[2px] flex justify-center items-center !border-primary-stakeholder font-mich  rounded-md bg-transparent duration-300",
      PRIMARY_INVESTOR:
        "!bg-primary-stakeholder  border-[2px] flex justify-center items-center !border-primary-stakeholder font-mich  rounded-md   hover:!bg-transparent duration-300",
    },
    size: {
      SMALL: "!h-[40px] !px-[19px]",
      MEDIUM: "!h-[55px] !px-[19px] text-[13px]",
      LARGE: "!h-[61px] px-[19px]",
    },
  },
  defaultVariants: {
    level: "PRIMARY",
    audience: "ALL",
    size: "LARGE",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  parentClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, audience, level, size, asChild = false, parentClassName, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <div className={cn("relative", parentClassName, "")}>
      <Comp className={cn(buttonVariants({ audience, level, size, className }))} ref={ref} {...props} />
    </div>
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
