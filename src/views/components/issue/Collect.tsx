import React from "react";
import { Credit, credit, ManagedIssueState } from "src/model";
import { Audience, textColorVariants } from "src/views/index";

interface CollectProps {
  audience: Audience;
  creditsCollected: Credit;
  creditsRequested?: Credit;
  state?: ManagedIssueState;
}

export function Collect(props: CollectProps) {
  function renderCollectedCreditsText(credits: Credit, state?: ManagedIssueState) {
    return (
      <>
        {credits.amount.isZero() ? (
          <>
            {state === ManagedIssueState.REJECTED && "Amount refunded"}
            {state === ManagedIssueState.SOLVED && "That was a volunteer work!"}
            {state === ManagedIssueState.OPEN && (
              <>
                Want this issue solved? Drop some <span className="text-[#FF7E4B]">Credits</span>
              </>
            )}
          </>
        ) : (
          <>
            <span className="michroma text-[#FF7E4B]">{credit.displayAmount(credits)}</span>
            {state === ManagedIssueState.REJECTED && "refunded"}
            {state === ManagedIssueState.SOLVED && "for open source!"}
            {state === ManagedIssueState.OPEN && "collected"}
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div>
        <div className="flex items-start sm:items-center gap-3">
          <p className="text-base md:text-base lg:text-[20px] michroma">
            {props.state === ManagedIssueState.OPEN && props.creditsRequested ? (
              <>
                <span>{credit.displayAmount(props.creditsCollected)}</span> <span className="text-[#8693A4] michroma">/</span>{" "}
                <span className={`${textColorVariants[props.audience]}`}>{credit.displayAmount(props.creditsRequested)}</span> requested
              </>
            ) : (
              renderCollectedCreditsText(props.creditsCollected, props.state)
            )}
          </p>
        </div>

        {props.state === ManagedIssueState.OPEN && props.creditsRequested ? (
          <div className="w-[100%] md:w-[400px] mt-3 bg-[rgba(255,255,255,10%)] rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] h-2 rounded-full"
              style={{ width: `${credit.percentage(props.creditsCollected, props.creditsRequested)}%` }} // Dynamically set the width
            ></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
