import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavigationLink } from "src/types/navigation";

interface MobileNavSubmenuProps {
  title: string;
  items: NavigationLink[];
  onClose?: () => void;
  variant?: "default" | "admin";
}

export function MobileNavSubmenu({ title, items, onClose, variant = "default" }: MobileNavSubmenuProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const titleClassName = variant === "admin" ? "text-brand-primary font-medium" : "text-foreground font-medium";

  return (
    <div className="border-b border-border/30">
      {/* Accordion Header */}
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface/50 transition-colors">
        <span className={titleClassName}>{title}</span>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="pl-6 pr-4 pt-2 pb-3 space-y-1">
          {items.map(item => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className="block w-full text-left text-muted-foreground hover:text-brand-primary hover:bg-surface/50 transition-colors duration-200 px-3 py-2.5 rounded-md"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
