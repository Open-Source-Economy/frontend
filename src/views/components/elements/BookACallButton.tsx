import React from "react";
import { TelephoneIcon } from "../../../ultils/Icons";
import { ExternalLink } from "./ExternalLink";
import { laurianeCalendly } from "../../data";
import { Button } from "./Button";
import { Audience } from "../../Audience";

interface BookACallButtonProps {
  audience?: Audience;
  level?: "PRIMARY" | "SECONDARY";
  className?: string;
}

export function BookACallButton(props: BookACallButtonProps) {
  return (
    <Button
      audience={props.audience ?? "ALL"}
      level={props.level ?? "PRIMARY"}
      size="LARGE"
      className={`!capitalize ${props.className}`}
      icon={<TelephoneIcon />}
    >
      <ExternalLink href={laurianeCalendly} underline={false}>
        Book a Call
      </ExternalLink>
    </Button>
  );
}
