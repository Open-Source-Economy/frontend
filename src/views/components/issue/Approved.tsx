import React from "react";
import * as model from "src/api/model";
import { ManagedIssueState, userUtils } from "src/api/model";
import { ExternalLink } from "src/views/components/index";

interface ApprovedProps {
  managedIssue: model.ManagedIssue | null;
  manager: model.User | null;
}

export function Approved(props: ApprovedProps) {
  const state = props.managedIssue?.state;
  const githubOwner = props.manager ? userUtils.githubData(props.manager)?.owner : undefined;

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
        <p className="text-xs sm:text-sm md:text-base text-[#8693A4] mt-2">
          {text} {githubOwner ? <ExternalLink href={githubOwner.htmlUrl}>@{githubOwner.id.login}</ExternalLink> : "a maintainer"}
        </p>
      </>
    );
  }
}
