import React from "react";
import * as dto from "@open-source-economy/api-types";

interface ApprovedProps {
  managedIssue?: dto.ManagedIssue;
}

export function Approved(props: ApprovedProps) {
  const state = props.managedIssue?.state;

  let text = "";
  if (state === dto.ManagedIssueState.OPEN) {
    text = "Collect approved by";
  } else if (state === dto.ManagedIssueState.REJECTED) {
    text = "Collect rejected by";
  } else if (state === dto.ManagedIssueState.SOLVED) {
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
