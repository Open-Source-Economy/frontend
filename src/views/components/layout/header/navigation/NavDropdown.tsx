import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { NavigationLink } from "src/types/navigation";

interface NavDropdownProps {
  title: string;
  items: NavigationLink[];
  variant?: "default" | "admin";
}

export function NavDropdown({ title, items, variant = "default" }: NavDropdownProps) {
  const triggerClassName =
    variant === "admin"
      ? "flex items-center gap-1 text-brand-primary hover:text-brand-primary-dark font-medium transition-colors duration-200 cursor-pointer outline-none"
      : "flex items-center gap-1 text-muted-foreground hover:text-brand-primary transition-colors duration-200 cursor-pointer outline-none";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClassName}>
        {title}
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8} className="w-56">
        {items.map(item => (
          <Link key={item.href} to={item.href} className="w-full">
            <DropdownMenuItem className="cursor-pointer">{item.title}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
