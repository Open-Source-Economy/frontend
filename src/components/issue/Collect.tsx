import React from "react";
import dow from "src/assets/dow.png";
import { ManagedIssueState } from "src/model";
import Decimal from "decimal.js";
import { Audience, textColorVariants } from "src/views";

interface CollectProps {
  audience: Audience;
  amountCollected: Decimal;
  amountRequested?: Decimal;
  state?: ManagedIssueState;
}

export function Collect(props: CollectProps) {
  function renderAmountText(amount: Decimal, state?: ManagedIssueState) {
    return (
      <>
        <span className="michroma text-[#FF7E4B]">{amount.toString()}</span> <span className="text-[#FF7E4B]">DoW</span>{" "}
        {state === ManagedIssueState.REJECTED ? "refunded" : state === ManagedIssueState.SOLVED ? "for open source!" : "collected"}
      </>
    );
  }

  const widthPercentage = props.amountRequested
    ? Math.min(props.amountCollected.div(props.amountRequested).mul(100).toNumber(), 100) // Calculate width percentage
    : 0; // Set to 0 if amountRequested is undefined or 0

  return (
    <>
      <div>
        <div className="flex items-start sm:items-center gap-3">
          <img className="w-[38px] h-[30px] mt-1 sm:mt-0" src={dow} alt="" />
          <p className="text-base md:text-base lg:text-[20px] michroma">
            {props.state === ManagedIssueState.REJECTED && renderAmountText(props.amountCollected, props.state)}
            {props.state === ManagedIssueState.SOLVED && renderAmountText(props.amountCollected, props.state)}
            {props.state === ManagedIssueState.OPEN && props.amountRequested && (
              <>
                <span>{props.amountCollected.toString()}</span> <span className="text-[#8693A4] michroma">/</span>{" "}
                <span className={`${textColorVariants[props.audience]}`}>{props.amountRequested?.toString()} DoW</span> requested
              </>
            )}
            {props.state === undefined && renderAmountText(props.amountCollected, undefined)}
          </p>
        </div>

        {props.state === ManagedIssueState.OPEN && props.amountRequested ? (
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
