import React from "react";
import { Typography } from "../typography";
import { Badge } from "../badge";
import { cn } from "../../utils";

export interface SectionHeaderProps {
  /** Main title text */
  title: string;
  /** Optional subtitle/description text */
  description?: string;
  /** Optional badge text to display above title */
  badge?: string;
  /** Title heading level (h1-h6) */
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Maximum width for the content */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "none";
  /** Additional spacing below the header */
  spacing?: "sm" | "md" | "lg" | "xl" | "none";
  /** Visibility level - affects size, contrast, and prominence */
  visibility?: "prominent" | "normal" | "subtle";
  /** Additional CSS classes */
  className?: string;
  /** ID for the title element (accessibility) */
  titleId?: string;
  /** ID for the description element (accessibility) */
  descriptionId?: string;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  none: "",
};

const spacingClasses = {
  sm: "mb-4",
  md: "mb-6",
  lg: "mb-8",
  xl: "mb-12",
  none: "",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const visibilityClasses = {
  prominent: {
    title: "text-brand-neutral-950 scale-105",
    description: "text-brand-neutral-700",
    badge: "bg-brand-accent/20 text-brand-accent border-brand-accent/30",
  },
  normal: {
    title: "text-brand-neutral-900",
    description: "text-brand-neutral-600",
    badge: "bg-brand-accent/10 text-brand-accent border-brand-accent/20",
  },
  subtle: {
    title: "text-brand-neutral-800 opacity-90",
    description: "text-brand-neutral-500",
    badge: "bg-brand-neutral-300/20 text-brand-neutral-600 border-brand-neutral-300/30",
  },
};

export function SectionHeader(props: SectionHeaderProps) {
  const titleLevel = props.titleLevel ?? "h2";
  const align = props.align ?? "center";
  const maxWidth = props.maxWidth ?? "3xl";
  const spacing = props.spacing ?? "lg";
  const visibility = props.visibility ?? "normal";

  const headerClasses = cn(
    alignClasses[align],
    maxWidth !== "none" && align === "center" && "mx-auto",
    maxWidth !== "none" && maxWidthClasses[maxWidth],
    spacingClasses[spacing],
    props.className
  );

  const renderTitle = () => {
    const titleProps = {
      id: props.titleId,
      className: `${visibilityClasses[visibility].title} ${props.description ? "mb-4" : ""}`,
    };

    switch (titleLevel) {
      case "h1":
        return <Typography.H1 {...titleProps}>{props.title}</Typography.H1>;
      case "h2":
        return <Typography.H2 {...titleProps}>{props.title}</Typography.H2>;
      case "h3":
        return <Typography.H3 {...titleProps}>{props.title}</Typography.H3>;
      case "h4":
        return <Typography.H4 {...titleProps}>{props.title}</Typography.H4>;
      case "h5":
        return <Typography.H5 {...titleProps}>{props.title}</Typography.H5>;
      case "h6":
        return <Typography.H6 {...titleProps}>{props.title}</Typography.H6>;
      default:
        return <Typography.H2 {...titleProps}>{props.title}</Typography.H2>;
    }
  };

  return (
    <div className={headerClasses}>
      {props.badge && (
        <Badge variant="secondary" className={`mb-4 ${visibilityClasses[visibility].badge}`}>
          {props.badge}
        </Badge>
      )}

      {renderTitle()}

      {props.description && (
        <Typography.Lead id={props.descriptionId} className={visibilityClasses[visibility].description}>
          {props.description}
        </Typography.Lead>
      )}
    </div>
  );
}
