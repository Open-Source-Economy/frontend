import React from "react";
import { TokenSymbol } from "./TokenSymbol";
import { UserBalance } from "./UserBalance";
import { Token } from "../../../../model";

interface AmountInputProps {
  label: string;
  type: string;
  value: number | string | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tokenLogo: string;
  tokenCode: string;
  userBalances: number;
  disabled?: boolean;
  onMaxClick?: () => void;
}

export function AmountInput(props: AmountInputProps) {
  return (
    <div className="swapdiv w-100 px-3 py-3">
      <p className="text-white-50 helvetica">{props.label}</p>
      <div className="d-flex justify-content-between">
        <div>
          {/*<p className="text-white-50 helvetica">{props.label}</p>*/}
          <input
            type={props.type}
            value={props.value || ""}
            disabled={props.disabled}
            maxLength={12}
            onChange={props.onChange}
            className="bg-transparent border-0 h3 text-white nofocus w-100 fs-1"
            placeholder="0.0"
          />
          {/*TODO: add price back for the sell input*/}
          {/*<p className="text-white-50 mb-0 helvetica">$1.63</p>*/}
        </div>

        <div>
          <div className="d-flex gap-3 align-items-center mb-4 pb-2">
            <TokenSymbol tokenLogo={props.tokenLogo} tokenCode={props.tokenCode} />
          </div>

          <UserBalance userBalances={props.userBalances} onMaxClick={props.onMaxClick} />
        </div>
      </div>
    </div>
  );
}
