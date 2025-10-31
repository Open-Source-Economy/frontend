import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../utils";

interface InfoMessageProps {
  icon?: LucideIcon;
  children: ReactNode;
  variant?: "info" | "warning" | "success" | "subtle" | "note" | "tip" | "muted";
  title?: string;
  className?: string;
}

const variantStyles = {
  info: {
    icon: "text-brand-highlight",
    bg: "bg-brand-card-blue-light border-brand-neutral-300/30",
    text: "text-brand-neutral-700",
    title: "text-brand-neutral-700",
  },
  warning: {
    icon: "text-brand-warning",
    bg: "bg-brand-card-blue-light border-brand-neutral-300/30",
    text: "text-brand-neutral-700",
    title: "text-brand-warning",
  },
  success: {
    icon: "text-brand-success",
    bg: "bg-brand-card-blue-light border-brand-neutral-300/30",
    text: "text-brand-neutral-700",
    title: "text-brand-success",
  },
  subtle: {
    icon: "text-brand-neutral-500",
    bg: "bg-brand-card-blue/50 border-brand-neutral-300/20",
    text: "text-brand-neutral-600",
    title: "text-brand-neutral-700",
  },
  note: {
    icon: "text-brand-neutral-500",
    bg: "bg-brand-card-blue/20 border-brand-neutral-300/30",
    text: "text-brand-neutral-600",
    title: "text-brand-neutral-700",
  },
  tip: {
    icon: "text-brand-highlight",
    bg: "bg-brand-card-blue/20 border-brand-neutral-300/30",
    text: "text-brand-neutral-600",
    title: "text-brand-highlight",
  },
  muted: {
    icon: "text-brand-neutral-500",
    bg: "bg-brand-neutral-200/30 border-brand-neutral-300/30 opacity-70",
    text: "text-brand-neutral-600",
    title: "text-brand-neutral-700",
  },
};

export function InfoMessage({ icon: Icon, children, variant = "info", title, className = "" }: InfoMessageProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn("p-3 sm:p-4 border rounded-lg", styles.bg, className)}>
      <div className="flex items-start gap-2">
        {Icon && <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", styles.icon)} />}
        <p className={cn("text-xs sm:text-sm leading-relaxed", styles.text)}>
          {title && <span className={cn("font-medium", styles.title)}>{title}</span>}
          {title && " "}
          {children}
        </p>
      </div>
    </div>
  );
}
