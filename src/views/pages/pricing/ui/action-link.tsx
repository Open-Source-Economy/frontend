import React from "react";
import { LucideIcon } from "lucide-react";

interface ActionLinkProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export function ActionLink({ icon: Icon, label, onClick }: ActionLinkProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-brand-neutral-600 hover:text-brand-accent transition-colors cursor-pointer hover:underline"
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
