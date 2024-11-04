import React from "react";
import * as model from "src/model";
import { ManagedIssueState } from "src/model";
import { ExternalLink } from "src/components";

interface ApprovedProps {
  managedIssue: model.ManagedIssue | null;
  manager: model.User | null;
}

export function Approved(props: ApprovedProps) {
  const state = props.managedIssue?.state;
  const githubOwner = props.manager?.githubData()?.owner;

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
        <p className="text-base text-[#8693A4] mt-2">
          {text} {githubOwner ? <ExternalLink href={githubOwner.htmlUrl}>{githubOwner.id.login}</ExternalLink> : "a maintainer"}
        </p>
      </>
    );
  }
}
