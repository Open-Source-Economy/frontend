import React from "react";
import { ManagedIssueState } from "src/model";
import Decimal from "decimal.js";
import { Audience, textColorVariants } from "src/views/index";
import { milliDoW } from "../../../ultils";

interface CollectProps {
  audience: Audience;
  milliDoWCollected: Decimal;
  milliDoWRequested?: Decimal;
  state?: ManagedIssueState;
}

export function Collect(props: CollectProps) {
  function renderCollectedMillisDowText(milliDoWCollected: Decimal, state?: ManagedIssueState) {
    const dowAmount = milliDoW.display(milliDoWCollected);
    return (
      <>
        {milliDoWCollected.isZero() ? (
          <>
            {state === ManagedIssueState.REJECTED && "Amount refunded"}
            {state === ManagedIssueState.SOLVED && "That was a volunteer work!"}
            {state === ManagedIssueState.OPEN && (
              <>
                Want this issue solved? Drop a <span className="text-[#FF7E4B]">DoW</span>
              </>
            )}
          </>
        ) : (
          <>
            <span className="michroma text-[#FF7E4B]">{dowAmount}</span> <span className="text-[#FF7E4B]">DoW</span>{" "}
            {state === ManagedIssueState.REJECTED && "refunded"}
            {state === ManagedIssueState.SOLVED && "for open source!"}
            {state === ManagedIssueState.OPEN && "collected"}
          </>
        )}
      </>
    );
  }

  const widthPercentage = props.milliDoWRequested
    ? Math.min(props.milliDoWCollected.div(props.milliDoWRequested).mul(100).toNumber(), 100) // Calculate width percentage
    : 0; // Set to 0 if amountRequested is undefined or 0

  return (
    <>
      <div>
        <div className="flex items-start sm:items-center gap-3">
          <p className="text-base md:text-base lg:text-[20px] michroma">
            {props.state === ManagedIssueState.OPEN && props.milliDoWRequested ? (
              <>
                <span>{milliDoW.display(props.milliDoWCollected)}</span> <span className="text-[#8693A4] michroma">/</span>{" "}
                <span className={`${textColorVariants[props.audience]}`}>{milliDoW.display(props.milliDoWRequested)} DoW</span> requested
              </>
            ) : (
              renderCollectedMillisDowText(props.milliDoWCollected, props.state)
            )}
          </p>
        </div>

        {props.state === ManagedIssueState.OPEN && props.milliDoWRequested ? (
          <div className="w-[100%] md:w-[400px] mt-3 bg-[rgba(255,255,255,10%)] rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] h-2 rounded-full"
              style={{ width: `${widthPercentage}%` }} // Dynamically set the width
            ></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
