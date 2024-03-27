import React from "react";

import { Token } from "../../../../model/Token";

interface UserHoldingProps {
  tokenCode: string;
  userBalance: number;
}

export function UserHolding(props: UserHoldingProps) {
  return (
    <>
      <div>
        <p className="text-white helvetica mb-0 fs-6">
          Your Holding &nbsp; - &nbsp;{" "}
          <span className="text__primary fw-bold">
            {props.userBalance.toFixed(3)} {props.tokenCode || ""}
          </span>
        </p>
      </div>
    </>
  );
}
