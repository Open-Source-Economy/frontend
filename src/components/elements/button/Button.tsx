import React, { ButtonHTMLAttributes } from "react";
import "./FindoutmoreButton.css";
import { Link, LinkProps, To } from "react-router-dom";
import { Audience } from "src/views";

// TODO: refactor

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
}

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface ButtonProps {
  htmlButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  type: ButtonType;
  size?: ButtonSize;
  audience: Audience;
}

export function Button(props: ButtonProps) {
  let className = ""; // Initialize an empty string

  // TODO: refactor the class to have all the possible values
  if (props.audience === Audience.ALL && props.type === ButtonType.PRIMARY) {
    className = "findbutton";
  } else if (props.audience === Audience.ALL && props.type === ButtonType.SECONDARY) {
    className = "button";
  } else if (props.audience === Audience.DEVELOPER && props.type === ButtonType.SECONDARY) {
    className = "btn-1";
  } else if (props.audience === Audience.USER && props.type === ButtonType.SECONDARY) {
    className = "btn-2";
  }

  if (props.size === ButtonSize.SMALL || props.size === undefined) {
    className += " px-3 py-3";
  } else if (props.size === ButtonSize.MEDIUM) {
    className += " px-5 py-3";
  } else if (props.size === ButtonSize.LARGE) {
    className += "TODO";
  }

  return (
    <button className={`${className} ${props.htmlButtonProps.className}`} {...props.htmlButtonProps}>
      {props.htmlButtonProps.children}
    </button>
  );
}

interface LinkButtonProps {
  linkProps: LinkProps & React.RefAttributes<HTMLAnchorElement>;
  buttonProps: ButtonProps;
}

export function LinkButton(props: LinkButtonProps) {
  return (
    <Link to={props.linkProps.to}>
      <Button {...props.buttonProps} />
    </Link>
  );
}

interface ExternalLinkButtonProps {
  href: string;
  buttonProps: ButtonProps;
}

export function ExternalLinkButton(props: ExternalLinkButtonProps) {
  return (
    <a className="ff_michroma" href={props.href} target="_blank" rel="noopener noreferrer">
      <Button {...props.buttonProps} />
    </a>
  );
}

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export function ExternalLink(props: ExternalLinkProps) {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:underline ff_michroma">
      {props.children}
    </a>
  );
}
