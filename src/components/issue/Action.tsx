import React from "react";
import { Issue, ManagedIssueState } from "src/model";
import { fundIssuePath, manageIssuePath } from "src/App";
import { Button } from "../elements/Button";
import { Link } from "react-router-dom";
import { Audience } from "src/views";

interface ActionProps {
  issue: Issue;
  audience: Audience;
  state?: ManagedIssueState;
  successfullyFunded: boolean;
}

export function Action(props: ActionProps) {
  const actOnIssueButton = (
    <>
      {/*  TODO: Code Nativex: color dependent on props.audience*/}
      <Button level={props.successfullyFunded ? "SECONDARY_DEVELOPER" : "PRIMARY_DEVELOPER"} size="MEDIUM" asChild>
        <Link to={props.audience === Audience.DEVELOPER ? manageIssuePath(props.issue.id) : fundIssuePath(props.issue.id)}>
          <span className="relative z-20">{props.audience === Audience.DEVELOPER ? "ACT ON ISSUE" : "co-FUND"}</span>
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
            {/*  TODO: Code Nativex: color dependent on props.audience*/}
            <Button level={props.successfullyFunded ? "SECONDARY_DEVELOPER" : "PRIMARY_DEVELOPER"} size="MEDIUM" asChild>
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
