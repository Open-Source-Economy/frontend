import React from "react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { cn } from "../../utils";
import { type LucideIcon } from "lucide-react";

interface CheckboxFieldProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  description?: string;
  className?: string;
  size?: "sm" | "default" | "lg" | "xl";
  icon?: LucideIcon;
  children?: React.ReactNode;
}

/**
 * CheckboxField - A reusable component combining checkbox, label, and optional description
 * Following DRY principles for consistent checkbox field patterns
 */
export function CheckboxField(props: CheckboxFieldProps) {
  const size = props.size ?? "default";
  const Icon = props.icon;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-3 bg-brand-card-blue-light border border-brand-neutral-300 rounded-lg transition-colors hover:bg-brand-card-blue",
        props.className,
      )}
    >
      <div className="flex items-start gap-2.5">
        <Checkbox id={props.id} checked={props.checked} onCheckedChange={props.onCheckedChange} size={size} className="mt-0.5" />
        {Icon && <Icon className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />}
        <Label htmlFor={props.id} className="flex-1 text-brand-neutral-700 cursor-pointer">
          {props.label}
          {props.description && <span className="block text-sm text-brand-neutral-500 mt-0.5 font-normal text-[12px]">{props.description}</span>}
        </Label>
      </div>
      {props.checked && props.children && <div className="pl-7 animate-in fade-in duration-200">{props.children}</div>}
    </div>
  );
}
