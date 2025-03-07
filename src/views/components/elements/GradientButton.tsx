import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("group inline-block text-center rounded-lg transition", {
  variants: {
    variant: {
      default: "bg-theme-blue hover:bg-opacity-0",
    },
    uppercase: {
      true: "uppercase",
      false: "",
    },
    font: {
      default: "font-sans",
      heading: "font-michroma",
    },
    size: {
      default: "px-[20px] py-[16px] text-sm",
      sm: "p-[10px] text-xs",
    },
  },
  defaultVariants: {
    variant: "default",
    uppercase: false,
    font: "default",
    size: "default",
  },
});

const textVariants = cva("bg-clip-text text-transparent group-hover:text-white transition w-full", {
  variants: {
    variant: {
      default: "",
      white: "text-white",
    },
    gradient: {
      default: "bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3",
      reverse: "bg-gradient-to-l from-gradient-1 via-gradient-2 to-gradient-3",
      top: "bg-gradient-to-t from-gradient-1 via-gradient-2 to-gradient-3",
      bottom: "bg-gradient-to-b from-gradient-1 via-gradient-2 to-gradient-3",
    },
  },
  defaultVariants: {
    variant: "default",
    gradient: "default",
  },
});

interface GradientButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  textGradient?: VariantProps<typeof textVariants>["gradient"];
  textVariant?: VariantProps<typeof textVariants>["variant"];
}

type GradientButtonType = GradientButtonProps &
  ((React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }) | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }));

export const GradientButton: React.FC<GradientButtonType> = ({
  children,
  className = "",
  variant,
  uppercase,
  font,
  size,
  textGradient,
  textVariant,
  href,
  ...props
}) => {
  return (
    <div className="w-max p-0.5 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 rounded-lg">
      {React.createElement(
        href ? "a" : "button",
        {
          className: buttonVariants({ variant, uppercase, font, size, className }),
          ...(href ? { href, ...props } : { type: "button" as const, ...props }),
        },
        <span className={textVariants({ variant: textVariant, gradient: textGradient })}>{children}</span>
      )}
    </div>
  );
};
