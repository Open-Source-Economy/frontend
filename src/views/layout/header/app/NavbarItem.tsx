import React from "react";
import { Link } from "react-router-dom";
import { NavbarItemData } from "./NavbarItemData";

interface NavbarItemProps {
  style?: "style_1" | "style_2";
  item: NavbarItemData;
}

export function NavbarItem(props: NavbarItemProps) {
  if (props.style === "style_1") {
    return (
      <>
        {props.item.href ? (
          <Link to={props.item.href} className="gradient-text mr-3">
            {/*{props.item.icon}*/}
            {props.item.title}
          </Link>
        ) : (
          // <>
          //   {props.item.icon}
          //   <span className={`text-base ${props.item.isBold ? "font-semibold" : "font-normal"}  `}>
          //         <span
          //           className={`gradient-bg bg-clip-text duration-200 ${
          //             props.item.isGradient ? "text-transparent font-medium" : "group-hover:text-transparent"
          //           }`}
          //         >
          //           {props.item.title}
          //         </span>
          //     {props.item.badge && (
          //       <span className="ml-3 relative z-20 px-3 py-1 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] rounded-full text-sm font-medium">{props.item.badge}</span>
          //     )}
          //       </span>
          // </>
          <>
            <button
              className="mr-3 flex items-center w-max duration-200 gradient-bg  bg-clip-text group gap-2  text-xl  text-white group"
              onClick={props.item.onClick}
            >
              <span className="flex props.items-center group-hover:text-transparent">{props.item.icon}</span>
              <span className="group-hover:text-transparent">{props.item.title}</span>
            </button>
          </>
        )}
      </>
    );
  } else {
    return (
      <div key={props.item.title}>
        {props.item.divider && <div className="h-px bg-white/5 my-2" aria-hidden="true" />}
        {props.item.href ? (
          <Link
            key={props.item.title}
            to={props.item.href}
            className={`flex duration-300 group text-lg items-center gap-3 px-3 py-2 rounded-lg transition-colors `}
          >
            {props.item.icon}
            <span className={`text-base ${props.item.isBold ? "font-semibold" : "font-normal"}  `}>
              <span
                className={`gradient-bg bg-clip-text duration-200 ${props.item.isGradient ? "text-transparent font-medium" : "group-hover:text-transparent"}`}
              >
                {props.item.title}
              </span>
              {props.item.badge && (
                <span className="ml-3 relative z-20 px-3 py-1 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] rounded-full text-sm font-medium">
                  {props.item.badge}
                </span>
              )}
            </span>
          </Link>
        ) : (
          <button onClick={props.item.onClick} className="flex text-lg items-center gap-3 px-3 py-2.5  rounded-lg transition-colors w-full text-left group">
            <span
              className={`gradient-bg flex gap-2 bg-clip-text duration-200 ${
                props.item.isGradient ? "text-transparent font-medium" : "group-hover:text-transparent"
              } `}
            >
              <span className="mr-2 block">{props.item.icon}</span>
              {props.item.title}
            </span>
          </button>
        )}
      </div>
    );
  }
}
