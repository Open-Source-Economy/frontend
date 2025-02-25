import React, { useEffect, useState } from "react";
import { Credit, credit, ManagedIssueState } from "src/model";
import { Audience, textColorVariants } from "src/views/index";

interface CollectProps {
  audience: Audience;
  creditsCollected: Credit;
  creditsRequested?: Credit;
  state?: ManagedIssueState;
  marginTop?: "mt-2.5" | "mt-3";
}

export function Collect(props: CollectProps) {
  const [progress, setProgress] = useState(0); // Initial progress state

  useEffect(() => {
    const targetProgress = credit.percentage(props.creditsCollected, props.creditsRequested || props.creditsCollected);

    // Start animation after component mounts
    setTimeout(() => {
      setProgress(targetProgress);
    }, 200); // Small delay to ensure animation starts visibly
  }, [props.creditsCollected, props.creditsRequested]); // Re-run when props change

  function renderCollectedCreditsText(credits: Credit, state?: ManagedIssueState) {
    return (
      <>
        {credits.amount.isZero() ? (
          <>
            {state === ManagedIssueState.REJECTED && "Amount refunded"}
            {state === ManagedIssueState.SOLVED && "That was a volunteer work!"}
            {state === ManagedIssueState.OPEN && <>Want this issue solved? Drop hours</>}
          </>
        ) : (
          <>
            <span className="michroma text-[#FF7E4B]">{credit.displayAmount(credits)}</span>
            {state === ManagedIssueState.REJECTED && " refunded"}
            {state === ManagedIssueState.SOLVED && " for open source!"}
            {state === ManagedIssueState.OPEN && " collected"}
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="flex items-start sm:items-center gap-3">
        <p className="text-base md:text-base lg:text-[20px] michroma">
          {props.state === ManagedIssueState.OPEN && props.creditsRequested ? (
            <>
              <span>{credit.displayAmount(props.creditsCollected)}</span>
              <span className="text-[#8693A4] michroma"> / </span>
              <span className={`${textColorVariants[props.audience]}`}>{credit.displayAmount(props.creditsRequested)}</span> requested
            </>
          ) : (
            renderCollectedCreditsText(props.creditsCollected, props.state)
          )}
        </p>
      </div>

      {props.state === ManagedIssueState.OPEN && props.creditsRequested ? (
        <div className={`w-[100%] ${props.marginTop || "mt-3"} bg-[rgba(255,255,255,10%)] rounded-full h-2`}>
          <div
            className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] h-2 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${progress}%`, // Smoothly transitions from 0% to the target value
            }}
          ></div>
        </div>
      ) : null}
    </>
  );
}
