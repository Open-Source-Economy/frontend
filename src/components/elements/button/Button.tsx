import React from "react";
import "./FindoutmoreButton.css";
import { Link, To } from "react-router-dom";
import { Audience } from "../../../views";

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
}

interface ButtonProps {
  type: ButtonType;
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

  return <button className={`px-3 py-3 rounded-3 ${className}`}>{props.holder}</button>;
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
