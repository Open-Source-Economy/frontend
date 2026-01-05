import React from "react";

interface DropdownMenuSectionProps {
  title: string;
  children: React.ReactNode;
}

export function DropdownMenuSection({ title, children }: DropdownMenuSectionProps) {
  return (
    <div className="px-2 py-2">
      <div className="px-2 py-1">
        <p className="text-[10px] uppercase tracking-wider text-brand-neutral-500">{title}</p>
      </div>
      {children}
    </div>
  );
}
