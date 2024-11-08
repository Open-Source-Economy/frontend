import React from "react";
import { Issue, ManagedIssueState } from "src/model";
import { ButtonSize, ButtonType, ExternalLinkButton, LinkButton } from "src/components";
import { Audience } from "src/views";
import { fundIssuePath } from "src/App";

interface ActionProps {
  issue: Issue;
  state?: ManagedIssueState;
  successfullyFunded: boolean;
}

export function Action(props: ActionProps) {
  const actOnIssueButton = (
    <LinkButton
      linkProps={{ to: fundIssuePath(props.issue.id.repositoryId.ownerId.login, props.issue.id.repositoryId.name, props.issue.id.number) }}
      buttonProps={{
        htmlButtonProps: { children: "ACT ON ISSUE" },
        type: props.successfullyFunded ? ButtonType.SECONDARY : ButtonType.PRIMARY,
        audience: Audience.DEVELOPER,
        size: ButtonSize.MEDIUM,
      }}
    />
  );

  if (!props.state) {
    return actOnIssueButton;
  } else if (props.state === ManagedIssueState.OPEN) {
    return (
      <>
        {actOnIssueButton}

        {props.successfullyFunded && (
          <ExternalLinkButton
            href={props.issue.htmlUrl}
            buttonProps={{
              htmlButtonProps: { children: "ACT ON GITHUB" },
              type: props.successfullyFunded ? ButtonType.PRIMARY : ButtonType.SECONDARY,
              size: ButtonSize.MEDIUM,
              audience: Audience.DEVELOPER,
            }}
          />
        )}
      </>
    );
  } else if (props.state === ManagedIssueState.REJECTED || props.state === ManagedIssueState.SOLVED) {
    return (
      <div>
        <h3 className=" underline italic px-md-5">Closed</h3>
      </div>
    );
  } else {
    return <> </>;
  }
}
