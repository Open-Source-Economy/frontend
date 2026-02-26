import React from "react";
import * as model from "@open-source-economy/api-types";
import { ManagedIssueState } from "@open-source-economy/api-types";

interface ApprovedProps {
  managedIssue?: model.ManagedIssue;
}

export function Approved(props: ApprovedProps) {
  const state = props.managedIssue?.state;

  let text = "";
  if (state === ManagedIssueState.OPEN) {
    text = "Collect approved by";
  } else if (state === ManagedIssueState.REJECTED) {
    text = "Collect rejected by";
  } else if (state === ManagedIssueState.SOLVED) {
    text = "Issue solved by";
  }

  if (state === undefined) {
    return <></>;
  } else {
    return (
      <>
        <p className="text-xs sm:text-sm md:text-base text-[#8693A4] mt-2">{text} a maintainer</p>
      </>
    );
  }
}
