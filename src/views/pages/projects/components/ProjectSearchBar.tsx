import React from "react";
import { Search, X } from "lucide-react";

interface ProjectSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function ProjectSearchBar(props: ProjectSearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClear = () => {
    props.onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${props.className ?? ""}`}>
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search className="w-4 h-4 text-muted-foreground" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        placeholder={props.placeholder ?? "Search projects by name..."}
        className="w-full h-10 pl-11 pr-10 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all duration-200"
      />
      {props.value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-brand-accent/10 rounded transition-colors duration-200"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
        </button>
      )}
    </div>
  );
}
