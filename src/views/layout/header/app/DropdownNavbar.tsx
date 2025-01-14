import React, { useEffect, useRef } from "react";
import catimg from "../../../../assets/header.svg";
import { NavbarItemData } from "./NavbarItemData";
import { NavbarItem } from "./NavbarItem";

interface DropdownNavbarProps {
  showDropdownNavbar: boolean;
  setShowDropdownNavbar: (showDropdownNavbar: boolean) => void;
  navbarItems: NavbarItemData[];
}

export function DropdownNavbar(props: DropdownNavbarProps) {
  const ref = useRef<HTMLDivElement>(null);

  //==========closing dropdown on click outside================
  const closeDropdownNavbar = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      props.setShowDropdownNavbar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdownNavbar);
    return () => {
      document.removeEventListener("mousedown", closeDropdownNavbar);
    };
  }, []);

  return (
    <>
      <div className="relative lg:grid hidden place-items-center cursor-pointer" ref={ref}>
        <div className="relative group size-16 rounded-full p-[2px]">
          <div className={`absolute top-0 left-0 size-full  rounded-full group ${props.showDropdownNavbar ? "gradient-bg" : "bg-white "}`}>
            <div className="absolute top-0 left-0 size-full  rounded-full duration-200  gradient-bg opacity-0 group-hover:!opacity-100"></div>
          </div>
          <div
            className="w-full h-full bg-primaryBg relative z-20 rounded-full grid place-items-center pr-[2px]"
            onClick={() => props.setShowDropdownNavbar(!props.showDropdownNavbar)}
          >
            <img src={catimg} className=" " alt="" />
          </div>
        </div>

        {/* DropDown */}
        {props.showDropdownNavbar && (
          <div className="absolute top-[85px] z-20 right-0  h-max min-w-[279px] p-2 shadow-[0_15px_90px_0px_rgba(0,0,0,0.6)] bg-primaryBg !border rounded-xl border-[#303f52] text-white flex flex-col gap-y-1">
            <div className="absolute -top-[10px] right-5 -z-10 bg-primaryBg border-t border-l border-t-[#303f52] border-l-[#303f52] rounded-tl-md rotate-45 size-5"></div>

            {props.navbarItems.map(item => {
              return <NavbarItem item={item} style="style_2" />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
