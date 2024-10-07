import React from "react";
import "./FindoutmoreButton.css";
import { Link, To } from "react-router-dom";
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

export enum ButtonState {
  ACTIVE = "active",
  DISABLED = "disabled",
}

interface ButtonProps {
  type: ButtonType;
  size?: ButtonSize;
  state?: ButtonState;
  audience: Audience;
  holder: string;
}

export function Button(props: ButtonProps) {
  let className = ""; // Initialize an empty string

  // TODO: refactor the classe to have all the possible values
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
    className += " ";
  }

  return <button className={`rounded-3 ${className}`}>{props.holder}</button>;
}

interface LinkButtonProps {
  to: To;
  buttonProps: ButtonProps;
}

export function LinkButton(props: LinkButtonProps) {
  return (
    <Link to={props.to}>
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
    <a href={props.href} target="_blank" rel="noopener noreferrer">
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
    <a href={props.href} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:underline">
      {props.children}
    </a>
  );
}
