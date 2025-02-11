import React from "react";
import { Link } from "react-router-dom";
import { ButtonItemData, ExternalLinkItemData, LinkItemData, NavItemData } from "./NavItemData";

interface DropdownNavbarItemProps {
  item: NavItemData;
}

export function DropdownNavbarItem(props: DropdownNavbarItemProps) {
  return (
    <div key={props.item.title}>
      {props.item instanceof LinkItemData && (
        <Link
          key={props.item.title}
          to={props.item.to}
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
      )}

      {props.item instanceof ExternalLinkItemData && (
        <></> // TODO to be implemented
        // <ExternalLink href={props.item.href} className="gradient-text mr-8">
        //   {props.item.title}
        // </ExternalLink>
      )}

      {props.item instanceof ButtonItemData && (
        <button onClick={props.item.onClick} className="flex text-lg items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full text-left group">
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
