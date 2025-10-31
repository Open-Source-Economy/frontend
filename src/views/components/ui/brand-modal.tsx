import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { cn } from "../utils";

/**
 * BrandModal - Reusable modal component following Premium Dark Blue Card System
 */
interface BrandModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  preventAutoFocus?: boolean;
}

const sizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
};

export const BrandModal: React.FC<BrandModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "lg",
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  preventAutoFocus = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent
        className={cn(sizeClasses[size], "bg-brand-secondary-dark border border-brand-neutral-300/10", "max-h-[85vh] flex flex-col p-0", className)}
        onOpenAutoFocus={preventAutoFocus ? e => e.preventDefault() : undefined}
      >
        {/* Fixed Header */}
        {(title || description) && (
          <DialogHeader className={cn("space-y-3 px-6 pt-6 pb-4 flex-shrink-0", headerClassName)}>
            {title && <DialogTitle className="text-brand-neutral-900">{title}</DialogTitle>}
            {description && <DialogDescription className="text-brand-neutral-600">{description}</DialogDescription>}
          </DialogHeader>
        )}

        {/* Scrollable Content Area */}
        <div className={cn("overflow-y-auto px-6 flex-1", contentClassName)}>{children}</div>

        {/* Fixed Footer */}
        {footer && <DialogFooter className={cn("px-6 pt-4 pb-6 border-t border-brand-neutral-300/10 flex-shrink-0", footerClassName)}>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

/**
 * BrandModalSection - Section wrapper for organized modal content
 */
interface BrandModalSectionProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  iconColor?: "accent" | "highlight" | "success" | "warning" | "error";
  children: React.ReactNode;
  className?: string;
}

const iconColorClasses = {
  accent: "bg-brand-accent/10 text-brand-accent",
  highlight: "bg-brand-highlight/10 text-brand-highlight",
  success: "bg-brand-success/10 text-brand-success",
  warning: "bg-brand-warning/10 text-brand-warning",
  error: "bg-brand-error/10 text-brand-error",
};

export const BrandModalSection: React.FC<BrandModalSectionProps> = ({ icon, title, description, iconColor = "accent", children, className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-2">
        {icon && (
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", iconColorClasses[iconColor])}>
            {React.cloneElement(icon as React.ReactElement, {
              className: "w-4 h-4",
            })}
          </div>
        )}
        <div>
          <h3 className="text-brand-neutral-800">{title}</h3>
          {description && <p className="text-xs text-brand-neutral-600">{description}</p>}
        </div>
      </div>

      {/* Section Content */}
      <div className="bg-brand-card-blue/30 rounded-xl border border-brand-neutral-300/10 p-5">{children}</div>
    </div>
  );
};

/**
 * BrandModalAlert - Alert box for modal content
 */
interface BrandModalAlertProps {
  type: "success" | "warning" | "error" | "info";
  icon?: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const alertTypeClasses = {
  success: {
    container: "bg-brand-success/5 border-brand-success/20",
    icon: "text-brand-success",
    title: "text-brand-neutral-800",
    text: "text-brand-neutral-700",
  },
  warning: {
    container: "bg-brand-warning/5 border-brand-warning/20",
    icon: "text-brand-warning",
    title: "text-brand-neutral-800",
    text: "text-brand-neutral-700",
  },
  error: {
    container: "bg-brand-error/5 border-brand-error/20",
    icon: "text-brand-error",
    title: "text-brand-neutral-800",
    text: "text-brand-neutral-700",
  },
  info: {
    container: "bg-brand-accent/5 border-brand-accent/20",
    icon: "text-brand-accent",
    title: "text-brand-neutral-800",
    text: "text-brand-neutral-700",
  },
};

export const BrandModalAlert: React.FC<BrandModalAlertProps> = ({ type, icon, title, children, className }) => {
  const classes = alertTypeClasses[type];

  return (
    <div className={cn("border rounded-xl p-5", classes.container, className)}>
      <div className="flex items-start gap-3">
        {icon &&
          React.cloneElement(icon as React.ReactElement, {
            className: cn("w-5 h-5 flex-shrink-0 mt-0.5", classes.icon),
          })}
        <div className="space-y-2">
          {title && <p className={classes.title}>{title}</p>}
          <div className={cn("text-sm leading-relaxed", classes.text)}>{children}</div>
        </div>
      </div>
    </div>
  );
};
