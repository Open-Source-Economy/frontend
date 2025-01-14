import React from "react";
import { NavbarItemData } from "./NavbarItemData";
import { NavbarItem } from "./NavbarItem";

interface MobileNavbarProps {
  navbarItems: NavbarItemData[];
}

export function MobileNavbar(props: MobileNavbarProps) {
  return (
    <>
      <div className="flex lg:hidden flex-col gap-y-5">
        {props.navbarItems.map(item => {
          return <NavbarItem item={item} style="style_1" />;
        })}
      </div>
    </>
  );
}
