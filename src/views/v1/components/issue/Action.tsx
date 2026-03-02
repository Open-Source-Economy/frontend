import React from "react";
import * as dto from "@open-source-economy/api-types";
import { Button, ExternalLink } from "src/views/v1/components/index";
import { Link } from "@tanstack/react-router";
import { Audience } from "src/views/index";

interface ActionProps {
  issue: dto.Issue;
  audience: Audience;
  state?: dto.ManagedIssueState;
  successfullyFunded: boolean;
}

export function Action(props: ActionProps) {
  const actOnIssueButton = (
    <>
      <Button
        className="!w-full"
        audience={props.audience}
        level={props.successfullyFunded ? "SECONDARY" : "PRIMARY"}
        size="MEDIUM"
        asChild
      >
        <Link
          to={
            (props.audience === Audience.USER
              ? `/${props.issue.id.repositoryId.ownerId}/${props.issue.id.repositoryId.name}/issues/${props.issue.id.number}/fund`
              : `/${props.issue.id.repositoryId.ownerId}/${props.issue.id.repositoryId.name}/issues/${props.issue.id.number}/manage`) as string
          }
        >
          {props.audience === Audience.DEVELOPER ? "ACT ON ISSUE" : "co-FUND"}
        </Link>
      </Button>
    </>
  );

  if (!props.state) {
    return actOnIssueButton;
  } else if (props.state === dto.ManagedIssueState.OPEN) {
    return (
      <>
        {actOnIssueButton}

        {props.successfullyFunded && props.audience === Audience.DEVELOPER && (
          <>
            <Button
              parentClassName="w-full"
              className="!w-full"
              audience={props.audience}
              level={props.successfullyFunded ? "PRIMARY" : "SECONDARY"}
              size="MEDIUM"
              asChild
            >
              <ExternalLink href={props.issue.htmlUrl}>ACT ON GITHUB</ExternalLink>
            </Button>
          </>
        )}
      </>
    );
  } else if (props.state === dto.ManagedIssueState.REJECTED || props.state === dto.ManagedIssueState.SOLVED) {
    return (
      <div>
        <h3 className="px-md-5 italic underline">Closed</h3>
      </div>
    );
  } else {
    return <> </>;
  }
}
