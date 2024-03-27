import React, { ChangeEvent, useState } from "react";
import { AmountInput } from "../../swap/elements";
import { DisclaimerModal } from "./DisclaimerModal";
import { RegisterModal } from "./RegisterModal";

interface CryptoPaymentProps {
  userBalance: number;
  tokenLogo: string;
  tokenCode: string;
}

export function CryptoPayment(props: CryptoPaymentProps) {
  const [inputSellValue, setInputSellValue] = useState<number>();

  // --- Disclaimer Modal ---

  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const acceptDisclaimerCallback = () => {
    setShowRegister(true);
  };

  // --- Register Modal ---

  const [showRegister, setShowRegister] = useState(false);
  const acceptRegisterCallback = () => {
    setShowRegister(false);

    // TODO: API call to register
  };
  const rejectRegisterCallback = () => {
    setShowRegister(false);
  };

  return (
    <>
      <div className="mt-3 d-flex flex-column gap-1 align-items-center position-relative">
        <AmountInput
          label="Funding amount"
          type="number"
          value={inputSellValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setInputSellValue(event.target.valueAsNumber)}
          tokenLogo={props.tokenLogo}
          tokenCode={props.tokenCode}
          userBalances={props.userBalance}
          onMaxClick={() => setInputSellValue(props.userBalance)}
        />

        {(inputSellValue || 0) <= (props.userBalance || 0) ? (
          <button onClick={() => setShowDisclaimer(true)} className="connect__btn w-100 helvetica fw-700 fs-5 mt-4">
            Fund the issue
          </button>
        ) : (
          <button disabled className="connect__btn bg-secondary helvetica border-0 w-100 fw-700 fs-5 mt-4">
            Insufficient funds
          </button>
        )}
      </div>

      <DisclaimerModal show={showDisclaimer} setShow={setShowDisclaimer} acceptCallback={acceptDisclaimerCallback} />
      <RegisterModal show={showRegister} setShow={setShowRegister} />
    </>
  );
}
