import React from "react";
import { TelephoneIcon } from "../../../../ultils/Icons";
import { ExternalLink } from "../../../components/ui/forms/ExternalLink";
import { laurianeCalLink } from "../../data";
import { Button } from "./Button";
import { Audience } from "../../../Audience";

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
      <ExternalLink href={laurianeCalLink} underline={false}>
        Book a Call
      </ExternalLink>
    </Button>
  );
}
