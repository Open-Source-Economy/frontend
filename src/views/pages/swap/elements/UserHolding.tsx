import React from "react";

import { Token } from "../../../../model/Token";

interface UserHoldingProps {
  token: Token;
  tokenCode: Map<Token, string>;
  userBalances: Map<Token, number>;
}

export function UserHolding({ token, userBalances, tokenCode }: UserHoldingProps) {
  return (
    <>
      <div>
        <p className="text-white helvetica mb-0">
          Your Holding &nbsp; - &nbsp;{" "}
          <span className="text__primary fw-bold">
            {userBalances.get(token)?.toFixed(3)} {tokenCode.get(token) || ""}
          </span>
        </p>
      </div>
    </>
  );
}
