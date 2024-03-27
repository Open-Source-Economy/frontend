import React from "react";

interface UserBalanceProps {
  userBalances: number;
  onMaxClick?: () => void;
}

export function UserBalance(props: UserBalanceProps) {
  return (
    <p className="text-white text-end mb-0 helvetica">
      Balance: {props.userBalances.toFixed(3)}
      {props.onMaxClick && (
        <>
          {" "}
          <button className="text__primary bg-transparent nofocus  border-0" onClick={props.onMaxClick}>
            <span className="fw-600"> Max</span>
          </button>
        </>
      )}
    </p>
  );
}
