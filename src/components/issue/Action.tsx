import React from "react";
import { Issue, ManagedIssueState } from "src/model";
import { fundIssuePath } from "src/App";
import { Button } from "../elements/Button";
import { Link } from "react-router-dom";

interface ActionProps {
  issue: Issue;
  state?: ManagedIssueState;
  successfullyFunded: boolean;
}

export function Action(props: ActionProps) {
  const actOnIssueButton = (
    <>
      <Button variant={props.successfullyFunded ? "SECONDARY_DEVELOPER" : "PRIMARY_DEVELOPER"} size="MEDIUM" asChild>
        <Link to={fundIssuePath(props.issue.id.repositoryId.ownerId.login, props.issue.id.repositoryId.name, props.issue.id.number)}>
          <span className="relative z-20">ACT ON ISSUE</span>
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

        {props.successfullyFunded && (
          <>
            <Button variant={props.successfullyFunded ? "SECONDARY_DEVELOPER" : "PRIMARY_DEVELOPER"} size="MEDIUM" asChild>
              <Link to={props.issue.htmlUrl}>
                <span className="relative z-20">ACT ON GITHUB</span>
              </Link>
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
