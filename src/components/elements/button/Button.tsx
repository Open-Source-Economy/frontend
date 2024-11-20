import React from "react";
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
  type?: ButtonType;
  size?: ButtonSize;
  audience?: Audience;
  holder?: string;
  className?: string;
}

export function Button(props: ButtonProps) {
  let className = ""; // Initialize an empty string

  if (props.audience === Audience.ALL && props.type === ButtonType.PRIMARY) {
  } else if (props.audience === Audience.ALL && props.type === ButtonType.SECONDARY) {
  } else if (props.audience === Audience.DEVELOPER && props.type === ButtonType.SECONDARY) {
  } else if (props.audience === Audience.USER && props.type === ButtonType.SECONDARY) {
  }

  return (
    <button className={`${className} font-mich ${props.htmlButtonProps.className}`} {...props.htmlButtonProps}>
      {props.htmlButtonProps.children}
    </button>
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
