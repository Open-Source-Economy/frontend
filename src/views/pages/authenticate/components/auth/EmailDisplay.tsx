import React from "react";
import { Edit2, Mail } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";

interface EmailDisplayProps {
  email: string;
  onEdit?: () => void;
}

export function EmailDisplay({ email, onEdit }: EmailDisplayProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-brand-secondary/20 border border-brand-neutral-400/30 rounded-xl mb-6">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-accent/10 text-brand-accent">
        <Mail className="w-4 h-4" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-xs text-brand-neutral-500 font-medium uppercase tracking-wider mb-0.5">Continuing as</p>
        <p className="text-sm font-bold text-brand-neutral-900 truncate">{email}</p>
      </div>
      {onEdit && (
        <Button onClick={onEdit} variant="ghost" size="sm" className="h-8 w-8 text-brand-neutral-400 hover:text-brand-accent p-0">
          <Edit2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );

  // return (
  //   <div className="bg-brand-secondary/20 rounded-lg p-3.5 border border-brand-neutral-400/30">
  //     <div className="flex items-center gap-2.5">
  //       <Mail className="h-4 w-4 text-brand-accent flex-shrink-0" />
  //       <span className="text-brand-neutral-800 text-sm truncate">{email}</span>
  //     </div>
  //   </div>
  // );
}
