import React from "react";
import { Issue, ManagedIssueState } from "src/model";
import { Button, ExternalLink } from "src/views/components/index";
import { Link } from "react-router-dom";
import { Audience } from "src/views/index";
import { paths } from "src/paths";

interface ActionProps {
  issue: Issue;
  audience: Audience;
  state?: ManagedIssueState;
  successfullyFunded: boolean;
}

export function Action(props: ActionProps) {
  const actOnIssueButton = (
    <>
      <Button className="!w-full" audience={props.audience} level={props.successfullyFunded ? "SECONDARY" : "PRIMARY"} size="MEDIUM" asChild>
        <Link to={props.audience === Audience.USER ? paths.fundIssue(props.issue.id) : paths.manageIssue(props.issue.id)}>
          {props.audience === Audience.DEVELOPER ? "ACT ON ISSUE" : "co-FUND"}
        </Link>
      </Button>
    </>
  );

  if (!props.state) {
    return actOnIssueButton;
  } else if (props.state === ManagedIssueState.OPEN) {
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
  } else if (props.state === ManagedIssueState.REJECTED || props.state === ManagedIssueState.SOLVED) {
    return (
      <div>
        <h3 className="px-md-5 italic underline">Closed</h3>
      </div>
    );
  } else {
    return <> </>;
  }
}
