import React, { useEffect, useRef } from "react";
import catimg from "../../../../assets/header.svg";
import { Link } from "react-router-dom";
import { LucideDollarSign } from "lucide-react";

export interface DropdownNavbarItem {
  title: string;
  href?: string;
  icon?: any;
  badge?: string;
  isGradient?: boolean;
  isButton?: boolean;
  onClick?: () => void;
  divider?: boolean;
  isBold?: boolean;
}

interface DropdownNavbarProps {
  showDropdownNavbar: boolean;
  setShowDropdownNavbar: (showDropdownNavbar: boolean) => void;
  dropdownNavbarItems: DropdownNavbarItem[];
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
      <div className="relative lg:grid hidden place-items-center font-montserrat  cursor-pointer" ref={ref}>
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
            <div className="absolute -top-[10px]  right-5 -z-10  bg-primaryBg border-t border-l border-t-[#303f52] border-l-[#303f52] rounded-tl-md rotate-45  size-5"></div>

            {props.dropdownNavbarItems.map(item => {
              return (
                <div key={item.title}>
                  {item.divider && <div className="h-px bg-white/5 my-2" aria-hidden="true" />}
                  {item.isButton ? (
                    <button onClick={item.onClick} className="flex text-lg items-center gap-3 px-3 py-2.5  rounded-lg transition-colors w-full text-left group">
                      {/* {item.icon} */}
                      <span
                        className={`gradient-bg flex gap-2   bg-clip-text   duration-200 ${
                          item?.isGradient ? "text-transparent font-medium" : "group-hover:text-transparent"
                        } `}
                      >
                        <span className="mr-2 block">{item.icon}</span>
                        {item.title}
                      </span>
                    </button>
                  ) : (
                    <Link
                      key={item.title}
                      to={item?.href ?? "/"}
                      className={`flex duration-300 group text-lg  items-center gap-3 px-3 py-2  rounded-lg transition-colors `}
                    >
                      {item.icon}
                      <span className={`text-base ${item?.isBold ? "font-semibold" : "font-normal"}  `}>
                        <span
                          className={`gradient-bg  bg-clip-text  ${
                            item?.isGradient ? "text-transparent font-medium" : "group-hover:text-transparent"
                          }    duration-200 `}
                        >
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="ml-3 relative z-20 px-3 py-1 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] rounded-full text-sm font-medium">
                            {item.badge}
                          </span>
                        )}
                      </span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
