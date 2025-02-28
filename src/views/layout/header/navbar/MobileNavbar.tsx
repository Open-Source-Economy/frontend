import React from "react";
import { NavbarItem } from "./item/NavbarItem";
import { Divider } from "./DropdownNavbar";
import { NavItemData } from "./item/NavItemData";

interface MobileNavbarProps {
  navbarItems: (NavItemData | Divider)[];
}

export function MobileNavbar(props: MobileNavbarProps) {
  return (
    <>
      <div className="flex lg:hidden flex-col gap-y-5">
        {props.navbarItems.map(item => {
          if (item instanceof Divider && item.divider) {
            return <div className="h-px bg-white/5" aria-hidden="true" />;
          } else if (item instanceof NavItemData) {
            return <NavbarItem item={item} />;
          }
        })}
      </div>
    </>
  );
}
