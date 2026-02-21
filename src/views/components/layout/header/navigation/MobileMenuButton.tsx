import React from "react";
import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export function MobileMenuButton(props: MobileMenuButtonProps) {
  return (
    <div className="md:hidden">
      <button className="p-2" onClick={() => props.setIsMobileMenuOpen(!props.isMobileMenuOpen)} aria-label="Toggle mobile menu">
        {props.isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
}
