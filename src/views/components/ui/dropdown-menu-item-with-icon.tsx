import React from "react";
import { DropdownMenuItem } from "./dropdown-menu";
import { LucideIcon } from "lucide-react";

interface DropdownMenuItemWithIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

export function DropdownMenuItemWithIcon(props: DropdownMenuItemWithIconProps) {
  const Icon = props.icon;
  const variant = props.variant ?? "default";
  const variantClasses =
    variant === "danger"
      ? "text-red-600 hover:text-red-600 hover:bg-red-500/10 focus:text-red-600 focus:bg-red-500/10"
      : "";

  return (
    <DropdownMenuItem onClick={props.onClick} className={`cursor-pointer ${variantClasses}`}>
      <Icon className="mr-2 h-4 w-4" />
      {props.label}
    </DropdownMenuItem>
  );
}
