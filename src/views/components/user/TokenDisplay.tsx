import React from "react";
import { Coins } from "lucide-react";

interface TokenDisplayProps {
  tokens?: number;
  variant?: "compact" | "full" | "badge";
  className?: string;
}

export function TokenDisplay({ tokens = 0, variant = "compact", className = "" }: TokenDisplayProps) {
  // Button variant removed to match reference

  if (variant === "badge") {
    return (
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-md hover:opacity-80 transition-opacity cursor-pointer ${className}`}
      >
        <Coins className="w-4 h-4 text-brand-accent" />
        <span className="text-sm text-brand-accent">{tokens}</span>
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-lg ${className}`}>
        <Coins className="w-5 h-5 text-brand-accent" />
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Service Tokens</span>
          <span className="text-brand-accent text-left">{tokens}</span>
        </div>
      </div>
    );
  }

  // compact variant
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <Coins className="w-4 h-4 text-brand-accent" />
      <span className="text-sm text-muted-foreground">{tokens}</span>
    </div>
  );
}
