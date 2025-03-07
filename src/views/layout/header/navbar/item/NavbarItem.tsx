import React from "react";
import { Link } from "react-router-dom";
import { ButtonItemData, ExternalLinkItemData, LinkItemData, type NavItemData } from "./NavItemData";
import { ExternalLink } from "../../../../components";

interface NavbarItemProps {
  item: NavItemData;
}

export function NavbarItem(props: NavbarItemProps) {
  return (
    <div key={props.item.title}>
      {props.item instanceof LinkItemData && (
        <Link to={props.item.to} className="gradient-text mr-3 flex items-center">
          <span className="mr-2 group-hover:text-transparent">{props.item.icon}</span>
          <span className={`text-base ${props.item.isBold ? "font-semibold" : "font-normal"}  `}>
            <span
              className={`gradient-bg bg-clip-text duration-200 font-michroma ${
                props.item.isGradient ? "text-transparent font-medium" : "group-hover:text-transparent"
              }`}
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
        <ExternalLink href={props.item.href} className="gradient-text mr-8">
          {props.item.title}
        </ExternalLink>
      )}

      {props.item instanceof ButtonItemData && (
        <button
          type="button"
          className="flex items-center w-max duration-200 gradient-bg bg-clip-text group gap-2 text-base text-white group"
          onClick={props.item.onClick}
        >
          <span className="flex items-center group-hover:text-transparent font-montserrat text-lg">{props.item.icon}</span>
          <span className="group-hover:text-transparent font-michroma -mt-0.5 capitalize">{props.item.title}</span>
        </button>
      )}
    </div>
  );
}
