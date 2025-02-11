import React from "react";
import { Link } from "react-router-dom";
import { ButtonItemData, ExternalLinkItemData, LinkItemData, NavItemData } from "./NavItemData";
import { ExternalLink } from "../../../../components";

interface NavbarItemProps {
  item: NavItemData;
}

export function NavbarItem(props: NavbarItemProps) {
  return (
    <>
      {props.item instanceof LinkItemData && (
        <Link to={props.item.to} className="gradient-text mr-3">
          {props.item.title}
        </Link>
      )}

      {props.item instanceof ExternalLinkItemData && (
        <ExternalLink href={props.item.href} className="gradient-text mr-8">
          {props.item.title}
        </ExternalLink>
      )}

      {props.item instanceof ButtonItemData && (
        <>
          <button
            className="mr-3 flex items-center w-max duration-200 gradient-bg  bg-clip-text group gap-2 font-montserrat text-xl text-white group"
            onClick={props.item.onClick}
          >
            <span className="flex props.items-center group-hover:text-transparent">{props.item.icon}</span>
            <span className="group-hover:text-transparent">{props.item.title}</span>
          </button>
        </>
      )}
    </>
  );
}
